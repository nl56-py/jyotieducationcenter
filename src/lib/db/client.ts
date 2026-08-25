/**
 * Universal Database Client for DirectAdmin MariaDB/MySQL & PostgreSQL
 * Provides Prisma ORM methods and a compatibility fluent query interface.
 */

import prisma from "./prisma";

// Map table names to Prisma delegate models
const modelMap: Record<string, string> = {
  admin_users: "adminUser",
  security_events: "securityEvent",
  media_assets: "mediaAsset",
  site_settings: "siteSetting",
  navigation_items: "navigationItem",
  redirects: "redirect",
  pages: "page",
  page_sections: "pageSection",
  destinations: "destination",
  destination_sections: "destinationSection",
  universities: "university",
  test_preparations: "testPreparation",
  entrance_programs: "entranceProgram",
  services: "service",
  service_sections: "serviceSection",
  team_members: "teamMember",
  testimonials: "testimonial",
  blog_categories: "blogCategory",
  blog_posts: "blogPost",
  videos: "video",
  homepage_popup_banners: "homepagePopupBanner",
  notices_events: "noticeEvent",
  leads: "lead",
  lead_notes: "leadNote",
  lead_events: "leadEvent",
  consultation_bookings: "consultationBooking",
  newsletter_subscribers: "newsletterSubscriber",
};

export class QueryBuilder {
  private tableName: string;
  private modelName: string;
  private whereConditions: Record<string, any> = {};
  private orderByConditions: Record<string, "asc" | "desc">[] = [];
  private limitCount?: number;
  private skipCount?: number;
  private selectFields?: string;
  private action: "select" | "insert" | "update" | "delete" = "select";
  private insertData?: any;
  private updateData?: any;
  private returnSingle: boolean = false;
  private returnMaybeSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.modelName = modelMap[tableName] || tableName;
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
    const direction = options?.ascending === false ? "desc" : "asc";
    this.orderByConditions.push({ [column]: direction });
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

  // Thenable implementation to support await query
  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute(): Promise<{ data: any; error: any }> {
    try {
      const model = (prisma as any)[this.modelName];
      if (!model) {
        throw new Error(`Database model for table "${this.tableName}" not found`);
      }

      if (this.action === "select") {
        const queryOptions: any = {};
        if (Object.keys(this.whereConditions).length > 0) {
          queryOptions.where = this.whereConditions;
        }
        if (this.orderByConditions.length > 0) {
          queryOptions.orderBy = this.orderByConditions;
        }
        if (this.limitCount !== undefined) {
          queryOptions.take = this.limitCount;
        }
        if (this.skipCount !== undefined) {
          queryOptions.skip = this.skipCount;
        }

        // Handle relations in select fields
        if (this.selectFields && this.selectFields.includes(",")) {
          // Simple include mapping for common relations
          const includes: any = {};
          if (this.selectFields.includes("blog_categories")) includes.category = true;
          if (this.selectFields.includes("cover_image") || this.selectFields.includes("media_assets")) includes.cover_image = true;
          if (this.selectFields.includes("media_assets")) includes.image = true;
          if (Object.keys(includes).length > 0) {
            queryOptions.include = includes;
          }
        }

        if (this.returnSingle) {
          const item = await model.findFirst(queryOptions);
          if (!item) {
            return { data: null, error: { message: "Record not found" } };
          }
          return { data: item, error: null };
        }

        if (this.returnMaybeSingle) {
          const item = await model.findFirst(queryOptions);
          return { data: item || null, error: null };
        }

        const list = await model.findMany(queryOptions);
        return { data: list, error: null };
      }

      if (this.action === "insert") {
        if (Array.isArray(this.insertData)) {
          const created = await model.createMany({ data: this.insertData });
          return { data: created, error: null };
        }
        const created = await model.create({ data: this.insertData });
        return { data: created, error: null };
      }

      if (this.action === "update") {
        if (this.whereConditions.id) {
          const updated = await model.update({
            where: { id: this.whereConditions.id },
            data: this.updateData,
          });
          return { data: updated, error: null };
        }
        const updatedMany = await model.updateMany({
          where: this.whereConditions,
          data: this.updateData,
        });
        return { data: updatedMany, error: null };
      }

      if (this.action === "delete") {
        if (this.whereConditions.id) {
          const deleted = await model.delete({
            where: { id: this.whereConditions.id },
          });
          return { data: deleted, error: null };
        }
        const deletedMany = await model.deleteMany({
          where: this.whereConditions,
        });
        return { data: deletedMany, error: null };
      }

      return { data: null, error: { message: "Invalid query action" } };
    } catch (err: any) {
      console.error(`Database error on table "${this.tableName}":`, err);
      return { data: null, error: { message: err.message || "Database error" } };
    }
  }
}

export function getDatabaseClient() {
  return {
    from: (table: string) => new QueryBuilder(table),
    prisma,
  };
}

export const db = getDatabaseClient();
export default db;
