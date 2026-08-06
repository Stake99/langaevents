# Setup Guide for Langa Events Next.js

## Quick Start

### 1. Navigate to the project directory
```bash
cd nextjs-langa-events
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your SMTP credentials. You can use the same credentials from your current `.env` file.

### 4. Run the development server
```bash
npm run dev
```

Visit http://localhost:3000

## What's Included

### Pages
- **Home (/)** - Hero, About, Services, Testimonials, FAQ, Partners
- **Questionnaire (/questionnaire)** - Multi-step event inquiry form

### API Routes
- **POST /api/send-email** - Handles form submissions and sends emails via Nodemailer

### Components
All components are modular and reusable:
- Header with responsive navigation
- Footer with social links
- Hero section
- About section
- Services grid
- Testimonials carousel
- FAQ accordion
- Partners section
- Multi-step questionnaire form

### Features
✅ TypeScript for type safety
✅ CSS Modules for scoped styling
✅ Responsive design (mobile-first)
✅ Server-side email API
✅ Form validation
✅ SEO optimized
✅ Fast page loads with Next.js

## Migrating from Current Site

### Images
Copy your images from the old project:
```bash
cp -r ../images ./public/images
```

Then use Next.js Image component:
```tsx
import Image from 'next/image'

<Image src="/images/your-image.jpg" alt="Description" width={800} height={600} />
```

### Additional Pages
To add more pages (about, services, contact, work):

1. Create `app/about/page.tsx`:
```tsx
export default function AboutPage() {
  return <div>About content</div>
}
```

2. The route will automatically be available at `/about`

### Styling
- Global styles: `app/globals.css`
- Component styles: `components/ComponentName.module.css`
- Use CSS variables defined in `globals.css`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Vercel
Add these in your Vercel project settings:
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASS
- SMTP_FROM_EMAIL
- SMTP_FROM_NAME
- SMTP_TO_EMAIL
- SMTP_REJECT_UNAUTHORIZED

## Development Tips

### Hot Reload
Next.js automatically reloads when you save files.

### TypeScript
The project uses TypeScript. If you see type errors, check:
- Component props
- Function parameters
- API response types

### Debugging
- Check browser console for client-side errors
- Check terminal for server-side errors
- Use `console.log()` for debugging

## Production Build

```bash
npm run build
npm start
```

This creates an optimized production build.

## Need Help?

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs
