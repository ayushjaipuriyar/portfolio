# Project Images

This directory contains images for portfolio projects.

## Default Image

**`default.webp`** - This is the fallback image used for all projects when specific project images are not available.

- **Format**: WebP (optimized for web)
- **Recommended size**: 1200x800px (3:2 aspect ratio)
- **Usage**: Automatically applied to all projects fetched from GitHub

## Adding Custom Project Images

To add a custom image for a specific project:

1. Create an image file named after your repository (lowercase)
2. Place it in this directory: `/public/images/projects/`
3. Supported formats: `.jpg`, `.png`, `.webp`

### Example:
For a repository named `my-awesome-project`:
- File name: `my-awesome-project.jpg` or `my-awesome-project.webp`
- Location: `/public/images/projects/my-awesome-project.jpg`

## Image Guidelines

- **Recommended size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP for best performance, JPG/PNG also supported
- **Max file size**: 1MB per image
- **Content**: Screenshots of the project interface or key features

## How It Works

The portfolio automatically:
1. Fetches projects from your GitHub account
2. Looks for a matching image file in this directory
3. Falls back to `default.webp` if no specific image is found

All images are automatically optimized by Next.js Image component for:
- Modern format conversion (AVIF, WebP)
- Responsive sizing
- Lazy loading
- Blur placeholders
