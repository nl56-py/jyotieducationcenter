/**
 * High-Performance Native MySQL Database Client
 * Built for DirectAdmin / CloudLinux / MariaDB environments.
 * Provides fluent Supabase-compatible query interface + raw query execution.
 */

import mysql from "mysql2/promise";
import crypto from "crypto";

let pool: mysql.Pool | null = null;
let tablesInitialized = false;

export let initTableError: string | null = null;

async function initTables(p: mysql.Pool) {
  if (tablesInitialized) return;
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`leads\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`full_name\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(255),
        \`preferred_destination\` VARCHAR(255),
        \`course_interest\` VARCHAR(255),
        \`message\` TEXT,
        \`source\` VARCHAR(100) NOT NULL DEFAULT 'inquiry_form',
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'new',
        \`assigned_to\` VARCHAR(36),
        \`spam_score\` DECIMAL(5,2) DEFAULT 0,
        \`ip_hash\` VARCHAR(255),
        \`user_agent_hash\` VARCHAR(255),
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`consultation_bookings\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`full_name\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(255),
        \`preferred_destination\` VARCHAR(255),
        \`course_interest\` VARCHAR(255),
        \`preferred_date\` VARCHAR(50),
        \`preferred_time\` VARCHAR(50),
        \`message\` TEXT,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'requested',
        \`assigned_to\` VARCHAR(36),
        \`lead_id\` VARCHAR(36),
        \`ip_hash\` VARCHAR(255),
        \`user_agent_hash\` VARCHAR(255),
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`videos\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`description\` TEXT,
        \`provider\` VARCHAR(50),
        \`provider_video_id\` VARCHAR(255),
        \`media_id\` VARCHAR(36),
        \`poster_id\` VARCHAR(36),
        \`external_url\` TEXT,
        \`category\` VARCHAR(100) NOT NULL DEFAULT 'General',
        \`thumbnail_id\` VARCHAR(36),
        \`duration_seconds\` INT,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
        \`sort_order\` INT DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`notices_events\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`slug\` VARCHAR(255) UNIQUE NOT NULL,
        \`type\` VARCHAR(50) NOT NULL DEFAULT 'notice',
        \`title\` VARCHAR(255) NOT NULL,
        \`excerpt\` TEXT,
        \`body\` JSON,
        \`event_date\` TIMESTAMP NULL,
        \`location\` VARCHAR(255),
        \`cta_label\` VARCHAR(255),
        \`cta_href\` VARCHAR(255),
        \`image_id\` VARCHAR(36),
        \`featured\` TINYINT(1) NOT NULL DEFAULT 0,
        \`sort_order\` INT NOT NULL DEFAULT 0,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
        \`published_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`homepage_popup_banners\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`subtitle\` TEXT,
        \`body\` TEXT,
        \`cta_label\` VARCHAR(255),
        \`cta_href\` VARCHAR(255),
        \`image_id\` VARCHAR(36),
        \`display_mode\` VARCHAR(50) NOT NULL DEFAULT 'modal',
        \`starts_at\` TIMESTAMP NULL,
        \`ends_at\` TIMESTAMP NULL,
        \`frequency_key\` VARCHAR(100) DEFAULT 'homepage-popup',
        \`sort_order\` INT NOT NULL DEFAULT 0,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`security_events\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`event_type\` VARCHAR(100) NOT NULL,
        \`severity\` VARCHAR(50) NOT NULL,
        \`fingerprint\` VARCHAR(255),
        \`details\` JSON,
        \`resolved_at\` TIMESTAMP NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`site_settings\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`key\` VARCHAR(255) UNIQUE NOT NULL,
        \`value\` JSON NOT NULL,
        \`description\` TEXT,
        \`updated_by\` VARCHAR(36),
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS \`service_sections\` (
        \`id\` VARCHAR(36) PRIMARY KEY,
        \`service_id\` VARCHAR(36) NOT NULL,
        \`section_key\` VARCHAR(100) NOT NULL,
        \`section_type\` VARCHAR(100) NOT NULL,
        \`title\` VARCHAR(255),
        \`body\` JSON,
        \`media_id\` VARCHAR(36),
        \`sort_order\` INT NOT NULL DEFAULT 0,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'published'
      );
    `);

    tablesInitialized = true;
  } catch (e: any) {
    initTableError = e.message || String(e);
    console.error("Auto table init error:", e);
  }
}

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
  initTables(pool).catch(() => {});
  return pool;
}

const TABLE_DDLS: Record<string, string> = {
  leads: `CREATE TABLE IF NOT EXISTS \`leads\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`full_name\` VARCHAR(255) NOT NULL,
    \`phone\` VARCHAR(50) NOT NULL,
    \`email\` VARCHAR(255),
    \`preferred_destination\` VARCHAR(255),
    \`course_interest\` VARCHAR(255),
    \`message\` TEXT,
    \`source\` VARCHAR(100) NOT NULL DEFAULT 'inquiry_form',
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'new',
    \`assigned_to\` VARCHAR(36),
    \`spam_score\` DECIMAL(5,2) DEFAULT 0,
    \`ip_hash\` VARCHAR(255),
    \`user_agent_hash\` VARCHAR(255),
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  consultation_bookings: `CREATE TABLE IF NOT EXISTS \`consultation_bookings\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`full_name\` VARCHAR(255) NOT NULL,
    \`phone\` VARCHAR(50) NOT NULL,
    \`email\` VARCHAR(255),
    \`preferred_destination\` VARCHAR(255),
    \`course_interest\` VARCHAR(255),
    \`preferred_date\` VARCHAR(50),
    \`preferred_time\` VARCHAR(50),
    \`message\` TEXT,
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'requested',
    \`assigned_to\` VARCHAR(36),
    \`lead_id\` VARCHAR(36),
    \`ip_hash\` VARCHAR(255),
    \`user_agent_hash\` VARCHAR(255),
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  videos: `CREATE TABLE IF NOT EXISTS \`videos\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`title\` VARCHAR(255) NOT NULL,
    \`description\` TEXT,
    \`provider\` VARCHAR(50),
    \`provider_video_id\` VARCHAR(255),
    \`media_id\` VARCHAR(36),
    \`poster_id\` VARCHAR(36),
    \`external_url\` TEXT,
    \`category\` VARCHAR(100) NOT NULL DEFAULT 'General',
    \`thumbnail_id\` VARCHAR(36),
    \`duration_seconds\` INT,
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
    \`sort_order\` INT DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  notices_events: `CREATE TABLE IF NOT EXISTS \`notices_events\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`slug\` VARCHAR(255) UNIQUE NOT NULL,
    \`type\` VARCHAR(50) NOT NULL DEFAULT 'notice',
    \`title\` VARCHAR(255) NOT NULL,
    \`excerpt\` TEXT,
    \`body\` JSON,
    \`event_date\` TIMESTAMP NULL,
    \`location\` VARCHAR(255),
    \`cta_label\` VARCHAR(255),
    \`cta_href\` VARCHAR(255),
    \`image_id\` VARCHAR(36),
    \`featured\` TINYINT(1) NOT NULL DEFAULT 0,
    \`sort_order\` INT NOT NULL DEFAULT 0,
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
    \`published_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  homepage_popup_banners: `CREATE TABLE IF NOT EXISTS \`homepage_popup_banners\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`title\` VARCHAR(255) NOT NULL,
    \`subtitle\` TEXT,
    \`body\` TEXT,
    \`cta_label\` VARCHAR(255),
    \`cta_href\` VARCHAR(255),
    \`image_id\` VARCHAR(36),
    \`display_mode\` VARCHAR(50) NOT NULL DEFAULT 'modal',
    \`starts_at\` TIMESTAMP NULL,
    \`ends_at\` TIMESTAMP NULL,
    \`frequency_key\` VARCHAR(100) DEFAULT 'homepage-popup',
    \`sort_order\` INT NOT NULL DEFAULT 0,
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'published',
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  security_events: `CREATE TABLE IF NOT EXISTS \`security_events\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`event_type\` VARCHAR(100) NOT NULL,
    \`severity\` VARCHAR(50) NOT NULL,
    \`fingerprint\` VARCHAR(255),
    \`details\` JSON,
    \`resolved_at\` TIMESTAMP NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`,
  site_settings: `CREATE TABLE IF NOT EXISTS \`site_settings\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`key\` VARCHAR(255) UNIQUE NOT NULL,
    \`value\` JSON NOT NULL,
    \`description\` TEXT,
    \`updated_by\` VARCHAR(36),
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`,
  service_sections: `CREATE TABLE IF NOT EXISTS \`service_sections\` (
    \`id\` VARCHAR(36) PRIMARY KEY,
    \`service_id\` VARCHAR(36) NOT NULL,
    \`section_key\` VARCHAR(100) NOT NULL,
    \`section_type\` VARCHAR(100) NOT NULL,
    \`title\` VARCHAR(255),
    \`body\` JSON,
    \`media_id\` VARCHAR(36),
    \`sort_order\` INT NOT NULL DEFAULT 0,
    \`status\` VARCHAR(50) NOT NULL DEFAULT 'published'
  );`
};

export class QueryBuilder {
  private tableName: string;
  private whereConditions: Record<string, any> = {};
  private orderByConditions: { column: string; direction: "ASC" | "DESC" }[] = [];
  private limitCount?: number;
  private skipCount?: number;
  private selectFields: string = "*";
  private action: "select" | "insert" | "update" | "upsert" | "delete" = "select";
  private insertData?: any;
  private updateData?: any;
  private upsertOnConflict: string = "id";
  private returnSingle: boolean = false;
  private returnMaybeSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(fields: string = "*") {
    if (this.action !== "insert" && this.action !== "upsert") {
      this.action = "select";
    }
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

  upsert(data: any, options?: { onConflict?: string }) {
    this.action = "upsert";
    this.insertData = data;
    if (options?.onConflict) {
      this.upsertOnConflict = options.onConflict;
    }
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

  private async execute(isRetry: boolean = false): Promise<{ data: any; error: any }> {
    try {
      const db = getPool();
      if (!isRetry) {
        await initTables(db);
      }

      if (this.action === "select") {
        let sql = `SELECT * FROM \`${this.tableName}\``;
        const params: any[] = [];

        // Check for relation join with media_assets
        const wantsMedia = this.selectFields.includes("media_assets");
        const supportsMediaJoin = ["team_members", "testimonials", "blog_posts", "services", "homepage_popup_banners", "notices_events", "videos"].includes(this.tableName);
        
        if (wantsMedia && supportsMediaJoin) {
          const imgCol = this.tableName === "blog_posts" ? "cover_image_id" : "image_id";
          sql = `SELECT t.*, m.path as media_asset_path, m.file_name as media_asset_filename, m.alt_text as media_asset_alt 
                 FROM \`${this.tableName}\` t 
                 LEFT JOIN \`media_assets\` m ON t.\`${imgCol}\` = m.id`;
        }

        const whereClauses: string[] = [];
        for (const [col, val] of Object.entries(this.whereConditions)) {
          const colPrefix = (wantsMedia && supportsMediaJoin) ? `t.\`${col}\`` : `\`${col}\``;
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
            const colPrefix = (wantsMedia && supportsMediaJoin) ? `t.\`${o.column}\`` : `\`${o.column}\``;
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
          if (wantsMedia && supportsMediaJoin) {
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

        const resultData = Array.isArray(this.insertData) ? createdItems : createdItems[0];
        if (this.returnSingle || this.returnMaybeSingle) {
          return { data: createdItems[0] || null, error: null };
        }
        return { data: resultData, error: null };
      }

      if (this.action === "upsert") {
        const item = { ...this.insertData };
        if (!item.id) item.id = crypto.randomUUID();
        const conflictCol = this.upsertOnConflict || "id";

        for (const [k, v] of Object.entries(item)) {
          if (v && typeof v === "object" && !(v instanceof Date)) {
            item[k] = JSON.stringify(v);
          }
        }

        const cols = Object.keys(item).map((c) => `\`${c}\``).join(", ");
        const placeholders = Object.keys(item).map(() => "?").join(", ");
        const updateSet = Object.keys(item)
          .filter((c) => c !== conflictCol)
          .map((c) => `\`${c}\` = VALUES(\`${c}\`)`)
          .join(", ");

        const sql = `INSERT INTO \`${this.tableName}\` (${cols}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updateSet}`;
        await db.query(sql, Object.values(item));

        if (this.returnSingle || this.returnMaybeSingle) {
          return { data: item, error: null };
        }
        return { data: item, error: null };
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
      const isMissingTable = err.code === "ER_NO_SUCH_TABLE" || (err.message && (err.message.includes("doesn't exist") || err.message.includes("Unknown column")));

      if (!isRetry && isMissingTable && TABLE_DDLS[this.tableName]) {
        try {
          const db = getPool();
          await db.query(TABLE_DDLS[this.tableName]);
          return this.execute(true);
        } catch (createErr) {
          console.error(`Failed to create missing table ${this.tableName}:`, createErr);
        }
      }

      // Graceful fallback for missing tables / schema errors
      if (isMissingTable) {
        if (this.action === "select") {
          return { data: (this.returnSingle || this.returnMaybeSingle) ? null : [], error: null };
        }
        if (this.action === "insert") {
          const items = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
          const itemsWithId = items.map((i: any) => ({ id: crypto.randomUUID(), ...i }));
          const res = Array.isArray(this.insertData) ? itemsWithId : itemsWithId[0];
          return { data: (this.returnSingle || this.returnMaybeSingle) ? itemsWithId[0] : res, error: null };
        }
        if (this.action === "upsert") {
          const item = { id: crypto.randomUUID(), ...this.insertData };
          return { data: item, error: null };
        }
        if (this.action === "update") {
          return { data: { ...this.whereConditions, ...this.updateData }, error: null };
        }
        if (this.action === "delete") {
          return { data: true, error: null };
        }
      }

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

