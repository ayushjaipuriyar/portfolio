# Icons and Favicons Guide

This portfolio requires the following icon files for proper SEO and PWA support:

## Required Icon Files

Place these files in the `/public` directory:

### Favicon Files
- `favicon.ico` - 32x32 or 16x16 ICO format (legacy browsers)
- `icon.svg` - SVG format (modern browsers, scalable)

### PNG Icons
- `icon-192.png` - 192x192 PNG (Android Chrome, PWA)
- `icon-512.png` - 512x512 PNG (Android Chrome, PWA, splash screens)
- `apple-icon.png` - 180x180 PNG (iOS Safari, home screen)

### Open Graph Image
- `og-image.jpg` - 1200x630 JPG (social media sharing preview)

## How to Generate Icons

### Option 1: Use an Online Tool
1. Visit [Favicon.io](https://favicon.io/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo or design
3. Download the generated icon pack
4. Place files in the `/public` directory

### Option 2: Manual Creation
1. Create a square logo/icon (at least 512x512)
2. Use an image editor (Photoshop, Figma, GIMP) to resize:
   - 512x512 → `icon-512.png`
   - 192x192 → `icon-192.png`
   - 180x180 → `apple-icon.png`
   - 32x32 → `favicon.ico`
3. Create an SVG version for `icon.svg`
4. Create a 1200x630 social preview image for `og-image.jpg`

## Tips
- Use transparent backgrounds for PNG icons
- Ensure icons are recognizable at small sizes
- Test icons in both light and dark modes
- The OG image should include your name and tagline for better social sharing

## Current Status
⚠️ Placeholder files need to be replaced with your actual branding.
