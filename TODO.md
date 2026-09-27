# AI ICON Website Revision Checklist

> [!CAUTION]
> **CRITICAL SPONSOR COMPLIANCE NOTICE:** Under no circumstances should Navy Federal (NavyFed) be listed, badged, or referenced anywhere in the sponsor carousel, partner logos, or site footer assets.

## 🌅 Phase 1: Header, Hero & Core Branding Layout
- [x] done: 1. Remove the picture carousel background and replace it with a solid white background.
  - *Note: Use solid white `#FFFFFF` across the full container. Ensure high-contrast readability for overlay text.*
- [x] done: 2. For the homepage index refresh logo, increase the font size for "AI & Innovation Conference".
  - *Note: Check legibility scaling across desktop, tablet, and mobile layouts.*
- [x] done: 3. Remove the black background from the AI ICON mascot image to make it stand out.
  - *Note: Deliver as a transparent PNG / SVG clipping path.*
- [x] done: 4. Remove the black strip behind the "500+", "15+", and "10+" sections so the three boxes appear to float.
  - *Note: Add clean drop-shadows or border cards to the three cards over the base background.*

## 🛠️ Phase 2: Content Modules, Media & Grid Alignment
- [x] done: 5. In the "AI Look Bank" section, change "LOOKS" so it is no longer capitalized.
  - *Note: Update heading and body copy formatting cleanly to sentence/title case ("AI Look Bank" or "Look").*
- [ ] todo: 6. Convert the three static images into a carousel and allow for additional images.
  - *Note: Ensure it is touch-friendly with left/right navigation arrows, dot indicators, and modular code/CMS compatibility.*
- [x] done: 9. In the START/APPLY/BUILD section, have two pictures to align with the three boxes, and fix the line alignment on the BUILD box to match START and APPLY.
  - *Note: Correct the structural box line alignment and vertical top/bottom baseline padding on the BUILD card.*

## 💳 Phase 3: Pricing, Lead Generation & Conversion Features
- [x] done: 7. Under "Pick Your Access Level", remove the text: "Higher tiers add Day One access and one-on-one implemetnation time."
- [ ] todo: 8. Update pricing display: strike out \$399 for General Admission, \$699 for ICON Tier, and \$999 for Premier ICON Tier.
  - *Note: Visibly display the original rate with a strikethrough next to the active price. (Check doc spec if GA active tier math matches `$499 $249`).*
- [x] done: 10. Add a skill assessment (Beginner, Intermediate, Advanced) and integrate Google Analytics and FB pixel for ad retargeting.
  - *Note: Integrate Google Analytics (GA4) and Facebook (Meta) Pixel specifically for assessment completion tracking.*
- [ ] todo: 11. In the "Reach the Right Team" section, set all fields as required, add a CAPTCHA, and add a "Partner" button that routes to partnership@aiicon.org.
  - *Note: Use Google reCAPTCHA v3 or Cloudflare Turnstile. Configure the button link as `mailto:partnership@aiicon.org`.*

## 🌐 Phase 4: Navigation, Social, Footer & Accessibility QA
- [x] done: 12. Remove all em dashes across the site.
  - *Note: Sweep all page templates, headings, paragraphs, and metadata. Replace with hyphens, colons, commas, or periods.*
- [x] done: 13. Update the location to: Killeen Civic & Conference Center.
  - *Note: Update footers, maps, and schema data strings to `Killeen Civic & Conference Center (Killeen, Texas)`.*
- [x] done: 14. Ensure all social media icons link to the correct AI ICON pages and add any missing channels.
  - *Note: Verify Facebook, LinkedIn, Instagram, and TikTok icons are styled and open in new tabs (`target="_blank" rel="noopener"`).*
- [x] done: 15. Add a scroll-to-top button while scrolling, as well as a "Back to Top" button at the bottom of the page.
  - *Note: Set floating button to trigger past 300px. Use smooth scroll behavior (`window.scrollTo({ top: 0, behavior: 'smooth' })`).*
- [x] done: 16. Review the site in dark/night view after these changes to ensure visibility.
  - *Note: Ensure the text contrast against the white hero transition meets WCAG AA standards. Audit borders on floating elements.*
- [ ] todo: 17. Add a scrolling logo bar right above the footer using the assets in the "logo" folder on the Marketing drive.
  - *Note: Configure an infinite horizontal scrolling marquee animation. Verify NavyFed is omitted from the file list.*
