"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { countries } from "@/data/countries";

// Type definition for the transition context
export interface TransitionContextType {
  isTransitioning: boolean;
  activeCountry: any;
  startTransition: (country: any, toUrl: string) => void;
}

export const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useDestinationTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useDestinationTransition must be used within a DestinationTransitionProvider");
  }
  return context;
}

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCountry, setActiveCountry] = useState<any>(null);
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const startTransition = (country: any, toUrl: string) => {
    // If already transitioning, ignore
    if (isTransitioning) return;

    // Clear any previous timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Freeze current children for reveal background
    setPrevChildren(children);
    setActiveCountry(country);
    setIsTransitioning(true);

    // Step 1: Push new route at the midpoint of flight (around 700ms)
    const navTimeout = setTimeout(() => {
      router.push(toUrl);
    }, 700);
    timeoutRefs.current.push(navTimeout);

    // Step 2: Complete transition after flight exits (around 1500ms)
    const finishTimeout = setTimeout(() => {
      setIsTransitioning(false);
      setPrevChildren(null);
    }, 1500);
    timeoutRefs.current.push(finishTimeout);
  };

  // Helper to get country-specific SVG graphics for the airplane
  const renderCountryGraphics = (country: any) => {
    if (!country) return null;

    const slug = country.slug?.toLowerCase();
    
    // Canada Theme: Red wings, white body, maple leaf graphic
    if (slug === "canada") {
      return (
        <>
          <defs>
            <clipPath id="can-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="can-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Base Wings (Red) */}
          <polygon points="180,60 30,20 60,55" fill="#e3000f" />
          <polygon points="180,60 30,100 60,65" fill="#c4000b" />
          {/* Keel / Fold (White/Light Grey) */}
          <polygon points="180,60 60,55 40,60" fill="#ffffff" />
          <polygon points="180,60 60,65 40,60" fill="#e5e5e5" />
          
          {/* Maple Leaf Emblem Left Wing */}
          <g clipPath="url(#can-left)">
            <rect x="65" y="32" width="22" height="15" fill="#ffffff" transform="rotate(-10 76 39.5)" />
            {/* Red Maple Leaf */}
            <path 
              d="M76,33 L77.5,36.5 L81,35 L79,38 L81,40 L78,40.5 L78.5,43 L76,41.5 L73.5,43 L74,40.5 L71,40 L73,38 L71,35 L74.5,36.5 Z" 
              fill="#e3000f" 
              transform="rotate(-10 76 39.5)"
            />
          </g>
          {/* Maple Leaf Emblem Right Wing */}
          <g clipPath="url(#can-right)">
            <rect x="65" y="73" width="22" height="15" fill="#ffffff" transform="rotate(10 76 80.5)" />
            {/* Red Maple Leaf */}
            <path 
              d="M76,74 L77.5,77.5 L81,76 L79,79 L81,81 L78,81.5 L78.5,84 L76,82.5 L73.5,84 L74,81.5 L71,81 L73,79 L71,76 L74.5,77.5 Z" 
              fill="#e3000f" 
              transform="rotate(10 76 80.5)"
            />
          </g>
        </>
      );
    }

    // Japan Theme: White wings, red accent circles
    if (slug === "japan") {
      return (
        <>
          {/* Wings (White) */}
          <polygon points="180,60 30,20 60,55" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.5" />
          <polygon points="180,60 30,100 60,65" fill="#eeeeee" stroke="#d5d5d5" strokeWidth="0.5" />
          {/* Keel (Soft Grey) */}
          <polygon points="180,60 60,55 40,60" fill="#dedede" />
          <polygon points="180,60 60,65 40,60" fill="#cccccc" />
          
          {/* Red Circles (Hinomaru) */}
          <circle cx="85" cy="42" r="10" fill="#d62839" />
          <circle cx="85" cy="78" r="10" fill="#bc002d" />
        </>
      );
    }

    // USA Theme: Dark blue nose with white star, red/white striped wings
    if (slug === "usa") {
      return (
        <>
          <defs>
            <linearGradient id="usa-wing-l" x1="0" y1="0.3" x2="1" y2="0.3">
              <stop offset="0%" stopColor="#b31942" />
              <stop offset="20%" stopColor="#b31942" />
              <stop offset="20%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#b31942" />
              <stop offset="60%" stopColor="#b31942" />
              <stop offset="60%" stopColor="#0a3161" />
              <stop offset="100%" stopColor="#0a3161" />
            </linearGradient>
            <linearGradient id="usa-wing-r" x1="0" y1="0.7" x2="1" y2="0.7">
              <stop offset="0%" stopColor="#8d1030" />
              <stop offset="20%" stopColor="#8d1030" />
              <stop offset="20%" stopColor="#e5e5e5" />
              <stop offset="40%" stopColor="#e5e5e5" />
              <stop offset="40%" stopColor="#8d1030" />
              <stop offset="60%" stopColor="#8d1030" />
              <stop offset="60%" stopColor="#052144" />
              <stop offset="100%" stopColor="#052144" />
            </linearGradient>
            <clipPath id="usa-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="usa-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          
          {/* Wings with Striped-to-Blue Gradients */}
          <polygon points="180,60 30,20 60,55" fill="url(#usa-wing-l)" />
          <polygon points="180,60 30,100 60,65" fill="url(#usa-wing-r)" />
          
          {/* Keel (Striped/White) */}
          <polygon points="180,60 60,55 40,60" fill="#ffffff" />
          <polygon points="180,60 60,65 40,60" fill="#e5e5e5" />

          {/* White Star Left Wing */}
          <g clipPath="url(#usa-left)">
            <polygon 
              points="132,42 134,46.5 139,46.5 135,49 136.5,53.5 132.5,51 128.5,53.5 130,49 126,46.5 131,46.5" 
              fill="#ffffff" 
            />
          </g>
          {/* White Star Right Wing */}
          <g clipPath="url(#usa-right)">
            <polygon 
              points="132,78 134,82.5 139,82.5 135,85 136.5,89.5 132.5,87 128.5,89.5 130,85 126,82.5 131,82.5" 
              fill="#ffffff" 
            />
          </g>
        </>
      );
    }

    // UK Theme: Blue base with red & white Union Jack stripes
    if (slug === "uk") {
      return (
        <>
          <defs>
            <clipPath id="uk-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="uk-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Base Wings (Navy Blue) */}
          <polygon points="180,60 30,20 60,55" fill="#00247d" />
          <polygon points="180,60 30,100 60,65" fill="#001859" />
          {/* Keel (Red/White) */}
          <polygon points="180,60 60,55 40,60" fill="#cf142b" />
          <polygon points="180,60 60,65 40,60" fill="#a50f21" />

          {/* Left Wing Crosses */}
          <g clipPath="url(#uk-left)">
            {/* White Diagonals */}
            <line x1="30" y1="20" x2="180" y2="60" stroke="#ffffff" strokeWidth="8" />
            <line x1="60" y1="55" x2="105" y2="35" stroke="#ffffff" strokeWidth="8" />
            {/* Red Diagonals */}
            <line x1="30" y1="20" x2="180" y2="60" stroke="#cf142b" strokeWidth="3.5" />
            <line x1="60" y1="55" x2="105" y2="35" stroke="#cf142b" strokeWidth="3.5" />

            {/* White Cross */}
            <line x1="95" y1="15" x2="95" y2="65" stroke="#ffffff" strokeWidth="12" />
            <line x1="20" y1="41" x2="190" y2="41" stroke="#ffffff" strokeWidth="12" />
            {/* Red Cross */}
            <line x1="95" y1="15" x2="95" y2="65" stroke="#cf142b" strokeWidth="6.5" />
            <line x1="20" y1="41" x2="190" y2="41" stroke="#cf142b" strokeWidth="6.5" />
          </g>

          {/* Right Wing Crosses */}
          <g clipPath="url(#uk-right)">
            {/* White Diagonals */}
            <line x1="30" y1="100" x2="180" y2="60" stroke="#ffffff" strokeWidth="8" />
            <line x1="60" y1="65" x2="105" y2="85" stroke="#ffffff" strokeWidth="8" />
            {/* Red Diagonals */}
            <line x1="30" y1="100" x2="180" y2="60" stroke="#cf142b" strokeWidth="3.5" />
            <line x1="60" y1="65" x2="105" y2="85" stroke="#cf142b" strokeWidth="3.5" />

            {/* White Cross */}
            <line x1="95" y1="55" x2="95" y2="105" stroke="#ffffff" strokeWidth="12" />
            <line x1="20" y1="79" x2="190" y2="79" stroke="#ffffff" strokeWidth="12" />
            {/* Red Cross */}
            <line x1="95" y1="55" x2="95" y2="105" stroke="#cf142b" strokeWidth="6.5" />
            <line x1="20" y1="79" x2="190" y2="79" stroke="#cf142b" strokeWidth="6.5" />
          </g>
        </>
      );
    }

    // Australia Theme: Deep Blue wings with white stars (Southern Cross)
    if (slug === "australia") {
      return (
        <>
          <defs>
            <clipPath id="aus-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="aus-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Base Wings (Deep Royal Blue) */}
          <polygon points="180,60 30,20 60,55" fill="#000045" />
          <polygon points="180,60 30,100 60,65" fill="#000030" />
          {/* Keel */}
          <polygon points="180,60 60,55 40,60" fill="#00247d" />
          <polygon points="180,60 60,65 40,60" fill="#001a5e" />

          {/* Stars on Left Wing */}
          <g clipPath="url(#aus-left)" fill="#ffffff">
            {/* Southern Cross constellation representation */}
            <path d="M75,34 L76,36 L78,36 L76.5,37 L77,39 L75,38 L73,39 L73.5,37 L72,36 L74,36 Z" transform="scale(0.8) translate(15, 5)" />
            <path d="M88,42 L89,44 L91,44 L89.5,45 L90,47 L88,46 L86,47 L86.5,45 L85,44 L87,44 Z" transform="scale(0.8) translate(15, 5)" />
            <path d="M98,30 L99,32 L101,32 L99.5,33 L100,35 L98,34 L96,35 L96.5,33 L95,32 L97,32 Z" transform="scale(0.8) translate(15, 5)" />
            <path d="M102,46 L103,48 L105,48 L103.5,49 L104,51 L102,50 L100,51 L100.5,49 L99,48 L101,48 Z" transform="scale(0.8) translate(15, 5)" />
            <path d="M88,28 L88.7,29.4 L90.2,29.4 L89,30.1 L89.4,31.6 L88,30.7 L86.6,31.6 L87,30.1 L85.8,29.4 L87.3,29.4 Z" transform="scale(0.8) translate(15, 5)" />
          </g>
          {/* Stars on Right Wing */}
          <g clipPath="url(#aus-right)" fill="#ffffff">
            <path d="M75,82 L76,84 L78,84 L76.5,85 L77,87 L75,86 L73,87 L73.5,85 L72,84 L74,84 Z" transform="scale(0.8) translate(15, 15)" />
            <path d="M88,74 L89,76 L91,76 L89.5,77 L90,79 L88,78 L86,79 L86.5,77 L85,76 L87,76 Z" transform="scale(0.8) translate(15, 15)" />
            <path d="M98,86 L99,88 L101,88 L99.5,89 L100,91 L98,90 L96,91 L96.5,89 L95,88 L97,88 Z" transform="scale(0.8) translate(15, 15)" />
            <path d="M102,70 L103,72 L105,72 L103.5,73 L104,75 L102,74 L100,75 L100.5,73 L99,72 L101,72 Z" transform="scale(0.8) translate(15, 15)" />
          </g>
        </>
      );
    }

    // Finland Theme: White wings, blue cross
    if (slug === "finland") {
      return (
        <>
          <defs>
            <clipPath id="fin-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="fin-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Base Wings (White) */}
          <polygon points="180,60 30,20 60,55" fill="#ffffff" stroke="#f0f0f0" strokeWidth="0.5" />
          <polygon points="180,60 30,100 60,65" fill="#fcfcfc" stroke="#eaeaea" strokeWidth="0.5" />
          {/* Keel */}
          <polygon points="180,60 60,55 40,60" fill="#e8e8e8" />
          <polygon points="180,60 60,65 40,60" fill="#d8d8d8" />

          {/* Blue Cross Left Wing */}
          <g clipPath="url(#fin-left)">
            <line x1="20" y1="41" x2="190" y2="41" stroke="#002f6c" strokeWidth="9" />
            <line x1="85" y1="15" x2="85" y2="65" stroke="#002f6c" strokeWidth="9" />
          </g>
          {/* Blue Cross Right Wing */}
          <g clipPath="url(#fin-right)">
            <line x1="20" y1="79" x2="190" y2="79" stroke="#002f6c" strokeWidth="9" />
            <line x1="85" y1="55" x2="85" y2="105" stroke="#002f6c" strokeWidth="9" />
          </g>
        </>
      );
    }

    // Lithuania Theme: Yellow, Green, Red Stripes
    if (slug === "lithuania") {
      return (
        <>
          <defs>
            <linearGradient id="lt-grad-l" x1="0" y1="0.3" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdb913" />
              <stop offset="35%" stopColor="#fdb913" />
              <stop offset="35%" stopColor="#00966e" />
              <stop offset="70%" stopColor="#00966e" />
              <stop offset="70%" stopColor="#c1272d" />
              <stop offset="100%" stopColor="#c1272d" />
            </linearGradient>
            <linearGradient id="lt-grad-r" x1="0" y1="0" x2="0" y2="0.7">
              <stop offset="0%" stopColor="#aa1f24" />
              <stop offset="35%" stopColor="#aa1f24" />
              <stop offset="35%" stopColor="#007252" />
              <stop offset="70%" stopColor="#007252" />
              <stop offset="70%" stopColor="#caa400" />
              <stop offset="100%" stopColor="#caa400" />
            </linearGradient>
          </defs>
          {/* Wings with Tricolor Stripe Gradients */}
          <polygon points="180,60 30,20 60,55" fill="url(#lt-grad-l)" />
          <polygon points="180,60 30,100 60,65" fill="url(#lt-grad-r)" />
          {/* Keel */}
          <polygon points="180,60 60,55 40,60" fill="#00966e" />
          <polygon points="180,60 60,65 40,60" fill="#007252" />
        </>
      );
    }

    // South Korea Theme: White wings, red/blue yin-yang emblem, black trigrams
    if (slug === "south-korea") {
      return (
        <>
          <defs>
            <clipPath id="sk-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="sk-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Base Wings (White) */}
          <polygon points="180,60 30,20 60,55" fill="#ffffff" stroke="#eeeeee" strokeWidth="0.5" />
          <polygon points="180,60 30,100 60,65" fill="#fafafa" stroke="#e0e0e0" strokeWidth="0.5" />
          {/* Keel */}
          <polygon points="180,60 60,55 40,60" fill="#eaeaea" />
          <polygon points="180,60 60,65 40,60" fill="#dadada" />

          {/* Left Wing Graphics */}
          <g clipPath="url(#sk-left)">
            {/* Taegeuk Circle (Red top, Blue bottom) */}
            <g transform="translate(85, 42) rotate(-30) scale(0.7)">
              <circle cx="0" cy="0" r="10" fill="#cd113b" />
              <path d="M-10,0 A5,5 0 0,0 0,0 A5,5 0 0,1 10,0 A10,10 0 0,1 -10,0 Z" fill="#0047a0" />
            </g>
            {/* Black Trigrams (Simplified) */}
            <rect x="58" y="32" width="6" height="1.5" fill="#000000" transform="rotate(-15 61 33)" />
            <rect x="58" y="35" width="6" height="1.5" fill="#000000" transform="rotate(-15 61 36)" />
            <rect x="110" y="45" width="6" height="1.5" fill="#000000" transform="rotate(-15 113 46)" />
          </g>

          {/* Right Wing Graphics */}
          <g clipPath="url(#sk-right)">
            {/* Taegeuk Circle */}
            <g transform="translate(85, 78) rotate(30) scale(0.7)">
              <circle cx="0" cy="0" r="10" fill="#cd113b" />
              <path d="M-10,0 A5,5 0 0,0 0,0 A5,5 0 0,1 10,0 A10,10 0 0,1 -10,0 Z" fill="#0047a0" />
            </g>
          </g>
        </>
      );
    }

    // India Theme: Saffron, White, Green Tricolor, blue Ashoka Chakra
    if (slug === "india") {
      return (
        <>
          <defs>
            <linearGradient id="in-grad-l" x1="0" y1="0.3" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff9933" />
              <stop offset="35%" stopColor="#ff9933" />
              <stop offset="35%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#128807" />
              <stop offset="100%" stopColor="#128807" />
            </linearGradient>
            <linearGradient id="in-grad-r" x1="0" y1="0" x2="0" y2="0.7">
              <stop offset="0%" stopColor="#0b5e04" />
              <stop offset="35%" stopColor="#0b5e04" />
              <stop offset="35%" stopColor="#dddddd" />
              <stop offset="70%" stopColor="#dddddd" />
              <stop offset="70%" stopColor="#d6781b" />
              <stop offset="100%" stopColor="#d6781b" />
            </linearGradient>
            <clipPath id="in-left"><polygon points="180,60 30,20 60,55" /></clipPath>
            <clipPath id="in-right"><polygon points="180,60 30,100 60,65" /></clipPath>
          </defs>
          {/* Wings with Indian Tricolor Gradients */}
          <polygon points="180,60 30,20 60,55" fill="url(#in-grad-l)" />
          <polygon points="180,60 30,100 60,65" fill="url(#in-grad-r)" />
          {/* Keel */}
          <polygon points="180,60 60,55 40,60" fill="#ffffff" />
          <polygon points="180,60 60,65 40,60" fill="#e5e5e5" />

          {/* Blue Ashoka Chakra Left Wing */}
          <g clipPath="url(#in-left)">
            <circle cx="85" cy="42" r="5" fill="none" stroke="#000080" strokeWidth="1" />
            <circle cx="85" cy="42" r="1" fill="#000080" />
            {/* Draw spokes */}
            <line x1="85" y1="37" x2="85" y2="47" stroke="#000080" strokeWidth="0.5" />
            <line x1="80" y1="42" x2="90" y2="42" stroke="#000080" strokeWidth="0.5" />
            <line x1="81.5" y1="38.5" x2="88.5" y2="45.5" stroke="#000080" strokeWidth="0.5" />
            <line x1="81.5" y1="45.5" x2="88.5" y2="38.5" stroke="#000080" strokeWidth="0.5" />
          </g>
          {/* Blue Ashoka Chakra Right Wing */}
          <g clipPath="url(#in-right)">
            <circle cx="85" cy="78" r="5" fill="none" stroke="#000080" strokeWidth="1" />
            <circle cx="85" cy="78" r="1" fill="#000080" />
            <line x1="85" y1="73" x2="85" y2="83" stroke="#000080" strokeWidth="0.5" />
            <line x1="80" y1="78" x2="90" y2="78" stroke="#000080" strokeWidth="0.5" />
            <line x1="81.5" y1="74.5" x2="88.5" y2="81.5" stroke="#000080" strokeWidth="0.5" />
            <line x1="81.5" y1="81.5" x2="88.5" y2="74.5" stroke="#000080" strokeWidth="0.5" />
          </g>
        </>
      );
    }

    // Default Fallback: Color-themed based on country accent
    const accentColor = country.accent || "#08a8d7";
    return (
      <>
        {/* Left Wing */}
        <polygon points="180,60 30,20 60,55" fill={accentColor} />
        {/* Right Wing */}
        <polygon points="180,60 30,100 60,65" fill={accentColor} opacity="0.85" />
        {/* Keel / Body */}
        <polygon points="180,60 60,55 40,60" fill="#ffffff" />
        <polygon points="180,60 60,65 40,60" fill="#eeeeee" />
      </>
    );
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, activeCountry, startTransition }}>
      <div className="destinations-transition-container">
        {/* Old page (background) */}
        {isTransitioning && prevChildren && (
          <div className="old-page-wrapper">
            {prevChildren}
          </div>
        )}

        {/* New/Current page (foreground with clip-path wipe reveal) */}
        <div className={`new-page-wrapper ${isTransitioning ? "transition-reveal-active" : ""}`}>
          {children}
        </div>
      </div>

      {/* Cinematic Transition Overlay */}
      <div className={`airplane-transition-overlay ${isTransitioning ? "active" : ""}`}>
        {activeCountry && (
          <div className="transition-airplane-container">
            {/* SVG Wind Trails (Behind the plane) */}
            <svg className="airplane-wind-trails" viewBox="0 0 260 130">
              {/* Trail 1: Top Wing Tip */}
              <path 
                className="wind-trail-line wind-trail-line-1"
                d="M 15,20 C -20,25 -50,45 -90,50" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.45)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              {/* Trail 2: Tail / Core */}
              <path 
                className="wind-trail-line wind-trail-line-2"
                d="M 25,60 C -10,62 -45,63 -85,60" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.55)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              {/* Trail 3: Bottom Wing Tip */}
              <path 
                className="wind-trail-line wind-trail-line-3"
                d="M 15,100 C -20,95 -50,85 -90,80" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.45)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
            </svg>

            {/* SVG Paper Airplane (3D Folded Origami) */}
            <svg 
              viewBox="0 0 200 120" 
              style={{ 
                width: "100%", 
                height: "100%", 
                filter: "drop-shadow(0 15px 18px rgba(8, 31, 61, 0.32))"
              }}
            >
              {renderCountryGraphics(activeCountry)}
            </svg>
          </div>
        )}
      </div>
    </TransitionContext.Provider>
  );
}
