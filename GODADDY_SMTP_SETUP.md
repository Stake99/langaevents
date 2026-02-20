# GoDaddy/Secureserver SMTP Setup for Langa Events

Based on your DNS records, you're using GoDaddy's email hosting (Secureserver). Here's how to configure it.

## SMTP Settings for GoDaddy Email

### For `.env` file (Local Development):

```env
# SMTP Server Configuration
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true

# SMTP Authentication
SMTP_USER=info@langaevents.com
SMTP_PASS=your-actual-email-password

# Email Addresses
SMTP_FROM_EMAIL=info@langaevents.com
SMTP_FROM_NAME=Langa Events
SMTP_TO_EMAIL=info@langaevents.com

# Optional
SMTP_REJECT_UNAUTHORIZED=true
```

## Alternative SMTP Settings (if port 465 doesn't work):

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_SECURE=false
```

Or try:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=80
SMTP_SECURE=false
```

Or:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=3535
SMTP_SECURE=false
```

## Finding Your Email Password

1. Log into your GoDaddy account: https://www.godaddy.com/
2. Go to **Email & Office** → **Email**
3. Find your email account (info@langaevents.com)
4. Click **Manage** or **Settings**
5. Look for **Password** or **Reset Password**
6. Use this password as `SMTP_PASS`

## Setup Steps

### 1. Update Local `.env` File

The `.env` file has been created with the correct settings. Just update:
- `SMTP_PASS` with your actual email password

### 2. Test Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000/questionnaire.html and test the form.

### 3. Configure Vercel Environment Variables

Go to your Vercel project → Settings → Environment Variables

Add these variables:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtpout.secureserver.net` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `info@langaevents.com` |
| `SMTP_PASS` | `your-actual-email-password` |
| `SMTP_FROM_EMAIL` | `info@langaevents.com` |
| `SMTP_FROM_NAME` | `Langa Events` |
| `SMTP_TO_EMAIL` | `info@langaevents.com` |
| `SMTP_REJECT_UNAUTHORIZED` | `true` |

### 4. Deploy to Vercel

```bash
vercel --prod
```

## Your DNS Records (Already Configured)

Based on your DNS settings, these are already set up:

### MX Records (Mail Exchange)
- Priority 0: `smtp.secureserver.net`
- Priority 10: `mailstore1.secureserver.net`

### SPF Record (Sender Policy Framework)
```
v=spf1 include:secureserver.net -all
```

### DMARC Record
```
v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;
```

### DKIM Records
- `s1._domainkey`: `s1.dkim.langaevents_com.3de.onsecureserver.net.`
- `s2._domainkey`: `s2.dkim.langaevents_com.3de.onsecureserver.net.`

These DNS records ensure your emails are properly authenticated and won't be marked as spam.

## Troubleshooting

### "Authentication failed" Error

**Try these solutions in order:**

1. **Verify your email password**
   - Log into GoDaddy webmail: https://email.secureserver.net/
   - If you can't log in, reset your password

2. **Try different ports**
   - Port 465 with SSL (`SMTP_SECURE=true`)
   - Port 587 with TLS (`SMTP_SECURE=false`)
   - Port 80 (`SMTP_SECURE=false`)
   - Port 3535 (`SMTP_SECURE=false`)

3. **Check username format**
   - Use full email: `info@langaevents.com`
   - Some setups might need just: `info`

4. **Verify email account exists**
   - Log into GoDaddy
   - Go to Email & Office
   - Confirm `info@langaevents.com` is active

### "Connection timeout" Error

1. **Check if Vercel can connect to GoDaddy SMTP**
   - GoDaddy sometimes blocks certain IPs
   - Contact GoDaddy support to whitelist Vercel IPs

2. **Try alternative ports**
   - Port 80 or 3535 are less likely to be blocked

### Emails Going to Spam

Your DNS records look good, but also:
1. Warm up your email by sending gradually
2. Avoid spam trigger words
3. Include unsubscribe links
4. Monitor your sender reputation

### Testing Email Delivery

Test your email setup:

```bash
# Local test
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing GoDaddy SMTP",
    "_subject": "Test Email"
  }'
```

## GoDaddy Email Limits

- **Sending Limit**: 250 emails per day per email address
- **Hourly Limit**: Approximately 100 emails per hour
- **Recipients per Email**: Up to 100

If you need higher limits, consider:
- Upgrading to GoDaddy Office 365
- Using a dedicated email service (SendGrid, Mailgun)

## Important Notes

1. **Use the actual email password** - Not your GoDaddy account password
2. **Email must exist** - Create `info@langaevents.com` in GoDaddy if not already created
3. **DNS propagation** - Your DNS records can take up to 48 hours to fully propagate
4. **Firewall issues** - Some networks block SMTP ports, test on different networks

## Alternative: Using GoDaddy Workspace Email

If you have GoDaddy Workspace (Office 365), use these settings instead:

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@langaevents.com
SMTP_PASS=your-office365-password
```

## Getting Help

If you continue having issues:

1. **Check Vercel Logs**
   ```bash
   vercel logs
   ```

2. **Contact GoDaddy Support**
   - Phone: 1-480-505-8877
   - Chat: Available in your GoDaddy account
   - Ask about: "SMTP settings for sending emails from my website"

3. **Test with Email Client First**
   - Configure Outlook/Thunderbird with these settings
   - If it works there, it should work in code

## Quick Checklist

- [ ] Created/updated `.env` file with correct settings
- [ ] Updated `SMTP_PASS` with actual email password
- [ ] Tested locally with `npm run dev`
- [ ] Added all environment variables to Vercel
- [ ] Deployed to Vercel
- [ ] Tested form submission on production
- [ ] Checked email delivery (including spam folder)
- [ ] Verified DNS records are propagated

## Summary

Your configuration should be:
- **SMTP Host**: `smtpout.secureserver.net`
- **Port**: `465` (SSL) or `587` (TLS)
- **Username**: `info@langaevents.com`
- **Password**: Your email account password
- **From Email**: `info@langaevents.com`

Your DNS records are already properly configured for email authentication (SPF, DKIM, DMARC), which will help prevent your emails from being marked as spam.
