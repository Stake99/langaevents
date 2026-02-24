# Deploying to Vercel

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your branch to GitHub:**
   ```bash
   git push -u origin nextjs-redesign
   ```

2. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project Settings:**
   - **Root Directory:** Set to `nextjs-langa-events`
   - **Framework Preset:** Next.js (should auto-detect)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - `EMAIL_USER` = your email address
   - `EMAIL_PASS` = your email password/app password
   - `EMAIL_TO` = recipient email address

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your Next.js app

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from the Next.js directory:**
   ```bash
   cd nextjs-langa-events
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Environment Variables Required

Make sure to set these in Vercel:

```
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@example.com
```

## Post-Deployment

After deployment:
1. Test all pages (home, about, services, contact, questionnaire)
2. Test the contact form submission
3. Test service detail pages and galleries
4. Verify all images load correctly
5. Check mobile responsiveness

## Custom Domain (Optional)

To add a custom domain:
1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., langaevents.com)
4. Follow DNS configuration instructions

## Troubleshooting

**Build fails:**
- Check that all dependencies are in package.json
- Verify environment variables are set
- Check build logs in Vercel dashboard

**Images not loading:**
- Ensure images are in the `public` folder
- Check image paths start with `/` (e.g., `/home/image.jpg`)

**Email not sending:**
- Verify environment variables are set correctly
- Check email provider allows SMTP
- Consider using app-specific passwords for Gmail

## Branch Deployment

Vercel automatically deploys:
- **Production:** `main` branch → your-domain.com
- **Preview:** Other branches → unique preview URLs

To deploy the `nextjs-redesign` branch:
1. Push the branch to GitHub
2. Vercel creates a preview deployment automatically
3. When ready, merge to `main` for production
