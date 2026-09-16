import { notFound } from "next/navigation";
import { testCourses } from "@/data/testCourses";
import { TestCoursePage } from "@/views/TestCoursePage";
import { getTestPrepData } from "@/lib/services/testprep";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return testCourses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function TestCourseRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let course = testCourses.find((c) => c.slug === slug);

  if (!course && (slug === "jlpt" || slug === "japanese-jlpt")) {
    course = testCourses.find((c) => c.slug === "japanese-jlpt" || c.slug === "jlpt");
  }

  const prepData = await getTestPrepData(slug);

  if (!course && !prepData.id) {
    notFound();
  }

  const mergedCourse = {
    ...(course || {
      name: prepData.name,
      slug: prepData.slug,
      fullName: prepData.name,
      score: "Level Preparation",
      overview: prepData.summary,
      types: prepData.testCosts.map((t) => t.type),
      characteristics: [],
      format: [],
      modules: [],
      features: prepData.features,
    }),
    duration: prepData.duration || course?.duration,
    cost: prepData.cost,
    officialTestFee: prepData.officialTestFee,
    testCosts: prepData.testCosts,
    features: prepData.features && prepData.features.length > 0 ? prepData.features : course?.features,
  };

  return <TestCoursePage course={mergedCourse} />;
}
