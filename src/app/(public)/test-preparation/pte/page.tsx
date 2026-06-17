import Link from "next/link";

import "@/styles/pte.css";

export default function PTEPage() {
    return (
        <main>

            <section className="pte-hero">
                <div className="pte-overlay">
                    <h1>PTE Preparation Classes</h1>

                    <div className="pte-breadcrumb">
                        EduMark Education Consultancy / PTE
                    </div>
                </div>
            </section>


            <section className="pte-layout">

                <aside className="pte-sidebar">
                    <Link href="/test-preparation/ielts">
                        IELTS Preparation Classes
                    </Link>

                    <Link
                        href="/test-preparation/pte"
                        className="active"
                    >
                        PTE Preparation Classes
                    </Link>

                    <Link href="/test-preparation/toefl">
                        TOEFL Preparation Classes
                    </Link>

                    <Link href="/test-preparation/sat">
                        SAT Preparation Classes
                    </Link>

                    <img
                        src="/images/generated/ptesidebar.png"
                        alt="PTE Classes"
                        className="sidebar-banner"
                    />
                </aside>


                <div className="pte-content">
                    <h2>
                        What is PTE and why is it Gaining Popularity among Students?
                    </h2>

                    <p>
                        Pearson Test of English (PTE Academic) is a computer-based
                        English proficiency test accepted by universities, colleges,
                        and governments around the world. It evaluates Speaking,
                        Writing, Reading, and Listening skills using AI-based
                        scoring technology.
                    </p>

                    <p>
                        Students prefer PTE because of its fast results, flexible
                        test dates, and fair computer-based assessment system.
                    </p>

                    <h2>PTE Academic Exam Highlights</h2>

                    <table className="pte-table">
                        <tbody>
                            <tr>
                                <td>Exam Name</td>
                                <td>PTE</td>
                            </tr>

                            <tr>
                                <td>Full Form</td>
                                <td>Pearson Test of English</td>
                            </tr>

                            <tr>
                                <td>Purpose</td>
                                <td>
                                    English proficiency test for study, work, and migration.
                                </td>
                            </tr>

                            <tr>
                                <td>Accepted In</td>
                                <td>
                                    Australia, UK, USA, Canada, New Zealand and more.
                                </td>
                            </tr>

                            <tr>
                                <td>Exam Format</td>
                                <td>
                                    Speaking • Writing • Reading • Listening • Integrated tasks
                                </td>
                            </tr>

                            <tr>
                                <td>Conducted by</td>
                                <td>Pearson PLC Group</td>
                            </tr>

                            <tr>
                                <td>
                                    Official Website
                                </td>
                                <td>
                                    <a href="https://www.pearsonpte.com/">
                                        https://www.pearsonpte.com/</a>
                                </td>
                            </tr>

                            <tr>
                                <td>Duration</td>
                                <td>4 to 6 weeks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>


            <section className="pte-info-section">
                <h2>
                    Why Should Nepalese Students Choose the PTE Exam?
                </h2>

                <p>
                    The Pearson Test of English (PTE) is a great choice if you
                    intend to study or relocate overseas. The PTE test is
                    growing in popularity among Nepalese students for the
                    following strong reasons:
                </p>

                <ul className="pte-benefits">
                    <li>Recognized World-Wide</li>
                    <li>Flexible Test Dates and Locations</li>
                    <li>Accurate and Fair Scoring</li>
                    <li>Easy Access to Preparation</li>
                    <li>Unlimited Score Submission</li>
                    <li>Accepted for Visa Applications</li>
                </ul>

                <h2>What Are the Types of PTE Exams?</h2>

                <p>
                    The Pearson Test of English (PTE) is a highly respected
                    English language proficiency test accepted by universities
                    and institutions worldwide. It evaluates English skills for
                    academic, professional, and immigration purposes.
                </p>

                <p>
                    There are three major types of PTE examinations:
                </p>

                <h3>1. PTE Academic</h3>

                <p>
                    The most popular version of the PTE exam. It is intended
                    for students wishing to study abroad and for immigration
                    purposes. It assesses Speaking, Writing, Reading and
                    Listening skills.
                </p>

                <h3>PTE UKVI</h3>

                <p>
                    PTE UKVI (Pearson Test of English for UK Visas and Immigration) is a
                    Secure English Language Test (SELT) approved by the UK Home Office.
                    It is accepted for various UK visa and immigration applications,
                    including study, work, and settlement routes. The test follows the
                    same computer-based format as PTE Academic but is conducted in
                    approved UKVI test centers and includes additional security measures.
                </p>
            </section>
            <h2>PTE Academic Exam: Structure Overview</h2>

            <p>
                The three primary components of the PTE Academic exam are each intended
                to assess a distinct facet of your English language competency. Below is
                a summary of every section:
            </p>

            <table className="pte-structure-table">
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
                        <td>Speaking & Writing</td>
                        <td>54–67 Minutes</td>
                        <td>Spoken fluency and written communication</td>
                        <td>10–90 points</td>
                    </tr>

                    <tr>
                        <td>Reading</td>
                        <td>29–30 Minutes</td>
                        <td>Reading comprehension and analysis</td>
                        <td>10–90 points</td>
                    </tr>

                    <tr>
                        <td>Listening</td>
                        <td>30–43 Minutes</td>
                        <td>Listening to spoken English (audio clips)</td>
                        <td>10–90 points</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}