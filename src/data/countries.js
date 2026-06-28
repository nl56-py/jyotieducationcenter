export const countries = [
  {
    code: "UK",
    name: "United Kingdom",
    slug: "uk",
    region: "English Speaking",
    accent: "#e9262d",
    intake: "September, January, May",
    cost: "NPR 35 Lakh to 40 Lakh",
    programs: "Business Management, MBA, Engineering, Data Science, Healthcare",
    universities: ["University of West of Scotland", "BPP University London", "Arden University", "Birmingham City University"],
    highlight: "Scholarship and CAS support for university pathways.",
    why: [
      "Shorter degree routes (1-year Master's, 3-year Bachelor's)",
      "High academic standards from world-renowned institutions",
      "2-year Graduate Route post-study work visa",
      "Large and welcoming Nepali student community"
    ],
    visa: ["CAS and offer review", "Finance and source-of-fund check", "Interview practice", "Pre-departure briefing"],
    faq: [
      ["Why should I choose the UK for my higher education?", "The UK offers world-class qualifications that are globally recognized. Shorter degree durations (typically 1 year for Master's and 3 years for Bachelor's) mean you save on both tuition and living costs while starting your career sooner."],
      ["Is IELTS mandatory for studying in the UK?", "While IELTS is the most popular English test, many UK universities also accept PTE Academic, TOEFL iBT, or even offer IELTS waivers based on high English marks in your high school (+2) board exams. We will check the specific requirements for your profile."],
      ["What is the Post-Study Work (PSW) visa in the UK?", "The Graduate Route allows international graduates to live and work in the UK for up to 2 years (3 years for PhD graduates) after completing their degree, without requiring a company sponsorship upfront."],
      ["How much bank balance is required to apply for a UK student visa?", "You must show tuition fees for the first year plus living expenses of £12,006 (for study in London) or £9,207 (for study outside London). These funds must be held in a bank account in your name or your parents' names for at least 28 consecutive days."]
    ],
    introCopy: [
      "The United Kingdom is a global education powerhouse, hosting some of the oldest and most prestigious universities in the world. For Nepali students, the UK offers an unparalleled blend of academic history, cutting-edge research, and modern industry connections.",
      "One of the biggest advantages of studying in the UK is the speed of education. Bachelor's degrees are typically completed in three years, and Master's degrees take just one year, reducing your overall tuition fees and living costs.",
      "Furthermore, the UK's Graduate Route (PSW) offers a fantastic opportunity to kickstart your international career, allowing you to work or look for work for up to two years after graduation."
    ],
    coursesList: [
      {
        title: "1. Business Administration & MBA",
        description: "UK business schools are globally accredited and feature strong connections with European financial hubs. Programs focus on global commerce, entrepreneurship, and leadership."
      },
      {
        title: "2. Data Science & Artificial Intelligence",
        description: "With high demand for tech professionals, UK universities offer advanced degrees in machine learning, big data analysis, and software development, backed by state-of-the-art laboratory facilities."
      },
      {
        title: "3. Engineering & Technology",
        description: "From civil and mechanical to aerospace engineering, UK degrees are internationally accredited and heavily oriented around practical industry placements."
      },
      {
        title: "4. Healthcare & Public Health",
        description: "The UK's NHS system aligns closely with university programs, offering nursing, public health, and administration students exceptional clinical exposure and post-study career pathways."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: Minimum 60% (GPA 2.4+) in high school (+2) board exams. Postgraduate: Minimum 55% or GPA 2.75+ in a relevant Bachelor's degree.",
      english: "IELTS overall 6.0 (no band less than 5.5) for Bachelor's; 6.5 (no band less than 6.0) for Master's. Equivalent scores in PTE Academic (50-58) are widely accepted.",
      financial: "Evidence of first-year tuition fees plus living expenses (£9,207 outside London, £12,006 inside London) held in a recognized bank account for a minimum of 28 consecutive days.",
      genuine: "The UK government utilizes a Genuine Student assessment. You must show genuine intent, write a convincing Statement of Purpose (SOP), and pass university/credibility interviews to secure your CAS."
    },
    intakesList: [
      {
        title: "Autumn Intake",
        period: "September / October",
        deadline: "April to July",
        desc: "The primary academic intake offering the widest selection of courses, campuses, and scholarship options."
      },
      {
        title: "Spring Intake",
        period: "January / February",
        deadline: "August to November",
        desc: "The second major intake, highly popular for business, computing, and management studies."
      },
      {
        title: "Summer Intake",
        period: "May / June",
        deadline: "December to February",
        desc: "A smaller intake offered by select institutions, ideal for accelerated programs and pathway routes."
      }
    ],
    costsList: [
      {
        category: "Undergraduate Tuition",
        range: "£12,000 – £20,000 / year",
        desc: "Varies by course type (classroom vs. laboratory-based) and university ranking."
      },
      {
        category: "Postgraduate Tuition",
        range: "£13,000 – £25,000 / year",
        desc: "Master's degrees are only 1 year in length, keeping the total tuition cost highly competitive."
      },
      {
        category: "Living Expenses",
        range: "£9,200 – £12,000 / year",
        desc: "Covers accommodation, food, travel, and personal utilities. London is significantly higher."
      },
      {
        category: "Immigration Health Surcharge (IHS)",
        range: "£776 / year",
        desc: "Mandatory fee that grants you full access to the UK's National Health Service (NHS) for free medical care."
      }
    ],
    scholarshipsList: [
      {
        name: "Chevening Scholarships",
        details: "The UK government's global scholarship program, covering full tuition fees, monthly living allowances, return airfares, and visa fees for postgraduate courses."
      },
      {
        name: "GREAT Scholarships",
        details: "Jointly funded by the UK government and participating universities, offering a minimum of £10,000 towards one-year postgraduate tuition."
      },
      {
        name: "Commonwealth Scholarships",
        details: "Aimed at high-achieving students from developing commonwealth countries, covering tuition and living allowances for Master's and PhD studies."
      },
      {
        name: "University Merit Scholarships",
        details: "Direct fee waivers offered by individual universities during the offer stage, ranging from £1,500 to £5,000 based on your academic GPA."
      }
    ],
    universitiesDetail: [
      {
        name: "University of the West of Scotland (UWS)",
        description: "A leading modern university in Scotland known for practical learning, industry links, and a welcoming international community.",
        fees: "£15,500 - £18,000 / year",
        courses: "Computing, Business Administration, Public Health, Nursing",
        image: "/images/extracted_uni/page_3_img_3.png"
      },
      {
        name: "BPP University London",
        description: "A specialist provider of professional education, focusing on law, business, finance, technology, and health careers.",
        fees: "£16,700 - £18,100 / year",
        courses: "Law (SQE, LPC), Professional MBA, ACCA, Management",
        image: "/images/extracted_uni/page_3_img_4.png"
      },
      {
        name: "Arden University",
        description: "Known for flexible study schedules, blending online and face-to-face learning across modern campuses in London, Birmingham, and Berlin.",
        fees: "£12,000 - £17,500 / year",
        courses: "Business Management, Healthcare Management, Computing, MBA",
        image: "/images/extracted_uni/page_3_img_5.png"
      },
      {
        name: "Birmingham City University (BCU)",
        description: "A vibrant, student-centered institution located in the heart of Birmingham with state-of-the-art facilities and a strong focus on employability.",
        fees: "£16,085 - £17,710 / year",
        courses: "Data Science, Media and Communication, Art and Design, MBA",
        image: "/images/extracted_uni/page_3_img_6.png"
      }
    ]
  },
  {
    code: "US",
    name: "United States",
    slug: "usa",
    region: "English Speaking",
    accent: "#2457a6",
    intake: "August, January",
    cost: "NPR 20 Lakh to 40 Lakh",
    programs: "Computer Science, Business Analytics, Data Science, Engineering, IT, Management",
    universities: ["University of Findlay", "Herzing University", "Weber State University", "Wichita State University"],
    highlight: "Profile building and interview preparation for F-1 visa routes.",
    why: [
      "Flexible curriculum allowing you to switch majors or customize degrees",
      "STEM designation offering up to 3 years of post-study work (OPT)",
      "Unmatched research facilities and funding opportunities",
      "High availability of merit-based university scholarships and assistantships"
    ],
    visa: ["I-20 planning", "SEVIS and DS-160 guidance", "F-1 interview coaching", "Financial document review"],
    faq: [
      ["Is SAT or GRE mandatory for US universities?", "Many US universities are 'test-optional' or 'test-blind' for admissions. However, having a good SAT score can significantly improve your chances of getting high-value merit scholarships, while a GRE score can aid in securing graduate assistantships."],
      ["What is the F-1 visa interview like?", "The F-1 student visa interview is a face-to-face conversation at the US Embassy in Kathmandu. It lasts 2-3 minutes. You must demonstrate strong academic intent, solid financial backing, and clear ties back to Nepal. EduMark conducts rigorous mock interviews to build your confidence."],
      ["Can I work in the US on a student visa?", "Yes, F-1 visa holders can work on-campus for up to 20 hours per week during academic semesters and full-time (40 hours per week) during holidays and breaks."],
      ["What is OPT and STEM OPT?", "Optional Practical Training (OPT) allows you to work in your field of study for 12 months after graduation. If your degree is STEM-designated (Science, Technology, Engineering, or Math), you can apply for a 24-month extension, giving you 3 years of work rights in the US."]
    ],
    introCopy: [
      "The United States remains the top destination for global education, hosting the majority of the world's highest-ranking universities. Known for technological innovation, academic flexibility, and multicultural campuses, the US offers a transformative study experience.",
      "In the US, you are not locked into one field from day one. The system encourages students to explore different subjects, declare majors later, and customize their curriculum to match their career aspirations.",
      "Nepali students especially benefit from the STEM (Science, Technology, Engineering, and Math) extension, which grants graduates up to three years of post-study work rights in the country's booming job market."
    ],
    coursesList: [
      {
        title: "1. Computer Science & Cybersecurity",
        description: "The US is the home of tech giants. Degrees offer cutting-edge knowledge in AI, cloud computing, and cybersecurity, with direct access to Silicon Valley and tech hubs."
      },
      {
        title: "2. Business Analytics & Finance",
        description: "STEM-accredited business degrees merge statistical analysis, data modeling, and management science to prepare you for high-paying corporate roles."
      },
      {
        title: "3. Engineering & Aerospace",
        description: "With advanced labs and corporate partnerships, US engineering programs offer practical experience and research funding in aerospace, mechanics, and electronics."
      },
      {
        title: "4. Healthcare & Biotechnology",
        description: "Degrees in biology, pharmaceutical sciences, and healthcare administration place you at the forefront of global medical research and public health management."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: GPA of 2.5+ (60% equivalent) in high school (+2). Graduate: CGPA of 2.75+ in a 4-year Bachelor's degree (or 3-year degree with post-grad qualification).",
      english: "IELTS 6.0 to 6.5, TOEFL iBT 79+, or Duolingo English Test (DET) score of 105 to 115. Some institutions offer conditional admission if you take language classes first.",
      financial: "You must demonstrate enough liquid funds (bank balance, certificates, education loans) to cover the first year's tuition and living costs as stated on your I-20 form.",
      genuine: "The US Embassy assesses your F-1 non-immigrant intent. You must show that you are a genuine student, have a clear study plan, and possess strong financial and family ties to return to Nepal."
    },
    intakesList: [
      {
        title: "Fall Intake",
        period: "August / September",
        deadline: "December to April",
        desc: "The largest and most important intake. Offers the most scholarships, assistantships, and course selections."
      },
      {
        title: "Spring Intake",
        period: "January / February",
        deadline: "July to October",
        desc: "The second major intake. Ideal for students who need more time to prepare test scores and documentation."
      },
      {
        title: "Summer Intake",
        period: "May / June",
        deadline: "January to March",
        desc: "Limited availability. Primarily used for English pathway programs, transfers, or specialized short courses."
      }
    ],
    costsList: [
      {
        category: "Tuition Fees (Undergraduate)",
        range: "$15,000 – $35,000 / year",
        desc: "Public universities and state colleges generally offer more affordable tuition than private universities."
      },
      {
        category: "Tuition Fees (Postgraduate)",
        range: "$18,000 – $40,000 / year",
        desc: "Highly variable depending on the university rank and professional nature of the program (e.g., MBA)."
      },
      {
        category: "Living Expenses",
        range: "$10,000 – $18,000 / year",
        desc: "Covers on-campus housing or off-campus shared apartments, food, utilities, and transport."
      },
      {
        category: "Student Health Cover",
        range: "$1,500 – $3,000 / year",
        desc: "Mandatory health insurance provided by the university or an approved third-party provider."
      }
    ],
    scholarshipsList: [
      {
        name: "Fulbright Student Program",
        details: "Highly prestigious bi-national program covering full tuition, living expenses, textbooks, airfare, and health insurance for Master's/PhD programs."
      },
      {
        name: "University Merit Scholarships",
        details: "Direct tuition fee waivers granted by universities at the time of admission, based on your high school GPA, SAT score, or undergraduate CGPA."
      },
      {
        name: "Graduate Assistantships (GA/TA/RA)",
        details: "Offered to Master's and PhD students. Covers full or partial tuition fees in exchange for part-time teaching, research, or administrative duties, plus a monthly stipend."
      },
      {
        name: "Humphrey Fellowship Program",
        details: "A year-long professional development program for mid-career professionals, covering full travel, tuition, and living costs."
      }
    ],
    universitiesDetail: [
      {
        name: "University of Findlay",
        description: "A private university in Findlay, Ohio, recognized for its excellent animal science, equestrian studies, business, and health professions programs.",
        fees: "$38,630 - $39,900 / year",
        courses: "Animal Science, Pharmacy, MBA, Environmental Safety",
        image: "/images/extracted_uni/page_3_img_15.png"
      },
      {
        name: "Herzing University",
        description: "A career-focused private university with customizable online and on-campus degree paths in nursing, healthcare management, and IT.",
        fees: "$13,450 - $18,000 / year",
        courses: "Nursing, Healthcare Administration, Cybersecurity, MBA",
        image: "/images/extracted_uni/page_3_img_16.png"
      },
      {
        name: "Weber State University",
        description: "A public university in Ogden, Utah, offering a comprehensive range of undergraduate degrees and professional certifications.",
        fees: "$15,500 - $16,500 / year",
        courses: "Engineering Technology, Business Admin, Health Professions",
        image: "/images/extracted_uni/page_3_img_17.png"
      },
      {
        name: "Wichita State University",
        description: "A public research university in Wichita, Kansas, known for its National Institute for Aviation Research and strong industry ties.",
        fees: "$15,500 - $18,000 / year",
        courses: "Aerospace Engineering, Business Analytics, Computer Science",
        image: "/images/extracted_uni/page_3_img_18.png"
      }
    ]
  },
  {
    code: "AU",
    name: "Australia",
    slug: "australia",
    region: "English Speaking",
    accent: "#00a7d8",
    intake: "February, July, November",
    cost: "NPR 30 Lakh to 40 Lakh",
    programs: "Nursing, IT, Business, Engineering, Hospitality",
    universities: ["University of Canberra College", "Australian Catholic University", "Southern Cross University", "AIBT"],
    highlight: "Course mapping with transparent GTE and financial guidance.",
    why: [
      "Practical-oriented educational model with strong emphasis on internships",
      "High demand and post-study opportunities for nursing and hospitality routes",
      "Flexible three-intake calendar per academic year",
      "Excellent student protection laws under the ESOS framework"
    ],
    visa: ["GTE story planning", "COE and offer tracking", "OSHC guidance", "Financial and sponsor document check"],
    faq: [
      ["What is the ESOS Act in Australia?", "The Education Services for Overseas Students (ESOS) Act protects the rights of international students, ensuring tuition protection, quality learning, and accurate information from providers."],
      ["Which English proficiency tests are accepted for Australia?", "IELTS and PTE Academic are the most widely accepted tests for both Australian admissions and student visa processing. Pearson Test of English (PTE) is especially popular among Nepali applicants."],
      ["What is the Genuine Student (GS) / GST requirement?", "The Genuine Student (GS) assessment requires applicants to prove they are visiting Australia temporarily for high-quality education. It involves evaluating your previous study, visa history, financial capacity, and study objectives."],
      ["Can I get a post-study work visa in Australia?", "Yes. The Temporary Graduate Visa (Subclass 485) allows graduates of Bachelor's (2 years) and Master's (2-3 years) programs to live, study, and work in Australia post-graduation."]
    ],
    introCopy: [
      "Australia is a premier global study destination, hosting top-tier institutions, vibrant multicultural cities, and pristine natural landscapes. The country stands out for its practical approach to learning, focusing heavily on industry readiness and real-world experience.",
      "Nepali students find a highly welcoming environment in Australia, backed by strong community networks and university support services. The student protection laws ensure that your investment in education is safe and recognized.",
      "With flexible post-study work rights and regional campus incentives (which offer lower living costs and visa benefits), Australia offers a clear pathway to achieving your academic and professional goals."
    ],
    coursesList: [
      {
        title: "1. Nursing & Midwifery",
        description: "Highly sought after and accredited by the Australian Nursing and Midwifery Accreditation Council. Programs integrate theoretical coursework with intensive clinical placements in public and private hospitals."
      },
      {
        title: "2. Information Technology & Cybersecurity",
        description: "Aligned with Australia's digital transformation. Degrees focus on artificial intelligence, software engineering, cloud architecture, and database networks."
      },
      {
        title: "3. Business, Commerce & Finance",
        description: "Accredited by major accounting and management bodies. Offers specialization in international trade, entrepreneurship, auditing, and corporate finance."
      },
      {
        title: "4. Hospitality & Commercial Cookery",
        description: "Combines academic management training with hands-on kitchen and hotel experience. Graduates are in high demand in Australia's booming tourism and leisure sector."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: Minimum 60% (GPA 2.8+ out of 4.0) in high school (+2). Postgraduate: Minimum 55% or CGPA of 2.75+ in a Bachelor's degree from a recognized institution.",
      english: "Undergraduate: IELTS overall 6.0 (no band less than 5.5) or PTE Academic 50+. Postgraduate: IELTS overall 6.5 (no band less than 6.0) or PTE Academic 58+.",
      financial: "You must demonstrate funds to cover 1 year of tuition fees, 1 year of living costs (A$29,710 for primary applicant), and A$2,000 for travel. Acceptable sponsors are parents and siblings.",
      genuine: "The Genuine Student (GS) / GST statement must clearly articulate your career goals, why you chose Australia, how the course aligns with your past studies, and your intention to return home."
    },
    intakesList: [
      {
        title: "Semester 1 Intake",
        period: "February / March",
        deadline: "September to November (Previous Year)",
        desc: "The primary and largest intake. Almost all universities and courses are open during this time."
      },
      {
        title: "Semester 2 Intake",
        period: "July / August",
        deadline: "January to April (Same Year)",
        desc: "The mid-year intake. Highly popular, offering excellent course selections and scholarship entries."
      },
      {
        title: "Trimester 3 Intake",
        period: "November / December",
        deadline: "May to July (Same Year)",
        desc: "Offered by select universities and colleges. Ideal for fast-track business and computing pathways."
      }
    ],
    costsList: [
      {
        category: "Undergraduate Tuition",
        range: "A$20,000 – A$45,000 / year",
        desc: "Varies depending on whether you choose a regional university or a top-ranked metropolitan campus."
      },
      {
        category: "Postgraduate Tuition",
        range: "A$22,000 – A$50,000 / year",
        desc: "Covers coursework Master's degrees, research-based programs, and specialized postgraduate diplomas."
      },
      {
        category: "Living Expenses",
        range: "A$20,000 – A$29,710 / year",
        desc: "The official government guideline is A$29,710 per year, covering accommodation, food, transport, and utilities."
      },
      {
        category: "Overseas Student Health Cover",
        range: "A$500 – A$800 / year",
        desc: "Mandatory medical insurance for the entire duration of your student visa, covering basic healthcare and hospital visits."
      }
    ],
    scholarshipsList: [
      {
        name: "Australia Awards Scholarships",
        details: "Prestigious scholarships funded by the Department of Foreign Affairs and Trade (DFAT) for postgraduate studies, covering full tuition, travel, and living stipends."
      },
      {
        name: "Destination Australia Scholarship",
        details: "Government program offering up to A$15,000 per year to support international students studying at regional campuses in regional Australia."
      },
      {
        name: "University International Student Awards",
        details: "Merit-based scholarships offered directly by universities, granting 15% to 30% tuition fee reductions based on academic GPA."
      },
      {
        name: "Vice-Chancellor's Academic Excellence",
        details: "Competitive awards offered by top universities, covering 50% to 100% of the tuition fees for high-achieving applicants."
      }
    ],
    universitiesDetail: [
      {
        name: "University of Canberra College",
        description: "Provides direct pathway programs into the University of Canberra, specializing in academic English, business, and information technology.",
        fees: "A$22,000 - A$30,000 / year",
        courses: "Business Foundation, Information Technology, Academic English",
        image: "/images/extracted_uni/page_3_img_23.png"
      },
      {
        name: "Australian Catholic University (ACU)",
        description: "A highly-ranked public university offering top-tier nursing, education, business, and theology programs across multiple Australian campuses.",
        fees: "A$28,000 - A$34,000 / year",
        courses: "Bachelor of Nursing, Master of Business, Education, MBA",
        image: "/images/extracted_uni/page_3_img_24.png"
      },
      {
        name: "Southern Cross University",
        description: "A progressive regional university with campuses in Gold Coast, Lismore, and Coffs Harbour, known for marine science, forestry, and tourism.",
        fees: "A$26,000 - A$32,000 / year",
        courses: "Hospitality Management, IT, Environmental Science, MBA",
        image: "/images/extracted_uni/page_3_img_25.png"
      },
      {
        name: "AIBT Australia",
        description: "One of Australia's largest private vocational trainers, providing hands-on training in hospitality, aviation, nursing, and IT.",
        fees: "A$10,000 - A$18,000 / year",
        courses: "Diploma of Aviation, Commercial Cookery, IT Network Security",
        image: "/images/extracted_uni/page_3_img_26.png"
      }
    ]
  },
  {
    code: "FI",
    name: "Finland",
    slug: "finland",
    region: "European",
    accent: "#124e96",
    intake: "August, January",
    cost: "NPR 14 Lakh to 16 Lakh",
    programs: "IT, Business, Engineering, Nursing, AI, Hospitality",
    universities: ["LUT University", "University of Vaasa", "Haaga-Helia UAS", "Metropolia UAS"],
    highlight: "Nordic study planning with English-taught program matching.",
    why: [
      "Voted the happiest country in the world for several consecutive years",
      "World-class, innovation-oriented higher education system",
      "Generous scholarship schemes for English-taught programs",
      "Excellent post-study residence permit for job-seeking (2 years)"
    ],
    visa: ["Residence permit document check", "Scholarship deadline review", "Insurance guidance", "Accommodation preparation"],
    faq: [
      ["Why should I choose Finland for my higher studies?", "Finland offers a world-renowned, student-centric education system focusing on research, critical thinking, and practice. It provides a safe, peaceful, and clean environment, and is globally recognized as the happiest country in the world."],
      ["Are scholarships available for non-EU international students?", "Yes. Most Finnish universities and Universities of Applied Sciences (UAS) offer merit-based scholarships. These can range from 20% to 100% tuition fee waivers, and postgrad research routes often have fully funded positions."],
      ["Can I work in Finland while studying?", "International students on a residence permit can work up to 30 hours per week during the academic terms, and full-time during holidays and summer breaks."],
      ["What is the post-study residence permit in Finland?", "Graduates of Finnish higher education institutions can apply for a 2-year residence permit to look for work or start a business, facilitating a smooth transition into the Nordic job market."]
    ],
    introCopy: [
      "Finland is globally celebrated for its innovation, high standard of living, and an education system that prioritizes student well-being and practical skills. For Nepali students seeking European quality, Finland offers a premium academic environment.",
      "The country's Universities of Applied Sciences (UAS) are directly linked with the industry, ensuring that engineering, IT, business, and health science courses include practical placements, internships, and project work.",
      "Finland offers generous scholarships for non-EU students, and once you graduate, the government grants a two-year job seeker permit, allowing you to settle into a professional career in the Nordic region."
    ],
    coursesList: [
      {
        title: "1. Information Technology & Artificial Intelligence",
        description: "Finland is the birthplace of global tech innovations. Programs offer advanced knowledge in software development, AI, game design, and cybersecurity."
      },
      {
        title: "2. Business Administration & Sustainable Commerce",
        description: "Focused on global business, entrepreneurship, and eco-friendly business practices. Designed to fit the modern European business landscape."
      },
      {
        title: "3. Environmental Engineering & Green Energy",
        description: "World-leading research in sustainability, clean water technology, and circular economy. Prepares students for careers in green energy systems."
      },
      {
        title: "4. Nursing & Healthcare",
        description: "Highly sought-after programs that combine intensive simulation-based learning with clinical training in Finland's highly advanced healthcare system."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: Completion of secondary school (+2) with good marks. Postgraduate: Bachelor's degree (3 or 4 years) in a relevant field. Many UAS require entrance exams.",
      english: "IELTS overall 6.0 (no band less than 5.5) or PTE Academic 55+. Some Universities of Applied Sciences (UAS) may waive the English test if your school instruction was in English.",
      financial: "You must prove that you have at least €560 per month (€6,720 per year) held in your personal bank account. This is the official living cost guideline for the residence permit.",
      genuine: "The Finnish Immigration Service (Migri) requires a residence permit application. You must submit valid academic records, proof of tuition payment, health insurance, and pass a credibility interview."
    },
    intakesList: [
      {
        title: "Autumn Intake",
        period: "August / September",
        deadline: "January (Joint Application Window)",
        desc: "The primary academic intake. Most English-taught Bachelor's and Master's courses accept applications during the joint application period in January."
      },
      {
        title: "Spring Intake",
        period: "January",
        deadline: "September (Previous Year)",
        desc: "The second intake. Limited to select applied science programs and specific technical courses."
      }
    ],
    costsList: [
      {
        category: "Tuition Fees (Bachelor's / UAS)",
        range: "€8,000 – €11,000 / year",
        desc: "Applied science universities offer practical learning with competitive tuition rates."
      },
      {
        category: "Tuition Fees (Master's / Research)",
        range: "€10,000 – €15,000 / year",
        desc: "Offered by comprehensive research universities, with robust academic programs."
      },
      {
        category: "Living Expenses",
        range: "€6,720 – €9,000 / year",
        desc: "Minimum government requirement is €6,720 per year. Covers student housing, food, and transport."
      },
      {
        category: "Student Health Insurance",
        range: "€200 – €400 / year",
        desc: "Mandatory health insurance from an approved provider (e.g., Swisscare or SIP) is required for the residence permit."
      }
    ],
    scholarshipsList: [
      {
        name: "Finland Scholarships",
        details: "Covers 100% of the tuition fee for the first year of Master's studies at participating universities, plus a €5,000 relocation grant."
      },
      {
        name: "University Tuition Fee Waivers",
        details: "Performance-based scholarships offered in the second and third years, granting 50% to 100% fee waivers to students who complete 55 ECTS credits annually."
      },
      {
        name: "Early Bird Discounts",
        details: "Offered by most Universities of Applied Sciences, granting €1,000 to €1,500 tuition discount if you accept the offer and pay the fee within 2-3 weeks."
      }
    ],
    universitiesDetail: [
      {
        name: "LUT University",
        description: "A pioneering university in Lappeenranta and Lahti, combining technology and business with a strong focus on clean energy, water technology, and sustainability.",
        fees: "€12,000 - €15,000 / year",
        courses: "Mechanical Engineering, Business Administration, Energy Systems",
        image: "/images/extracted_uni/page_4_img_15.png"
      },
      {
        name: "University of Vaasa",
        description: "A business-oriented university on the west coast, specializing in finance, management, energy technology, and industrial management.",
        fees: "€10,000 - €14,000 / year",
        courses: "International Business, Finance, Industrial Management",
        image: "/images/extracted_uni/page_4_img_16.png"
      },
      {
        name: "Haaga-Helia University of Applied Sciences",
        description: "A highly practical university of applied sciences, renowned for business, sales, hospitality, tourism, and information technology.",
        fees: "€9,500 - €10,500 / year",
        courses: "Hospitality Management, Business Information Technology, International Business",
        image: "/images/extracted_uni/page_4_img_17.png"
      },
      {
        name: "Metropolia University of Applied Sciences",
        description: "Finland's largest university of applied sciences, situated in Helsinki, offering degrees in engineering, health, culture, and business.",
        fees: "€11,000 - €12,500 / year",
        courses: "Information Technology, Nursing, Electronics, European Business Administration",
        image: "/images/extracted_uni/page_4_img_18.png"
      }
    ]
  },
  {
    code: "LT",
    name: "Lithuania",
    slug: "lithuania",
    region: "European",
    accent: "#f4b000",
    intake: "September, February",
    cost: "NPR 18 Lakh to 22 Lakh",
    programs: "Management, Aviation, IT, Business, Engineering",
    universities: ["Vilnius University", "SMK University", "Klaipeda University"],
    highlight: "Affordable European study options with practical visa support.",
    why: [
      "Extremely affordable tuition fees and cost of living compared to Western Europe",
      "Full access to the Schengen zone for travel and networking",
      "Wide selection of English-taught programs at historic and modern institutions",
      "Growing tech and startup economy offering excellent local opportunities"
    ],
    visa: ["Application timeline tracking", "Financial readiness", "Accommodation document support", "Visa filing preparation"],
    faq: [
      ["Why choose Lithuania for studying abroad?", "Lithuania offers high-quality European education at a fraction of the cost of other EU nations. It has historic universities, modern applied science colleges, and is extremely safe and affordable for international students."],
      ["Is the medium of instruction English?", "Yes. All programs listed for international students are taught entirely in English. The universities also offer Lithuanian language classes for students interested in local culture and integration."],
      ["Can I travel to other European countries?", "Lithuania is a member of the Schengen Zone. With your Lithuanian student visa or temporary residence permit (TRP), you can travel freely to 29 European countries without additional visas."],
      ["What is the work permit situation during studies?", "International students in Lithuania can work part-time up to 40 hours per week during their studies. After graduation, you can extend your stay to find a job or start a business."]
    ],
    introCopy: [
      "Lithuania is a hidden gem in Northern Europe, offering a high-quality education system, rich cultural heritage, and one of the most affordable living standards in the European Union. It is an ideal destination for budget-first students seeking Schengen exposure.",
      "From historic public institutions like Vilnius University (established in 1579) to highly creative private applied colleges like SMK, Lithuanian education is characterized by innovation, student care, and practical skills.",
      "Nepali students in Lithuania enjoy the benefits of a student visa that grants free travel across the Schengen area, part-time work rights up to 40 hours a week, and a post-study window to transition into the European market."
    ],
    coursesList: [
      {
        title: "1. Aviation & Logistics Management",
        description: "Specialized business degrees in airport management, aviation security, and transport logistics, offering certifications and practical training."
      },
      {
        title: "2. Information Technology & Multimedia",
        description: "Lithuania is a thriving Baltic tech hub. Degrees focus on software engineering, game programming, animation, and database systems."
      },
      {
        title: "3. International Business & Marketing",
        description: "Designed around European business frameworks, preparing students for roles in multinational marketing, public relations, and sales."
      },
      {
        title: "4. Healthcare & General Nursing",
        description: "Highly affordable medical and nursing degrees with clinical training that is fully recognized across the European Union."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: Completion of secondary school (+2) with a minimum of 55%. Postgraduate: Bachelor's degree (3 or 4 years) in a related discipline.",
      english: "IELTS overall 5.5 to 6.0, PTE Academic 45+, or a Certificate of Medium of Instruction (MOI) confirming your previous education was taught in English.",
      financial: "You must demonstrate access to a minimum of €150 to €200 per month (approx. €2,400 per year) in a bank account under your name or a sponsor's name.",
      genuine: "The Lithuanian National D Visa requires verification of your academic documents, university registration, accommodation booking, and basic financial capacity."
    },
    intakesList: [
      {
        title: "Autumn Intake",
        period: "September",
        deadline: "May to July",
        desc: "The primary intake. Almost all universities and applied science programs are open for applications."
      },
      {
        title: "Spring Intake",
        period: "February",
        deadline: "September to November",
        desc: "The secondary intake. Popular for business, management, and aviation management courses."
      }
    ],
    costsList: [
      {
        category: "Undergraduate Tuition",
        range: "€1,300 – €4,500 / year",
        desc: "Private colleges like SMK offer very competitive fees starting around €2,800/year."
      },
      {
        category: "Postgraduate Tuition",
        range: "€2,500 – €6,000 / year",
        desc: "Master's degrees are highly affordable and take 1.5 to 2 years to complete."
      },
      {
        category: "Living Expenses",
        range: "€4,500 – €7,000 / year",
        desc: "Covers accommodation in student dormitories, food, public transport, and personal expenses."
      },
      {
        category: "Health Insurance",
        range: "€150 – €300 / year",
        desc: "Required for the visa and covers basic medical treatments and emergency hospital care."
      }
    ],
    scholarshipsList: [
      {
        name: "Lithuanian State Scholarships",
        details: "The government offers monthly stipends of €490 and tuition fee coverage for high-achieving international Master's applicants."
      },
      {
        name: "Institution Tuition Discounts",
        details: "SMK and Vilnius University offer partial scholarships (10% to 50% discount on tuition) for outstanding international students based on past GPA."
      }
    ],
    universitiesDetail: [
      {
        name: "Vilnius University",
        description: "Established in 1579, one of the oldest and most prestigious universities in Central Europe, offering world-class research and academic degrees.",
        fees: "€1,300 - €8,000 / year",
        courses: "Medicine, Information Systems, English Philology, Global Marketing",
        image: "/images/extracted_uni/page_4_img_12.png"
      },
      {
        name: "SMK University of Applied Sciences",
        description: "The largest private applied sciences college in Lithuania, offering modern, creative, and career-oriented programs in English across multiple campuses.",
        fees: "€2,800 - €4,500 / year",
        courses: "Aviation Management, Programming and Multimedia, Marketing, General Nursing",
        image: "/images/extracted_uni/page_4_img_13.png"
      },
      {
        name: "Klaipeda University",
        description: "A unique public university located in Lithuania's coastal city, specializing in marine science, logistics, engineering, and history.",
        fees: "€2,500 - €4,800 / year",
        courses: "Marine Engineering, Port Management, Informatics, Business Administration",
        image: "/images/extracted_uni/page_4_img_14.png"
      }
    ]
  },
  {
    code: "KR",
    name: "South Korea",
    slug: "south-korea",
    region: "Asian",
    accent: "#6a2c91",
    intake: "March, September",
    cost: "NPR 8 Lakh to 12 Lakh average",
    programs: "Engineering, IT, Business, Korean Language, Media",
    universities: ["Seoul National University", "Hanyang University", "Yonsei University"],
    highlight: "University and language institute placement with document checks.",
    why: [
      "World leader in technology, electronics, and digital media",
      "Opportunity to learn Korean language and culture",
      "Highly affordable tuition fees compared to Western destinations",
      "Robust campus facilities and student support systems"
    ],
    visa: ["Korean language pathway review", "University application support", "Financial document guidance", "Interview practice"],
    faq: [
      ["Do I need to know Korean to study in South Korea?", "While there are English-taught degree programs (like Yonsei's Underwood college), most programs require Korean language proficiency (TOPIK level 3 or 4). Many Nepali students choose a Korean Language Pathway, studying language for 1 year before starting their degree."],
      ["What is the TOPIK exam?", "The Test of Proficiency in Korean (TOPIK) is the standardized exam used to measure Korean language skills. Scoring high on TOPIK can earn you substantial tuition scholarships (up to 70-100% discount)."],
      ["How much bank balance is needed for a South Korean student visa?", "For a degree program (D-2 visa), you must show a bank deposit of $20,000 held for at least 1-3 months. For a language course (D-4 visa), the requirement is $10,000."],
      ["Is part-time work allowed in South Korea?", "Yes, international students with a certain TOPIK level and good GPA can work part-time up to 20-30 hours per week during semesters and unlimited hours during vacations."]
    ],
    introCopy: [
      "South Korea is a dynamic hub of technological innovation, economic growth, and global entertainment (K-Culture). It offers an exceptionally safe, modern, and high-tech study environment for international students.",
      "The South Korean education system is world-renowned for its academic discipline and research, with flagship universities producing leaders in tech, engineering, and business fields.",
      "For Nepali students, South Korea offers affordable first-step options, especially through Korean Language Programs that act as a smooth pathway into top-tier university degrees with significant scholarship opportunities."
    ],
    coursesList: [
      {
        title: "1. Korean Language Programs",
        description: "Intensive 1-year language tracks offered by university-affiliated institutes, designed to take you from beginner to TOPIK level 3/4."
      },
      {
        title: "2. Computer Science & AI",
        description: "Backed by companies like Samsung and Hyundai. Focuses on software engineering, robotics, cloud systems, and smart tech."
      },
      {
        title: "3. Business Management & Global Trade",
        description: "Taught in English and Korean, business programs focus on East Asian commerce models, global logistics, and corporate management."
      },
      {
        title: "4. Media, Film & Communication",
        description: "At the heart of the Hallyu wave. Focuses on digital content creation, television production, public relations, and cultural studies."
      }
    ],
    requirementsDetail: {
      academic: "Undergraduate: GPA of 2.5+ in high school (+2). Graduate: Bachelor's degree with good GPA. Strong academic records in mathematics and science help for tech routes.",
      english: "For English-taught programs: IELTS 5.5 to 6.0+, or TOEFL 79+. For Korean-taught programs: TOPIK level 3 or 4 is mandatory.",
      financial: "A certificate of bank deposit showing $20,000 (D-2 visa) or $10,000 (D-4 language visa) held in the applicant's or sponsor's account for at least 1 month.",
      genuine: "The South Korean Embassy in Kathmandu assesses your visa application. You must present verified academic documents, certificate of admission (COA), and clear financial sponsor details."
    },
    intakesList: [
      {
        title: "Spring Semester",
        period: "March",
        deadline: "September to November (Previous Year)",
        desc: "The primary academic intake in South Korea. The semester runs from March to June."
      },
      {
        title: "Autumn Semester",
        period: "September",
        deadline: "April to June (Same Year)",
        desc: "The second academic intake. The semester runs from September to December."
      },
      {
        title: "Language Intakes",
        period: "March, June, September, December",
        deadline: "3 to 4 months before start",
        desc: "Korean language programs run on a 4-term quarterly basis, providing high flexibility."
      }
    ],
    costsList: [
      {
        category: "Korean Language Course",
        range: "1,200,000 – 1,800,000 KRW / term",
        desc: "A term lasts 10 weeks. There are 4 terms in a full academic year of language study."
      },
      {
        category: "Undergraduate Tuition",
        range: "3,000,000 – 6,000,000 KRW / semester",
        desc: "Two semesters per year. Humanities are cheaper, while engineering and medicine are higher."
      },
      {
        category: "Living Expenses",
        range: "6,000,000 – 10,000,000 KRW / year",
        desc: "Covers university dorms (very affordable) or off-campus shared rooms, food, and utilities."
      },
      {
        category: "Health Insurance",
        range: "50,000 – 70,000 KRW / month",
        desc: "International students are automatically registered in the National Health Insurance (NHIS)."
      }
    ],
    scholarshipsList: [
      {
        name: "Global Korea Scholarship (GKS)",
        details: "Fully funded government program covering full tuition fees, flight tickets, monthly allowance of 900,000 KRW, settlement support, and insurance."
      },
      {
        name: "TOPIK Scholarship for Admissions",
        details: "Universities offer direct tuition fee discounts (30% to 70%) for the first semester based on your entry TOPIK level (Level 3, 4, 5, or 6)."
      },
      {
        name: "GPA-Based Academic Scholarships",
        details: "Offered in subsequent semesters by universities, providing tuition waivers (20% to 100%) to students who maintain a high GPA (above 3.0 out of 4.5)."
      }
    ],
    universitiesDetail: [
      {
        name: "Seoul National University",
        description: "The prestigious flagship national university of South Korea, offering premier research and education across all major academic fields.",
        fees: "6,000,000 KRW / year (average)",
        courses: "Computer Science, Electrical Engineering, Business Management, International Relations",
        image: "/images/extracted_uni/page_4_img_22.png"
      },
      {
        name: "Yonsei University",
        description: "One of South Korea's oldest and most prestigious private universities, part of the SKY trio, known for its globalized programs.",
        fees: "4,500,000 - 9,000,000 KRW / semester",
        courses: "Global Studies (Underwood), Business Admin, Technology Management",
        image: "/images/extracted_uni/page_4_img_23.png"
      },
      {
        name: "Hanyang University",
        description: "Renowned as South Korea's top engineering university, with a strong emphasis on industry-academic cooperation and technology startups.",
        fees: "4,700,000 - 7,100,000 KRW / semester",
        courses: "Mechanical Engineering, Computer Engineering, Global Business, AI",
        image: "/images/extracted_uni/page_4_img_24.png"
      }
    ]
  },
  {
    code: "IN",
    name: "India",
    slug: "india",
    region: "Asian",
    accent: "#f15a24",
    cost: "NPR 6 Lakh to 15 Lakh average",
    intake: "June, July, August",
    programs: "Medical, Paramedical, Nursing, Pharmacy, Engineering, Management, Hospitality, Ayurveda",
    universities: ["BMS Bangalore", "SRM University", "Dr. AIT University", "Centurion University", "Amrita University", "Symbiosis University", "Delhi University", "Rajiv Gandhi University"],
    highlight: "Entrance and college placement guidance for nearby study routes.",
    why: [
      "No visa or passport required for Nepali citizens to study and live",
      "Highly affordable fee structures with close cultural and geographical proximity",
      "Top-tier professional colleges with global rankings and AICTE/INC approvals",
      "Strong placement cells providing direct access to multinational companies"
    ],
    visa: ["College comparison", "Ranking and approval checks", "Admission documentation", "Hostel and travel guidance"],
    faq: [
      ["Why should Nepali students choose India?", "India offers high-quality professional education in fields like Medicine, Nursing, Engineering, and Pharmacy at a fraction of the cost of Western countries. There is no visa requirement, travel is cheap, and the culture is highly familiar."],
      ["Is the Indian degree recognized in Nepal?", "Yes. Indian degrees from recognized universities are fully equivalent and recognized in Nepal, provided the college has approvals from regulatory bodies like AICTE, INC, or PCI and gets registered with Nepali councils."],
      ["What is the COMPEX Scholarship?", "COMPEX is an undergraduate scholarship scheme run by the Indian Embassy in Kathmandu for Nepali students, offering full or partial funding for Engineering, Agriculture, Pharmacy, and Nursing courses in India."],
      ["Do I need to take an entrance exam?", "For medical courses (MBBS/BDS), you must clear the NEET exam in India or the CEE exam in Nepal. For engineering and management, many private universities have their own entrance exams or accept standard board marks."]
    ],
    introCopy: [
      "India is a highly practical and popular destination for Nepali students, offering quality professional education in medicine, engineering, nursing, and business management. It provides a familiar cultural environment, making it easy to adapt.",
      "Major student hubs like Bangalore, Chennai, Pune, and Delhi NCR host hundreds of top colleges equipped with modern laboratories, library systems, and direct placement cells that coordinate with multinational corporations.",
      "Studying in India does not require a student visa or passport for Nepali citizens, and the overall expenses (fees and hostel costs) are highly affordable, starting from as low as NPR 5 to 6 Lakh for complete degree programs."
    ],
    coursesList: [
      {
        title: "1. Engineering & Technology (B.Tech)",
        description: "Offered in global hubs like Bangalore. Focuses on Computer Science, Information Science, Electronics, and AI with direct corporate placements."
      },
      {
        title: "2. Medical, Paramedical & B.Sc Nursing",
        description: "Highly demanded courses regulated by the Indian Nursing Council (INC). Includes clinical training in multi-specialty hospitals."
      },
      {
        title: "3. Pharmacy (B.Pharm / Pharm.D)",
        description: "Regulated by the Pharmacy Council of India (PCI). Covers pharmaceutical chemistry, pharmacology, and drug manufacturing standards."
      },
      {
        title: "4. Business Administration & MBA",
        description: "Industry-aligned management training with specializations in retail, human resources, finance, and digital marketing."
      }
    ],
    requirementsDetail: {
      academic: "Minimum of 50% to 60% in +2 (Science stream for medical/engineering, Commerce/Arts for business). Professional councils have specific subject marks (e.g. Biology for nursing).",
      english: "No formal English tests (like IELTS/PTE) are required. You must show that your medium of instruction in secondary school was English.",
      financial: "No bank balance or immigration proof is needed for the visa. You only need to pay the university application fees, secure an admission letter, and manage university payment schedules.",
      genuine: "No visa processing is required. You must secure an Equivalence Certificate from the Curriculum Development Centre (CDC) or TU in Nepal for your Indian degree registration."
    },
    intakesList: [
      {
        title: "Main Admission Intake",
        period: "June to August",
        deadline: "April to July",
        desc: "The primary intake for all universities. Entrance tests and counseling bookings begin early in April/May."
      }
    ],
    costsList: [
      {
        category: "B.Tech Engineering Tuition",
        range: "₹1,00,000 – ₹3,50,000 / year",
        desc: "Varies by college rank and branches. Computer Science engineering has the highest demand."
      },
      {
        category: "B.Sc Nursing / Pharmacy Tuition",
        range: "₹1,50,000 – ₹3,00,000 / year",
        desc: "Hostel and practical training fees are often charged extra by medical colleges."
      },
      {
        category: "Living / Hostel Expenses",
        range: "₹80,000 – ₹1,50,000 / year",
        desc: "Covers college hostel accommodation, mess food (veg/non-veg options), internet, and laundry."
      }
    ],
    scholarshipsList: [
      {
        name: "COMPEX Scholarship Scheme",
        details: "Administered by the Embassy of India, Kathmandu. Grants full or partial funding to Nepali students for engineering, nursing, agriculture, and dairy technology degrees."
      },
      {
        name: "Study in India (SII) Scholarships",
        details: "Government program offering tuition fee waivers (G1: 100%, G2: 50%, G3: 25%) to qualified international students studying at partner colleges."
      },
      {
        name: "EduMark Partner Scholarships",
        details: "Direct institutional fee waivers (10% to 50% discount on tuition) secured by EduMark through our direct tie-ups with leading Indian colleges."
      }
    ],
    universitiesDetail: [
      {
        name: "BMS College of Engineering, Bangalore",
        description: "A highly prestigious engineering college in Bangalore, known for state-of-the-art labs, top placements, and student innovations.",
        fees: "₹1,15,000 - ₹3,00,000 / year",
        courses: "Computer Science, AI & Machine Learning, MCA, Electronics",
        image: "/images/extracted_uni/page_5_img_15.png"
      },
      {
        name: "SRM University (SRMIST)",
        description: "A top private university in Chennai, featuring immense research centers and wide undergraduate options in engineering and technology.",
        fees: "₹2,50,000 - ₹4,50,000 / year",
        courses: "B.Tech Computer Science, Biotech, MBA, Civil Engineering",
        image: "/images/extracted_uni/page_5_img_16.png"
      },
      {
        name: "Dr. Ambedkar Institute of Technology (Dr. AIT)",
        description: "A government-aided engineering college in Bangalore, offering affordable high-quality technical education and training programs.",
        fees: "₹40,000 - ₹2,50,000 / year",
        courses: "Mechanical Engineering, Computer Science, M.Tech, MBA",
        image: "/images/extracted_uni/page_5_img_17.png"
      },
      {
        name: "Centurion University of Technology and Management",
        description: "Located in Odisha, CUTM is known for skill-integrated higher education, agricultural science, and vocational engineering.",
        fees: "₹1,00,000 - ₹3,00,000 / year",
        courses: "Agriculture, Cyber Security, B.Tech, Allied Health",
        image: "/images/extracted_uni/page_5_img_18.png"
      },
      {
        name: "Amrita Vishwa Vidyapeetham",
        description: "Ranked among India's top multi-disciplinary research institutions, with campuses offering values-based education in engineering and medicine.",
        fees: "₹1,50,000 - ₹3,50,000 / year",
        courses: "B.Tech Computer Science, MBBS, MBA, Pharmacy",
        image: "/images/extracted_uni/page_5_img_28.png"
      },
      {
        name: "Symbiosis International University",
        description: "A premier multi-disciplinary university offering top-ranked MBA, law, and liberal arts programs with a global perspective.",
        fees: "₹2,00,000 - ₹6,00,000 / year",
        courses: "BBA, Law (LLB), MBA, Computer Applications (BCA)",
        image: "/images/extracted_uni/page_5_img_29.png"
      },
      {
        name: "Delhi University",
        description: "One of India's largest and most famous central universities, offering highly affordable, premier arts, science, and commerce courses.",
        fees: "₹10,000 - ₹35,000 / year",
        courses: "B.Com Honors, BA Economics, B.Sc Computer Science",
        image: "/images/extracted_uni/page_5_img_30.png"
      },
      {
        name: "Rajiv Gandhi University of Health Sciences (RGUHS)",
        description: "The central health sciences university of Karnataka, regulating top-tier medical, nursing, and pharmaceutical colleges.",
        fees: "₹80,000 - ₹3,00,000 / year",
        courses: "B.Sc Nursing, Pharm.D, Physiotherapy (BPT), MBBS",
        image: "/images/extracted_uni/page_5_img_31.png"
      }
    ]
  },
  {
    code: "MT",
    name: "Malta",
    slug: "malta",
    region: "European",
    accent: "#d62329",
    cost: "NPR 12 Lakh to 18 Lakh average",
    intake: "September, February",
    programs: "Business Administration, Hospitality Management, Tourism, IT",
    universities: ["MCAST (Malta College of Arts, Science and Technology)", "American University of Malta", "Advenio Academy"],
    highlight: "Affordable European study destination with full Schengen zone access.",
    why: [
      "Extremely affordable tuition fees and cost of living in the Mediterranean",
      "English is an official language, making communication and integration easy",
      "Study and travel freely across all 29 European Schengen countries",
      "Strong hospitality and tourism sector with high student employment potential"
    ],
    visa: ["Schengen visa document check", "Application submission to VFS", "Financial sponsor proof checking", "Travel and health insurance guidance"],
    faq: [
      ["Why study in Malta from Nepal?", "Malta is a beautiful Mediterranean island and an official English-speaking nation in the European Union. It offers affordable tuition, a low cost of living, and is a gateway to the Schengen zone, allowing you to travel across Europe without a separate visa."],
      ["What are the English language requirements for Malta?", "While IELTS (5.5 - 6.0) or PTE Academic (45+) are widely accepted, some private colleges in Malta offer English interviews or accept Medium of Instruction (MOI) certificates from your previous school in Nepal."],
      ["Can international students work in Malta?", "Yes, international students in Malta are permitted to work part-time up to 20 hours per week after their first 90 days of arrival, helping cover their living expenses."]
    ],
    introCopy: [
      "Malta is an increasingly popular study destination for Nepali students, offering an English-speaking environment in the heart of the Mediterranean. As a member of the European Union and the Schengen Zone, Malta provides direct pathways to broader European academic and professional networks.",
      "For students prioritizing budget without compromising on quality, Maltese colleges and universities offer highly competitive tuition rates starting around €3,000 to €5,000 per year, with a cost of living significantly lower than in Western Europe.",
      "English is one of the two official languages of Malta, which means all academic programs are taught in English and daily life is highly accessible for international students."
    ],
    coursesList: [
      { title: "1. Tourism & Hospitality Management", description: "Malta is a major European tourism hub. Degrees combine classroom learning with internship placements in top-tier hotels and resorts." },
      { title: "2. Business Administration & MBA", description: "Focused on global trade, financial services, and entrepreneurship, aligning with Malta's growing status as an offshore corporate center." },
      { title: "3. Information Technology & Computing", description: "Programs in software development, cybersecurity, and game design, supported by Malta's active tech startup ecosystem." }
    ],
    requirementsDetail: {
      academic: "Undergraduate: GPA of 2.2+ (55% equivalent) in high school (+2). Graduate: Bachelor's degree in a relevant field with at least 50% marks.",
      english: "IELTS 5.5 to 6.0, PTE 45+, or Medium of Instruction (MOI) letter if your school education was conducted entirely in English.",
      financial: "Proof of sufficient funds to cover tuition and a minimum of €150 to €200 per month for living expenses in a bank account under your name or a sponsor's name.",
      genuine: "A Maltese student visa requires verification of academic documents, an official letter of acceptance from a licensed institution, and confirmed student accommodation."
    },
    intakesList: [
      { title: "Autumn Intake", period: "September / October", deadline: "May to July", desc: "The primary academic intake with the widest course availability." },
      { title: "Spring Intake", period: "February / March", deadline: "October to December", desc: "The secondary intake, popular for business and management certificates." }
    ],
    costsList: [
      { category: "Tuition Fees (Undergraduate)", range: "€3,000 – €6,000 / year", desc: "Highly affordable compared to Western European destinations." },
      { category: "Tuition Fees (Postgraduate)", range: "€4,000 – €8,000 / year", desc: "Master's degrees typically take 1 to 2 years to complete." },
      { category: "Living Expenses", range: "€4,000 – €6,000 / year", desc: "Covers shared student housing, groceries, utilities, and public transport." }
    ],
    scholarshipsList: [
      { name: "Endeavour Scholarship Scheme", details: "A national funding scheme supporting students pursuing postgraduate degrees in high-priority industrial sectors." },
      { name: "Institutional Fee Waivers", details: "Merit-based fee reductions (10% to 30% discount) offered by private colleges for high academic performers." }
    ],
    universitiesDetail: [
      { name: "Malta College of Arts, Science and Technology (MCAST)", description: "The leading public vocational education and training institution in Malta, offering highly practical degrees.", fees: "€4,500 - €6,500 / year", courses: "IT, Business, Engineering, Applied Sciences", image: "/images/extracted_uni/page_2_img_1.png" },
      { name: "American University of Malta (AUM)", description: "A private, American-style liberal arts university located in Cospicua, offering accredited business and tech programs.", fees: "€6,000 - €9,000 / year", courses: "BBA, MBA, BS Software Engineering", image: "/images/extracted_uni/page_2_img_2.png" }
    ]
  },
  {
    code: "AE",
    name: "Dubai",
    slug: "dubai",
    region: "Middle Eastern",
    accent: "#b48b40",
    cost: "NPR 15 Lakh to 25 Lakh average",
    intake: "September, January, May",
    programs: "Business, Engineering, IT, Tourism & Hospitality, Logistics",
    universities: ["Heriot-Watt University Dubai", "Middlesex University Dubai"],
    highlight: "Modern global hub with high employment options and no visa rejection risk.",
    why: [
      "Zero tax on student earnings and highly competitive modern industries",
      "Extremely high visa approval rate for Nepali students with minimal document complexity",
      "Branch campuses of top UK, Australian, and US universities offering identical degrees",
      "Global logistics, finance, and tourism hub with massive part-time job opportunities"
    ],
    visa: ["Entry permit processing", "Medical fitness test check", "Student residence visa stamping", "Sponsor letter mapping"],
    faq: [
      ["Why study in Dubai from Nepal?", "Dubai hosts top-tier global university branch campuses (from the UK, Australia, etc.) where you can earn an identical degree at a lower tuition fee. The student visa process is highly straightforward with a near 100% approval rate, and no strict bank funds holding rules."],
      ["Can I transfer to the home campus in the UK or Australia?", "Yes, one of the biggest advantages of branch campuses in Dubai (such as Heriot-Watt or Wollongong) is the seamless credit transfer options to their main campuses in the UK or Australia after 1 or 2 years of study."],
      ["What are the working rights for students in Dubai?", "International students in Dubai can work part-time in designated free zones and retail/hospitality sectors, as well as secure corporate internships, with zero income tax."]
    ],
    introCopy: [
      "Dubai is a futuristic global hub that has emerged as a premier international education center, hosting branches of prestigious British, Australian, and American universities. For Nepali students, Dubai represents a safe, ultra-modern, and highly career-focused gateway.",
      "The primary advantage of studying in Dubai is the ease of the visa process. Unlike Western destinations, Dubai has minimal document complexities and a near-perfect visa success rate, making it an excellent option for qualified applicants.",
      "Additionally, students can study at branch campuses of world-renowned universities (such as Heriot-Watt University or Middlesex University) and receive the exact same degree certificate as the parent campus, with options for easy transfers."
    ],
    coursesList: [
      { title: "1. Global Business & International Management", description: "Dubai is a crossroads of international trade. Programs focus on logistics, supply chain, finance, and global trade operations." },
      { title: "2. Information Technology & Cyber Security", description: "Specialized training in artificial intelligence, cloud computing, and big data, aligned with Dubai's Smart City initiatives." },
      { title: "3. Tourism & Luxury Hospitality", description: "World-class hospitality programs with direct internship links to the world's most luxurious hotel chains and event management groups." }
    ],
    requirementsDetail: {
      academic: "Undergraduate: Minimum GPA of 2.2+ (55% equivalent) in high school (+2). Graduate: Relevant Bachelor's degree with a minimum GPA of 2.5 or equivalent.",
      english: "IELTS 5.5 to 6.0, PTE 48+, or equivalent. Many branch universities allow institutional English entrance tests if you don't have standard scores.",
      financial: "Proof of ability to cover tuition fees and basic living costs. Dubai does not require long-term bank holding deposits, making financial proof very simple.",
      genuine: "Admission relies on university sponsorship. Once accepted, the university processes your student visa with the Dubai General Directorate of Residency and Foreigners Affairs (GDRFA)."
    },
    intakesList: [
      { title: "Autumn Intake", period: "September", deadline: "June to August", desc: "The main intake offering all courses and scholarship slots." },
      { title: "Spring Intake", period: "January", deadline: "October to December", desc: "The second major intake, popular for postgraduate business paths." },
      { title: "Summer Intake", period: "May", deadline: "February to April", desc: "Ideal for foundational paths, language prep, and specific business programs." }
    ],
    costsList: [
      { category: "Tuition Fees (Undergraduate)", range: "AED 40,000 – AED 75,000 / year", desc: "Covers branch campus tuition, matching UK/Australian degree qualifications." },
      { category: "Tuition Fees (Postgraduate)", range: "AED 50,000 – AED 90,000 / year", desc: "Master's degrees typically last 1 to 2 years, with flexible payment plans." },
      { category: "Living / Hostel Expenses", range: "AED 25,000 – AED 45,000 / year", desc: "Includes shared student student accommodation, utilities, meals, and local transit." }
    ],
    scholarshipsList: [
      { name: "Branch Campus Merit Scholarships", details: "Merit-based tuition discounts (15% to 30%) offered directly by branch universities based on academic marks." },
      { name: "Corporate & Partner Sponsorships", details: "Partial fee waivers and paid internship packages co-funded by Dubai-based industry partners." }
    ],
    universitiesDetail: [
      { name: "Heriot-Watt University Dubai", description: "A prestigious British university branch campus in Dubai Knowledge Park, offering top-tier engineering and business degrees.", fees: "AED 55,000 - 75,000 / year", courses: "Engineering, MBA, Computer Science", image: "/images/extracted_uni/page_2_img_3.png" },
      { name: "Middlesex University Dubai", description: "A popular UK branch campus offering high-quality British education, business studies, and creative media programs.", fees: "AED 45,000 - 65,000 / year", courses: "Business, Media, Psychology, IT", image: "/images/extracted_uni/page_2_img_4.png" }
    ]
  }
];

