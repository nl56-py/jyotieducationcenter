import { useEffect, useRef, useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { assets } from "../data/assets.js";
import { leaders } from "../data/entrancePrograms.js";

const INTAKES = [
  { label: "July Intake", date: new Date("2026-07-01T00:00:00") },
  { label: "September Intake", date: new Date("2026-09-01T00:00:00") },
  { label: "February Intake", date: new Date("2027-02-01T00:00:00") },
];

function getNextIntake() {
  const now = new Date();
  const upcoming = INTAKES.filter((i) => i.date > now).sort((a, b) => a.date - b.date);
  return upcoming[0] || INTAKES[0];
}

function useDetailedCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - new Date().getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    el.querySelectorAll("[data-reveal]").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useTiltCard(maxTilt = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const leave = () => { el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [maxTilt]);
  return ref;
}

// ── Real Interactive Globe using Canvas ──
function RealGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rotation: 0, isDragging: false, lastX: 0, autoSpin: true, tilt: 0.3 });
  const animRef = useRef(null);

  // Destination pins with real lat/lon
  const DESTINATIONS = [
    { name: "Australia", flag: "🇦🇺", lat: -25.3, lon: 133.7, color: "#08a8d7" },
    { name: "UK", flag: "🇬🇧", lat: 51.5, lon: -0.1, color: "#5b177d" },
    { name: "Canada", flag: "🇨🇦", lat: 56.1, lon: -106.3, color: "#e9262d" },
    { name: "USA", flag: "🇺🇸", lat: 37.1, lon: -95.7, color: "#08a8d7" },
    { name: "Nepal", flag: "🇳🇵", lat: 28.3, lon: 84.1, color: "#e9262d" },
  ];

  // Basic world land outlines as simplified arcs (lon/lat pairs)
  const LAND_MASSES = [
    // North America
    [[-140, 60], [-125, 50], [-80, 45], [-75, 43], [-70, 42], [-65, 44], [-60, 46], [-65, 60], [-85, 67], [-100, 70], [-130, 70], [-140, 60]],
    // South America
    [[-80, 10], [-63, 10], [-35, -5], [-35, -20], [-50, -33], [-70, -55], [-75, -40], [-80, -5], [-80, 10]],
    // Europe
    [[0, 50], [20, 55], [25, 70], [10, 62], [0, 58], [-5, 48], [8, 44], [15, 40], [30, 45], [35, 55], [20, 55]],
    // Africa
    [[0, 15], [15, 15], [40, 15], [50, 10], [42, 12], [40, -5], [35, -20], [25, -35], [18, -35], [10, -20], [0, 5], [0, 15]],
    // Asia
    [[35, 35], [70, 25], [80, 20], [100, 10], [115, 5], [125, 15], [135, 35], [140, 45], [125, 50], [100, 50], [80, 45], [60, 50], [40, 45], [35, 35]],
    // Russia
    [[40, 55], [80, 60], [110, 60], [140, 60], [160, 65], [170, 70], [140, 72], [100, 73], [70, 68], [40, 60], [40, 55]],
    // Australia continent
    [[115, -25], [130, -20], [150, -22], [155, -28], [150, -38], [140, -38], [130, -35], [115, -30], [115, -25]],
    // Greenland
    [[-45, 60], [-25, 62], [-20, 70], [-30, 76], [-50, 83], [-65, 78], [-55, 70], [-45, 60]],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = 400;
    const H = canvas.height = 400;
    const cx = W / 2, cy = H / 2;
    const R = 160;

    function latLonToXYZ(lat, lon, rotationAngle) {
      const latR = (lat * Math.PI) / 180;
      const lonR = ((lon + rotationAngle) * Math.PI) / 180;
      const tiltAngle = stateRef.current.tilt;
      const x = Math.cos(latR) * Math.cos(lonR);
      const y = Math.sin(latR);
      const z = Math.cos(latR) * Math.sin(lonR);
      // Apply tilt rotation around X axis
      const y2 = y * Math.cos(tiltAngle) - z * Math.sin(tiltAngle);
      const z2 = y * Math.sin(tiltAngle) + z * Math.cos(tiltAngle);
      return { x, y: y2, z: z2 };
    }

    function project(xyz) {
      return { sx: cx + xyz.x * R, sy: cy - xyz.y * R, visible: xyz.z > 0 };
    }

    function drawGlobe() {
      const rot = stateRef.current.rotation;
      ctx.clearRect(0, 0, W, H);

      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.4);
      grd.addColorStop(0, "rgba(8, 168, 215, 0.08)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2); ctx.fill();

      // Ocean sphere
      const oceanGrd = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      oceanGrd.addColorStop(0, "#0f2a4a");
      oceanGrd.addColorStop(0.6, "#071f3d");
      oceanGrd.addColorStop(1, "#040f1e");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrd; ctx.fill();

      // Atmosphere rim
      const rimGrd = ctx.createRadialGradient(cx, cy, R - 4, cx, cy, R + 12);
      rimGrd.addColorStop(0, "rgba(8, 168, 215, 0.3)");
      rimGrd.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(cx, cy, R + 12, 0, Math.PI * 2);
      ctx.fillStyle = rimGrd; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(8, 168, 215, 0.35)"; ctx.lineWidth = 1.5; ctx.stroke();

      // Lat lines
      ctx.strokeStyle = "rgba(8, 168, 215, 0.1)"; ctx.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 3) {
          const xyz = latLonToXYZ(lat, lon, rot);
          const p = project(xyz);
          if (p.visible) { first ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); first = false; }
          else { first = true; }
        }
        ctx.stroke();
      }

      // Lon lines
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const xyz = latLonToXYZ(lat, lon, rot);
          const p = project(xyz);
          if (p.visible) { first ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); first = false; }
          else { first = true; }
        }
        ctx.stroke();
      }

      // Land masses
      LAND_MASSES.forEach((outline) => {
        ctx.beginPath();
        let first = true;
        outline.forEach(([lon, lat]) => {
          const xyz = latLonToXYZ(lat, lon, rot);
          const p = project(xyz);
          if (p.visible) { first ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); first = false; }
          else {
            if (!first) ctx.closePath();
            first = true;
          }
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(91, 23, 125, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "rgba(139, 68, 170, 0.5)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Specular highlight
      const specGrd = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, 0, cx - R * 0.2, cy - R * 0.2, R * 0.65);
      specGrd.addColorStop(0, "rgba(255,255,255,0.07)");
      specGrd.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = specGrd; ctx.fill();

      // Draw pins & arcs
      const visiblePins = [];
      DESTINATIONS.forEach((dest) => {
        const xyz = latLonToXYZ(dest.lat, dest.lon, rot);
        const p = project(xyz);
        if (p.visible && xyz.z > 0.1) {
          visiblePins.push({ ...dest, ...p, xyz });
        }
      });

      // Draw connection arcs from Nepal to others
      const nepalData = DESTINATIONS.find(d => d.name === "Nepal");
      const nepalXYZ = latLonToXYZ(nepalData.lat, nepalData.lon, rot);
      const nepalP = project(nepalXYZ);

      visiblePins.forEach((pin) => {
        if (pin.name === "Nepal") return;
        if (nepalP.visible && nepalXYZ.z > 0) {
          ctx.beginPath();
          const mx = (nepalP.sx + pin.sx) / 2;
          const my = (nepalP.sy + pin.sy) / 2 - 40;
          ctx.moveTo(nepalP.sx, nepalP.sy);
          ctx.quadraticCurveTo(mx, my, pin.sx, pin.sy);
          ctx.strokeStyle = `${pin.color}55`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Draw pin markers
      visiblePins.forEach((pin) => {
        const pulse = (Math.sin(Date.now() / 600 + pin.lat) + 1) / 2;
        const r = 4 + pulse * 3;

        // Pulse ring
        ctx.beginPath(); ctx.arc(pin.sx, pin.sy, r, 0, Math.PI * 2);
        ctx.strokeStyle = pin.color + "80"; ctx.lineWidth = 1.5; ctx.stroke();

        // Core dot
        ctx.beginPath(); ctx.arc(pin.sx, pin.sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = pin.color; ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.stroke();

        // Label
        if (pin.name !== "Nepal") {
          ctx.font = "bold 10px system-ui, sans-serif";
          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";
          const labelY = pin.sy - 12;
          ctx.fillStyle = "rgba(7,31,61,0.85)";
          const tw = ctx.measureText(pin.flag + " " + pin.name).width;
          ctx.beginPath();
          ctx.roundRect(pin.sx - tw / 2 - 4, labelY - 12, tw + 8, 16, 4);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.fillText(pin.flag + " " + pin.name, pin.sx, labelY);
        } else {
          ctx.font = "bold 11px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(7,31,61,0.9)";
          const tw = ctx.measureText("📍 Nepal").width;
          ctx.beginPath();
          ctx.roundRect(pin.sx - tw / 2 - 5, pin.sy - 22, tw + 10, 16, 4);
          ctx.fill();
          ctx.fillStyle = "#e9262d";
          ctx.fillText("📍 Nepal", pin.sx, pin.sy - 10);
        }
      });
    }

    function loop() {
      if (stateRef.current.autoSpin) stateRef.current.rotation += 0.15;
      drawGlobe();
      animRef.current = requestAnimationFrame(loop);
    }
    loop();

    // Mouse drag to rotate
    const onDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX || e.touches?.[0]?.clientX;
      stateRef.current.autoSpin = false;
    };
    const onMove = (e) => {
      if (!stateRef.current.isDragging) return;
      const x = e.clientX || e.touches?.[0]?.clientX;
      stateRef.current.rotation += (x - stateRef.current.lastX) * 0.3;
      stateRef.current.lastX = x;
    };
    const onUp = () => {
      stateRef.current.isDragging = false;
      setTimeout(() => { stateRef.current.autoSpin = true; }, 2500);
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        style={{ cursor: "grab", borderRadius: "50%", display: "block" }}
        title="Drag to rotate the globe"
      />
      <div style={{
        position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)",
        fontSize: "0.72rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em",
        display: "flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap"
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3" />
        </svg>
        Drag to explore
      </div>
    </div>
  );
}

const STATS = [
  { value: "2012", label: "Established Legacy", desc: "A decade-long commitment to honest counseling" },
  { value: "14+", label: "Years of Excellence", desc: "Guiding students through complex paths" },
  { value: "500+", label: "University Partners", desc: "Direct routes to global academic institutes" },
  { value: "2,400+", label: "Successful Placements", desc: "Students pursuing global study goals" },
];

const MILESTONES = [
  { year: "2012", title: "The Foundation", tagline: "Where integrity met advice", description: "EduMark was established in Biratnagar as a specialized test preparation and counseling center. Our mission was simple: provide honest, uncompromised paths for ambitious students from Koshi Province.", metric: "Est. 2012", metricLabel: "in Biratnagar", accent: "var(--purple)" },
  { year: "2015", title: "ECAN Membership", tagline: "Committing to professional standards", description: "EduMark officially became a member of the Educational Consultancy Association of Nepal (ECAN), committing to the association's ethical standards and counseling code of conduct.", metric: "ECAN", metricLabel: "Member Since 2015", accent: "var(--cyan)" },
  { year: "2018", title: "Ministry Approval", tagline: "Certified by the government", description: "We received formal approval and certification from the Ministry of Education, Science and Technology, Nepal, cementing our status as a licensed consultancy.", metric: "Approved", metricLabel: "Ministry of Education", accent: "var(--red)" },
  { year: "2026", title: "14 Years of Excellence", tagline: "Eastern region's trusted name", description: "With 14 years of dedicated service, 500+ partner universities worldwide, and hundreds of successful student placements, we continue to shape global academic futures.", metric: "500+", metricLabel: "Partner Universities", accent: "var(--indigo)" },
];

const PILLARS = [
  { tag: "OUR MISSION", title: "Ethical & Personalized Support", text: "To guide every student toward the best international opportunity through expert, ethical, and personalized support.", gradient: "linear-gradient(135deg, rgba(91, 23, 125, 0.05) 0%, rgba(8, 168, 215, 0.05) 100%)", borderColor: "rgba(91, 23, 125, 0.15)", icon: (<svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>) },
  { tag: "OUR VISION", title: "Global Exposure", text: "Unleashing Potential Through Global Exposure. We strive to be Nepal's gold standard—where rigorous preparation meets student-first career matching and lifetime success.", gradient: "linear-gradient(135deg, rgba(8, 168, 215, 0.05) 0%, rgba(244, 196, 0, 0.05) 100%)", borderColor: "rgba(8, 168, 215, 0.15)", icon: (<svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" /></svg>) },
  { tag: "OUR VALUES", title: "Absolute Transparency", text: "No hidden charges, no exaggerated claims. Our team gives advice that aligns with the student's profile, academic capabilities, financial realities, and genuine career prospects.", gradient: "linear-gradient(135deg, rgba(233, 38, 45, 0.05) 0%, rgba(91, 23, 125, 0.05) 100%)", borderColor: "rgba(233, 38, 45, 0.15)", icon: (<svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>) },
  { tag: "THE STUDENT COMPACT", title: "End-To-End Stewardship", text: "From selecting the right course to drafting an honest SOP, preparing for visa interviews, and pre-departure briefings—our relationship doesn't end with a visa stamp; it lasts through graduation.", gradient: "linear-gradient(135deg, rgba(244, 196, 0, 0.05) 0%, rgba(8, 168, 215, 0.05) 100%)", borderColor: "rgba(244, 196, 0, 0.15)", icon: (<svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>) },
];

const LEADER_METADATA = {
  "CEO": { badgeIcon: "star", badgeText: "Founding Visionary", bio: "14+ years pioneering education consulting in Eastern Nepal, leading with integrity and student-first advice.", accent: "var(--purple)", gradient: "linear-gradient(135deg, var(--purple) 0%, #a855f7 100%)" },
  "Operational Director": { badgeIcon: "shield", badgeText: "Operations Maestro", bio: "Overseeing all documentation, compliance, and university communication with a 12-year flawless track record.", accent: "var(--cyan)", gradient: "linear-gradient(135deg, var(--cyan) 0%, #06b6d4 100%)" },
  "Marketing Director": { badgeIcon: "network", badgeText: "Outreach Leader", bio: "Driving student outreach, campus seminars, and test preparation excellence across Koshi Province.", accent: "var(--red)", gradient: "linear-gradient(135deg, var(--red) 0%, #f43f5e 100%)" },
  "Director Abroad Studies": { badgeIcon: "compass", badgeText: "Pathway Specialist", bio: "Directly linking local talents with over 500+ top-tier universities across Australia, UK, and North America.", accent: "var(--yellow)", gradient: "linear-gradient(135deg, var(--yellow) 0%, #eab308 100%)" },
};

const ROADMAPS = {
  Australia: { intakes: "Feb, July, November", steps: [{ t: "English Proficiency", d: "Prepare and clear IELTS, PTE or TOEFL (6 months ahead)" }, { t: "Course Selection & GTE", d: "Choose course and draft GTE statement (4 months ahead)" }, { t: "Offer Letter & Tuition", d: "Submit academic transcripts, receive offer, and remit fees (3 months ahead)" }, { t: "COE & Visa Lodging", d: "Receive CoE, set up health insurance, and lodge visa (2 months ahead)" }] },
  UK: { intakes: "Jan, May, September", steps: [{ t: "Academic Assessment", d: "Submit academic documents and check English eligibility (5 months ahead)" }, { t: "Pre-CAS Credibility Interview", d: "Clear university credibility screening for CAS (3 months ahead)" }, { t: "CAS & Bank Setup", d: "Receive CAS; show maintenance funds held for 28 consecutive days (2 months ahead)" }, { t: "Visa Submission", d: "Lodge student visa online and submit biometric data (1 month ahead)" }] },
  Canada: { intakes: "Jan, May, September", steps: [{ t: "IELTS & ECA", d: "Achieve IELTS 6.0+; prepare ECA if post-grad application (8 months ahead)" }, { t: "College Admission & LOA", d: "Apply to DLI college and receive Letter of Acceptance (6 months ahead)" }, { t: "GIC Account Setup", d: "Open bank account and deposit GIC amount for living expenses (4 months ahead)" }, { t: "Study Permit Application", d: "Submit Study Permit application under SDS pathway (3 months ahead)" }] },

};

function LeaderBadgeIcon({ icon }) {
  switch (icon) {
    case "star": return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);
    case "shield": return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
    case "network": return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M12 8v8M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /></svg>);
    case "compass": return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>);
    default: return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
  }
}

function AnimatedHeroVisual() {
  return (
    <div className="redesigned-hero-visual">
      <div className="visual-glow glow-purple" />
      <div className="visual-glow glow-cyan" />
      <div className="visual-main-frame">
        <div className="image-wrapper">
          <img src={assets.counselling} alt="EduMark counseling team" />
          <div className="image-overlay" />
        </div>
      </div>
      <div className="orbit-line-1" />
      <div className="orbit-line-2" />
      <div className="float-badge badge-1">
        <span className="badge-emoji">🎯</span>
        <div className="badge-details"><strong>99%</strong><span>Visa Success</span></div>
      </div>
      <div className="float-badge badge-2">
        <span className="badge-emoji">🌍</span>
        <div className="badge-details"><strong>10+</strong><span>Destinations</span></div>
      </div>
      <div className="experience-ring-container">
        <svg viewBox="0 0 100 100" className="experience-ring">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--purple)" />
              <stop offset="100%" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" className="ring-bg" />
          <circle cx="50" cy="50" r="44" className="ring-active" stroke="url(#ringGradient)" />
        </svg>
        <div className="ring-text">
          <strong className="ring-number">14</strong>
          <span className="ring-label">Years</span>
        </div>
      </div>
    </div>
  );
}

export function AboutPage({ navigate }) {
  const heroRef = useReveal();
  const storyRef = useReveal();
  const ceoRef = useReveal();
  const leadershipRef = useReveal();
  const milestonesRef = useReveal();
  const accreditationsRef = useReveal();
  const pillarsRef = useReveal();
  const globeRef = useReveal();
  const intakeRef = useReveal();
  const tiltCard = useTiltCard(5);

  const [activeMilestone, setActiveMilestone] = useState(MILESTONES.length - 1);
  const [activeRoadmap, setActiveRoadmap] = useState("Australia");

  const nextIntake = getNextIntake();
  const { days, hours, minutes, seconds } = useDetailedCountdown(nextIntake.date);

  return (
    <main className="about-page">
      <style>{`
        .about-page {
          --primary: var(--purple);
          --primary-rgb: 91, 23, 125;
          --secondary: var(--cyan);
          --secondary-rgb: 8, 168, 215;
          --accent: var(--red);
          --accent-yellow: var(--yellow);
          --dark: var(--navy);
          --dark-rgb: 7, 31, 61;
          --text: var(--ink);
          --text-muted: var(--muted);
          --bg-light: var(--soft);
          --border-color: var(--line);
          --glass-bg: rgba(255, 255, 255, 0.7);
          --glass-border: rgba(255, 255, 255, 0.6);
          --glass-shadow: 0 20px 50px rgba(7, 31, 61, 0.06);
          overflow-x: hidden;
        }

        /* ── Reveal animations ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
        [data-reveal="scale"] { transform: scale(0.94); }
        [data-reveal="scale"].is-visible { transform: scale(1); }
        [data-reveal="left"] { transform: translateX(-50px); }
        [data-reveal="left"].is-visible { transform: translateX(0); }
        [data-reveal="right"] { transform: translateX(50px); }
        [data-reveal="right"].is-visible { transform: translateX(0); }

        /* ── Hero ── */
        .redesigned-hero {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem;
          align-items: center; padding: 3.5rem 0; position: relative;
        }
        .eyebrow-container {
          display: inline-flex; align-items: center; gap: 0.75rem;
          background: rgba(91,23,125,0.06); padding: 0.5rem 1rem;
          border-radius: 9999px; border: 1px solid rgba(91,23,125,0.1); margin-bottom: 1.5rem;
        }
        .eyebrow-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--primary);
          box-shadow: 0 0 10px var(--primary); animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
        .eyebrow-text { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); }
        .hero-title-wrap h1 { font-size: 3.5rem; font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: var(--dark); margin: 0 0 1.5rem 0; }
        .hero-title-wrap h1 em { font-style: normal; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-desc { font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; max-width: 54ch; margin-bottom: 2.5rem; }
        .hero-cta-btn {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 1.1rem 2.2rem; border-radius: 12px; font-size: 1.05rem; font-weight: 800;
          background: linear-gradient(135deg, var(--primary) 0%, #7b29ad 100%);
          color: #fff; text-decoration: none;
          box-shadow: 0 15px 30px rgba(91,23,125,0.25);
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .hero-cta-btn::after { content:""; position:absolute; top:0; left:-150%; width:80%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent); transform:skewX(-25deg); transition:left 0.8s ease; }
        .hero-cta-btn:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(91,23,125,0.35); }
        .hero-cta-btn:hover::after { left: 150%; }

        /* ── Hero Visual ── */
        .redesigned-hero-visual { position:relative; width:100%; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; }
        .visual-glow { position:absolute; border-radius:50%; filter:blur(80px); opacity:0.45; z-index:0; }
        .glow-purple { width:60%; height:60%; top:10%; left:10%; background:radial-gradient(circle,var(--primary) 0%,transparent 70%); animation:float-glow 8s ease-in-out infinite; }
        .glow-cyan { width:50%; height:50%; bottom:10%; right:10%; background:radial-gradient(circle,var(--secondary) 0%,transparent 70%); animation:float-glow 10s ease-in-out infinite alternate; }
        @keyframes float-glow { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,-20px) scale(1.1)} }
        .visual-main-frame { width:82%; height:82%; border-radius:32px; padding:6px; background:linear-gradient(135deg,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0.2) 100%); border:1px solid var(--glass-border); box-shadow:0 40px 80px rgba(7,31,61,0.15); z-index:2; overflow:hidden; }
        .image-wrapper { width:100%; height:100%; border-radius:26px; overflow:hidden; position:relative; }
        .image-wrapper img { width:100%; height:100%; object-fit:cover; transition:transform 1.5s cubic-bezier(0.16,1,0.3,1); }
        .visual-main-frame:hover .image-wrapper img { transform: scale(1.08); }
        .image-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,transparent,rgba(7,31,61,0.35)); }
        .orbit-line-1, .orbit-line-2 { position:absolute; border-radius:50%; border:1.5px dashed rgba(91,23,125,0.15); z-index:1; pointer-events:none; }
        .orbit-line-1 { width:96%; height:96%; animation:spin-orbit 40s linear infinite; }
        .orbit-line-2 { width:110%; height:110%; border-color:rgba(8,168,215,0.1); animation:spin-orbit 60s linear infinite reverse; }
        @keyframes spin-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .float-badge { position:absolute; z-index:3; display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.85); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.7); box-shadow:var(--glass-shadow); padding:0.8rem 1.2rem; border-radius:20px; animation:bounce-float 5s ease-in-out infinite; }
        .badge-1 { top:20%; left:-8%; }
        .badge-2 { bottom:22%; right:-8%; animation-delay:-2.5s; }
        @keyframes bounce-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .badge-emoji { font-size: 1.5rem; }
        .badge-details strong { display:block; font-size:1.2rem; font-weight:800; color:var(--dark); line-height:1.1; }
        .badge-details span { display:block; font-size:0.75rem; color:var(--text-muted); font-weight:600; }
        .experience-ring-container { position:absolute; z-index:3; bottom:-6%; left:10%; width:100px; height:100px; display:flex; align-items:center; justify-content:center; }
        .experience-ring { position:absolute; width:100%; height:100%; transform:rotate(-90deg); }
        .experience-ring circle { fill:none; stroke-width:6; }
        .experience-ring .ring-bg { stroke: rgba(91,23,125,0.1); }
        .experience-ring .ring-active { stroke-dasharray:276; stroke-dashoffset:60; stroke-linecap:round; }
        .ring-text { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; width:80px; height:80px; background:#fff; border-radius:50%; box-shadow:0 10px 25px rgba(91,23,125,0.15); }
        .ring-number { font-size:1.6rem; font-weight:900; color:var(--dark); line-height:1; }
        .ring-label { font-size:0.65rem; font-weight:700; text-transform:uppercase; color:var(--primary); letter-spacing:0.05em; }

        /* ════════════════════════════════════
           ── REDESIGNED "OUR JOURNEY" SECTION ──
           ════════════════════════════════════ */
        .journey-section {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .journey-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(91,23,125,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(8,168,215,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .journey-inner {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 5rem;
          align-items: center;
        }

        /* Left: Narrative card with image mosaic */
        .journey-left {
          position: relative;
        }
        .journey-mosaic {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          grid-template-rows: 220px 160px;
          gap: 12px;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          box-shadow: 0 30px 60px rgba(7,31,61,0.1);
        }
        .mosaic-img {
          overflow: hidden;
          position: relative;
        }
        .mosaic-img:first-child {
          grid-row: span 2;
          border-radius: 20px 0 0 20px;
        }
        .mosaic-img:nth-child(2) {
          border-radius: 0 20px 0 0;
        }
        .mosaic-img:nth-child(3) {
          border-radius: 0 0 20px 0;
        }
        .mosaic-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
          filter: brightness(0.9);
        }
        .mosaic-img:hover img { transform: scale(1.06); }

        /* Overlapping founding year badge */
        .founding-stamp {
          position: absolute;
          bottom: -18px;
          right: 20px;
          background: linear-gradient(135deg, var(--primary) 0%, #a855f7 100%);
          color: #fff;
          border-radius: 20px;
          padding: 1.2rem 1.8rem;
          box-shadow: 0 16px 40px rgba(91,23,125,0.3);
          text-align: center;
          z-index: 4;
          border: 3px solid #fff;
        }
        .founding-stamp strong {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .founding-stamp span {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.85;
          margin-top: 0.2rem;
        }

        /* Right: Story + stats */
        .journey-right {}
        .journey-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--primary);
          margin-bottom: 1.2rem;
        }
        .journey-eyebrow-line {
          width: 28px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }
        .journey-right h2 {
          font-size: 2.4rem;
          font-weight: 900;
          line-height: 1.2;
          color: var(--dark);
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.02em;
        }
        .journey-right h2 em {
          font-style: normal;
          color: var(--primary);
        }
        .journey-story-text {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        /* Horizontal stats strip */
        .journey-stats-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border-color);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }
        .journey-stat-cell {
          background: #fff;
          padding: 1.4rem 1.6rem;
          position: relative;
          transition: background 0.3s;
        }
        .journey-stat-cell:hover {
          background: rgba(91,23,125,0.03);
        }
        .journey-stat-val {
          display: block;
          font-size: 1.85rem;
          font-weight: 900;
          color: var(--dark);
          line-height: 1;
          margin-bottom: 0.25rem;
          background: linear-gradient(120deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .journey-stat-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Trust badges row */
        .journey-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background: #fff;
          border: 1px solid var(--border-color);
          color: var(--dark);
          box-shadow: 0 2px 8px rgba(7,31,61,0.04);
        }
        .trust-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
        }

        /* ── Timeline Section ── */
        .timeline-section { background:linear-gradient(180deg,transparent 0%,rgba(91,23,125,0.02) 50%,transparent 100%); padding:6rem 0; }
        .timeline-container { max-width:1000px; margin:3.5rem auto 0; display:grid; grid-template-columns:280px 1fr; gap:3.5rem; align-items:start; }
        .timeline-nav-pills { display:flex; flex-direction:column; gap:0.85rem; border-left:2px solid var(--border-color); padding-left:0; position:relative; }
        .timeline-pill { background:transparent; border:0; outline:0; display:flex; align-items:center; gap:1.25rem; padding:1rem 1.5rem; margin-left:-2px; border-left:2px solid transparent; text-align:left; cursor:pointer; transition:all 0.3s; }
        .timeline-pill-year { font-size:1.4rem; font-weight:900; color:var(--text-muted); transition:color 0.3s; }
        .timeline-pill-dot { width:10px; height:10px; border-radius:50%; background:var(--text-muted); border:2px solid #fff; box-shadow:0 0 0 2px transparent; transition:all 0.3s; }
        .timeline-pill:hover .timeline-pill-year { color:var(--dark); }
        .timeline-pill:hover .timeline-pill-dot { background:var(--primary); }
        .timeline-pill.is-active { border-left-color:var(--primary); background:linear-gradient(90deg,rgba(91,23,125,0.05) 0%,transparent 100%); }
        .timeline-pill.is-active .timeline-pill-year { color:var(--primary); font-size:1.65rem; }
        .timeline-pill.is-active .timeline-pill-dot { background:var(--primary); box-shadow:0 0 0 3px rgba(91,23,125,0.2); transform:scale(1.3); }
        .timeline-card-wrapper { position:relative; min-height:320px; }
        .timeline-card-content { background:var(--glass-bg); backdrop-filter:blur(16px); border:1px solid var(--glass-border); box-shadow:var(--glass-shadow); padding:3rem; border-radius:28px; display:grid; grid-template-columns:1fr 180px; gap:2rem; animation:fade-slide-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes fade-slide-in { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }
        .timeline-text-side h3 { font-size:1.8rem; font-weight:800; color:var(--dark); margin:0 0 0.5rem 0; }
        .timeline-tagline { font-size:0.95rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--primary); margin-bottom:1.25rem; display:inline-block; }
        .timeline-desc { font-size:1.05rem; color:var(--text-muted); line-height:1.75; margin:0; }
        .timeline-metric-side { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:1.5rem; border-radius:20px; border:1px dashed var(--border-color); position:relative; }
        .timeline-metric-value { font-size:2.4rem; font-weight:900; line-height:1; color:var(--dark); margin-bottom:0.5rem; }
        .timeline-metric-label { font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em; }

        /* ── Pillars Grid ── */
        .pillars-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2rem; margin-top:3.5rem; }
        .pillar-card { padding:3rem 2.5rem; border-radius:24px; border:1px solid var(--border-color); box-shadow:0 10px 30px rgba(7,31,61,0.02); position:relative; overflow:hidden; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); background:#fff; }
        .pillar-card-glow { position:absolute; top:-30%; right:-30%; width:200px; height:200px; border-radius:50%; filter:blur(50px); opacity:0.3; transition:transform 0.6s ease; }
        .pillar-card:hover { transform:translateY(-8px); border-color:rgba(91,23,125,0.25); box-shadow:0 30px 60px rgba(91,23,125,0.08); }
        .pillar-card:hover .pillar-card-glow { transform:scale(1.4); }
        .pillar-header { display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem; }
        .pillar-icon-wrap { width:56px; height:56px; border-radius:16px; display:flex; align-items:center; justify-content:center; color:var(--primary); transition:transform 0.4s; }
        .pillar-icon { width:28px; height:28px; }
        .pillar-card:hover .pillar-icon-wrap { transform:scale(1.1) rotate(-6deg); }
        .pillar-tag { font-size:0.75rem; font-weight:800; color:var(--primary); letter-spacing:0.1em; text-transform:uppercase; }
        .pillar-card h3 { font-size:1.45rem; font-weight:800; color:var(--dark); margin:0; }
        .pillar-card p { font-size:1rem; color:var(--text-muted); line-height:1.7; margin:0; }

        /* ════════════════════════════════════
           ── REAL GLOBE SECTION ──
           ════════════════════════════════════ */
        .globe-visual-section {
          background: linear-gradient(180deg,transparent,rgba(8,168,215,0.02) 50%,transparent);
          padding: 6rem 0;
        }
        .globe-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4rem;
          align-items: center;
        }
        .globe-content-side h2 {
          font-size: 2.6rem; font-weight: 900; line-height: 1.2; color: var(--dark); margin-bottom: 1.5rem;
        }
        .globe-content-side h2 span {
          display: inline; color: var(--secondary); font-size: inherit; font-weight: inherit;
        }
        .globe-desc {
          font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;
        }
        .country-tags-row {
          display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem;
        }
        .country-tag {
          font-size: 0.85rem; font-weight: 700; padding: 0.6rem 1.2rem; border-radius: 9999px;
          background: #fff; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(7,31,61,0.02);
          display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s;
        }
        .country-tag:hover { transform:translateY(-2px); border-color:var(--secondary); box-shadow:0 8px 16px rgba(8,168,215,0.1); }
        .globe-graphic-side {
          display: flex; align-items: center; justify-content: center;
          position: relative; padding-bottom: 2.5rem;
        }
        .globe-interaction-hint {
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          font-size: 0.75rem; color: var(--text-muted); font-weight: 600;
          display: flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.8); backdrop-filter: blur(8px);
          padding: 0.4rem 1rem; border-radius: 9999px;
          border: 1px solid var(--border-color);
          white-space: nowrap;
        }
        .globe-stats-aside {
          display: flex; flex-direction: column; gap: 1rem;
          margin-top: 1.5rem;
        }
        .globe-stat-pill {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.85rem 1.25rem;
          background: #fff; border: 1px solid var(--border-color); border-radius: 14px;
          box-shadow: 0 4px 12px rgba(7,31,61,0.03);
          transition: transform 0.3s;
        }
        .globe-stat-pill:hover { transform: translateX(4px); }
        .globe-stat-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .globe-stat-text strong { display: block; font-size: 1rem; font-weight: 800; color: var(--dark); }
        .globe-stat-text span { font-size: 0.78rem; color: var(--text-muted); }

        /* ── Leadership ── */
        .leadership-section { padding: 6rem 0; }
        .leaders-layout-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; margin-top:3.5rem; }
        .leader-card-premium { background:#fff; border:1px solid var(--border-color); border-radius:28px; padding:2.2rem 1.5rem; display:flex; flex-direction:column; align-items:center; text-align:center; position:relative; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); box-shadow:0 10px 35px rgba(7,31,61,0.02); overflow:hidden; }
        .leader-gradient-bar { position:absolute; top:0; left:0; width:100%; height:5px; background:var(--border-color); transition:background 0.3s; }
        .leader-card-premium:hover { transform:translateY(-8px); box-shadow:0 30px 60px rgba(7,31,61,0.08); border-color:rgba(7,31,61,0.08); }
        .leader-avatar-container { position:relative; width:110px; height:110px; margin-bottom:1.5rem; }
        .leader-glow-ring { position:absolute; inset:-4px; border-radius:50%; padding:4px; background:conic-gradient(from 0deg,var(--border-color) 0%,var(--border-color) 100%); -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; transition:transform 1.5s ease; }
        .leader-card-premium:hover .leader-glow-ring { background:conic-gradient(from 0deg,var(--primary) 0%,var(--secondary) 40%,var(--accent) 70%,var(--primary) 100%); transform:rotate(360deg); }
        .leader-avatar-mask { width:100%; height:100%; border-radius:50%; overflow:hidden; border:4px solid #fff; background:var(--bg-light); box-shadow:0 4px 15px rgba(7,31,61,0.05); }
        .leader-avatar-mask img { width:100%; height:100%; object-fit:cover; object-position:top; transition:transform 0.5s ease; }
        .leader-card-premium:hover .leader-avatar-mask img { transform:scale(1.08); }
        .leader-badge-pill { position:absolute; bottom:-4px; right:-4px; width:34px; height:34px; border-radius:50%; background:#fff; box-shadow:0 4px 12px rgba(7,31,61,0.15); display:flex; align-items:center; justify-content:center; color:var(--primary); border:2px solid #fff; z-index:2; transition:all 0.3s; }
        .leader-badge-pill svg { width:16px; height:16px; }
        .leader-card-premium:hover .leader-badge-pill { transform:scale(1.15); }
        .leader-card-premium h3 { font-size:1.2rem; font-weight:800; color:var(--dark); margin:0 0 0.25rem 0; }
        .leader-role-tag { font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:var(--primary); margin-bottom:0.75rem; }
        .leader-bio-desc { font-size:0.88rem; color:var(--text-muted); line-height:1.55; margin:0 0 1.25rem 0; }
        .leader-socials-row { display:flex; gap:0.65rem; margin-top:auto; }
        .leader-social-link { width:32px; height:32px; border-radius:50%; background:var(--bg-light); display:flex; align-items:center; justify-content:center; color:var(--text-muted); transition:all 0.3s; text-decoration:none; }
        .leader-social-link:hover { background:var(--primary); color:#fff; transform:translateY(-2px); }
        .leader-social-link svg { width:14px; height:14px; }

        /* ── Intake Planner ── */
        .intake-planner-section { padding: 5rem 0 6rem 0; }
        .intake-dark-container { background:linear-gradient(140deg,#071f3d 0%,#0c142c 100%); border-radius:36px; overflow:hidden; position:relative; color:#fff; box-shadow:0 30px 80px rgba(7,31,61,0.25); display:block; max-width:600px; margin:0 auto; }
        .intake-dark-container::before { content:""; position:absolute; top:-20%; left:-10%; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(91,23,125,0.25) 0%,transparent 65%); pointer-events:none; }
        .intake-dark-container::after { content:""; position:absolute; bottom:-20%; right:-10%; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(8,168,215,0.18) 0%,transparent 65%); pointer-events:none; }
        .intake-col-left { padding:4.5rem 4rem; position:relative; z-index:2; display:flex; flex-direction:column; justify-content:space-between; border-right:1px solid rgba(255,255,255,0.08); }
        .intake-banner-tag { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(8,168,215,0.15); color:var(--secondary); border:1px solid rgba(8,168,215,0.25); padding:0.4rem 1rem; border-radius:9999px; font-size:0.72rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:1.5rem; align-self:flex-start; }
        .intake-col-left h2 { font-size:2.8rem; font-weight:900; line-height:1.15; letter-spacing:-0.01em; margin:0 0 1rem 0; }
        .intake-col-left h2 em { font-style:normal; background:linear-gradient(120deg,var(--secondary) 0%,var(--accent-yellow) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .intake-col-left p { font-size:1rem; line-height:1.7; color:rgba(255,255,255,0.65); max-width:38ch; margin-bottom:2.5rem; }
        .countdown-title { font-size:0.72rem; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:0.75rem; }
        .countdown-intake-badge { font-size:1.15rem; font-weight:800; color:#fff; margin-bottom:1rem; }
        .countdown-timer-grid { display:flex; gap:0.85rem; margin-bottom:2rem; }
        .time-box { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:12px; width:68px; padding:0.75rem 0; text-align:center; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
        .time-val { display:block; font-size:1.75rem; font-weight:900; line-height:1; color:var(--secondary); margin-bottom:0.15rem; }
        .time-unit { display:block; font-size:0.6rem; font-weight:800; text-transform:uppercase; color:rgba(255,255,255,0.45); letter-spacing:0.05em; }
        .counsel-actions { display:flex; flex-direction:column; gap:0.85rem; }
        .action-counsel-primary { display:inline-flex; align-items:center; justify-content:center; gap:0.5rem; padding:1.05rem 1.8rem; border-radius:12px; font-size:1rem; font-weight:800; background:linear-gradient(135deg,var(--secondary) 0%,#008eb7 100%); color:#fff; text-decoration:none; box-shadow:0 10px 25px rgba(8,168,215,0.35); transition:transform 0.3s,box-shadow 0.3s; }
        .action-counsel-primary:hover { transform:translateY(-2px); box-shadow:0 15px 35px rgba(8,168,215,0.45); }
        .action-counsel-ghost { display:inline-flex; align-items:center; justify-content:center; padding:1rem 1.8rem; border-radius:12px; font-size:0.95rem; font-weight:700; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.8); transition:all 0.3s; text-decoration:none; }
        .action-counsel-ghost:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.25); color:#fff; }
        .intake-col-right { padding:4.5rem 3.5rem; position:relative; z-index:2; display:flex; flex-direction:column; justify-content:space-between; }
        .planner-widget-header { margin-bottom:2rem; }
        .planner-widget-header h3 { font-size:1.4rem; font-weight:800; color:#fff; margin:0 0 0.5rem 0; }
        .planner-widget-header p { font-size:0.9rem; color:rgba(255,255,255,0.5); margin:0; }
        .planner-selector { display:flex; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:4px; border-radius:12px; gap:2px; margin-bottom:2rem; }
        .planner-tab-btn { flex:1; background:transparent; border:0; outline:0; padding:0.65rem 0; font-size:0.88rem; font-weight:800; color:rgba(255,255,255,0.65); border-radius:9px; cursor:pointer; transition:all 0.3s; }
        .planner-tab-btn:hover { color:#fff; }
        .planner-tab-btn.is-active { background:#fff; color:var(--dark); box-shadow:0 6px 15px rgba(0,0,0,0.15); }
        .roadmap-summary-row { margin-bottom:1.5rem; display:flex; align-items:center; gap:0.75rem; font-size:0.95rem; }
        .roadmap-target-label { color:rgba(255,255,255,0.45); }
        .roadmap-target-value { font-weight:800; color:var(--accent-yellow); background:rgba(234,179,8,0.12); border:1px solid rgba(234,179,8,0.25); padding:0.25rem 0.75rem; border-radius:6px; }
        .roadmap-steps-list { display:flex; flex-direction:column; gap:1.25rem; position:relative; }
        .roadmap-steps-list::before { content:""; position:absolute; left:17px; top:10px; bottom:10px; width:2px; background:rgba(255,255,255,0.1); }
        .roadmap-step-item { display:grid; grid-template-columns:36px 1fr; gap:1.1rem; align-items:start; position:relative; animation:fade-slide-in 0.4s ease forwards; }
        .step-circle { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.06); border:2px solid rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:0.85rem; font-weight:800; color:rgba(255,255,255,0.6); z-index:2; transition:all 0.3s; }
        .roadmap-step-item:hover .step-circle { background:var(--secondary); border-color:var(--secondary); color:#fff; box-shadow:0 0 12px var(--secondary); }
        .step-details h4 { font-size:0.98rem; font-weight:800; color:#fff; margin:0 0 0.15rem 0; }
        .step-details p { font-size:0.85rem; color:rgba(255,255,255,0.5); margin:0; line-height:1.45; }
        .intake-note-row { margin-top:1.5rem; font-size:0.78rem; color:rgba(255,255,255,0.4); display:flex; align-items:center; gap:0.5rem; }
        .note-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 8px #22c55e; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .redesigned-hero { grid-template-columns:1fr; gap:3.5rem; text-align:center; }
          .eyebrow-container { justify-content:center; }
          .hero-desc { margin-left:auto; margin-right:auto; }
          .redesigned-hero-visual { max-width:480px; margin:0 auto; }
          .journey-inner { grid-template-columns: 1fr; gap: 3rem; }
          .journey-mosaic { grid-template-rows: 200px 140px; }
          .timeline-container { grid-template-columns:1fr; gap:2.5rem; }
          .timeline-nav-pills { flex-direction:row; border-left:0; border-bottom:2px solid var(--border-color); padding-left:0; padding-bottom:0.5rem; overflow-x:auto; gap:0.5rem; }
          .timeline-pill { border-left:0; border-bottom:2px solid transparent; margin-left:0; margin-bottom:-2px; padding:0.75rem 1.25rem; }
          .timeline-pill.is-active { border-left-color:transparent; border-bottom-color:var(--primary); background:linear-gradient(180deg,rgba(91,23,125,0.05) 0%,transparent 100%); }
          .globe-layout { grid-template-columns:1fr; gap:3.5rem; }
          .globe-graphic-side { order:-1; }
          .leaders-layout-grid { grid-template-columns:repeat(2,1fr); }
          .intake-dark-container { grid-template-columns:1fr; }
          .intake-col-left { border-right:0; border-bottom:1px solid rgba(255,255,255,0.08); padding:3.5rem 2.5rem; }
          .intake-col-right { padding:3.5rem 2.5rem; }
        }
        @media (max-width: 640px) {
          .hero-title-wrap h1 { font-size:2.4rem; }
          .timeline-card-content { grid-template-columns:1fr; padding:2rem; gap:1.5rem; }
          .timeline-metric-side { padding:1.25rem; flex-direction:row; justify-content:space-around; text-align:left; }
          .timeline-metric-value { margin-bottom:0; }
          .pillars-grid { grid-template-columns:1fr; }
          .pillar-card { padding:2.2rem 1.8rem; }
          .leaders-layout-grid { grid-template-columns:1fr; max-width:360px; margin-left:auto; margin-right:auto; }
          .countdown-timer-grid { flex-wrap:wrap; }
          .intake-col-left h2 { font-size:2.1rem; }
          .journey-stats-strip { grid-template-columns: 1fr 1fr; }
          .journey-right h2 { font-size: 1.9rem; }
          .ceo-message-inner { grid-template-columns: 1fr; padding: 2.5rem; gap: 3rem; }
          .ceo-image-side { max-width: 300px; margin: 0 auto; }
          .accreditations-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        /* ── CEO Message Section ── */
        .ceo-message-section {
          padding: 6rem 0;
          background: linear-gradient(180deg, transparent 0%, rgba(8, 168, 215, 0.02) 50%, transparent 100%);
        }
        .ceo-message-inner {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 5rem;
          align-items: center;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 36px;
          padding: 4rem;
          box-shadow: var(--glass-shadow);
        }
        .ceo-image-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .ceo-image-frame {
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          border: 1px solid var(--border-color);
          box-shadow: 0 15px 35px rgba(7,31,61,0.08);
        }
        .ceo-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        .ceo-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(7, 31, 61, 0.4) 100%);
        }
        .ceo-signature-block {
          text-align: center;
        }
        .ceo-sig-text {
          display: block;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2.2rem;
          font-style: italic;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        .ceo-sig-title {
          display: block;
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .ceo-text-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .ceo-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        .ceo-eyebrow-line {
          width: 28px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }
        .ceo-text-side blockquote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2rem;
          line-height: 1.3;
          font-style: italic;
          color: var(--dark);
          margin: 0 0 2rem 0;
          border-left: 3px solid var(--secondary);
          padding-left: 1.5rem;
        }
        .ceo-letter {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .ceo-letter p {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
        }
        .ceo-cta-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 2.2rem;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--secondary) 0%, #008eb7 100%);
          color: #fff;
          text-decoration: none;
          box-shadow: 0 15px 30px rgba(8, 168, 215, 0.25);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .ceo-cta-btn-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(8, 168, 215, 0.35);
        }

        /* ── Accreditations Section ── */
        .accreditations-section {
          padding: 6rem 0;
        }
        .accreditations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3.5rem;
        }
        .accreditation-card {
          background: #fff;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 10px 30px rgba(7,31,61,0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .accreditation-card:hover {
          transform: translateY(-8px);
          border-color: rgba(91, 23, 125, 0.25);
          box-shadow: 0 30px 60px rgba(91, 23, 125, 0.08);
        }
        .accreditation-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: transform 0.4s;
        }
        .accreditation-icon-wrap svg {
          width: 28px;
          height: 28px;
        }
        .accreditation-icon-wrap.moe {
          background: rgba(91, 23, 125, 0.06);
          color: var(--primary);
        }
        .accreditation-icon-wrap.ecan {
          background: rgba(8, 168, 215, 0.06);
          color: var(--secondary);
        }
        .accreditation-icon-wrap.titi {
          background: rgba(244, 196, 0, 0.08);
          color: #b38600;
        }
        .accreditation-card:hover .accreditation-icon-wrap {
          transform: scale(1.1) rotate(-6deg);
        }
        .accreditation-card h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--dark);
          margin: 0 0 0.25rem 0;
        }
        .accreditation-subtitle {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
        }
        .accreditation-card p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0;
        }

        /* Section Spacing Reductions */
        .about-page .section,
        .about-page .redesigned-hero,
        .about-page .journey-section,
        .about-page .timeline-section,
        .about-page .leadership-section,
        .about-page .intake-planner-section,
        .about-page .ceo-message-section,
        .about-page .accreditations-section {
          padding-top: 3px !important;
          padding-bottom: 0px !important;
          margin-top: 0px !important;
          margin-bottom: 0px !important;
        }
        .about-page .em-section-intro,
        .about-page .section-intro {
          margin-top: 3px !important;
          margin-bottom: 12px !important;
        }
      `}</style>

      {/* Hero */}
      <section className="section redesigned-hero" ref={heroRef} id="about-hero">
        <div className="hero-title-wrap" data-reveal="left">
          <div className="eyebrow-container">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">About EduMark</span>
          </div>
          <h1>The Most Trusted Consultancy in <em>Koshi Province.</em></h1>
          <p className="hero-desc">
            Since 2012, EduMark has pioneered transparent counseling, academic preparation, and study abroad guidance from our center in Biratnagar. We believe in honest pathways, zero hidden terms, and lifetime student success.
          </p>
          <AppLink to="/book-free-consultation" navigate={navigate} className="hero-cta-btn">
            Get Free Counselling →
          </AppLink>
        </div>
        <div data-reveal="right" data-delay="2">
          <div ref={tiltCard}><AnimatedHeroVisual /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REDESIGNED "OUR JOURNEY" SECTION (Story)
          ══════════════════════════════════════ */}
      <section className="section journey-section" ref={storyRef} id="story">
        <div className="journey-inner">
          {/* Left: Visual mosaic */}
          <div className="journey-left" data-reveal="left">
            <div className="journey-mosaic">
              <div className="mosaic-img">
                <img src={assets.counselling} alt="EduMark counseling" />
              </div>
              <div className="mosaic-img">
                <img src={assets.counselling} alt="Students at EduMark" style={{ objectPosition: "center 30%" }} />
              </div>
              <div className="mosaic-img">
                <img src={assets.counselling} alt="EduMark office Biratnagar" style={{ objectPosition: "center 70%" }} />
              </div>
            </div>
            <div className="founding-stamp">
              <strong>2012</strong>
              <span>Est. Biratnagar</span>
            </div>
          </div>

          {/* Right: Story narrative */}
          <div className="journey-right" data-reveal="right">
            <div>
              <div className="journey-eyebrow">
                <span className="journey-eyebrow-line" />
                Our Story
              </div>
              <h2>Leading multi-destination education consultancy</h2>
              <p className="journey-story-text">
                Nestled in Biratnagar, EduMark Pvt. Ltd. represents the peak of personalized counseling and visa advisory services across Koshi Province. Over the years, we have guided hundreds of students toward the best international academic opportunities. 
                <br /><br />
                We specialize in comprehensive, end-to-end guidance including **career counseling, university selection, admission processing, visa documentation assistance, and pre-departure briefings**, all backed by transparent processes and strong institutional partnerships.
              </p>
            </div>

            {/* Stats grid */}
            <div className="journey-stats-strip">
              {STATS.map((stat) => (
                <div className="journey-stat-cell" key={stat.value}>
                  <span className="journey-stat-val">{stat.value}</span>
                  <span className="journey-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="journey-trust-row">
              <span className="trust-badge"><span className="trust-badge-dot" style={{ background: "#22c55e" }} />Registered Consultancy</span>
              <span className="trust-badge"><span className="trust-badge-dot" style={{ background: "var(--cyan)" }} />Certified Counselors</span>
              <span className="trust-badge"><span className="trust-badge-dot" style={{ background: "var(--purple)" }} />Zero Hidden Fees</span>
              <span className="trust-badge"><span className="trust-badge-dot" style={{ background: "var(--yellow)" }} />Koshi Province #1</span>
            </div>

            <AppLink to="/contact" navigate={navigate} className="primary-button">
              Visit Our Center
            </AppLink>
          </div>
        </div>
      </section>

      {/* Pillars (Mission & Vision) */}
      <section className="section" ref={pillarsRef} id="mission-vision">
        <SectionIntro eyebrow="Our Pillars" title="The Core Values that drive us" text="We guide students with standards of responsibility, ethical counseling, and measurable prep support." align="center" />
        <div className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <div className="pillar-card" key={pillar.title} style={{ borderLeft: `5px solid ${pillar.borderColor}` }} data-reveal="scale" data-delay={i + 1}>
              <div className="pillar-card-glow" style={{ background: pillar.gradient }} />
              <div className="pillar-header">
                <div className="pillar-icon-wrap" style={{ background: pillar.gradient }}>{pillar.icon}</div>
                <div><span className="pillar-tag">{pillar.tag}</span><h3>{pillar.title}</h3></div>
              </div>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEO Message */}
      <section className="section ceo-message-section" ref={ceoRef} id="ceo">
        <div className="ceo-message-inner" data-reveal="scale">
          <div className="ceo-image-side">
            <div className="ceo-image-frame">
              <img src={assets.leaders[0]} alt="Ravi Gupta, Founder & CEO" />
              <div className="ceo-image-overlay" />
            </div>
            <div className="ceo-signature-block">
              <span className="ceo-sig-text">Ravi Gupta</span>
              <span className="ceo-sig-title">Founder & CEO, EduMark</span>
            </div>
          </div>
          <div className="ceo-text-side">
            <div className="ceo-eyebrow">
              <span className="ceo-eyebrow-line" />
              Message from the CEO
            </div>
            <blockquote>
              "At EduMark, we don't just process university applications—we shape global careers with honesty, transparency, and absolute dedication. Your trust is our legacy."
            </blockquote>
            <div className="ceo-letter">
              <p>
                Dear Students and Parents,
              </p>
              <p>
                Since our foundation in 2012, EduMark has been driven by a singular commitment: providing ethical, clear, and uncompromised pathways to international education. We understand that choosing to study abroad is a life-defining decision, filled with both aspirations and anxieties. 
              </p>
              <p>
                That is why our team in Biratnagar works tirelessly to align your academic background and career goals with the finest global opportunities. We believe in providing personalized, end-to-end support—from matching you with the right course and university, to guiding you through visa documentation, mock interviews, and pre-departure briefings.
              </p>
              <p>
                Our processes are built on trust and transparency. We have no hidden charges, and we give advice that genuinely aligns with your capabilities. I invite you to visit our Traffic Chowk center and let us help you turn your aspirations into global realities.
              </p>
            </div>
            <AppLink to="/book-free-consultation" navigate={navigate} className="ceo-cta-btn-link">
              Book a Counselling Session →
            </AppLink>
          </div>
        </div>
      </section>

      {/* Leadership (Our Team) */}
      <section className="section leadership-section" ref={leadershipRef} id="team">
        <SectionIntro eyebrow="Our Counselors" title="The leadership driving EduMark" text="An experienced, certified core team working out of our Biratnagar center, assuring transparency and correct pathways." align="center" />
        <div className="leaders-layout-grid">
          {leaders.map((leader, i) => {
            const meta = LEADER_METADATA[leader.role] || { badgeIcon: "user", badgeText: "Advisor", bio: "Dedicated EduMark team member assisting students in Biratnagar.", accent: "var(--primary)", gradient: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)" };
            return (
              <article className="leader-card-premium" key={leader.name} data-reveal="scale" data-delay={i + 1}>
                <div className="leader-gradient-bar" style={{ background: meta.gradient }} />
                <div className="leader-avatar-container">
                  <div className="leader-glow-ring" />
                  <div className="leader-avatar-mask"><img src={leader.image} alt={leader.name} /></div>
                  <div className="leader-badge-pill" style={{ color: meta.accent }}><LeaderBadgeIcon icon={meta.badgeIcon} /></div>
                </div>
                <h3>{leader.name}</h3>
                <span className="leader-role-tag">{leader.role}</span>
                <p className="leader-bio-desc">{meta.bio}</p>
                <div className="leader-socials-row">
                  <a href="#" className="leader-social-link" aria-label="LinkedIn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                  <a href="#" className="leader-social-link" aria-label="Email"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Interactive Timeline (Milestones) */}
      <section className="section timeline-section" ref={milestonesRef} id="milestones">
        <SectionIntro eyebrow="Our Legacy" title="Timeline of Milestones" text="Follow our evolution from a regional startup to a multi-destination career counseling ecosystem." align="center" />
        <div className="timeline-container" data-reveal>
          <div className="timeline-nav-pills">
            {MILESTONES.map((milestone, index) => (
              <button key={milestone.year} className={`timeline-pill ${activeMilestone === index ? "is-active" : ""}`} onClick={() => setActiveMilestone(index)}>
                <span className="timeline-pill-dot" />
                <span className="timeline-pill-year">{milestone.year}</span>
              </button>
            ))}
          </div>
          <div className="timeline-card-wrapper">
            <div key={activeMilestone} className="timeline-card-content">
              <div className="timeline-text-side">
                <span className="timeline-tagline">{MILESTONES[activeMilestone].tagline}</span>
                <h3>{MILESTONES[activeMilestone].title}</h3>
                <p className="timeline-desc">{MILESTONES[activeMilestone].description}</p>
              </div>
              <div className="timeline-metric-side">
                <span className="timeline-metric-value" style={{ color: MILESTONES[activeMilestone].accent }}>{MILESTONES[activeMilestone].metric}</span>
                <span className="timeline-metric-label">{MILESTONES[activeMilestone].metricLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Trust */}
      <section className="section accreditations-section" ref={accreditationsRef} id="accreditations">
        <SectionIntro
          eyebrow="Accredited & Certified"
          title="Credibility & Trust You Can Rely On"
          text="We adhere to strict quality standards and industry regulations to ensure your future is secure."
          align="center"
        />
        <div className="accreditations-grid" data-reveal="scale">
          <div className="accreditation-card">
            <div className="accreditation-icon-wrap moe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Approved by Ministry</h3>
            <span className="accreditation-subtitle">Government of Nepal</span>
            <p>Officially approved by the Ministry of Education, Science and Technology, satisfying all national regulatory benchmarks for abroad study consultancies.</p>
          </div>

          <div className="accreditation-card">
            <div className="accreditation-icon-wrap ecan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>ECAN Member</h3>
            <span className="accreditation-subtitle">Educational Consultancy Association</span>
            <p>A proud active member of the Educational Consultancy Association of Nepal (ECAN), committing to the association's ethical standards and counseling code of conduct.</p>
          </div>

          <div className="accreditation-card">
            <div className="accreditation-icon-wrap titi">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <h3>TITI Certified</h3>
            <span className="accreditation-subtitle">Professional Training Standards</span>
            <p>Our counselors are certified by the Training Institute for Technical Instruction (TITI), guaranteeing expert career advice and visa mapping.</p>
          </div>
        </div>
      </section>

      {/* Intake Planner & CTA */}
      <section className="section intake-planner-section" ref={intakeRef} id="cta">
        <div className="intake-dark-container" data-reveal>
          <div className="intake-col-right" style={{ padding: "3rem" }}>
            <div className="planner-widget-header"><h3>Interactive Intake Planner</h3><p>Select your target destination to view timeline roadmaps & preparations.</p></div>
            <div className="planner-selector">
              {Object.keys(ROADMAPS).map((dest) => (
                <button key={dest} className={`planner-tab-btn ${activeRoadmap === dest ? "is-active" : ""}`} onClick={() => setActiveRoadmap(dest)}>{dest}</button>
              ))}
            </div>
            <div>
              <div className="roadmap-summary-row">
                <span className="roadmap-target-label">Upcoming Intakes:</span>
                <span className="roadmap-target-value">{ROADMAPS[activeRoadmap].intakes}</span>
              </div>
              <div className="roadmap-steps-list">
                {ROADMAPS[activeRoadmap].steps.map((step, idx) => (
                  <div className="roadmap-step-item" key={idx}>
                    <div className="step-circle">{idx + 1}</div>
                    <div className="step-details"><h4>{step.t}</h4><p>{step.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="intake-note-row"><span className="note-dot" /><span>EduMark provides zero service charge processing for select universities.</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}