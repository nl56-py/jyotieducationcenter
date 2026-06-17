import { notFound } from "next/navigation";
import { testCourses } from "@/data/testCourses";
import { TestCoursePage } from "@/views/TestCoursePage";

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
  const course = testCourses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <TestCoursePage course={course} />;
}
