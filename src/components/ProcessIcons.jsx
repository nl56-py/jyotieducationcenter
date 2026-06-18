import React from 'react';

export function ProcessIcon({ index }) {
    const icons = [ChatIcon, GlobeIcon, DocIcon, FolderIcon, PassportIcon, PlaneIcon];
    const Icon = icons[index % icons.length];
    return <Icon />;
}

function ChatIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="7" r="2.3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 13c.6-1.2 1.8-2 3.2-2 2 0 3.6 1.6 3.6 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.4" />
        </svg>
    );
}

function DocIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <path d="M6 2.5h9l3 3v16H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 9h6M9 12.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 17l2.5-2.5 1.5 1.5L15.5 18.5 14 19z" fill="currentColor" />
        </svg>
    );
}

function FolderIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
    );
}

function PassportIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <rect x="4" y="2" width="16" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function PlaneIcon() {
    return (
        <svg viewBox="0 0 24 24" className="process-icon-svg" fill="none">
            <path d="M2 12l8-2 4-7 2 1-2 6 6-1 2 2-6 3 1 6-2 1-3-6-6 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    );
}
