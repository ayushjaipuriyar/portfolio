# Image Assets

This directory contains all image assets for the portfolio.

## Image Optimization

All images in this portfolio are automatically optimized by Next.js Image component:

- **Automatic format conversion**: Images are served in modern formats (AVIF, WebP) with fallbacks
- **Responsive images**: Multiple sizes generated for different screen sizes
- **Lazy loading**: Images below the fold are loaded only when needed
- **Blur placeholder**: Optional blur-up effect while images load

## Directory Structure

```
images/
├── avatar.jpg          # Your profile photo (recommended: 400x400px)
├── og-image.jpg        # Open Graph image for social sharing (1200x630px)
└── projects/           # Project screenshots
    ├── ecommerce.jpg
    ├── taskapp.jpg
    ├── weather.jpg
    ├── cms.jpg
    ├── fitness.jpg
    └── blog.jpg
```

## Image Guidelines

### Profile Images (avatar.jpg)
- **Recommended size**: 400x400px
- **Format**: JPG or PNG
- **Max file size**: 500KB
- Used in Hero and About sections

### Project Images
- **Recommended size**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Max file size**: 1MB per image
- Should showcase the project interface or key features

### OG Image (og-image.jpg)
- **Required size**: 1200x630px
- **Format**: JPG or PNG
- **Max file size**: 1MB
- Used for social media previews

## Adding New Images

1. Place your images in the appropriate directory
2. Use descriptive filenames (lowercase, hyphens for spaces)
3. Update `config/portfolio.ts` with the correct image paths
4. Images are automatically optimized by Next.js

## External Images

If you need to use images from external URLs (CDN, cloud storage):
- The configuration already supports all HTTPS domains
- Simply use the full URL in your portfolio config
- Next.js will proxy and optimize external images

## Performance Tips

- Use JPG for photos and complex images
- Use PNG for images with transparency
- Compress images before uploading (tools: TinyPNG, Squoosh)
- Aim for under 500KB per image before optimization
- Next.js will handle the rest!
