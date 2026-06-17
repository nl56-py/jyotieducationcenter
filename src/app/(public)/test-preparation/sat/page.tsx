import Link from "next/link";

import "@/styles/sat.css";

export default function SATPage() {
    return (<main>


        {/* Hero Section */}
        <section className="sat-hero">
            <div className="sat-overlay">
                <div className="sat-hero-line"></div>

                <div className="sat-content">
                    <h1>SAT Preparation Classes</h1>

                    <p>
                        Achieve your dream university admission with expert SAT
                        preparation and personalized guidance.
                    </p>
                </div>
            </div>
        </section>

        {/* Intro Layout */}
        <section className="toefl-layout">

            <aside>

                <div className="prep-menu">

                    <Link href="/test-preparation/ielts" className="prep-card">
                        IELTS Preparation Classes
                    </Link>

                    <Link href="/test-preparation/pte" className="prep-card">
                        PTE Preparation Classes
                    </Link>

                    <Link href="/test-preparation/toefl" className="prep-card">
                        TOEFL Preparation Classes
                    </Link>

                    <Link
                        href="/test-preparation/sat"
                        className="prep-card active"
                    >
                        SAT Preparation Classes
                    </Link>

                </div>

                <img
                    src="/images/generated/satsidebar.png"
                    alt="Study Abroad"
                    className="sidebar-banner"
                />

            </aside>

            <div>

                <h2>
                    What is SAT and Why is it Important for University Admission?
                </h2>

                <p>
                    SAT Prep means SAT Preparation. It refers to the training,
                    study materials, mock tests, and expert guidance designed
                    to help students succeed in the SAT.
                </p>

                <p>
                    The SAT evaluates a student's skills in Reading, Writing,
                    and Mathematics and is widely used by colleges and
                    universities for undergraduate admissions.
                </p>

                <p>
                    SAT Preparation Classes at EduMark provide comprehensive
                    coaching, updated study resources, and personalized support
                    to help students maximize their scores and achieve their
                    academic goals.
                </p>

                <div className="why-card">

                    <h3>Why Choose EduMark?</h3>

                    <div className="feature">
                        <strong>Experienced SAT Trainers</strong>

                        <p>
                            Learn from highly qualified instructors with years of
                            SAT coaching experience.
                        </p>
                    </div>

                    <div className="feature">
                        <strong>Comprehensive Study Materials</strong>

                        <p>
                            Access updated resources, practice tests, and
                            exam strategies.
                        </p>
                    </div>

                    <div className="feature">
                        <strong>Personalized Guidance</strong>

                        <p>
                            Receive individual feedback and tailored
                            preparation plans.
                        </p>
                    </div>

                </div>

            </div>

        </section>

        {/* Skills Section */}
        <section className="sat-skills-section">

            <h2>Why Should Students Choose the SAT Exam?</h2>

            <p>
                The SAT is one of the most widely accepted standardized tests
                for undergraduate university admissions. A strong SAT score
                can strengthen your application and increase scholarship
                opportunities.
            </p>

            <ul className="sat-benefits">
                <li>Accepted by Top Universities Worldwide</li>
                <li>Scholarship Opportunities</li>
                <li>Digital Exam Format</li>
                <li>Measures College Readiness</li>
                <li>Flexible Test Dates</li>
                <li>Enhances University Applications</li>
            </ul>

            <h2>What Subjects Are Included in the SAT?</h2>

            <p>
                The SAT is designed to evaluate the academic skills necessary
                for success in college and university studies.
            </p>

            <h3>Reading & Writing</h3>

            <p>
                Assesses reading comprehension, grammar, vocabulary in
                context, sentence structure, and analytical skills.
            </p>

            <h3>Mathematics</h3>

            <p>
                Evaluates algebra, advanced mathematics, problem-solving,
                data analysis, and quantitative reasoning skills.
            </p>

        </section>

        {/* Overview Section */}
        <section className="sat-overview-section">

            <h2>SAT Exam Structure Overview</h2>

            <p>
                The SAT consists of two main sections that measure a student's
                readiness for university-level education.
            </p>

            <table className="sat-table">

                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Time Allotted</th>
                        <th>Skills Assessed</th>
                        <th>Score Range</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Reading & Writing</td>
                        <td>64 Minutes</td>
                        <td>Reading, Grammar, Vocabulary, Analysis</td>
                        <td>200–800</td>
                    </tr>

                    <tr>
                        <td>Mathematics</td>
                        <td>70 Minutes</td>
                        <td>Algebra, Advanced Math, Problem Solving</td>
                        <td>200–800</td>
                    </tr>

                    <tr>
                        <td>Total Score</td>
                        <td>Approximately 2 Hours 14 Minutes</td>
                        <td>Combined Performance</td>
                        <td>400–1600</td>
                    </tr>

                </tbody>

            </table>

        </section>

    </main>

    );
}
