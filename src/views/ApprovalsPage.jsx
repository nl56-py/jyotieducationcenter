"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { ShieldCheck, Award, FileText, CheckCircle } from "lucide-react";

export function ApprovalsPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: "moe",
      title: "Ministry of Education Approval",
      issuer: "Government of Nepal",
      regNo: "Reg No: 546/2075",
      icon: <ShieldCheck size={28} style={{ color: "var(--accent-orange-red)" }} />,
      logo: "/images/trust images/ministry image.jfif",
      docUrl: "/images/brand/MOEst_Renewal_81-82.pdf",
      description: "Officially certified and licensed by the Ministry of Education, Science and Technology (MoEST), Nepal, to operate as a professional educational consultancy for study abroad services.",
      date: "Approved since 2018",
    },
    {
      id: "ecan",
      title: "ECAN Active Membership",
      issuer: "Educational Consultancy Association of Nepal",
      regNo: "Member ID: ECAN-114",
      icon: <Award size={28} style={{ color: "#17156f" }} />,
      logo: "/images/trust images/ecan.png",
      docUrl: "/images/trust images/ecan.png",
      description: "A proud and active member of the Educational Consultancy Association of Nepal (ECAN), committing to the association's ethical recruitment standards, counseling codes of conduct, and academic transparency.",
      date: "Member since 2015",
    },
    {
      id: "titi",
      title: "TITI Certified Counselors",
      issuer: "Training Institute for Technical Instruction",
      regNo: "Certification: TITI-TTE-2021",
      icon: <FileText size={28} style={{ color: "#22c55e" }} />,
      logo: "/images/trust images/titi.png",
      docUrl: "/images/brand/4_Ravi_Gupta_TITI.pdf",
      description: "Our counseling team is officially certified by the Training Institute for Technical Instruction (TITI) under CTVT, ensuring professional counseling methodologies and student visa mapping practices.",
      date: "Certified in 2021",
    },
    {
      id: "icef",
      title: "ICEF Screened Agency Status",
      issuer: "ICEF Global Educator Network",
      regNo: "Agency ID: #5004",
      icon: <CheckCircle size={28} style={{ color: "#06b6d4" }} />,
      logo: "/images/ICEF-Logo_2023_500.jpg",
      docUrl: "/images/brand/icef_USA_certificate.pdf",
      description: "Globally screened and vetted by ICEF, validating EduMark's compliance with international best practices, ethical student recruitment, and global university relations.",
      date: "Vetted since 2023",
    },
    {
      id: "legacy",
      title: "14+ Years Legacy & Company Registration",
      issuer: "Office of the Company Registrar, Nepal",
      regNo: "Reg No: 182746/074/075",
      icon: <Award size={28} style={{ color: "#8b5cf6" }} />,
      logo: "/images/trust images/14 years.png",
      docUrl: "/images/brand/Registration_Certificate_EduMark.pdf",
      description: "EduMark Pvt. Ltd. is a registered company officially incorporated under the Office of the Company Registrar, Government of Nepal, holding 14+ years of trust and legal compliance in student counseling.",
      date: "Established in 2012",
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="LICENSES & CERTIFICATIONS"
        title="Official Approvals & Government Registrations"
        text="EduMark Pvt. Ltd. is a fully registered, licensed, and audited educational consultancy. We adhere strictly to national regulations and international ethical codes."
        image={assets.success}
      />

      <section className="section" style={{ background: "var(--surface-mist)", padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.2rem", color: "var(--navy)", fontWeight: 800, marginBottom: "16px" }}>
              Our Credentials & Legal Licenses
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
              Students and parents can verify our legal standings and official certifications below. Click on any certificate card to view the official document scan or logo details.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "30px" 
          }}>
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                style={{
                  background: "var(--white)",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(7, 31, 61, 0.04)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(7, 31, 61, 0.08)";
                  e.currentTarget.style.borderColor = "var(--purple)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(7, 31, 61, 0.04)";
                  e.currentTarget.style.borderColor = "var(--line)";
                }}
              >
                <div>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "24px"
                  }}>
                    <div style={{ 
                      width: "56px", 
                      height: "56px", 
                      borderRadius: "12px", 
                      background: "var(--surface-mist)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}>
                      {cert.icon}
                    </div>
                    <img 
                      src={cert.logo} 
                      alt={cert.title} 
                      style={{ 
                        height: "40px", 
                        maxWidth: "100px", 
                        objectFit: "contain" 
                      }} 
                    />
                  </div>

                  <h3 style={{ 
                    fontSize: "18px", 
                    fontWeight: 800, 
                    color: "var(--navy)", 
                    marginBottom: "8px" 
                  }}>
                    {cert.title}
                  </h3>
                  
                  <div style={{ 
                    fontSize: "12px", 
                    fontWeight: 700, 
                    color: "var(--purple)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    marginBottom: "16px"
                  }}>
                    {cert.issuer}
                  </div>

                  <p style={{ 
                    fontSize: "14px", 
                    color: "var(--muted)", 
                    lineHeight: 1.6, 
                    marginBottom: "24px" 
                  }}>
                    {cert.description}
                  </p>
                </div>

                <div style={{ 
                  borderTop: "1px solid var(--line)", 
                  paddingTop: "16px", 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px"
                }}>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>{cert.regNo}</span>
                  <span style={{ color: "var(--muted)" }}>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: "60px", 
            background: "var(--white)", 
            borderRadius: "16px", 
            padding: "40px", 
            boxShadow: "0 10px 30px rgba(7, 31, 61, 0.04)",
            border: "1px solid var(--line)",
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: "12px" }}>
              Verifiable & Compliant Education Agency
            </h3>
            <p style={{ color: "var(--muted)", maxWidth: "800px", margin: "0 auto 20px", fontSize: "14px", lineHeight: 1.6 }}>
              All our consulting services are provided by certified counselors who have passed professional TITI training and regulatory exams. EduMark is fully tax compliant and registered with the Koshi Province administration office.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(34, 197, 94, 0.1)", color: "#16a34a", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
                ✓ MoEST Licensed
              </span>
              <span style={{ background: "rgba(23, 21, 111, 0.1)", color: "#17156f", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
                ✓ ECAN Member
              </span>
              <span style={{ background: "rgba(6, 182, 212, 0.1)", color: "#0891b2", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
                ✓ ICEF Screened
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox / Certificate scan viewer modal */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 31, 61, 0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--white)",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative"
            }}
          >
            <button 
              onClick={() => setSelectedCert(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "var(--surface-mist)",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                color: "var(--navy)"
              }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)", marginBottom: "8px", textAlign: "center" }}>
              {selectedCert.title}
            </h3>
            <div style={{ fontSize: "13px", color: "var(--purple)", fontWeight: 700, marginBottom: "20px" }}>
              {selectedCert.issuer}
            </div>
            
            {selectedCert.docUrl.endsWith(".pdf") ? (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "20px 0" }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "rgba(91, 23, 125, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  color: "var(--purple)"
                }}>
                  📄
                </div>
                <div style={{ textAlign: "center", maxWidth: "450px" }}>
                  <p style={{ fontSize: "15px", color: "var(--navy)", fontWeight: "700", marginBottom: "8px" }}>
                    Official Certificate Document (PDF)
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                    This document is a certified PDF scan. To protect user security and ensure proper rendering across mobile devices, click the button below to view or download the certificate in a new window.
                  </p>
                </div>
                <a 
                  href={selectedCert.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "12px 28px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--white)",
                    background: "linear-gradient(135deg, var(--purple) 0%, #a855f7 100%)",
                    border: "none",
                    borderRadius: "30px",
                    cursor: "pointer",
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 15px rgba(168, 85, 247, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(168, 85, 247, 0.3)";
                  }}
                >
                  View Official Document ↗
                </a>
              </div>
            ) : (
              <div style={{ 
                width: "100%", 
                height: "350px", 
                background: `url("${selectedCert.docUrl}") center/contain no-repeat`,
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                marginBottom: "20px"
              }} />
            )}

            <div style={{ textAlign: "center", fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
              <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: "4px" }}>{selectedCert.regNo}</p>
              <p>{selectedCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
