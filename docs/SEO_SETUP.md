# SEO Setup Documentation

This document explains the SEO metadata and structured data implementation for the portfolio.

## What Was Implemented

### 1. Comprehensive Metadata (layout.tsx)
- **Title & Description**: Dynamically pulled from `config/portfolio.ts`
- **Keywords**: SEO-relevant keywords for search engines
- **Open Graph Tags**: Rich social media previews (Facebook, LinkedIn)
- **Twitter Cards**: Optimized Twitter sharing with large image cards
- **Robots Meta**: Proper indexing instructions for search engines
- **Icons & Manifest**: PWA support with app icons

### 2. JSON-LD Structured Data
- **Person Schema**: Helps search engines understand you as a professional
- Includes: name, job title, bio, skills, social profiles, email
- Improves rich snippet appearance in search results

### 3. Sitemap (app/sitemap.ts)
- Auto-generated XML sitemap at `/sitemap.xml`
- Helps search engines discover and index your pages
- Updates automatically with Next.js build

### 4. Robots.txt (public/robots.txt)
- Allows all search engine crawlers
- Points to sitemap location
- Can be customized to block specific paths

### 5. PWA Manifest (public/manifest.json)
- Enables "Add to Home Screen" on mobile devices
- Defines app name, colors, and icons
- Improves mobile user experience

## Configuration

### Environment Variables
Add to your `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

Replace with your actual domain when deploying.

### Portfolio Config
Update `config/portfolio.ts` with your information:

```typescript
seo: {
  title: "Your Name | Your Title",
  description: "Your compelling description",
  keywords: ["your", "relevant", "keywords"],
  ogImage: "/images/og-image.jpg",
}
```

### Icons Required
See `/public/ICONS_README.md` for detailed icon requirements:
- `favicon.ico` (32x32)
- `icon.svg` (scalable)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-icon.png` (180x180)
- `og-image.jpg` (1200x630)

## Testing Your SEO

### 1. Open Graph Preview
Test social sharing previews:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. Structured Data
Validate JSON-LD schema:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 3. General SEO
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### 4. Lighthouse Audit
Run in Chrome DevTools:
```bash
npm run build
npm start
# Open Chrome DevTools > Lighthouse > Run audit
```

## Best Practices

1. **Update OG Image**: Create a custom 1200x630 image with your name and tagline
2. **Verify URLs**: Ensure all URLs use your actual domain after deployment
3. **Submit Sitemap**: Submit `/sitemap.xml` to Google Search Console
4. **Monitor Performance**: Check Lighthouse scores regularly (target: 90+)
5. **Test Social Sharing**: Share on different platforms to verify previews

## Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Replace placeholder icons with branded versions
- [ ] Create and add custom OG image
- [ ] Update `config/portfolio.ts` with real information
- [ ] Test all social media previews
- [ ] Submit sitemap to search engines
- [ ] Verify structured data with Google Rich Results Test
- [ ] Run Lighthouse audit and achieve 90+ score

## Maintenance

- Update `lastModified` in sitemap when making significant changes
- Refresh OG image if you rebrand or change focus
- Keep keywords relevant to your current skills and projects
- Monitor search console for indexing issues
