---
name: sri-lakshmi-travels-ui
description: >
  Production-grade UI/UX development skill for the Sri Lakshmi Travels website —
  a professional travel booking platform built with Vite + React + Tailwind CSS +
  React Router DOM + Axios (MERN stack). Use this skill for EVERY component, page,
  layout, and UI element you build in this project. Covers the complete design
  system, component architecture, routing conventions, API integration patterns,
  accessibility standards, animation guidelines, and page-by-page implementation
  rules. Triggers: any mention of "travels website", "Sri Lakshmi", "SLT", a page
  name from the 25-page sitemap, or any React/Tailwind component task for this project.
license: Project-specific — Sri Lakshmi Travels © 2025
---

# Sri Lakshmi Travels — Complete Gemini 2.5 Pro Prompts
### Design: Deep Green & Gold Luxury | Vite + React + Tailwind CSS
### Use each prompt separately — one per page file

---

> **HOW TO USE THESE PROMPTS:**
> 1. Open Gemini 2.5 Pro
> 2. Copy ONE prompt at a time (copy the full block between the dashed lines)
> 3. Paste it into Gemini and press Send
> 4. Save the output as the filename shown at the top of each prompt
> 5. Repeat for all 5 pages

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PROMPT 1 — HOME PAGE (`src/pages/Home.jsx`)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
You are a Senior Full-Stack Developer and UI/UX Architect with 20+ years of experience 
building premium travel websites. Generate a complete, production-ready React component 
for the HOME PAGE of "Sri Lakshmi Travels" — a luxury car rental service based in Tamil 
Nadu, India. Save this file as: src/pages/Home.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK (never deviate):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Vite + React 18 (JSX only, no TypeScript)
- Tailwind CSS v3 (utility classes only, no inline styles, no styled-components)
- React Router DOM v6 (use <Link> for internal navigation)
- Lucide React (icons)
- Swiper.js React wrapper (for carousels)
- No Redux, no Bootstrap, no MUI, no fetch() — use Axios for any API calls
- All images: use real Unsplash URLs (format: https://images.unsplash.com/photo-XXXXXXXX?w=1200&q=80)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Colors:
  --green-dark:   #0A2E1A  (primary background, navbar, footer)
  --green-mid:    #14532D  (section backgrounds, card overlays)
  --green-light:  #166534  (hover states, borders)
  --gold:         #D4A017  (accent, CTAs, highlights, stars, badges)
  --gold-light:   #F59E0B  (hover on gold)
  --cream:        #FEF9EE  (light section backgrounds, text on dark)
  --white:        #FFFFFF

Fonts (import from Google Fonts in index.html):
  Display/Headlines: "Playfair Display" (serif, bold, elegant)
  Body/UI: "DM Sans" (clean, modern, readable)

Design Aesthetic: LUXURY MINIMALISM
  - Dark deep green backgrounds with gold accents
  - Generous whitespace
  - Large, cinematic hero image
  - Glass morphism cards (backdrop-blur)
  - Subtle grain texture overlay on hero
  - Gold underline decorations on headings
  - Smooth entrance animations on scroll

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAVBAR (fixed, transparent → solid on scroll):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Logo: "SLT" badge in gold + "Sri Lakshmi Travels" in Playfair Display white
- Links: Home, Cars, Features, About, Contact (use React Router <Link>)
- Right side: "Sign In" (outlined gold button) + "Book Now" (solid gold button)
- On scroll > 80px: add bg-[#0A2E1A]/95 backdrop-blur-md shadow-xl
- Mobile: hamburger menu with full-screen dark green overlay drawer
- Animate: smooth transition-all duration-300

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — HERO (full viewport height):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: Use this Unsplash image as hero bg (dark car on road at night):
  https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85

Overlay: deep green-to-transparent gradient from left: 
  from-[#0A2E1A]/90 via-[#0A2E1A]/50 to-transparent

3D Animation Effects on hero image:
  - CSS @keyframes: slow Ken Burns effect — scale from 1.0 to 1.08 over 12s, infinite alternate, ease-in-out
  - Apply to the background image wrapper with transform-origin: center
  - Add subtle parallax on scroll using useEffect + window.scrollY (move image at 0.3x scroll speed)
  - Floating particle dots (5–8 gold dots, CSS animation: float up and fade, random positions)
  - Grain texture overlay: use CSS background-image: url("data:image/svg+xml,...") with opacity-10

Left content (z-10 relative):
  - Small badge: "✦ Est. 1995 — 30 Years of Trust" — gold pill badge
  - H1 in Playfair Display: "Premium Car Rentals" (white, text-5xl to text-7xl)
  - Subtitle: "Across Tamil Nadu" (gold, text-3xl, italic)
  - Body: "Luxury sedans, SUVs & tempo travellers — with professional drivers. 
    Your journey, our pride." (cream, text-lg, max-w-lg)
  - Gold horizontal divider line (w-16, h-0.5)
  - Two buttons: "Explore Cars →" (solid gold, rounded-xl, shadow-gold) + 
    "View Packages" (outlined gold, rounded-xl)
  - Car type pills below buttons: "Swift Dzire · Toyota Innova · Tempo Traveller · Luxury"

RIGHT SIDE — Booking Widget (glass card floating on right half of hero):
  Glass card styles: bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl
  Title: "Book Your Ride" (white, Playfair Display, text-xl)
  Inputs (all styled: bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3):
    - Pickup Location (text input with MapPin icon)
    - Drop Location (text input with MapPin icon)
    - Pickup Date (date picker)
    - Return Date (date picker)
    - Car Type (dropdown: Sedan / SUV / Tempo Traveller / Luxury)
    - Number of Adults (number selector: 1–20 with +/- buttons)
    - Number of Children (number selector: 0–10 with +/- buttons)
  Submit Button: full-width gold button "Check Availability →" (text-lg, py-4, rounded-xl)
  Below button: "Free cancellation · No hidden charges" (small cream text, centered)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — STATS BAR (dark green bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4 stats in a horizontal row, separated by vertical gold lines:
  - 30+ Years Experience
  - 10,000+ Happy Customers  
  - 50+ Destinations Covered
  - 24/7 Customer Support
Each stat: large gold number + white label below, Playfair Display for number.
Animate: count-up animation when scrolled into view (use IntersectionObserver).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — OUR FLEET (cream bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section title: "Our Fleet" with gold underline decoration
Subtitle: "Every journey deserves the right vehicle"

4 car cards in a responsive grid (1 col mobile → 2 → 4 desktop):
Each card: rounded-2xl overflow-hidden shadow-xl group cursor-pointer

Card 1 — Swift Dzire (Sedan):
  Image: https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80
  Badge: "Most Popular" (gold pill)
  Name: "Swift Dzire" | Type: "Sedan"
  Features: 4 Seats · AC · Luggage · Music System
  Price: "Starting ₹12/km"
  Button: "Book Now" (gold)

Card 2 — Toyota Innova (SUV):
  Image: https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80
  Badge: "Family Favourite" (green pill)
  Name: "Toyota Innova" | Type: "Premium SUV"
  Features: 7 Seats · AC · Spacious · GPS
  Price: "Starting ₹18/km"
  Button: "Book Now" (gold)

Card 3 — Tempo Traveller (Van):
  Image: https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80
  Badge: "Group Travel" (gold pill)
  Name: "Tempo Traveller" | Type: "Mini Van"
  Features: 12–17 Seats · AC · Pushback Seats
  Price: "Starting ₹25/km"
  Button: "Book Now" (gold)

Card 4 — Luxury (Mercedes/BMW):
  Image: https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80
  Badge: "Premium" (dark gold pill)
  Name: "Luxury Cars" | Type: "Business Class"
  Features: 4 Seats · Leather · Champagne · WiFi
  Price: "Starting ₹45/km"
  Button: "Book Now" (gold)

Card hover effects:
  - Image: scale-110 (zoom in) with overflow-hidden
  - Card: translateY(-8px) shadow-2xl
  - Overlay: gradient appears from bottom

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — WHY CHOOSE US (dark green bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section title: "Why Sri Lakshmi Travels?" (white, Playfair Display)
Gold underline decoration

6 feature cards in 2x3 grid (glass morphism: bg-white/5 backdrop-blur border-white/10):
  1. 🛡️ Verified Drivers — Background-checked, licensed professionals
  2. ⚡ Instant Booking — Confirm in under 2 minutes
  3. 💰 Best Prices — Price-match guarantee, no hidden fees
  4. 🕐 24/7 Support — Always available by call or WhatsApp
  5. 🗺️ GPS Tracked — Real-time vehicle tracking for safety
  6. ✨ Clean Vehicles — Sanitized before every trip

Each card: gold icon circle top-left + white title + cream description
Hover: border-gold/40 glow effect

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — POPULAR PACKAGES (cream bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section title: "Popular Packages"
3 package cards (horizontal layout: image left, details right):

Package 1: Chennai → Tirupati Darshan
  Image: https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80
  Duration: 2 Days | Cab: Innova | Price: ₹4,999/person
  Highlights: Temple visit, Hotel stay, Breakfast included

Package 2: Ooty Hill Station Tour  
  Image: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80
  Duration: 3 Days | Cab: Tempo Traveller | Price: ₹6,999/person
  Highlights: Botanical Garden, Boat House, Tea Estates

Package 3: Rameswaram Pilgrimage
  Image: https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80
  Duration: 2 Days | Cab: Swift Dzire | Price: ₹3,499/person
  Highlights: Agni Teertham, Ramanathaswamy Temple

Each card: rounded-2xl shadow-lg, left image with group-hover:scale-105, gold "Book Package" button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — TESTIMONIALS (dark green bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: "What Our Customers Say"
Swiper.js carousel with autoplay (3000ms), loop, 1 slide on mobile → 2 → 3 on desktop

3 testimonials:
  1. "Rajesh Kumar, Chennai" — 5 stars — "The Innova was spotless and driver was very professional. 
     Best experience for our Tirupati trip!"
  2. "Priya Subramanian, Coimbatore" — 5 stars — "Booked Tempo Traveller for family trip to Ooty. 
     Excellent service, will book again!"
  3. "Mohammed Farhan, Madurai" — 5 stars — "Luxury car for corporate event. Driver was 
     punctual and the car was premium quality."

Each testimonial card: glass morphism, large quote icon (gold), star rating (gold stars), 
avatar circle (initials), name + city below.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — FOOTER (dark: #0A2E1A bg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4-column layout:
  Col 1: Logo + tagline + "Est. 1995" + social icons (gold)
  Col 2: Quick Links (Home, Cars, Features, About, Contact)
  Col 3: Our Fleet (Swift Dzire, Toyota Innova, Tempo Traveller, Luxury)
  Col 4: Contact (📍 Tamil Nadu, India | 📞 +91 98765 43210 | ✉️ info@srilakshmitravels.com)
Bottom bar: "© 2025 Sri Lakshmi Travels. All rights reserved." + WhatsApp floating button (green circle, bottom-right)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCROLL ANIMATIONS (add to ALL sections):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use IntersectionObserver to add class "visible" when element enters viewport.
CSS: opacity-0 translateY(30px) → opacity-100 translateY(0) with transition 0.6s ease
Stagger children with animation-delay: 0.1s, 0.2s, 0.3s...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Output ONLY the complete JSX code for Home.jsx — no explanation, no markdown wrapper
- Use real Unsplash image URLs exactly as provided (never use placeholder.com or lorem picsum)
- Never use AI-generated image prompts — use the exact Unsplash URLs given above
- Mobile-first responsive design (write base styles first, then md: and lg: breakpoints)
- Export as: export default function Home() { ... }
- All internal links use React Router <Link to="/...">
- WhatsApp button: href="https://wa.me/919876543210" target="_blank"
- Add /* Section: SectionName */ comments for readability
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PROMPT 2 — FEATURES PAGE (`src/pages/Features.jsx`)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
You are a Senior Full-Stack Developer and UI/UX Architect with 20+ years of experience 
building premium travel websites. Generate a complete, production-ready React component 
for the FEATURES PAGE of "Sri Lakshmi Travels". Save this file as: src/pages/Features.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK: Vite + React 18 JSX | Tailwind CSS v3 | React Router DOM v6 | Lucide React
FONTS: "Playfair Display" (headings) + "DM Sans" (body) — import in index.html
COLORS: Primary #0A2E1A (dark green) | Accent #D4A017 (gold) | Cream #FEF9EE | White #FFFFFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — PAGE HERO (60vh height):
Background image with dark green overlay:
  https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85
Overlay: from-[#0A2E1A]/90 to-[#0A2E1A]/60
3D Ken Burns animation: slow zoom from scale(1) to scale(1.06) over 10s infinite alternate
Center content:
  - Breadcrumb: "Home / Features" (gold text, small)
  - H1: "Why Choose Us" (Playfair Display, white, text-5xl to text-6xl)
  - Gold decorative line below heading (w-24, h-0.5, bg-gold, mx-auto)
  - Subtitle: "Every journey with Sri Lakshmi Travels is crafted for your comfort, 
    safety, and peace of mind." (cream, text-lg, max-w-2xl, centered)

SECTION 2 — MAIN FEATURES GRID (cream bg):
Title: "Our Premium Features" with gold underline
8 feature cards in responsive grid (1 → 2 → 4 columns):
Each card: rounded-2xl bg-white shadow-lg border-b-4 border-[#D4A017] p-8
Hover: translateY(-6px) shadow-2xl transition-all duration-300

Feature 1: Shield Check icon (gold)
  Title: "Verified & Licensed Drivers"
  Desc: "All our drivers undergo thorough background checks, license verification, 
  and professional training. Your safety is our top priority on every trip."

Feature 2: Clock icon (gold)
  Title: "On-Time Guarantee"
  Desc: "We respect your time. Our drivers arrive 15 minutes before pickup and 
  follow optimized routes to ensure you reach on time, every time."

Feature 3: CreditCard icon (gold)
  Title: "Transparent Pricing"
  Desc: "No hidden charges, no surprise fees. What you see is what you pay. 
  Get detailed fare breakdowns before confirming your booking."

Feature 4: HeadphonesIcon (gold)
  Title: "24/7 Customer Support"
  Desc: "Our support team is available round the clock via phone, WhatsApp, 
  and email. We're always here when you need us."

Feature 5: MapPin icon (gold)
  Title: "Real-Time GPS Tracking"
  Desc: "Track your vehicle live during the journey. Share your trip with 
  family for added peace of mind on every route."

Feature 6: Star icon (gold)
  Title: "Premium Vehicle Fleet"
  Desc: "From budget sedans to luxury cars — all vehicles are less than 3 years 
  old, fully serviced, and sanitized before every trip."

Feature 7: Wifi icon (gold)
  Title: "In-Car Amenities"
  Desc: "Enjoy complimentary WiFi, charging ports, bottled water, and music 
  system in all our vehicles for a comfortable journey."

Feature 8: Award icon (gold)
  Title: "30 Years of Trust"
  Desc: "Established in 1995, Sri Lakshmi Travels has been the preferred travel 
  partner for over 10,000 families across Tamil Nadu."

SECTION 3 — HOW IT WORKS (dark green bg):
Title: "Book in 3 Simple Steps" (white, Playfair Display)
3 steps in horizontal flow with connecting gold arrow/line between them:

Step 1: "Choose Your Vehicle"
  Icon: Car (large, gold circle bg)
  Desc: "Browse our fleet and pick the perfect car for your trip — sedan, SUV, 
  or tempo traveller."

Step 2: "Enter Trip Details"
  Icon: Calendar (large, gold circle bg)
  Desc: "Enter pickup location, destination, date, and number of passengers. 
  Get instant price estimate."

Step 3: "Confirm & Relax"
  Icon: CheckCircle (large, gold circle bg)
  Desc: "Confirm your booking, receive driver details on WhatsApp, and enjoy 
  your journey stress-free."

Gold dashed connecting line between steps (hidden on mobile, visible md+).
Below steps: CTA button "Book Your First Ride →" (solid gold, rounded-xl, large)

SECTION 4 — COMPARISON TABLE (cream bg):
Title: "Compare Our Vehicles"
Responsive table (scroll-x on mobile):
Columns: Feature | Swift Dzire | Toyota Innova | Tempo Traveller | Luxury
Rows:
  - Seating Capacity | 4 | 7 | 12–17 | 4
  - AC | ✅ | ✅ | ✅ | ✅
  - Luggage Space | Standard | Large | Extra Large | Premium
  - GPS Tracking | ✅ | ✅ | ✅ | ✅
  - WiFi | ❌ | ❌ | ❌ | ✅
  - Starting Price | ₹12/km | ₹18/km | ₹25/km | ₹45/km
  - Best For | City travel | Family trips | Group tours | Corporate

Table header row: bg-[#0A2E1A] text-white | Alternating rows: white / cream
Gold accent on "Recommended" column (Toyota Innova): add "Most Popular" badge in header

SECTION 5 — SAFETY STANDARDS (dark green bg):
Title: "Your Safety, Our Promise"
Two-column layout (image left, content right) on desktop, stacked on mobile:

Left: Real image of car interior / road safety:
  https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80
  Rounded-2xl, shadow-2xl, slight rotation: rotate-1

Right content:
  4 safety points (each with gold checkmark icon):
  ✅ Regular vehicle servicing and inspection every 5,000 km
  ✅ Drivers trained in defensive driving and first aid
  ✅ Emergency SOS button integrated in our app
  ✅ All trips insured with comprehensive travel insurance

Gold CTA: "Learn More About Safety →" (outlined gold button)

SECTION 6 — CERTIFICATIONS STRIP (cream bg):
Title: "Trusted & Certified"
5 trust badges in a horizontal row (centered, wrapping on mobile):
  🏆 ISO 9001:2015 | 🛡️ Tourism Dept. Approved | ⭐ Google 4.9★ | 
  📋 Licensed Operators | 💚 Eco-Friendly Fleet

Each badge: rounded-full border-2 border-[#D4A017]/30 px-6 py-3 bg-white shadow

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCROLL ANIMATIONS: IntersectionObserver fade+slide-up on all sections.
IMPORTANT: Output ONLY the complete JSX code. Export as: export default function Features() { ... }
Use exact Unsplash URLs provided. No placeholder images.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PROMPT 3 — ABOUT PAGE (`src/pages/About.jsx`)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
You are a Senior Full-Stack Developer and UI/UX Architect with 20+ years of experience 
building premium travel websites. Generate a complete, production-ready React component 
for the ABOUT PAGE of "Sri Lakshmi Travels". Save this file as: src/pages/About.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK: Vite + React 18 JSX | Tailwind CSS v3 | React Router DOM v6 | Lucide React
FONTS: "Playfair Display" (headings) + "DM Sans" (body)
COLORS: Primary #0A2E1A | Gold #D4A017 | Cream #FEF9EE | White #FFFFFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — HERO (55vh):
Background: https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85
Overlay: dark green left-to-right gradient
Ken Burns animation: slow zoom in 12s infinite
Center content:
  - Breadcrumb: "Home / About"
  - H1: "Our Story" (Playfair Display, white, large)
  - Subtitle: "30 years of journeys. Thousands of smiles. One mission."
  - Gold divider line

SECTION 2 — STORY SPLIT (cream bg):
Left: Large real photo — Tamil Nadu landscape / road trip feel:
  https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80
  rounded-2xl shadow-2xl with slight float animation (CSS: translateY 0 ↔ -8px, 4s ease infinite)

Right: Story text
  Gold badge: "Est. 1995"
  H2: "From One Car to a Fleet of Trust"
  Body (3 paragraphs):
    Para 1: "Sri Lakshmi Travels was born in 1995 in the heart of Tamil Nadu, 
    with a single vehicle and an unwavering commitment to safe, comfortable travel. 
    Our founder Mr. Lakshmi Narayanan started with a simple belief — that every 
    traveller deserves respect, safety, and a smile."
    
    Para 2: "Over three decades, we have grown into one of Tamil Nadu's most 
    trusted car rental services, serving pilgrims to Tirupati and Rameswaram, 
    corporate clients across Chennai, and families seeking memorable hill station 
    holidays in Ooty and Kodaikanal."
    
    Para 3: "Today, our fleet includes Swift Dzires, Toyota Innovas, Tempo 
    Travellers, and luxury vehicles — all managed by a team of dedicated 
    professionals who treat every journey as their own."

  4 mini-stats below text:
    30+ Years | 50+ Destinations | 200+ Drivers | 10,000+ Trips

SECTION 3 — MISSION & VISION (dark green bg, 2-col):
Left card (glass morphism):
  🎯 Our Mission
  Gold icon + white title
  "To provide safe, reliable, and comfortable transportation across Tamil Nadu, 
  making every journey a memorable experience through professionalism, 
  transparency, and genuine care for our customers."

Right card (glass morphism):
  👁️ Our Vision
  Gold icon + white title
  "To become South India's most trusted travel partner by 2030, expanding our 
  fleet to 500+ vehicles while maintaining the same personal touch that has 
  defined us since 1995."

SECTION 4 — TIMELINE (cream bg):
Title: "Our Journey Through the Years"
Vertical timeline with alternating left-right entries (centered line, gold dots):

1995 — "The Beginning" 
  Started with 1 Ambassador car in Madurai. First customer was a pilgrim to Rameswaram.

2000 — "Growing the Fleet"
  Expanded to 10 vehicles. Added Toyota Qualis for family trips across Tamil Nadu.

2008 — "Digital Leap"
  First website launched. Online inquiries became 40% of total bookings.

2015 — "Corporate Partnerships"
  Signed contracts with 5 major IT companies in Chennai for employee transportation.

2020 — "Pandemic Resilience"
  Pivoted to medical transportation and essential services. Never laid off a single driver.

2024 — "Premium Fleet Launch"
  Added luxury cars (Mercedes, BMW) for weddings and corporate events.

2025 — "Digital Booking Platform"
  Launched new website with real-time booking, GPS tracking, and WhatsApp integration.

Each timeline entry: gold dot + year badge (gold) + title (Playfair Display) + body

SECTION 5 — TEAM (dark green bg):
Title: "The People Behind Your Journey"
3 team cards centered:

Card 1: 
  Avatar: https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80
  Name: "Mr. Lakshmi Narayanan" | Role: "Founder & Managing Director"
  Bio: "30+ years in travel. Started with one car. Now oversees 200+ professionals."

Card 2:
  Avatar: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80
  Name: "Mrs. Kavitha Narayanan" | Role: "Operations Director"
  Bio: "Manages fleet operations and customer experience across all routes."

Card 3:
  Avatar: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80
  Name: "Mr. Santhosh Kumar" | Role: "Head of Technology"
  Bio: "Drives our digital transformation — booking systems, GPS, and customer apps."

Each card: dark green glass bg, round avatar image (ring-2 ring-gold), gold role badge below name.
Hover: border-gold glow + translateY(-4px)

SECTION 6 — AWARDS & RECOGNITION (cream bg):
Title: "Awards & Recognition"
5 award cards in a row (scroll on mobile):
  🏆 Best Car Rental — Tamil Nadu Tourism Awards 2022
  ⭐ 4.9/5 — Google Reviews (500+ ratings)  
  📋 Certified — Tourism Department of Tamil Nadu
  🌿 Eco-Friendly Fleet Award — 2023
  💼 Preferred Partner — MakeMyTrip & Cleartrip

Each card: bordered, centered, gold icon top, dark green title.

SECTION 7 — CTA BANNER (dark green bg):
Big centered CTA:
  H2: "Ready to Travel with Us?" (Playfair Display, white)
  Body: "Join 10,000+ happy travelers who trust Sri Lakshmi Travels for every journey."
  Two buttons: "Book Now →" (solid gold) + "Contact Us" (outlined gold)
  Background: subtle gold diagonal stripe pattern using CSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCROLL ANIMATIONS on all sections. Timeline entries animate in alternately.
IMPORTANT: Output ONLY the complete JSX. Export: export default function About() { ... }
Use exact Unsplash URLs. No placeholder images.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PROMPT 4 — CONTACT PAGE (`src/pages/Contact.jsx`)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
You are a Senior Full-Stack Developer and UI/UX Architect with 20+ years of experience 
building premium travel websites. Generate a complete, production-ready React component 
for the CONTACT PAGE of "Sri Lakshmi Travels". Save this file as: src/pages/Contact.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK: Vite + React 18 JSX | Tailwind CSS v3 | Lucide React | React Hook Form + Yup
FONTS: "Playfair Display" (headings) + "DM Sans" (body)
COLORS: Primary #0A2E1A | Gold #D4A017 | Cream #FEF9EE | White #FFFFFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — HERO (50vh):
Background: https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=85
Dark green overlay
Center content: "Get In Touch" (Playfair Display, white, large) + gold subtitle 
"We're always here to help — call, WhatsApp, or drop us a message."
Ken Burns animation on background

SECTION 2 — CONTACT MAIN (cream bg):
Two-column layout (stacked mobile → side-by-side lg):

LEFT COLUMN — Contact Info Cards:
  Title: "Talk to Us" (dark green, Playfair Display)

  Card 1 (white, shadow, rounded-2xl, hover:shadow-xl):
    📞 Phone
    Icon: Phone (gold)
    "+91 98765 43210" (dark green, bold, large)
    "Available 24/7 — call anytime"
    Button: "Call Now" (outlined gold, small)

  Card 2:
    💬 WhatsApp
    Icon: MessageCircle (gold)
    "+91 98765 43210" (large)
    "Fastest response — usually within 5 mins"
    Button: "Open WhatsApp" (green filled, opens wa.me link)

  Card 3:
    ✉️ Email
    Icon: Mail (gold)
    "info@srilakshmitravels.com"
    "We reply within 2 hours during business hours"
    Button: "Send Email" (outlined gold)

  Card 4:
    📍 Office Address
    Icon: MapPin (gold)
    "No. 45, Gandhi Nagar Main Road,
    Madurai — 625001, Tamil Nadu, India"
    "Mon–Sat: 8:00 AM – 9:00 PM"

  Under cards: Google Maps embed placeholder (use iframe with a Madurai, Tamil Nadu map 
  embed URL or a static map image). Rounded-xl, overflow-hidden, h-48.

RIGHT COLUMN — Contact Form:
  White bg card, shadow-2xl, rounded-3xl, p-8
  Title: "Send Us a Message" (Playfair Display, dark green)

  Form fields (use React Hook Form, validate with Yup):
    - Full Name* (text, min 3 chars)
    - Email Address* (email validation)  
    - Phone Number* (Indian mobile: 10 digits starting 6–9)
    - Subject (dropdown: General Inquiry / Booking Query / Complaint / Partnership / Other)
    - Pickup Location (text)
    - Travel Date (date, must be future)
    - Message* (textarea, 4 rows, max 500 chars, show live character count)
    
  All inputs styled: border border-[#0A2E1A]/20 rounded-xl px-4 py-3 focus:ring-2 
    focus:ring-[#D4A017] focus:border-transparent text-gray-800

  Error messages: small red text below each field
  
  Submit Button: full-width "#0A2E1A" bg with gold text "Send Message →" 
    Loading state: spinner inside button + "Sending..."
    Success state: green checkmark + "Message sent! We'll reply within 2 hours."

  Note below button: "🔒 Your information is 100% secure and never shared."

SECTION 3 — OPERATING HOURS (dark green bg):
Title: "We're Available" (white)
Two-column grid of time cards:

  📅 Monday – Friday: 8:00 AM – 9:00 PM
  📅 Saturday: 8:00 AM – 7:00 PM  
  📅 Sunday: 9:00 AM – 5:00 PM
  ☎️ Emergency Line: Available 24/7

Each card: glass morphism bg-white/10 border-white/20, gold icon, white text.
"Current Status" badge: green pill "Open Now" or red pill "Closed" 
  (logic: check current time in India timezone using JS Date)

SECTION 4 — FAQ (cream bg):
Title: "Frequently Asked Questions"
Accordion component (click to expand/collapse with smooth animation):

Q1: "How do I book a car?"
A: "You can book online through our website, call us at +91 98765 43210, 
or WhatsApp us. We confirm your booking within 30 minutes."

Q2: "Can I cancel or modify my booking?"
A: "Yes, free cancellation up to 24 hours before pickup. Modifications are 
accepted anytime before the trip starts."

Q3: "Do you provide outstation trips?"
A: "Yes! We cover all major destinations across Tamil Nadu and neighboring states. 
Popular routes include Chennai–Tirupati, Chennai–Ooty, Madurai–Rameswaram."

Q4: "Are your drivers verified?"
A: "All drivers are background-verified, hold valid commercial licenses, and are 
trained in defensive driving and customer service."

Q5: "What payment methods do you accept?"
A: "Cash, UPI (GPay, PhonePe, Paytm), Bank Transfer, and card payments at pickup."

Q6: "Do you offer airport transfers?"
A: "Yes! We provide airport pickup and drop for Chennai, Coimbatore, Madurai, 
and Trichy airports at fixed rates."

Each accordion item: white card, rounded-xl, gold plus/minus icon on right, 
smooth max-height animation on toggle.

SECTION 5 — EMERGENCY CTA (dark green bg):
Large centered emergency contact strip:
"Need urgent help? 📞 Call us now: +91 98765 43210"
Subtext: "Our emergency line is active 24/7 — even on holidays."
Big "Call Now" button (gold, large, rounded-xl) + WhatsApp button (green)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT: Output ONLY the JSX code. Export: export default function Contact() { ... }
Import React Hook Form: import { useForm } from 'react-hook-form'
Form submit: console.log(data) for now (backend integration later)
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PROMPT 5 — SIGN IN & SIGN UP (`src/pages/SignIn.jsx` + `src/pages/SignUp.jsx`)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
You are a Senior Full-Stack Developer and UI/UX Architect with 20+ years of experience. 
Generate TWO complete React components for "Sri Lakshmi Travels":
  1. src/pages/SignIn.jsx  
  2. src/pages/SignUp.jsx
Output BOTH files — label each clearly with // ===== FILE: SignIn.jsx ===== comments.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK: Vite + React 18 JSX | Tailwind CSS v3 | React Router DOM v6 | Lucide React
VALIDATION: React Hook Form + Yup (import and use properly)
FONTS: "Playfair Display" + "DM Sans"
COLORS: #0A2E1A (dark green) | #D4A017 (gold) | #FEF9EE (cream) | #FFFFFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━ SIGN IN PAGE (SignIn.jsx): ━━━

LAYOUT: Full-page split layout (left panel + right panel):
  LEFT PANEL (hidden on mobile, visible lg+):
    - Full height dark green background (#0A2E1A)
    - Large background image with green overlay:
      https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85
    - Ken Burns zoom animation: scale 1.0 → 1.06 over 10s
    - Center overlay content:
      - SLT logo badge (gold square, white "SLT" text)
      - "Sri Lakshmi Travels" (Playfair Display, white, text-3xl)
      - Gold divider line
      - Tagline: "30 Years of Trusted Journeys" (cream, italic)
      - 3 mini features with gold checkmarks:
        ✅ Verified Drivers | ✅ 24/7 Support | ✅ Best Prices
      - Bottom: "Est. 1995 — Tamil Nadu, India" (small gold text)

  RIGHT PANEL (full width mobile, half width lg+):
    - White or very light cream bg (#FAFAF8)
    - Centered card (max-w-md, mx-auto, py-12 px-8)
    
    Top: SLT badge (small, for mobile only — hidden on lg)
    H1: "Welcome Back" (Playfair Display, dark green, text-3xl)
    Subtitle: "Sign in to manage your bookings" (gray-500, text-sm)
    
    Gold horizontal divider with "or continue with email" text (for social buttons section)
    
    SOCIAL BUTTONS (optional decorative):
      Google button (outlined, Google colors G icon) | Apple button (outlined, black apple icon)
    
    FORM (React Hook Form):
      Email Address*: email validation
        Input: full-width, border, rounded-xl, focus:ring-gold, with Mail icon inside left
      
      Password*: min 6 chars
        Input: with lock icon left + eye/eye-off toggle right (show/hide password)
        
      "Forgot Password?" link (gold, right-aligned, small)
      
      Remember Me checkbox (gold accent checkbox)
      
      Submit: full-width "#0A2E1A" button, "Sign In →" 
        Loading: spinner + "Signing in..."
        
    Bottom: "Don't have an account? Sign Up" (gray + gold link → /signup)
    
    After submit (simulate): 
      Success: green toast "Welcome back! Redirecting..."  
      Error: red toast "Invalid credentials. Please try again."

━━━ SIGN UP PAGE (SignUp.jsx): ━━━

LAYOUT: Same split layout — left panel identical to SignIn.
Right panel same style.

TOP: "Create Account" (Playfair Display, dark green)
Subtitle: "Join thousands of happy travellers"

FORM (React Hook Form + Yup validation):
  Step indicator: 2-step form with progress bar (gold, animated width)
  
  STEP 1 — Personal Details:
    Full Name*: min 3 chars
      (with User icon inside)
    Email Address*: valid email
      (with Mail icon)
    Phone Number*: Indian mobile (10 digits, starts 6–9)
      (with Phone icon) — show +91 prefix badge inside input
    Date of Birth: date input (optional, must be 18+)
    
    "Next Step →" button (solid gold, full-width)
  
  STEP 2 — Account Setup:
    Password*: min 8 chars, must include 1 number and 1 uppercase
      (with lock icon + eye toggle)
      Password strength bar below (weak/medium/strong with color: red/yellow/green)
    
    Confirm Password*: must match password
      (with lock icon + eye toggle)
    
    City (dropdown: Chennai | Coimbatore | Madurai | Trichy | Salem | Other)
    
    Terms checkbox*: "I agree to the Terms of Service and Privacy Policy" 
      (links in gold, required)
    
    WhatsApp Updates checkbox: "Receive booking updates on WhatsApp" (checked by default)
    
    "← Back" (outlined, secondary) + "Create Account →" (solid gold) side by side

STEP ANIMATIONS: Smooth slide-left/slide-right transition between steps using CSS transform.

After submit (simulate):
  Success: green toast "Account created! Welcome to Sri Lakshmi Travels 🎉"
  Then show: celebration card with gold confetti animation (CSS-only)
    "You're all set! Explore our fleet and book your first trip."
    "Explore Cars →" button

Bottom: "Already have an account? Sign In" (gold link → /signin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE: On small screens, hide left panel. Show only right panel full screen.
Add top SLT logo on mobile right panel.
IMPORTANT: Output BOTH files completely. Proper exports for each.
Use React Router <Link> for navigation between pages.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ROUTER SETUP — `src/App.jsx`
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Also give Gemini this final prompt to wire everything together:

Generate src/App.jsx for "Sri Lakshmi Travels" with React Router DOM v6.

Requirements:
- Lazy load ALL page components with React.lazy() + Suspense
- Full-screen loading spinner (dark green bg, gold SLT logo spinning or pulsing) as fallback
- Routes:
    /         → Home
    /features → Features
    /about    → About
    /contact  → Contact
    /signin   → SignIn
    /signup   → SignUp
- Persistent WhatsApp floating button on ALL pages (bottom-right, green circle, 
  WhatsApp icon, href="https://wa.me/919876543210", opens in new tab)
- ScrollToTop component: useEffect to window.scrollTo(0,0) on every route change
- React Hot Toast <Toaster> at root level (position: top-right)
- Output ONLY the complete App.jsx code. 
  Export: export default function App() { ... }
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TAILWIND CONFIG — `tailwind.config.js`
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Copy this exact config into your project:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#0A2E1A',
          secondary: '#D4A017',
          accent:    '#FEF9EE',
          dark:      '#051409',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'ken-burns': 'kenBurns 12s ease-in-out infinite alternate',
        'float':     'float 4s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s ease forwards',
        'count-up':  'countUp 2s ease forwards',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
```

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GOOGLE FONTS — Add to `index.html` `<head>`
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## NPM PACKAGES — Run this in your terminal
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
npm install react-router-dom axios lucide-react swiper react-hook-form @hookform/resolvers yup react-hot-toast date-fns
```

---

*© Sri Lakshmi Travels — Prompt Package v2.0 | Deep Green & Gold Luxury Theme*
*Generated for Gemini 2.5 Pro | Vite + React + Tailwind CSS*
