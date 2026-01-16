# AI Development Agency Landing Page

## Overview
A stylish React + Tailwind CSS landing page with a dark, futuristic aesthetic featuring neon accents, gradients, and smooth animations.

## Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Design System

### Color Palette
| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Void | `#05040a` |
| Surface | Midnight | `#0f0f1a` |
| Primary Accent | Neon Cyan | `#00f5ff` |
| Secondary Accent | Neon Magenta | `#ff006e` |
| Tertiary Accent | Neon Purple | `#8b5cf6` |
| Text Primary | Light Gray | `#e4e4e7` |
| Text Secondary | Gray | `#a1a1aa` |

### Visual Effects
- Neon glow on buttons and cards (box-shadow with accent colors)
- Gradient text for headlines (cyan → purple → magenta)
- Floating gradient orbs in hero section
- Subtle grid pattern overlay
- Smooth hover transitions with slight lift effect

## Page Sections

### 1. Hero
- Headline: "Intelligence, Engineered."
- Subtext explaining the agency's value proposition
- Two CTAs: "Start Your Project" (primary) + "See Our Work" (outline)
- Decorative elements:
  - ParticleBackground (animated dots with connection lines)
  - DataTransformationViz (scroll-driven SVG that draws a neural network pattern as user scrolls)
  - HeroOrbs (floating gradient blurs)
  - Scroll indicator at bottom

### 2. Services (6 cards)
1. Custom AI Development
2. Machine Learning Systems
3. AI Integration
4. AI Consulting
5. Data Engineering
6. AI Maintenance & Support

Each card: icon, title, description, technology tags

### 3. About
- Headline: "We Build What Others Only Pitch"
- Company story paragraph
- Stats grid: 100+ Projects, 50+ Clients, 98% Satisfaction, 24/7 Support
- 4 Core values: Outcomes Over Output, Radical Transparency, Built to Last, Speed Without Shortcuts

### 4. Process ("How We Work")
- Headline: "From Idea to Working Product—Fast."
- 3-step diagonal timeline layout with connecting SVG path:
  1. **Spec It Right** (cyan) - Focused discovery, clear requirements
  2. **Build It Real** (magenta) - Working code in weeks, not mockups
  3. **Refine It Fast** (purple) - Rapid iteration cycles
- Each step card includes:
  - Oversized watermark number (01, 02, 03)
  - Icon + title
  - Description
  - Deliverable block
  - Timeline badge
  - Comparison callout (Traditional vs NeuralForge)

### 5. Project Builder (Interactive Requirements Builder)
- Headline: "Build Your AI Project"
- Two-column layout:
  - Left (60%): Selection area with 4 steps
  - Right (40%): Sticky summary panel

#### Selection Components:
1. **Project Type Selector** (single-select cards)
   - 6 service types with icons
   - Selected state: cyan border + glow + checkmark

2. **Feature Selector** (multi-select chips)
   - Core Capabilities: NLP, Computer Vision, Predictive Analytics, Generative AI, Recommendation Engine
   - Integrations: REST/GraphQL APIs, CRM, Database Connectors, Cloud Services, Real-time Streaming
   - Scale & Security: Enterprise Scale, Compliance, ML Ops, Edge Deployment
   - Selected state: purple background + border

3. **Timeline Selector** (single-select horizontal cards)
   - Urgent (2-4 weeks) - magenta accent
   - Standard (1-2 months) - cyan accent
   - Flexible (3+ months) - purple accent

4. **Budget Selector** (single-select range cards)
   - $10k-25k (Starter)
   - $25k-50k (Growth)
   - $50k-100k (Scale)
   - $100k-250k (Enterprise)
   - $250k+ (Custom)

#### Summary Panel:
- Displays all selections in real-time with animated updates
- Complexity indicator bar (Light → Moderate → Substantial → Enterprise)
- "Get Custom Quote" CTA (enabled when all steps complete)
- Reset button

#### Submission Modal:
- Project summary (read-only)
- Contact form: Name, Email, Company, Message
- Success confirmation state

### 6. Contact
- Headline: "Let's Build Something Intelligent"
- Form: Name, Email, Company, Project Type, Budget, Description
- Contact info panel: Email, Phone, Location, Social links

## File Structure
```
ai-agency-landing/
├── index.html
├── package.json
├── vite.config.js
├── docs/
│   ├── SPEC.md
│   └── COPY.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css (Tailwind config + custom theme)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── ProjectBuilder/
│   │   │   │   ├── index.js
│   │   │   │   ├── ProjectBuilder.jsx
│   │   │   │   ├── ProjectTypeSelector.jsx
│   │   │   │   ├── FeatureSelector.jsx
│   │   │   │   ├── TimelineSelector.jsx
│   │   │   │   ├── BudgetSelector.jsx
│   │   │   │   ├── BuilderSummary.jsx
│   │   │   │   └── SubmissionModal.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── GradientText.jsx
│   │   │   └── SectionHeading.jsx
│   │   └── decorative/
│   │       ├── ParticleBackground.jsx
│   │       ├── GradientOrb.jsx
│   │       └── DataTransformationViz.jsx
│   └── data/
│       ├── services.js
│       └── projectBuilder.js
```

## Implementation Steps

1. **Project Setup**
   - Initialize Vite + React project
   - Install dependencies: tailwindcss, @tailwindcss/vite, framer-motion, lucide-react
   - Configure Tailwind v4 in vite.config.js
   - Set up custom theme colors in index.css

2. **UI Components**
   - Button (primary/secondary/ghost variants with glow)
   - Card (service cards with hover glow effect)
   - Input/Textarea (neon focus states)
   - GradientText (animated gradient text)
   - SectionHeading (consistent section titles)

3. **Decorative Components**
   - ParticleBackground (subtle animated dots)
   - GradientOrb (floating colored blurs)

4. **Layout Components**
   - Navbar (fixed, with mobile hamburger menu)
   - Footer (links + social icons)

5. **Section Components**
   - Hero with all visual elements
   - Services grid (responsive 1/2/3 columns)
   - About with animated stats
   - Contact form + info panel

6. **Polish**
   - Add Framer Motion scroll animations
   - Ensure responsive behavior at all breakpoints
   - Test and refine hover/focus states

## Verification
1. Run `npm run dev` and verify all sections render correctly
2. Test responsive design at mobile (375px), tablet (768px), desktop (1280px)
3. Verify all hover effects and animations work smoothly
4. Test contact form interactions
5. Check accessibility (keyboard navigation, color contrast)
6. **Hero scroll visualization**: Scroll slowly through hero, verify neural network pattern draws progressively
7. **Process section**: Verify diagonal timeline layout and path animation on scroll
8. **Project Builder**:
   - Select project type → card highlights with cyan glow
   - Toggle features → chips animate, summary updates in real-time
   - Select timeline/budget → selections reflect in sticky summary panel
   - Verify summary panel stays visible while scrolling through steps
   - Complete all 4 steps → "Get Custom Quote" button enables
   - Click CTA → modal opens with project summary
   - Submit form → success confirmation displays
