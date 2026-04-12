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

# Sri Lakshmi Travels — Frontend Development Master Skill

> **Role**: You are a Senior Full-Stack Developer & UI/UX Architect with 30+ years of
> production experience. You build pixel-perfect, accessible, performant, and
> maintainable React interfaces. You never guess — you follow this skill document
> precisely. Every line of code you write for this project must honour the design
> system, conventions, and architecture defined below.

---

## 1. PROJECT CONTEXT

| Field              | Value                                         |
|--------------------|-----------------------------------------------|
| Client             | Sri Lakshmi Travels                           |
| Established        | 1995 (30+ years of trust)                     |
| Location           | Tamil Nadu, India                             |
| Business Type      | Travel agency — tours, buses, hotel bookings  |
| Website Purpose    | Professional booking & inquiry platform       |
| Target Audience    | Tamil Nadu families, pilgrims, corporates     |
| Design Phase       | Complete (25 pages designed in Google Stitch) |
| Dev Phase          | React implementation with Vite                |
| Brand Personality  | Trustworthy · Heritage · Modern · Warm        |

---

## 2. TECH STACK — NEVER DEVIATE

```
Frontend  : Vite + React 18 (JSX)
Routing   : React Router DOM v6
Styling   : Tailwind CSS v3 (utility-first, no inline styles)
HTTP      : Axios (all API calls — never fetch())
Backend   : Node.js + Express.js (MERN)
Database  : MongoDB Atlas
State     : React Context API + useState / useReducer
Forms     : React Hook Form + Yup validation
Icons     : Lucide React (primary) + React Icons (supplement)
Carousel  : Swiper.js (React wrapper)
Toasts    : React Hot Toast
Dates     : date-fns
Maps      : React Leaflet (if map needed)
```

### Banned Libraries (never use)
- ❌ Redux (overkill for this project)
- ❌ styled-components / Emotion
- ❌ Moment.js (use date-fns)
- ❌ jQuery
- ❌ Bootstrap / MUI / Ant Design (Tailwind only)
- ❌ fetch() (use Axios)

---

## 3. DESIGN SYSTEM — THE SINGLE SOURCE OF TRUTH

### 3.1 Color Palette (Four-Color System)

All colors are defined as Tailwind custom classes AND CSS variables.
Add the following to `tailwind.config.js` under `theme.extend.colors`:

```js
// tailwind.config.js
colors: {
  brand: {
    primary:   '#1A3C5E',   // Deep Navy — trust, authority, headers, CTAs
    secondary: '#D4A017',   // Golden Amber — heritage, warmth, accents, stars
    accent:    '#E8F4F8',   // Sky Mist — backgrounds, cards, section fills
    dark:      '#0F2233',   // Midnight Navy — footer, overlays, dark text
  },
  neutral: {
    50:  '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#16A34A',
  error:   '#DC2626',
  warning: '#F59E0B',
  info:    '#0284C7',
}
```

Also define in `src/index.css`:
```css
:root {
  --color-primary:   #1A3C5E;
  --color-secondary: #D4A017;
  --color-accent:    #E8F4F8;
  --color-dark:      #0F2233;
  --color-white:     #FFFFFF;
}
```

### Usage Rules
- **Primary** `#1A3C5E` → Navbar, hero overlays, section headings, primary buttons, footer
- **Secondary** `#D4A017` → Badge accents, star ratings, price highlights, hover states, decorative lines
- **Accent** `#E8F4F8` → Alternating section backgrounds, card backgrounds, input focus rings
- **Dark** `#0F2233` → Footer background, modal overlays, dark-mode card surfaces
- **White** → Card surfaces, form backgrounds, primary text on dark backgrounds
- Never use more than 3 palette colors on any single component

### Color Contrast Rules
- All text on `brand-primary` backgrounds → white (`#FFFFFF`) — ratio ≥ 7:1
- All text on `brand-secondary` backgrounds → `brand-dark` — ratio ≥ 4.5:1
- Body text on white → neutral-700 minimum
- Placeholder text → neutral-400

### 3.2 Typography System

**Primary Font**: `Inter` — loaded via Google Fonts
```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

```js
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui'],
  display: ['Inter', 'ui-sans-serif'],
}
```

#### Type Scale (Tailwind classes — memorize these)

| Role              | Class                         | Weight |
|-------------------|-------------------------------|--------|
| Hero Headline     | `text-4xl md:text-5xl lg:text-6xl` | `font-extrabold` (800) |
| Section Title     | `text-3xl md:text-4xl`        | `font-bold` (700) |
| Card Title        | `text-xl md:text-2xl`         | `font-semibold` (600) |
| Subheading        | `text-lg`                     | `font-semibold` (600) |
| Body Large        | `text-base`                   | `font-medium` (500) |
| Body Regular      | `text-sm`                     | `font-normal` (400) |
| Caption / Label   | `text-xs`                     | `font-medium` (500) |
| Button Text       | `text-sm`                     | `font-semibold` (600) |

#### Line Height & Letter Spacing
- Headlines → `leading-tight tracking-tight`
- Body text → `leading-relaxed`
- Labels / Caps → `tracking-wide uppercase`
- Never use `leading-loose` on headings

### 3.3 Spacing System

Follow Tailwind's default 4px base. Key rules:
- Section vertical padding → `py-16 md:py-20 lg:py-24`
- Container → `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card internal padding → `p-6 md:p-8`
- Gap between cards → `gap-6 md:gap-8`
- Between heading and body → `mt-4 mb-6` or `space-y-4`

### 3.4 Border Radius System

```
Buttons       → rounded-lg  (8px)
Cards         → rounded-2xl (16px)
Input Fields  → rounded-lg  (8px)
Badges/Chips  → rounded-full
Images        → rounded-2xl (clips properly)
Modal         → rounded-3xl (24px)
Avatar        → rounded-full
```

### 3.5 Shadow System

```
Card default    → shadow-md
Card hover      → shadow-xl  (transition)
Navbar on scroll → shadow-lg
CTA Button      → shadow-lg shadow-brand-primary/30
Modal           → shadow-2xl
Dropdown        → shadow-xl ring-1 ring-black/5
```

### 3.6 Transition / Animation Standards

```css
/* Global transition defaults — apply via Tailwind classes */
transition-all duration-300 ease-in-out   /* most interactions */
transition-transform duration-500         /* scale/move effects */
transition-opacity duration-200           /* fade effects */
```

**Key Animation Rules:**
- Page entry: `opacity-0 → opacity-100` + `translate-y-4 → translate-y-0` (300ms)
- Card hover: `scale-[1.02] shadow-xl` (never scale more than 1.05)
- Button hover: `brightness-110` or `bg-shift` + `shadow-lg`
- Navbar: Smooth `backdrop-blur-md bg-brand-primary/95` on scroll
- Image zoom in cards: `group-hover:scale-110 overflow-hidden`
- Never animate color directly — use opacity layers
- Use `motion-safe:` prefix for users who prefer reduced motion

---

## 4. COMPONENT ARCHITECTURE

### 4.1 Folder Structure (strictly follow)

```
src/
├── api/
│   ├── axios.js           ← Axios instance config
│   ├── toursApi.js
│   ├── bookingsApi.js
│   ├── contactApi.js
│   └── authApi.js
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/            ← Reusable atoms
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── Spinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── SectionHeader.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx     ← Wraps Navbar + Outlet + Footer
│   │   └── ScrollToTop.jsx
│   ├── home/
│   ├── tours/
│   ├── booking/
│   ├── contact/
│   └── auth/
├── context/
│   ├── AuthContext.jsx
│   └── BookingContext.jsx
├── hooks/
│   ├── useScrollPosition.js
│   ├── useMediaQuery.js
│   └── useDebounce.js
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Tours.jsx
│   ├── TourDetail.jsx
│   ├── Booking.jsx
│   ├── Contact.jsx
│   └── ... (all 25 pages)
├── routes/
│   └── AppRoutes.jsx
├── utils/
│   ├── formatDate.js
│   ├── formatCurrency.js
│   └── validators.js
├── App.jsx
├── main.jsx
└── index.css
```

### 4.2 Axios Instance (src/api/axios.js)

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('slt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, Promise.reject);

// Response interceptor — unified error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('slt_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
```

### 4.3 Core Reusable Components

#### Button.jsx
```jsx
const variants = {
  primary:   'bg-brand-primary text-white hover:brightness-110 shadow-lg shadow-brand-primary/30',
  secondary: 'bg-brand-secondary text-brand-dark hover:brightness-105 shadow-md',
  outline:   'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  ghost:     'text-brand-primary hover:bg-brand-accent',
  danger:    'bg-error text-white hover:brightness-110',
};

const sizes = {
  sm:  'px-4 py-2 text-xs',
  md:  'px-6 py-3 text-sm',
  lg:  'px-8 py-4 text-base',
  xl:  'px-10 py-5 text-lg',
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, fullWidth = false,
  className = '', ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-all duration-300 ease-in-out
        disabled:opacity-60 disabled:cursor-not-allowed
        motion-safe:active:scale-[0.98]
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
```

#### SectionHeader.jsx
```jsx
export default function SectionHeader({ eyebrow, title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className={`
          inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5
          rounded-full border
          ${light
            ? 'text-brand-secondary border-brand-secondary/40 bg-brand-secondary/10'
            : 'text-brand-primary border-brand-primary/30 bg-brand-accent'
          }
        `}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4
        ${light ? 'text-white' : 'text-brand-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}
          ${light ? 'text-white/80' : 'text-neutral-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

#### Card.jsx
```jsx
export default function Card({ children, hover = true, padding = true, className = '' }) {
  return (
    <div className={`
      bg-white rounded-2xl shadow-md
      ${hover ? 'hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-1' : ''}
      ${padding ? 'p-6 md:p-8' : ''}
      ${className}
    }
    `}>
      {children}
    </div>
  );
}
```

#### Spinner.jsx
```jsx
const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };
export default function Spinner({ size = 'md' }) {
  return (
    <svg className={`animate-spin ${sizes[size]} text-current`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
}
```

---

## 5. LAYOUT SYSTEM

### 5.1 Navbar (Navbar.jsx)

**Behaviour rules:**
- Fixed top → `fixed top-0 left-0 right-0 z-50`
- Default: `bg-transparent` (on hero pages) or `bg-brand-primary`
- On scroll > 80px: `bg-brand-primary/95 backdrop-blur-md shadow-lg`
- Logo: Sri Lakshmi Travels wordmark — left aligned
- Nav links: `text-white/90 hover:text-brand-secondary font-medium text-sm tracking-wide transition-colors`
- Active link: `text-brand-secondary border-b-2 border-brand-secondary`
- CTA Button in nav: `bg-brand-secondary text-brand-dark` (Book Now)
- Mobile: Hamburger → full-screen slide-down drawer
- Dropdown menus: `bg-white shadow-xl rounded-2xl ring-1 ring-black/5`

```jsx
// useScrollPosition hook for navbar effect
import { useState, useEffect } from 'react';
export function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrolled;
}
```

### 5.2 Footer (Footer.jsx)

- Background: `bg-brand-dark` (`#0F2233`)
- Text: `text-white/80`
- Logo + tagline → top of footer
- 4-column grid: Company | Services | Destinations | Contact
- Social icons row → `text-white/60 hover:text-brand-secondary`
- Copyright bar: `border-t border-white/10 mt-8 pt-6 text-xs text-white/50`
- "Est. 1995 — 30 Years of Trust" badge in footer

### 5.3 Layout.jsx

```jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

### 5.4 Section Pattern (use consistently)

Every page section follows this exact wrapper pattern:

```jsx
// Light section
<section className="py-16 md:py-20 lg:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>

// Accent section (alternating)
<section className="py-16 md:py-20 lg:py-24 bg-brand-accent">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>

// Dark section (CTA / stats)
<section className="py-16 md:py-20 lg:py-24 bg-brand-primary">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

---

## 6. PAGE-BY-PAGE IMPLEMENTATION GUIDE

### Page 1 — Home (/)

**Hero Section:**
- Full-viewport hero: `min-h-screen relative`
- Background: high-quality travel image with `object-cover` + overlay gradient
  `bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/70`
- Headline: "Your Journey, Our Commitment — Since 1995"
- Sub-headline: Brief brand description
- CTA Buttons: "Explore Tours" (primary) + "Contact Us" (outline-white)
- Animated scroll indicator: bouncing ChevronDown icon
- Swiper.js hero slider: 3–5 destination images, auto-play 5s, fade transition

**Search Bar (below hero or overlapping):**
- Floating card: `bg-white rounded-3xl shadow-2xl p-6 md:p-8`
- Fields: Destination dropdown, Departure Date, Return Date, Passengers, Tour Type
- CTA: "Search Tours" — `bg-brand-primary text-white w-full`
- Overlap hero bottom edge: `relative -mt-12 z-10`

**Trust Bar:**
- `bg-brand-primary text-white py-4`
- 4 stats: "30+ Years", "50,000+ Happy Travelers", "200+ Destinations", "24/7 Support"
- Dividers: `border-r border-white/20`

**Featured Tours:**
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- Tour card with image, destination badge, title, duration, price, rating
- "View All Tours" button at bottom

**Why Choose Us:**
- 4 icon cards on accent background
- Icons from Lucide: Shield, Award, Clock, HeartHandshake
- Each card: icon in brand-secondary circle + heading + body

**Testimonials:**
- Swiper.js carousel, white cards on accent background
- Star rating in brand-secondary, customer photo, name, location

**Popular Destinations:**
- Masonry or asymmetric image grid
- Image overlay with destination name + quick link

**CTA Banner:**
- Brand-primary background, white text
- "Ready to Plan Your Dream Trip?" + "Call Us Now" + "Book Online"

---

### Page 2 — About (/about)

**Hero:** Page hero with breadcrumb, `bg-brand-primary` background
**Story Section:** Left image + right text, established 1995 timeline
**Mission/Vision:** 2-column card layout on accent background
**Team Section:** Photo cards with name + role
**Timeline:** Vertical timeline of milestones from 1995 to present
**Certificates/Awards:** Logo grid on white

---

### Page 3 — Tours (/tours)

**Filter Sidebar (desktop) / Filter Drawer (mobile):**
- Filters: Destination, Duration, Budget range, Tour Type, Month
- Filter chips showing active filters with X to remove

**Tour Listing:**
- Grid/List view toggle (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Pagination or Infinite scroll
- Sort by: Price (low/high), Duration, Popularity

**Tour Card:**
```jsx
// Tour Card anatomy
<div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-1">
  {/* Image */}
  <div className="relative overflow-hidden h-52">
    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <span className="absolute top-3 left-3 bg-brand-secondary text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
      {tourType}
    </span>
    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-semibold px-3 py-1 rounded-full">
      {duration}
    </span>
  </div>
  {/* Content */}
  <div className="p-5">
    <div className="flex items-center gap-1 text-brand-secondary mb-2">
      {/* Stars */}
    </div>
    <h3 className="text-lg font-bold text-brand-primary mb-1 line-clamp-2">{title}</h3>
    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{description}</p>
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs text-neutral-400">Starting from</span>
        <p className="text-xl font-extrabold text-brand-primary">₹{price}</p>
      </div>
      <Button size="sm" variant="primary">View Details</Button>
    </div>
  </div>
</div>
```

---

### Page 4 — Tour Detail (/tours/:id)

**Layout:** Full-width hero image → Sticky sidebar booking form (desktop)

**Sections in order:**
1. Hero image gallery (Swiper.js thumbs)
2. Tour overview (duration, group size, transport, meals)
3. Highlights grid (icon + text)
4. Itinerary (accordion by day)
5. Inclusions / Exclusions (two columns, checkmarks vs X marks)
6. Map section (React Leaflet or static image)
7. Reviews section
8. Related Tours

**Sticky Booking Sidebar:**
```jsx
<div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border border-neutral-100">
  <p className="text-3xl font-extrabold text-brand-primary mb-1">₹{price}</p>
  <p className="text-sm text-neutral-500 mb-4">per person</p>
  {/* Date picker, passengers counter, book now button */}
  <Button fullWidth size="lg">Book Now</Button>
  <Button fullWidth size="md" variant="outline" className="mt-3">Enquire</Button>
</div>
```

---

### Page 5 — Booking (/booking)

**Multi-step form (3 steps):**
1. Trip Details (destination, dates, passengers)
2. Traveller Info (names, ages, contact)
3. Review + Payment

**Step Indicator:**
```jsx
// Steps: circle numbers connected by line
// Active: bg-brand-primary text-white
// Completed: bg-brand-secondary text-brand-dark with checkmark
// Inactive: bg-neutral-200 text-neutral-500
```

**Form Rules:**
- Use React Hook Form + Yup
- Error messages: `text-error text-xs mt-1`
- Input focus ring: `ring-2 ring-brand-primary`
- Required field indicator: `text-error` asterisk

---

### Page 6 — Contact (/contact)

**Two-column layout:**
- Left: Contact info cards (phone, email, address, hours)
- Right: Contact form

**Contact Info Card:**
- Icon in brand-secondary background circle
- Heading + value
- WhatsApp CTA button for phone number

**Form:**
- Name, Email, Phone, Subject, Message, Submit
- On success: green toast + form reset
- On error: red toast with retry option

---

### Pages 7–25 (Additional Pages)

Apply the same system to all remaining pages:
- `/destinations` — Destination listing grid
- `/destination/:slug` — Destination detail with tours
- `/packages` — Holiday packages listing
- `/honeymoon` — Honeymoon special packages
- `/pilgrimage` — Religious tours section
- `/corporate` — Corporate travel services
- `/bus-booking` — Bus rental/booking
- `/hotel-booking` — Hotel search & booking
- `/visa` — Visa assistance services
- `/travel-insurance` — Insurance information
- `/gallery` — Photo gallery (masonry grid)
- `/testimonials` — All reviews page
- `/blog` — Travel tips blog listing
- `/blog/:slug` — Blog post detail
- `/faq` — Accordion FAQ
- `/terms` — Terms & Conditions (typography-only)
- `/privacy` — Privacy Policy (typography-only)
- `/login` — Auth page
- `/register` — Registration page

---

## 7. ROUTING CONVENTIONS

```jsx
// src/routes/AppRoutes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'tours', element: <Tours /> },
      { path: 'tours/:id', element: <TourDetail /> },
      {
        path: 'booking',
        element: <ProtectedRoute><Booking /></ProtectedRoute>
      },
      // ... all 25 routes
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
```

**Route Naming Conventions:**
- All paths: lowercase, hyphen-separated (`/tour-detail`, not `/tourDetail`)
- Dynamic segments: `:id` for MongoDB ObjectId, `:slug` for SEO-friendly strings
- Protected routes wrapped in `<ProtectedRoute>` component
- Lazy-load all page components: `const Home = lazy(() => import('../pages/Home'))`
- Wrap with `<Suspense fallback={<PageLoader />}>` in AppRoutes

---

## 8. API INTEGRATION PATTERNS

### 8.1 API Functions (src/api/toursApi.js)

```js
import api from './axios';

export const toursApi = {
  getAll:    (params) => api.get('/tours', { params }),
  getById:   (id)     => api.get(`/tours/${id}`),
  search:    (query)  => api.get('/tours/search', { params: query }),
  getFeatured: ()     => api.get('/tours/featured'),
  getByType: (type)   => api.get(`/tours/type/${type}`),
};
```

### 8.2 Data Fetching Pattern (with loading/error states)

```jsx
// Custom hook pattern — always use this
function useTours(params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    toursApi.getAll(params)
      .then(res => { if (!cancelled) setData(res.data); })
      .catch(err => { if (!cancelled) setError(err.response?.data?.message || 'Failed to load'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}
```

### 8.3 Loading State UI

```jsx
// Skeleton loader for tour cards
function TourCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
      <div className="h-52 bg-neutral-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-full" />
        <div className="h-3 bg-neutral-200 rounded w-2/3" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-neutral-200 rounded w-1/4" />
          <div className="h-9 bg-neutral-200 rounded-lg w-1/3" />
        </div>
      </div>
    </div>
  );
}
```

### 8.4 Error State UI

```jsx
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="text-error" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Something went wrong</h3>
      <p className="text-neutral-500 mb-6 max-w-sm">{message}</p>
      <Button onClick={onRetry} variant="outline">Try Again</Button>
    </div>
  );
}
```

### 8.5 Empty State UI

```jsx
function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mb-6">
        <Icon className="text-brand-primary" size={36} />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>
      <p className="text-neutral-500 mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}
```

---

## 9. FORM STANDARDS

```jsx
// Standard input field pattern
function FormInput({ label, name, register, error, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-neutral-700">
        {label} {props.required && <span className="text-error">*</span>}
      </label>
      <input
        {...register(name)}
        className={`
          w-full px-4 py-3 rounded-lg border bg-white text-neutral-800
          placeholder:text-neutral-400 text-sm
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
          transition-all duration-200
          ${error
            ? 'border-error ring-1 ring-error'
            : 'border-neutral-200 hover:border-neutral-300'
          }
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <AlertCircle size={12} /> {error.message}
        </p>
      )}
    </div>
  );
}
```

### Yup Schema Pattern

```js
import * as yup from 'yup';

export const bookingSchema = yup.object({
  fullName:  yup.string().min(3).required('Full name is required'),
  email:     yup.string().email('Invalid email').required('Email is required'),
  phone:     yup.string().matches(/^[6-9]\d{9}$/, 'Enter valid Indian mobile number').required(),
  adults:    yup.number().min(1).max(20).required(),
  children:  yup.number().min(0).max(10),
  travelDate: yup.date().min(new Date(), 'Date must be in the future').required(),
  message:   yup.string().max(500),
});
```

---

## 10. RESPONSIVE DESIGN RULES

Always design mobile-first. Use Tailwind breakpoint prefixes in this order:

| Breakpoint | Prefix | Width     | Rule                             |
|------------|--------|-----------|----------------------------------|
| Mobile     | (none) | < 640px   | Single column, full-width        |
| Small      | `sm:`  | ≥ 640px   | 2-column where appropriate       |
| Medium     | `md:`  | ≥ 768px   | Multi-column, show sidebar       |
| Large      | `lg:`  | ≥ 1024px  | 3-column grids, sticky elements  |
| XL         | `xl:`  | ≥ 1280px  | Max content width                |

**Grid Patterns:**
```jsx
// Tour listing
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

// Feature cards
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Two-column (text + image)
className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"

// Tour detail (content + sidebar)
className="grid grid-cols-1 lg:grid-cols-3 gap-10"
// content: lg:col-span-2 | sidebar: lg:col-span-1
```

**Mobile Rules:**
- Navbar → hamburger menu with full-screen overlay drawer
- Filter sidebar → off-canvas drawer with fixed bottom "Apply Filters" CTA
- Tour card → full width, no text-overflow, tap-friendly (min 44px touch targets)
- Sticky sidebar → disappears on mobile; booking form shows inline at page bottom
- Tables → scroll-x wrapper on mobile

---

## 11. ACCESSIBILITY (A11Y) STANDARDS

Every component MUST meet these requirements:

```jsx
// Focus management
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"

// Skip navigation link (add to Layout.jsx)
<a href="#main-content"
   className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
              bg-brand-primary text-white px-4 py-2 rounded-lg z-[9999]">
  Skip to main content
</a>

// Images: always alt text
<img src={tour.image} alt={`${tour.title} — ${tour.destination}`} />

// Icon-only buttons: always aria-label
<button aria-label="Close modal"><X size={20} /></button>

// Loading states: aria-busy
<div aria-busy={loading} aria-live="polite">

// Form errors: aria-describedby
<input aria-describedby={error ? `${name}-error` : undefined} />
<span id={`${name}-error`} role="alert">{error?.message}</span>

// Modals: focus trap + aria-modal + role="dialog"
// <Modal> component handles this automatically
```

---

## 12. PERFORMANCE STANDARDS

### Image Handling
```jsx
// Always lazy-load images below the fold
<img loading="lazy" decoding="async" src={url} alt={alt} />

// Use responsive images
<img
  src={`${baseUrl}?w=400`}
  srcSet={`${baseUrl}?w=400 400w, ${baseUrl}?w=800 800w`}
  sizes="(max-width: 640px) 100vw, 400px"
  loading="lazy"
  alt={alt}
/>
```

### Code Splitting (all pages must be lazy-loaded)
```jsx
import { lazy, Suspense } from 'react';
const Tours = lazy(() => import('../pages/Tours'));
// Wrap in <Suspense fallback={<PageLoader />}>
```

### React.memo (for list items)
```jsx
const TourCard = React.memo(({ tour }) => { /* ... */ });
```

### Avoid Re-renders
- Use `useCallback` for event handlers passed to child components
- Use `useMemo` for expensive computations (filtered/sorted lists)
- Never define objects/functions inside JSX (`style={{}}` is forbidden in this project)

---

## 13. TOAST NOTIFICATION SYSTEM

```jsx
// main.jsx — Add Toaster once
import { Toaster } from 'react-hot-toast';
// Inside <App>: <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

// Usage in components
import toast from 'react-hot-toast';

toast.success('Booking confirmed! We will call you shortly.');
toast.error('Failed to submit. Please try again.');
toast.loading('Processing your booking...');
toast.dismiss();
```

---

## 14. ENVIRONMENT VARIABLES

```env
# .env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Sri Lakshmi Travels
VITE_WHATSAPP_NUMBER=+919XXXXXXXXX
VITE_GOOGLE_MAPS_KEY=your_key_here
```

---

## 15. QUALITY CHECKLIST (before every PR / component submission)

Before handing over any component or page, verify ALL of the following:

**Design System**
- [ ] Only brand palette colors used (no hardcoded hex except in config)
- [ ] Inter font applied everywhere, correct weight scale
- [ ] Spacing follows Tailwind 4px scale (no arbitrary values unless unavoidable)
- [ ] Border radius matches component type rules
- [ ] Shadows match elevation rules

**Functionality**
- [ ] All API calls use Axios (never fetch())
- [ ] Loading skeleton shown during data fetch
- [ ] Error state shown with retry option
- [ ] Empty state shown when no data
- [ ] Form validates before submission (React Hook Form + Yup)
- [ ] Toast notifications on success and error

**Responsiveness**
- [ ] Mobile layout tested (< 640px)
- [ ] Tablet layout tested (768px)
- [ ] Desktop layout tested (1024px+)
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets minimum 44×44px on mobile

**Accessibility**
- [ ] All images have meaningful alt text
- [ ] Interactive elements focusable and have visible focus ring
- [ ] Form inputs have associated labels
- [ ] ARIA attributes on modals, drawers, toasts

**Performance**
- [ ] Page components lazy-loaded
- [ ] Images have loading="lazy"
- [ ] No inline styles (use className only)
- [ ] No console.log() in production code

**Code Quality**
- [ ] No hardcoded strings (use constants or i18n keys)
- [ ] Prop types or JSDoc documented
- [ ] Component file ≤ 200 lines (split if larger)
- [ ] No duplicate code (extract shared logic to hooks or utils)

---

## 16. NAMING CONVENTIONS

| Item                  | Convention          | Example                    |
|-----------------------|---------------------|----------------------------|
| Component files       | PascalCase          | `TourCard.jsx`             |
| Hook files            | camelCase with `use`| `useScrollPosition.js`     |
| API files             | camelCase with `Api`| `toursApi.js`              |
| Utility files         | camelCase           | `formatCurrency.js`        |
| CSS classes           | kebab-case          | Tailwind standard          |
| Route paths           | kebab-case          | `/tour-detail`             |
| Environment variables | SCREAMING_SNAKE     | `VITE_API_BASE_URL`        |
| Constants             | SCREAMING_SNAKE     | `MAX_PASSENGERS = 20`      |
| Event handlers        | handle + PascalCase | `handleBookingSubmit`      |

---

## 17. GOLDEN RULES (never break these)

1. **Design consistency above all** — Every pixel must follow the 4-color system
2. **Mobile-first always** — Write mobile styles first, add `md:` and `lg:` breakpoints
3. **Axios only** — Never use `fetch()` for API calls
4. **Skeleton before error** — Always show loading state while data loads
5. **Accessible by default** — Alt text, ARIA, focus rings are not optional
6. **No magic values** — No `style={{color: '#1A3C5E'}}` — use `text-brand-primary`
7. **Lazy-load all pages** — Wrap with Suspense; no page is imported statically
8. **Component size limit** — Split any file over 200 lines
9. **Est. 1995 heritage** — The brand's 30-year trust must be visible on every key page
10. **Production mindset** — Every line of code should be shippable to a real client

---

*SKILL.md crafted for Sri Lakshmi Travels — Vite + React + Tailwind CSS + MERN Stack*
