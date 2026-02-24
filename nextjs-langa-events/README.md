# Langa Events - Next.js

A modern Next.js recreation of the Langa Events website with TypeScript, React, and API routes.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Server-side email API with Nodemailer
- ✅ Multi-step questionnaire form
- ✅ Responsive design
- ✅ CSS Modules for styling
- ✅ SEO optimized

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your SMTP credentials:

```bash
cp .env.example .env
```

Edit `.env` with your email service credentials.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
nextjs-langa-events/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # Email API endpoint
│   ├── questionnaire/
│   │   ├── page.tsx              # Questionnaire page
│   │   └── questionnaire.module.css
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── Hero.tsx                  # Hero section
│   ├── About.tsx                 # About section
│   ├── Services.tsx              # Services section
│   ├── Testimonials.tsx          # Testimonials
│   ├── FAQ.tsx                   # FAQ accordion
│   ├── Partners.tsx              # Partners section
│   ├── QuestionnaireForm.tsx     # Multi-step form
│   └── *.module.css              # Component styles
├── package.json
├── tsconfig.json
└── next.config.js
```

## Key Features

### Multi-Step Questionnaire Form
- Step 1: Event type and budget selection
- Step 2: Event details and services needed
- Step 3: Contact information
- Form validation and submission to email API

### Email API
- Server-side email sending with Nodemailer
- SMTP configuration via environment variables
- Formatted HTML emails with customer information
- Error handling and validation

### Responsive Design
- Mobile-first approach
- CSS Modules for scoped styling
- Flexible grid layouts

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

Required environment variables:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_FROM_EMAIL=noreply@langaevents.com
SMTP_FROM_NAME=Langa Events
SMTP_TO_EMAIL=info@langaevents.com
SMTP_REJECT_UNAUTHORIZED=true
```

## License

Copyright © 2024 Langa Events. All rights reserved.
