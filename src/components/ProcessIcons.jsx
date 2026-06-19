import React from 'react';

export function ProcessIcon({ index }) {
    const icons = [CounselingIcon, SelectionIcon, ApplicationIcon, DocumentationIcon, VisaIcon, PlaneIcon];
    const Icon = icons[index % icons.length];
    return <Icon />;
}

function CounselingIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Table */}
            <line x1="16" y1="44" x2="48" y2="44" strokeWidth="3.5" />
            <line x1="24" y1="44" x2="24" y2="52" />
            <line x1="40" y1="44" x2="40" y2="52" />
            
            {/* Left Person */}
            <circle cx="20" cy="24" r="6" />
            <path d="M10 44c0-6 4-8 10-8s10 2 10 8" />
            
            {/* Right Person */}
            <circle cx="44" cy="24" r="6" />
            <path d="M34 44c0-6 4-8 10-8s10 2 10 8" />
            
            {/* Speech bubble */}
            <path d="M25 14h14c2.2 0 4-1.8 4-4s-1.8-4-4-4H25c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="currentColor" opacity="0.15" strokeWidth="2" />
            <path d="M27 10h10" strokeWidth="1.5" />
        </svg>
    );
}

function SelectionIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Graduation Cap */}
            <path d="M12 22l14-7 14 7-14 7-14-7z" fill="currentColor" opacity="0.15" />
            <path d="M18 25v6c0 2.5 2.5 3.5 8 3.5s8-1 8-3.5v-6" />
            <path d="M36 22v7" />
            
            {/* Globe */}
            <circle cx="46" cy="24" r="8" />
            <path d="M38 24h16" strokeWidth="1.5" />
            <path d="M46 16v16" strokeWidth="1.5" />
            <ellipse cx="46" cy="24" rx="8" ry="3" strokeWidth="1.2" />
            
            {/* Campus/Buildings */}
            <path d="M10 52h44" strokeWidth="3" />
            <rect x="16" y="38" width="10" height="14" />
            <rect x="32" y="32" width="14" height="20" />
            <path d="M21 44h0M38 38h0M38 45h0" strokeWidth="2" />
        </svg>
    );
}

function ApplicationIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Pill button */}
            <rect x="12" y="22" width="40" height="20" rx="10" fill="#ffffff" stroke="#1c0062" strokeWidth="2.5" />
            {/* Text SUBMIT */}
            <text x="32" y="34.5" fill="#1c0062" fontSize="7.5" fontWeight="900" stroke="none" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif" letterSpacing="0.5">SUBMIT</text>
            {/* Click/Touch cursor */}
            <path d="M42 36l8 12-3.5 2-4.5-10-3.5 3.5V36z" fill="#f2a900" stroke="#1c0062" strokeWidth="1.5" />
        </svg>
    );
}

function DocumentationIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Document */}
            <path d="M22 6h16l8 8v22H22V6z" fill="currentColor" opacity="0.15" />
            <path d="M28 14h8M28 20h12" strokeWidth="2" />
            
            {/* Handshake */}
            <path d="M14 46c2-3 5-3 7-1.5l3 3.5 8-8c2.5-2.5 5.5-2.5 8 0l4 4" strokeWidth="2.5" />
            <path d="M22 41.5c1.5 0 3.5 1.5 5 3" />
            <path d="M38 41.5c-1.5 0-3.5 1.5-5 3" />
            <circle cx="30" cy="46" r="1.5" fill="currentColor" />
        </svg>
    );
}

function VisaIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Visa Card */}
            <rect x="10" y="16" width="44" height="28" rx="4" fill="#00b4d8" fillOpacity="0.15" stroke="currentColor" strokeWidth="3" />
            <text x="32" y="32.5" fill="currentColor" fontSize="10" fontWeight="900" stroke="none" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif" letterSpacing="1.5">VISA</text>
            {/* Checkmark in circle */}
            <circle cx="44" cy="34" r="8" fill="#2ec4b6" stroke="currentColor" strokeWidth="2" />
            <path d="M41 34l2 2 3.5-3.5" stroke="#ffffff" strokeWidth="2.5" />
        </svg>
    );
}

function PlaneIcon() {
    return (
        <svg viewBox="0 0 64 64" className="process-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 42l26-10 14-16-5-2.5-13 11-13-2-5-5-2 1.5 3.5 7.5-8.5 5.5-5.5-2.5-2 1.5 5 4.5 3.5 5.5z" fill="currentColor" opacity="0.15" />
            <path d="M12 44h40" strokeDasharray="4 4" strokeWidth="2" />
        </svg>
    );
}
