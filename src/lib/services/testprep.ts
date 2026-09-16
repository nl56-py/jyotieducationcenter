import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface TestCostItem {
  type: string;
  fee: string;
  prep_fee?: string;
  info: string;
}

export interface TestPrepData {
  id?: string;
  name: string;
  slug: string;
  summary: string;
  duration: string;
  cost: string;
  officialTestFee: string;
  testCosts: TestCostItem[];
  features: string[];
}

export const defaultTestPrepFallbacks: Record<string, TestPrepData> = {
  ielts: {
    slug: "ielts",
    name: "IELTS Preparation Classes",
    summary: "IELTS measures listening, reading, writing, and speaking for academic and migration-focused English requirements.",
    duration: "6 to 8 weeks",
    cost: "Rs. 8,000",
    officialTestFee: "NPR 27,100",
    testCosts: [
      { type: "IELTS Academic", fee: "NPR 27,100", prep_fee: "Rs. 8,000", info: "Booked via British Council / IDP Nepal" },
      { type: "General Training", fee: "NPR 27,100", prep_fee: "Rs. 8,000", info: "Booked via British Council / IDP Nepal" },
      { type: "IELTS for UKVI (Academic/GT)", fee: "NPR 28,950", prep_fee: "Rs. 8,000", info: "Required for certain UK visa pathways" },
    ],
    features: ["Certified teachers", "Weekly mock tests", "Extra classes for weak students", "Personal feedback"],
  },
  pte: {
    slug: "pte",
    name: "PTE Preparation Classes",
    summary: "PTE is a computer-based academic English test where fluency, pronunciation, and timing matter heavily.",
    duration: "4 to 6 weeks",
    cost: "Rs. 8,000",
    officialTestFee: "NPR 30,000",
    testCosts: [
      { type: "PTE Academic", fee: "NPR 30,000", prep_fee: "Rs. 8,000", info: "Conducted by Pearson PLC Group" },
      { type: "PTE UKVI", fee: "NPR 30,500", prep_fee: "Rs. 8,000", info: "Approved SELT for UK Visa and Immigration" },
    ],
    features: ["AI scoring simulator", "Speaking templates", "Daily lab practice", "Repeat sentence drills"],
  },
  toefl: {
    slug: "toefl",
    name: "TOEFL Preparation Classes",
    summary: "TOEFL focuses on academic reading, listening, speaking, and writing used in university environments.",
    duration: "6 Weeks",
    cost: "Rs. 8,500",
    officialTestFee: "NPR 28,000 (~$205 USD)",
    testCosts: [
      { type: "TOEFL iBT", fee: "NPR 28,000 (~$205 USD)", prep_fee: "Rs. 8,500", info: "Booked via ETS authorized testing centers in Nepal" },
    ],
    features: ["Academic lecture practice", "Integrated speaking tasks", "Essay evaluation", "Listening drills"],
  },
  sat: {
    slug: "sat",
    name: "SAT Preparation Classes",
    summary: "SAT preparation supports students targeting undergraduate admission and scholarship opportunities.",
    duration: "8 to 10 Weeks",
    cost: "Rs. 10,000",
    officialTestFee: "NPR 15,500 (~$111 USD)",
    testCosts: [
      { type: "Digital SAT", fee: "NPR 15,500 (~$111 USD)", prep_fee: "Rs. 10,000", info: "Booked directly via College Board website" },
    ],
    features: ["Math shortcuts", "Reading comprehension", "Desmos graphing", "Full digital mock tests"],
  },
  jlpt: {
    slug: "jlpt",
    name: "Japanese Language (JLPT / NAT)",
    summary: "Comprehensive Japanese language instruction and JLPT/NAT-TEST preparation classes designed for students aiming to study in Japan.",
    duration: "16 Weeks",
    cost: "Rs. 12,000",
    officialTestFee: "NPR 4,000",
    testCosts: [
      { type: "JLPT (N5/N4)", fee: "NPR 4,000", prep_fee: "Rs. 12,000", info: "Japanese Language Proficiency Test" },
      { type: "NAT-TEST", fee: "NPR 4,500", prep_fee: "Rs. 12,000", info: "Recognized for Japanese Student Visa" },
    ],
    features: ["Certified native teachers", "JLPT N5/N4 syllabus", "Weekly audio drills", "Visa interview coaching"],
  },
  "japanese-jlpt": {
    slug: "japanese-jlpt",
    name: "Japanese Language (JLPT / NAT)",
    summary: "Comprehensive Japanese language instruction and JLPT/NAT-TEST preparation classes designed for students aiming to study in Japan.",
    duration: "16 Weeks",
    cost: "Rs. 12,000",
    officialTestFee: "NPR 4,000",
    testCosts: [
      { type: "JLPT (N5/N4)", fee: "NPR 4,000", prep_fee: "Rs. 12,000", info: "Japanese Language Proficiency Test" },
      { type: "NAT-TEST", fee: "NPR 4,500", prep_fee: "Rs. 12,000", info: "Recognized for Japanese Student Visa" },
    ],
    features: ["Certified native teachers", "JLPT N5/N4 syllabus", "Weekly audio drills", "Visa interview coaching"],
  },
};

export async function getTestPrepData(slug: string): Promise<TestPrepData> {
  const fallback = defaultTestPrepFallbacks[slug] || defaultTestPrepFallbacks["ielts"];

  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      let query = supabase.from("test_preparations").select("*");
      if (slug === "japanese-jlpt" || slug === "jlpt") {
        query = query.in("slug", ["jlpt", "japanese-jlpt"]);
      } else {
        query = query.eq("slug", slug);
      }

      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        const format = data.format || {};
        const rawCosts = Array.isArray(format.test_costs) ? format.test_costs : [];
        const testCosts: TestCostItem[] = rawCosts.length > 0 
          ? rawCosts.map((c: any) => ({
              type: c.type || "",
              fee: c.fee || "",
              prep_fee: c.prep_fee || format.cost || fallback.cost,
              info: c.info || "",
            }))
          : fallback.testCosts;

        return {
          id: data.id,
          name: data.name || fallback.name,
          slug: data.slug || slug,
          summary: data.summary || fallback.summary,
          duration: format.duration || fallback.duration,
          cost: format.cost || fallback.cost,
          officialTestFee: format.official_test_fee || fallback.officialTestFee,
          testCosts,
          features: Array.isArray(data.features) && data.features.length > 0 ? data.features : fallback.features,
        };
      }
    }
  } catch (err) {
    console.error(`Error fetching test prep data for ${slug}:`, err);
  }

  return fallback;
}

export async function getAllTestPreps(): Promise<Record<string, TestPrepData>> {
  const result: Record<string, TestPrepData> = { ...defaultTestPrepFallbacks };
  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase.from("test_preparations").select("*");
      if (!error && data) {
        for (const item of data) {
          const format = item.format || {};
          const fallback = defaultTestPrepFallbacks[item.slug] || defaultTestPrepFallbacks["ielts"];
          const rawCosts = Array.isArray(format.test_costs) ? format.test_costs : [];
          const testCosts: TestCostItem[] = rawCosts.length > 0 
            ? rawCosts.map((c: any) => ({
                type: c.type || "",
                fee: c.fee || "",
                prep_fee: c.prep_fee || format.cost || fallback.cost,
                info: c.info || "",
              }))
            : fallback.testCosts;

          result[item.slug] = {
            id: item.id,
            name: item.name,
            slug: item.slug,
            summary: item.summary || fallback.summary,
            duration: format.duration || fallback.duration,
            cost: format.cost || fallback.cost,
            officialTestFee: format.official_test_fee || fallback.officialTestFee,
            testCosts,
            features: Array.isArray(item.features) && item.features.length > 0 ? item.features : fallback.features,
          };
        }
      }
    }
  } catch (err) {
    console.error("Error fetching all test preps:", err);
  }
  return result;
}
