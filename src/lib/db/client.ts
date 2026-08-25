/**
 * High-Performance Native MySQL Database Client
 * Built for DirectAdmin / CloudLinux / MariaDB environments.
 * Provides fluent Supabase-compatible query interface + raw query execution.
 */

import mysql from "mysql2/promise";
import crypto from "crypto";

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    const rawUrl = process.env.DATABASE_URL || "mysql://jyoti_jecusr:JyotiEducations2026%21%23@localhost:3306/jyoti_jecapp";
    
    // Parse URL manually or pass connection string
    let host = "localhost";
    let port = 3306;
    let user = "jyoti_jecusr";
    let password = "JyotiEducations2026!#";
    let database = "jyoti_jecapp";

    try {
      const u = new URL(rawUrl.replace("%21%23", "TEMP_ENC"));
      host = u.hostname || host;
      port = u.port ? parseInt(u.port, 10) : port;
      user = decodeURIComponent(u.username) || user;
      password = decodeURIComponent(u.password.replace("TEMP_ENC", "!#")) || password;
      database = u.pathname.replace(/^\//, "") || database;
    } catch (e) {
      // fallback to default credentials
    }

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export class QueryBuilder {
  private tableName: string;
  private whereConditions: Record<string, any> = {};
  private orderByConditions: { column: string; direction: "ASC" | "DESC" }[] = [];
  private limitCount?: number;
  private skipCount?: number;
  private selectFields: string = "*";
  private action: "select" | "insert" | "update" | "delete" = "select";
  private insertData?: any;
  private updateData?: any;
  private returnSingle: boolean = false;
  private returnMaybeSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(fields: string = "*") {
    this.action = "select";
    this.selectFields = fields;
    return this;
  }

  insert(data: any) {
    this.action = "insert";
    this.insertData = data;
    return this;
  }

  update(data: any) {
    this.action = "update";
    this.updateData = data;
    return this;
  }

  delete() {
    this.action = "delete";
    return this;
  }

  eq(column: string, value: any) {
    this.whereConditions[column] = value;
    return this;
  }

  neq(column: string, value: any) {
    this.whereConditions[column] = { not: value };
    return this;
  }

  in(column: string, values: any[]) {
    this.whereConditions[column] = { in: values };
    return this;
  }

  gte(column: string, value: any) {
    this.whereConditions[column] = { gte: value };
    return this;
  }

  lte(column: string, value: any) {
    this.whereConditions[column] = { lte: value };
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    const direction = options?.ascending === false ? "DESC" : "ASC";
    this.orderByConditions.push({ column, direction });
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  range(from: number, to: number) {
    this.skipCount = from;
    this.limitCount = to - from + 1;
    return this;
  }

  single() {
    this.returnSingle = true;
    return this.execute();
  }

  maybeSingle() {
    this.returnMaybeSingle = true;
    return this.execute();
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private parseJsonColumns(row: any) {
    if (!row || typeof row !== "object") return row;
    for (const key of Object.keys(row)) {
      if (typeof row[key] === "string" && (row[key].startsWith("{") || row[key].startsWith("["))) {
        try {
          row[key] = JSON.parse(row[key]);
        } catch (e) {}
      }
    }
    return row;
  }

  private async execute(): Promise<{ data: any; error: any }> {
    try {
      const db = getPool();

      if (this.action === "select") {
        let sql = `SELECT * FROM \`${this.tableName}\``;
        const params: any[] = [];

        // Check for relation join with media_assets
        const wantsMedia = this.selectFields.includes("media_assets");
        if (wantsMedia && (this.tableName === "team_members" || this.tableName === "testimonials" || this.tableName === "blog_posts" || this.tableName === "services" || this.tableName === "homepage_popup_banners")) {
          const imgCol = this.tableName === "blog_posts" ? "cover_image_id" : "image_id";
          sql = `SELECT t.*, m.path as media_asset_path, m.file_name as media_asset_filename, m.alt_text as media_asset_alt 
                 FROM \`${this.tableName}\` t 
                 LEFT JOIN \`media_assets\` m ON t.\`${imgCol}\` = m.id`;
        }

        const whereClauses: string[] = [];
        for (const [col, val] of Object.entries(this.whereConditions)) {
          const colPrefix = wantsMedia ? `t.\`${col}\`` : `\`${col}\``;
          if (val && typeof val === "object" && "not" in val) {
            whereClauses.push(`${colPrefix} != ?`);
            params.push(val.not);
          } else if (val && typeof val === "object" && "in" in val) {
            if (Array.isArray(val.in) && val.in.length > 0) {
              const placeholders = val.in.map(() => "?").join(", ");
              whereClauses.push(`${colPrefix} IN (${placeholders})`);
              params.push(...val.in);
            }
          } else if (val && typeof val === "object" && "gte" in val) {
            whereClauses.push(`${colPrefix} >= ?`);
            params.push(val.gte);
          } else if (val && typeof val === "object" && "lte" in val) {
            whereClauses.push(`${colPrefix} <= ?`);
            params.push(val.lte);
          } else {
            whereClauses.push(`${colPrefix} = ?`);
            params.push(val);
          }
        }

        if (whereClauses.length > 0) {
          sql += ` WHERE ${whereClauses.join(" AND ")}`;
        }

        if (this.orderByConditions.length > 0) {
          const orderClauses = this.orderByConditions.map((o) => {
            const colPrefix = wantsMedia ? `t.\`${o.column}\`` : `\`${o.column}\``;
            return `${colPrefix} ${o.direction}`;
          });
          sql += ` ORDER BY ${orderClauses.join(", ")}`;
        }

        if (this.limitCount !== undefined) {
          sql += ` LIMIT ?`;
          params.push(this.limitCount);
          if (this.skipCount !== undefined) {
            sql += ` OFFSET ?`;
            params.push(this.skipCount);
          }
        }

        const [rows] = await db.query(sql, params);
        let results = (rows as any[]).map((r) => {
          const parsed = this.parseJsonColumns(r);
          if (wantsMedia) {
            parsed.media_assets = parsed.media_asset_path ? { path: parsed.media_asset_path, file_name: parsed.media_asset_filename, alt_text: parsed.media_asset_alt } : null;
            parsed.image = parsed.media_assets;
            delete parsed.media_asset_path;
            delete parsed.media_asset_filename;
            delete parsed.media_asset_alt;
          }
          return parsed;
        });

        if (this.returnSingle) {
          if (results.length === 0) {
            return { data: null, error: { message: "Record not found" } };
          }
          return { data: results[0], error: null };
        }

        if (this.returnMaybeSingle) {
          return { data: results[0] || null, error: null };
        }

        return { data: results, error: null };
      }

      if (this.action === "insert") {
        const items = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
        const createdItems: any[] = [];

        for (const item of items) {
          const toInsert: any = { ...item };
          if (!toInsert.id) {
            toInsert.id = crypto.randomUUID();
          }
          for (const [k, v] of Object.entries(toInsert)) {
            if (v && typeof v === "object" && !(v instanceof Date)) {
              toInsert[k] = JSON.stringify(v);
            }
          }

          const cols = Object.keys(toInsert).map((c) => `\`${c}\``).join(", ");
          const placeholders = Object.keys(toInsert).map(() => "?").join(", ");
          const vals = Object.values(toInsert);

          const sql = `INSERT INTO \`${this.tableName}\` (${cols}) VALUES (${placeholders})`;
          await db.query(sql, vals);
          createdItems.push(this.parseJsonColumns(toInsert));
        }

        return { data: Array.isArray(this.insertData) ? createdItems : createdItems[0], error: null };
      }

      if (this.action === "update") {
        const toUpdate: any = { ...this.updateData };
        for (const [k, v] of Object.entries(toUpdate)) {
          if (v && typeof v === "object" && !(v instanceof Date)) {
            toUpdate[k] = JSON.stringify(v);
          }
        }

        const setClauses = Object.keys(toUpdate).map((c) => `\`${c}\` = ?`).join(", ");
        const params = Object.values(toUpdate);

        const whereClauses: string[] = [];
        for (const [col, val] of Object.entries(this.whereConditions)) {
          whereClauses.push(`\`${col}\` = ?`);
          params.push(val);
        }

        const sql = `UPDATE \`${this.tableName}\` SET ${setClauses}${whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : ""}`;
        await db.query(sql, params);

        return { data: { ...this.whereConditions, ...this.updateData }, error: null };
      }

      if (this.action === "delete") {
        const params: any[] = [];
        const whereClauses: string[] = [];
        for (const [col, val] of Object.entries(this.whereConditions)) {
          whereClauses.push(`\`${col}\` = ?`);
          params.push(val);
        }

        const sql = `DELETE FROM \`${this.tableName}\`${whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : ""}`;
        await db.query(sql, params);

        return { data: true, error: null };
      }

      return { data: null, error: null };
    } catch (err: any) {
      console.error(`Database error on table "${this.tableName}":`, err);
      return { data: null, error: { message: err.message || String(err) } };
    }
  }
}

export class DatabaseClient {
  from(tableName: string) {
    return new QueryBuilder(tableName);
  }

  async rpc(fnName: string, params: any) {
    return { data: null, error: null };
  }
}

export const getDatabaseClient = () => new DatabaseClient();
export default getDatabaseClient();
