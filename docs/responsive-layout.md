# Responsive layout and profile photo

The existing desktop layout is preserved above 1024px. `dist/responsive.css` adds tablet and mobile overrides; `dist/responsive.js` moves the existing About image between its desktop position and the mobile story, without duplicating the image.

## Mobile Hero Redesign (<= 767px)

The mobile Home/Hero section features a cinematic full-screen composition:
- **Full-Screen Canvas:** `min-height: 100svh` with responsive vertical flow.
- **Integrated Background:** Profile image spans the entire hero background with multi-stop dark gradient overlays and an orange rim-light backlight glow.
- **Top Badge:** Dark translucent `[ ● Curious by nature ]` badge with backdrop blur and orange indicator dot.
- **Main Headline:** Large `Cybersecurity student & digital builder.` with tight line-height and contrast shadows.
- **Supporting Text:** `Learning how systems work. Discovering how to protect them.` positioned over the background.
- **Bottom Label:** Uppercase `THE HUMAN BEHIND THE TERMINAL` with cyber letter-spacing.
- **Name:** Large `Thilanga. Dilshan.` with orange period accents, flexing horizontally on larger mobile screens and stacking vertically on `<= 480px`.

## Add your portrait

1. Save your photo in `dist/assets/images/profile.webp` (or `dist/assets/profile.jpg`).
2. In `dist/index.html`, update the hero image source on line 186:
   ```html
   <img class="profile-image" src="assets/images/profile.webp" alt="Portrait of Thilanga Dilshan" ...>
   ```
3. To adjust face framing on mobile, edit `.hero-profile .profile-image` in `dist/responsive.css`:
   ```css
   .hero-profile .profile-image {
     object-position: 65% 10% !important;
   }
   ```
   - First percentage (`65%`): horizontal position (`50%` is center; higher values shift subject left to give text breathing room).
   - Second percentage (`10%`): vertical position (increase to `15%`-`25%` if face is too high; decrease toward `0%` if face is too low).

## Verification

Browser layout checks covered 320, 360, 375, 390, 412, 430, 480, 768, 1024, and 1440 CSS pixels.

- No page-wide horizontal overflow or overflow in checked headings, paragraphs, terminal content, form, tool cards, and footer navigation.
- Desktop section geometry at 1440px matched the pre-edit measurements.
- Both profile placeholders loaded and use cover sizing.
- Mobile menu trigger is 44 × 44px; links close the menu.
- Selecting Linux fundamentals updates the featured lab.
- Contact inputs are at least 48px tall and use 16px text; required-field validation rejects empty inputs and accepts valid entries. No message was sent or copied during testing.
- Inspected mobile hero, project cards, contact form, and 320px timeline visually.
- Reduced-motion rules remain in place; form delivery behavior is unchanged.

Final face placement must be checked after replacing the placeholder with the real photo. These were desktop-browser viewport checks, not physical-device tests.
