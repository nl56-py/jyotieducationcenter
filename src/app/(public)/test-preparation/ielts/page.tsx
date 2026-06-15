
import Link from "next/link";

export default function IELTSPage() {
    return (
        <main>

            <section className="ielts-hero">
                <div className="ielts-overlay">
                    <h1>IELTS Preparation Classes</h1>
                    <div className="ielts-breadcrumb">
                        EduMark Education Consultancy / IELTS
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
                                <th>Paper Based</th>
                                <th>Computer Based</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>IELTS Academic & General Training</td>
                                <td>NPR something</td>
                                <td>NPR something</td>
                            </tr>

                            <tr>
                                <td>IELTS UKVI</td>
                                <td>NPR something</td>
                                <td>NPR something</td>
                            </tr>
                        </tbody>
                    </table>


                    <h2>IELTS Exam Cancellation Policy</h2>

                    <ul>
                        <li>75% refund if cancelled more than 14 days before test date.</li>
                        <li>50% refund if cancelled within 14 days.</li>
                        <li>25% refund if cancelled 1-2 days before test.</li>
                    </ul>


                    <h2>IELTS Rescheduling Policy</h2>

                    <p>
                        You may request rescheduling at least five weeks before the exam date.
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
                    <li>IELTS for UKVI</li>
                    <li>IELTS Life Skills</li>
                </ul>

                <h3>IELTS Academic Test</h3>
                <p>
                    The purpose of the IELTS Academic Test is to determine if your
                    proficiency in English is sufficient for academic performance in a
                    setting where English is the primary language.
                </p>

                <h3>IELTS General Training Test</h3>
                <p>
                    The purpose of the IELTS General Training Test is to evaluate your
                    everyday English proficiency for use in the workplace and migration.
                </p>

                <h3>IELTS for UKVI</h3>
                <p>
                    IELTS for UKVI is approved by the UK government for visa and
                    immigration applications.
                </p>

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
                            <td>Recognition</td>
                            <td>
                                Accepted in 140+ countries including the UK, Australia,
                                New Zealand, USA, and Canada.
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
                            <td>Paper-based and Computer-based</td>
                        </tr>

                        <tr>
                            <td>Exam Fee in Nepal</td>
                            <td>
                                Paper-based: NPR 36,200 <br />
                                Computer-based: NPR 33,000
                            </td>
                        </tr>

                        <tr>
                            <td>Score Range</td>
                            <td>Band scores from 1 to 9</td>
                        </tr>
                    </tbody>
                </table>
            </section>



        </main >
    );
}