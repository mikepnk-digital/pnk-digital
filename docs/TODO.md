# PNK Digital - Development TODO

> This document tracks planned features, improvements, and tasks for the PNK Digital website.
> Each item includes context and acceptance criteria to ensure clear implementation.

---

## Priority Levels

- **P0** - Critical / Blocking
- **P1** - High priority / Should do soon
- **P2** - Medium priority / Nice to have
- **P3** - Low priority / Future consideration

## Status Key

- [ ] Not started
- [x] Completed
- [~] In progress

---

## Features

### Feature: [Feature Name]
**Priority:** P1
**Status:** [ ] Not started

**Description:**
[Clear description of what this feature should do and why it's needed]

**Requirements:**
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

**Acceptance Criteria:**
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

**Technical Notes:**
[Any implementation details, file locations, or dependencies to be aware of]

---

### Feature: [Example - Dark/Light Mode Toggle]
**Priority:** P2
**Status:** [ ] Not started

**Description:**
Add a theme toggle that allows users to switch between dark mode (current) and a light mode variant. The preference should persist across sessions.

**Requirements:**
- Toggle button in the navbar
- Smooth transition between themes
- Persist user preference in localStorage
- Default to dark mode

**Acceptance Criteria:**
- [ ] Toggle button visible in navbar on all screen sizes
- [ ] Theme changes apply to all components immediately
- [ ] User preference persists after page refresh
- [ ] No flash of incorrect theme on page load

**Technical Notes:**
- Consider using CSS custom properties for theme colors
- Update `tailwind.config.js` for light mode variants
- Affected files: Navbar.jsx, all components using color tokens

---

## Improvements

### Improvement: [Improvement Name]
**Priority:** P2
**Status:** [ ] Not started

**Description:**
[What needs to be improved and why]

**Current Behavior:**
[How it works now]

**Desired Behavior:**
[How it should work after the improvement]

**Files to Modify:**
- [File path 1]
- [File path 2]

---

## Bug Fixes

### Bug: [Bug Title]
**Priority:** P1
**Status:** [ ] Not started

**Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Affected Files:**
- [File path]

---

## Content Updates

### Content: [Content Update Title]
**Priority:** P3
**Status:** [ ] Not started

**Description:**
Make the content in the website reflect what the business actually wants to market itself as and provide the relevant services. The company aims to help other companies develop their software projects faster than competitors by leverating AI tools. We can build websites, applications, software tools, and we can also consult and help with working with AI within a company. I want companies to be aware that we have the power to build what they want without having to hire a large dev team or large agency. Therefore bringing costs down and shorten delivery times.

**Location:**
All sections of the site

**New Content:**
```
[The actual content to add/update]
```

---

## Performance

### Performance: [Optimization Title]
**Priority:** P2
**Status:** [ ] Not started

**Description:**
[What performance issue needs to be addressed]

**Current Metrics:**
[If known - load time, bundle size, etc.]

**Target Metrics:**
[What we want to achieve]

**Approach:**
[How to implement this optimization]

---

## Accessibility

### A11y: [Accessibility Issue]
**Priority:** P1
**Status:** [ ] Not started

**Description:**
[What accessibility issue needs to be fixed]

**WCAG Guideline:**
[Relevant WCAG criterion if applicable]

**Fix Required:**
[What needs to be done to fix it]

---

## Notes

[Any general notes, ideas, or considerations that don't fit into the above categories]

---

*Last updated: [Date]*
