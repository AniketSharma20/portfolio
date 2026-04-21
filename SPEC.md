# Professional Portfolio Specification

## Project Overview
- **Project Name**: Aniket's Portfolio
- **Type**: Single-page personal portfolio website
- **Core Functionality**: Showcase skills, projects, and contact information with immersive animations and modern design
- **Target Users**: Potential employers, clients, and collaborators

---

## UI/UX Specification

### Layout Structure

**Sections (in order):**
1. **Navigation** - Fixed top navbar with logo and menu links
2. **Hero** - Full viewport intro with animated text and scroll indicator
3. **About** - Personal introduction with image placeholder and bio
4. **Skills** - Technical skills displayed with animated progress bars
5. **Projects** - Project cards with hover effects
6. **Contact** - Contact form and social links
7. **Footer** - Copyright and quick links

**Responsive Breakpoints:**
- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768px - 1024px (two columns where applicable)
- Desktop: > 1024px (full layout)

### Visual Design

**Color Palette:**
- Background Primary: `#0a0a0f` (deep dark)
- Background Secondary: `#12121a` (slightly lighter dark)
- Accent Primary: `#00d4aa` (vibrant teal)
- Accent Secondary: `#7c3aed` (electric purple)
- Text Primary: `#f0f0f5` (off-white)
- Text Secondary: `#8a8a9a` (muted gray)
- Card Background: `#1a1a24` (dark card)
- Border Color: `#2a2a3a` (subtle borders)

**Typography:**
- Headings: 'Clash Display', sans-serif (from CDN: https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap)
- Body: 'Satoshi', sans-serif (from CDN: https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap)
- Monospace (for code): 'JetBrains Mono', monospace (from Google Fonts)

**Font Sizes:**
- Hero Title: 4.5rem (desktop), 2.5rem (mobile)
- Section Titles: 3rem (desktop), 2rem (mobile)
- Body Text: 1.1rem
- Small Text: 0.9rem

**Spacing System:**
- Section Padding: 100px vertical (desktop), 60px (mobile)
- Container Max Width: 1200px
- Card Padding: 30px
- Gap between elements: 20px

**Visual Effects:**
- Glassmorphism cards with backdrop-filter: blur(10px)
- Gradient borders using pseudo-elements
- Glow effects on accent elements (box-shadow with accent colors)
- Noise texture overlay for depth

### Components

**1. Navigation Bar**
- Glassmorphism background (sticky on scroll)
- Logo (text-based with gradient)
- Menu items: Home, About, Skills, Projects, Contact
- Hover: Underline animation from left to right
- Mobile: Hamburger menu with slide-in animation

**2. Hero Section**
- Large animated heading with typing effect
- Subtitle with fade-in animation
- Two CTA buttons: "View Projects" and "Contact Me"
- Animated geometric shapes floating in background
- Scroll indicator at bottom (bouncing arrow)

**3. About Section**
- Two-column layout (image + text)
- Image with gradient border and hover glow
- Bio text with highlight effect on keywords

**4. Skills Section**
- Skills grouped by category (Frontend, Backend, Tools)
- Animated circular progress indicators
- Skill bars with fill animation on scroll reveal
- Hover: Scale up and glow

**5. Projects Section**
- Grid of project cards (3 columns desktop, 2 tablet, 1 mobile)
- Card contains: Image, Title, Description, Tech tags, Links
- Hover: Card lifts up, image zooms slightly, overlay appears
- "View Project" and "GitHub" buttons

**6. Contact Section**
- Split layout: Form on left, info on right
- Form fields: Name, Email, Message (styled inputs)
- Submit button with loading state
- Social links with icon hover effects
- Email copy functionality

**7. Footer**
- Minimal design
- Back to top button
- Copyright text

### Animations

**Page Load:**
- Staggered fade-in from bottom for hero elements
- Logo slides in from left
- Navigation fades down from top

**Scroll Animations (Intersection Observer):**
- Sections fade in and slide up when entering viewport
- Skill bars fill from 0 to target width
- Project cards stagger in with delay

**Micro-interactions:**
- Button hover: Scale(1.05) + glow
- Link hover: Underline animation
- Card hover: Lift + shadow increase
- Icon hover: Color change + rotate

**Special Effects:**
- Cursor follower (subtle glow following mouse)
- Gradient text animation on hero title
- Floating geometric shapes in hero background
- Parallax effect on some elements

---

## Functionality Specification

### Core Features

1. **Smooth Scroll Navigation**
   - Click nav links to smoothly scroll to sections
   - Active state updates based on scroll position

2. **Responsive Mobile Menu**
   - Hamburger icon toggles menu
   - Menu slides in from right
   - Close on link click or outside click

3. **Animated Skill Indicators**
   - Circular progress for percentage-based skills
   - Bar charts for other skills
   - Triggered when Skills section enters viewport

4. **Project Filter** (optional enhancement)
   - Filter by category (if multiple projects)

5. **Contact Form**
   - Client-side validation
   - Visual feedback on input focus
   - Submit button with loading state
   - Success/error message display

6. **Back to Top Button**
   - Appears after scrolling past first viewport
   - Smooth scroll to top on click

### User Interactions

- All interactive elements have clear hover/focus states
- Keyboard navigation supported
- Touch-friendly on mobile devices
- Reduced motion option respects prefers-reduced-motion

### Edge Cases

- Form validation shows inline error messages
- Empty states handled gracefully
- Images have fallback background colors
- Animations disabled for users who prefer reduced motion

---

## Acceptance Criteria

1. ✓ Page loads without errors
2. ✓ All sections visible and properly styled
3. ✓ Navigation scrolls smoothly to sections
4. ✓ Mobile menu works correctly
5. ✓ Animations play smoothly (60fps target)
6. ✓ Skill animations trigger on scroll
7. ✓ Project cards have proper hover effects
8. ✓ Contact form validates inputs
9. ✓ Fully responsive on all breakpoints
10. ✓ Colors, fonts, and spacing match specification exactly
