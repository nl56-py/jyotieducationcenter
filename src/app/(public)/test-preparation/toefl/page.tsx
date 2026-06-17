import Link from "next/link";

import "@/styles/toefl.css";

export default function TOEFLPage() {
    return (
        <main>

            {/* Hero */}
            <section className="toefl-hero">
                <div className="toefl-overlay">
                    <div className="hero-line"></div>

                    <div>
                        <h1>TOEFL Preparation Classes</h1>

                        <p>
                            Bridge the gap between local ambition and global
                            opportunity with expert guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Top Layout */}
            <section className="toefl-layout">

                {/* Sidebar */}
                <aside className="toefl-sidebar">

                    <div className="prep-menu">

                        <Link href="/test-preparation/ielts" className="prep-card">
                            IELTS Preparation Classes
                        </Link>

                        <Link href="/test-preparation/pte" className="prep-card">
                            PTE Preparation Classes
                        </Link>

                        <Link
                            href="/test-preparation/toefl"
                            className="prep-card active"
                        >
                            TOEFL Preparation Classes
                        </Link>

                        <Link href="/test-preparation/sat" className="prep-card">
                            SAT Preparation Classes
                        </Link>

                    </div>

                    <img
                        src="/images/generated/toefl.png"
                        alt="Study Abroad"
                        className="sidebar-banner"
                    />

                </aside>

                {/* Right Content */}
                <section className="toefl-info-section">

                    <h2>Why Should Students Choose the TOEFL Exam?</h2>

                    <p>
                        TOEFL (Test of English as a Foreign Language) is one of the most
                        widely recognized English proficiency tests accepted by universities,
                        colleges, and institutions around the world. A strong TOEFL score
                        can improve your chances of admission to top universities and
                        strengthen your study abroad application.
                    </p>

                    <ul className="toefl-benefits">
                        <li>Accepted by More Than 11,000 Institutions Worldwide</li>
                        <li>Recognized in USA, Canada, Australia, UK and Europe</li>
                        <li>Measures Academic English Skills</li>
                        <li>Convenient Internet-Based Testing (iBT)</li>
                        <li>Fast and Reliable Results</li>
                        <li>Enhances University Admission Opportunities</li>
                    </ul>



                </section>

            </section>

            {/* NEW FULL WIDTH SKILLS SECTION */}
            <section className="toefl-skills-section">

                <h2>What Skills Are Assessed in the TOEFL Exam?</h2>

                <p>
                    TOEFL evaluates a student's ability to understand and use English
                    in academic environments. The exam focuses on four essential
                    language skills.
                </p>

                <h3>1. Reading</h3>
                <p>
                    Measures the ability to understand academic passages,
                    identify key ideas, and analyze information.
                </p>

                <h3>2. Listening</h3>
                <p>
                    Assesses understanding of lectures, classroom discussions,
                    and everyday conversations in English.
                </p>

                <h3>3. Speaking</h3>
                <p>
                    Evaluates pronunciation, fluency, and the ability to express
                    ideas clearly in English.
                </p>

                <h3>4. Writing</h3>
                <p>
                    Tests the ability to organize ideas, write essays,
                    and respond effectively to academic tasks.
                </p>

            </section>


            {/* Full Width Section Starts Here */}
            <section className="toefl-overview-section">

                <h2>Why is TOEFL Important?</h2>

                <p>
                    TOEFL scores are accepted by thousands of universities,
                    colleges, and organizations worldwide. A strong TOEFL score
                    demonstrates your ability to communicate effectively in an
                    academic environment and can significantly improve your
                    chances of admission to international institutions.
                </p>

                <p>
                    The exam is designed to measure real-world academic English
                    skills, making it one of the most trusted language
                    proficiency tests for students planning to study abroad.
                </p>


                <h2>TOEFL Exam Overview</h2>

                <p>
                    TOEFL is one of the most widely accepted English language
                    proficiency tests for students planning to study abroad.
                    It evaluates Reading, Listening, Speaking, and Writing
                    skills required for academic success.


                </p>

                <table className="pte-structure-table">
                    <tbody>
                        <tr>
                            <td>Exam Name</td>
                            <td>TOEFL</td>
                        </tr>

                        <tr>
                            <td>Full Form</td>
                            <td>Test of English as a Foreign Language</td>
                        </tr>

                        <tr>
                            <td>Overview</td>
                            <td>
                                TOEFL focuses on academic reading, listening, speaking,
                                and writing skills used in university environments.
                            </td>
                        </tr>

                        <tr>
                            <td>Duration</td>
                            <td>6 Weeks</td>
                        </tr>

                        <tr>
                            <td>Test Format</td>
                            <td>Reading, Listening, Speaking, Writing</td>
                        </tr>

                        <tr>
                            <td>Accepted By</td>
                            <td>Universities and Institutions Worldwide</td>
                        </tr>
                    </tbody>
                </table>

            </section>

        </main>
    );
}