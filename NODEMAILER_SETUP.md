# Nodemailer SMTP Setup Guide

This guide will help you set up Nodemailer with custom SMTP credentials for handling form submissions on your Langa Events website.

## Prerequisites

- Node.js installed (v14 or higher)
- SMTP server credentials (from your email provider or hosting)
- Vercel account (for deployment)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your SMTP credentials:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false

# SMTP Authentication
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password

# Email Addresses
SMTP_FROM_EMAIL=noreply@langaevents.com
SMTP_FROM_NAME=Langa Events
SMTP_TO_EMAIL=info@langaevents.com

# Optional
SMTP_REJECT_UNAUTHORIZED=true
```

### 3. SMTP Configuration Examples

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Note:** For Gmail, you need an App Password:
1. Enable 2-Step Verification at https://myaccount.google.com/security
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use the 16-character password as `SMTP_PASS`

#### Outlook/Office365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### cPanel/WHM (Most Web Hosts)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

#### Amazon SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

### 4. Understanding SMTP Settings

**SMTP_HOST**: Your mail server address
- Usually `smtp.yourdomain.com` or `mail.yourdomain.com`
- Check with your hosting provider or email service

**SMTP_PORT**: 
- `587` - TLS/STARTTLS (recommended, most common)
- `465` - SSL (use with `SMTP_SECURE=true`)
- `25` - Unencrypted (not recommended)
- `2525` - Alternative port (some providers)

**SMTP_SECURE**:
- `false` - Use TLS/STARTTLS (port 587)
- `true` - Use SSL (port 465)

**SMTP_USER**: Your email username
- Usually your full email address
- Sometimes just the username part

**SMTP_PASS**: Your email password
- Regular password for most providers
- App Password for Gmail
- API key for services like SendGrid

### 5. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000/questionnaire.html and test the form.

## Vercel Deployment Setup

### 1. Configure Environment Variables on Vercel

#### Via Vercel Dashboard:
1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add all the SMTP variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM_EMAIL`
   - `SMTP_FROM_NAME`
   - `SMTP_TO_EMAIL`
   - `SMTP_REJECT_UNAUTHORIZED` (optional)

#### Via Vercel CLI:
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_SECURE
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SMTP_FROM_EMAIL
vercel env add SMTP_FROM_NAME
vercel env add SMTP_TO_EMAIL
```

### 2. Deploy

```bash
vercel --prod
```

Or push to your Git repository if you have automatic deployments enabled.

## Finding Your SMTP Credentials

### cPanel Hosting
1. Log into cPanel
2. Go to **Email Accounts**
3. Find your email account
4. Click **Configure Email Client**
5. Look for SMTP settings

### Plesk Hosting
1. Log into Plesk
2. Go to **Mail**
3. Click on your email address
4. Look for **Mail Server Settings**

### Contact Your Hosting Provider
If you can't find SMTP settings:
- Contact your hosting support
- Ask for "SMTP server settings for outgoing mail"
- They'll provide: host, port, username, and authentication method

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Verify SMTP_USER and SMTP_PASS are correct
- Check if you need an App Password (Gmail, Yahoo)
- Ensure 2FA is configured if required
- Try using full email address as username

### "Connection timeout" or "ECONNREFUSED"
- Check SMTP_HOST is correct
- Verify SMTP_PORT is correct (try 587, 465, or 2525)
- Check firewall isn't blocking the port
- Verify your hosting allows outbound SMTP connections

### "Self-signed certificate" error
- Set `SMTP_REJECT_UNAUTHORIZED=false` in your .env
- Only use this if you trust your mail server

### "SMTP_SECURE" issues
- If port 587: use `SMTP_SECURE=false`
- If port 465: use `SMTP_SECURE=true`
- Try switching between true/false if having issues

### Emails not being received
- Check spam/junk folder
- Verify SMTP_TO_EMAIL is correct
- Check email server logs
- Verify SMTP_FROM_EMAIL is a valid address
- Some servers require FROM address to be on the same domain

### Local development works but production doesn't
- Verify all environment variables are set in Vercel
- Check Vercel function logs for errors
- Ensure nodemailer is in dependencies (not devDependencies)
- Check if your SMTP provider blocks Vercel IPs

## Testing the API Endpoint

Test locally:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message",
    "_subject": "Contact Form: Test Subject"
  }'
```

Test on production:

```bash
curl -X POST https://your-domain.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message",
    "_subject": "Contact Form: Test Subject"
  }'
```

## Security Best Practices

- Never commit `.env` file to Git
- Use strong passwords for SMTP accounts
- Keep your environment variables secure
- Regularly rotate passwords
- Use dedicated email accounts for website forms
- Monitor your email sending activity
- Enable rate limiting if possible
- Use SPF, DKIM, and DMARC records for your domain

## Email Sending Limits

Different providers have different limits:

- **Gmail**: 500 emails/day (free), 2000/day (Google Workspace)
- **Outlook**: 300 emails/day (free)
- **Yahoo**: 500 emails/day (free)
- **SendGrid**: 100 emails/day (free), more with paid plans
- **Mailgun**: 5,000 emails/month (free trial)
- **Amazon SES**: Pay as you go, very high limits
- **cPanel/Shared Hosting**: Usually 100-500 emails/hour

For high-volume needs, consider:
- SendGrid (recommended for startups)
- Mailgun (developer-friendly)
- Amazon SES (cost-effective at scale)
- Postmark (transactional emails)

## Common SMTP Ports

- **Port 25**: Traditional SMTP (often blocked by ISPs)
- **Port 587**: STARTTLS (recommended, most compatible)
- **Port 465**: SSL/TLS (older but still used)
- **Port 2525**: Alternative (used by some providers)

## Checking SMTP Connection

Test your SMTP connection:

```bash
telnet smtp.example.com 587
```

Or use an online SMTP tester:
- https://www.smtper.net/
- https://mxtoolbox.com/diagnostic.aspx

## Support

If you encounter issues:
1. Check the Vercel function logs: `vercel logs`
2. Review the browser console for errors
3. Verify all environment variables are set correctly
4. Test SMTP credentials with an email client first
5. Contact your hosting provider for SMTP support

## Files Modified

- `api/send-email.js` - Serverless function with SMTP configuration
- `js/contact-form-handler.js` - Contact form submission handler
- `questionnaire.html` - Updated form submission
- `contact.html` - Updated form submission
- `package.json` - Added nodemailer dependency
- `.env.example` - SMTP environment variable template
- `.gitignore` - Ignore sensitive files

## Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in SMTP credentials in `.env`
- [ ] Test locally: `npm run dev`
- [ ] Add environment variables to Vercel
- [ ] Deploy: `vercel --prod`
- [ ] Test production form submission
- [ ] Check email delivery
