
import Link from "next/link";
import "@/styles/ielts.css";

export default function IELTSPage() {
    return (
        <main>

            <section className="ielts-hero">
                <div className="ielts-overlay">
                    <h1>IELTS Preparation Classes</h1>
                    <div className="ielts-breadcrumb">
                        Jyoti Education Corner / IELTS
                    </div>
                </div>
            </section>


            <section className="ielts-layout">


                <aside className="ielts-sidebar">

                    <Link href="/test-preparation/ielts" className="active">
                        IELTS
                    </Link>

                    <Link href="/test-preparation/pte">
                        PTE
                    </Link>

                    <Link href="/test-preparation/toefl">
                        TOEFL
                    </Link>

                    <Link href="/test-preparation/sat">
                        SAT
                    </Link>


                    <img
                        src="/images/generated/ieltssidebar.png"
                        alt="Test Preparation"
                        className="sidebar-banner"
                    />


                </aside>


                <div className="ielts-content">

                    <h2>What Does IELTS Stand For?</h2>

                    <p>
                        The International English Language Testing System (IELTS) is one of the world's most trusted English proficiency tests.
                    </p>


                    <h2>Register Your IELTS Test Booking</h2>

                    <table className="ielts-table">
                        <thead>
                            <tr>
                                <th>Test Type</th>
                                <th>Computer Delivered Fee</th>
                                <th>Additional Information</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>IELTS Academic</td>
                                <td>NPR 27,100</td>
                                <td>Booked via British Council / IDP Nepal</td>
                            </tr>

                            <tr>
                                <td>General Training</td>
                                <td>NPR 27,100</td>
                                <td>Booked via British Council / IDP Nepal</td>
                            </tr>

                            <tr>
                                <td>IELTS for UKVI (Academic/GT)</td>
                                <td>NPR 28,950</td>
                                <td>Required for certain UK visa pathways</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Course Overview</h2>

                    <p>
                        IELTS measures listening, reading, writing, and speaking for academic and
                        migration-focused English requirements.
                    </p>



                    <h2>Why is the IELTS Exam So Important?</h2>

                    <p>
                        More than 10,000 educational institutions in more than 140 countries
                        accept the internationally acclaimed IELTS English language test.
                    </p>

                    <p>
                        It assesses your speaking, listening, reading, and writing abilities
                        and is necessary for studying, working, or moving overseas.
                    </p>

                    <p>
                        With continuous accessibility in over 1,600 test locations, a solid
                        IELTS score opens access to elite colleges and worldwide opportunities.
                    </p>
                </div>

            </section>

            <section className="ielts-types-section">

                <h2>Types of IELTS Exam</h2>

                <p>There are four types of IELTS Exam:</p>

                <ul className="ielts-types-list">
                    <li>IELTS Academic Test (IELTS-A)</li>
                    <li>IELTS General Training Test (IELTS-GT)</li>
                    <li>IELTS Life Skills</li>
                </ul>

                <h3>IELTS Academic Test</h3>
                <p>
                    The purpose of the IELTS Academic Test is to determine if your
                    proficiency in English is sufficient for academic performance in a
                    setting where English is the primary language.
                </p>

                <h3>Key Characteristics</h3>

                <ul className="ielts-characteristics-list">
                    {[
                        "Face-to-face speaking practice",
                        "Band descriptors",
                        "Writing task correction",
                        "Timed reading and listening drills",
                    ].map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <h3>Course Features</h3>

                <ul className="ielts-feature-list">
                    {[
                        "Certified teachers",
                        "Weekly mock tests",
                        "Extra classes for weak students",
                        "Personal feedback",
                    ].map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>

                <h3>IELTS Life Skills</h3>
                <p>
                    IELTS Life Skills evaluates speaking and listening abilities at
                    CEFR levels A1, A2 and B1.
                </p>
            </section>


            <section className="ielts-table-wrapper">
                <h2>Comprehensive Overview of the IELTS Exam</h2>

                <table className="ielts-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Exam Name</td>
                            <td>IELTS</td>
                        </tr>

                        <tr>
                            <td>Full Form</td>
                            <td>International English Language Testing System</td>
                        </tr>

                        <tr>
                            <td>Purpose</td>
                            <td>
                                English proficiency test for non-native speakers planning
                                to study, work, or migrate abroad.
                            </td>
                        </tr>

                        <tr>
                            <td>Duration</td>
                            <td>
                                6 to 8 weeks
                            </td>
                        </tr>

                        <tr>
                            <td>Types of IELTS Exam</td>
                            <td>
                                IELTS Academic, IELTS General Training,
                                IELTS for UKVI, IELTS Life Skills.
                            </td>
                        </tr>

                        <tr>
                            <td>Conducted By</td>
                            <td>British Council and IDP Education</td>
                        </tr>

                        <tr>
                            <td>Exam Format</td>
                            <td>
                                Listening,
                                Reading,
                                Writing,
                                Speaking

                            </td>
                        </tr>

                        <tr>
                            <td>Module</td>
                            <td>
                                Listening labs,<br />
                                Speaking rooms, <br />
                                Writing correction, <br />
                                Mock tests
                            </td>
                        </tr>

                        <tr>
                            <td>Score Range</td>
                            <td>Band-focused preparation</td>
                        </tr>
                    </tbody>
                </table>
            </section>



        </main >
    );
}