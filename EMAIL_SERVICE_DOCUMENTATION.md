# Langa Events Email Service - Technical Documentation

## Overview

This document provides a comprehensive explanation of how the email service works for the Langa Events website, including the technical architecture, data flow, and implementation details.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [How It Works - Step by Step](#how-it-works---step-by-step)
3. [Technical Components](#technical-components)
4. [Email Flow Diagram](#email-flow-diagram)
5. [Security & Authentication](#security--authentication)
6. [Error Handling](#error-handling)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)

---

## System Architecture

### High-Level Overview

```
User Browser → Website Form → Vercel Serverless Function → GoDaddy SMTP Server → Recipient Email
```

### Components

1. **Frontend (HTML/JavaScript)**
   - `questionnaire.html` - Event inquiry form
   - `contact.html` - Contact form
   - `js/contact-form-handler.js` - Form submission handler

2. **Backend (Serverless Function)**
   - `api/send-email.js` - Email processing and sending

3. **Email Infrastructure**
   - GoDaddy SMTP Server (smtpout.secureserver.net)
   - Nodemailer library for email handling

4. **Hosting Platform**
   - Vercel (serverless deployment)
   - Environment variables for configuration

---

## How It Works - Step by Step

### Step 1: User Fills Out Form

**Location:** `questionnaire.html` or `contact.html`

The user fills out a multi-step form with information such as:
- Event type (Wedding, Corporate, etc.)
- Budget range
- Services needed
- Guest count
- Event timeline
- Contact information (name, email, phone)
- Event description

### Step 2: Form Validation

**Location:** JavaScript in `questionnaire.html` and `js/contact-form-handler.js`

Before submission, the form validates:
- Required fields are filled
- Email format is correct
- At least one service is selected (for questionnaire)
- Phone number is provided

```javascript
// Example validation
if (!document.getElementById('eventType').value) {
    alert('Please select an event type');
    return false;
}
```

### Step 3: Form Submission via AJAX

**Location:** JavaScript in forms

When the user clicks "Submit", the form data is sent via AJAX to the serverless function:

```javascript
$.ajax({
    url: '/api/send-email',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
        // Show success message
    },
    error: function(xhr, status, error) {
        // Show error message
    }
});
```

**Data Format:**
```json
{
    "event_type": "Wedding",
    "budget_range": "R50,000 - R100,000",
    "services[]": ["Event Design & Decor", "Furniture & Setup"],
    "guest_count": "100-200",
    "timeline": "4-6 Months",
    "venue": "Johannesburg",
    "name": "John Doe",
    "phone": "076 123 4567",
    "email": "john@example.com",
    "event_description": "Looking for elegant wedding setup",
    "referral_source": "Instagram",
    "_subject": "New Event Inquiry - Langa Events Quote Request"
}
```

### Step 4: Serverless Function Receives Request

**Location:** `api/send-email.js`

The Vercel serverless function is triggered when a POST request hits `/api/send-email`.

**Function Entry Point:**
```javascript
module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    // ... rest of the code
}
```

### Step 5: Credential Validation

The function first checks if SMTP credentials are configured:

```javascript
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP credentials!');
    return res.status(500).json({
        success: false,
        error: 'SMTP credentials not configured'
    });
}
```

**Environment Variables Required:**
- `SMTP_HOST` - Mail server address
- `SMTP_PORT` - Port number (465 or 587)
- `SMTP_SECURE` - SSL/TLS setting
- `SMTP_USER` - Email username
- `SMTP_PASS` - Email password
- `SMTP_FROM_EMAIL` - Sender email
- `SMTP_FROM_NAME` - Sender name
- `SMTP_TO_EMAIL` - Recipient email

### Step 6: SMTP Transporter Creation

**Using Nodemailer:**

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'info@langaevents.com',
        pass: 'password'
    },
    tls: {
        rejectUnauthorized: true,
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    debug: true,
    logger: true
});
```

**Configuration Breakdown:**
- `host` - GoDaddy's SMTP server
- `port` - 465 for SSL, 587 for TLS
- `secure` - true for port 465, false for 587
- `auth` - Username and password for authentication
- `tls.ciphers` - Encryption cipher (GoDaddy requires SSLv3)
- `requireTLS` - Force TLS encryption
- `debug/logger` - Enable detailed logging

### Step 7: Connection Verification

Before sending, the function verifies the SMTP connection:

```javascript
await transporter.verify();
console.log('SMTP connection verified successfully');
```

This ensures:
- SMTP server is reachable
- Credentials are correct
- Connection is secure

### Step 8: Email Content Formatting

The function formats the form data into HTML email:

```javascript
let emailContent = '<div style="font-family: Arial, sans-serif;">';
emailContent += '<h2>New Event Inquiry</h2>';

// Highlight customer contact info
emailContent += '<div style="background: #FFF8E1; padding: 15px;">';
emailContent += `<p><strong>Name:</strong> ${customerName}</p>`;
emailContent += `<p><strong>Email:</strong> ${customerEmail}</p>`;
emailContent += '</div>';

// Add all form fields
for (const [key, value] of Object.entries(formData)) {
    emailContent += `<p><strong>${label}:</strong> ${value}</p>`;
}
emailContent += '</div>';
```

**Email Structure:**
1. Header with title
2. Customer contact information (highlighted in yellow)
3. All form fields with labels
4. Footer with timestamp

### Step 9: Email Options Configuration

```javascript
const mailOptions = {
    from: '"Langa Events" <info@langaevents.com>',
    to: 'info@langaevents.com',
    subject: '[John Doe] New Event Inquiry - Langa Events',
    html: emailContent,
    replyTo: 'john@example.com'
};
```

**Key Fields:**
- `from` - Sender (must be authenticated email)
- `to` - Recipient (where inquiry goes)
- `subject` - Includes customer name for easy identification
- `html` - Formatted email body
- `replyTo` - Customer's email (for easy replies)

### Step 10: Email Sending

```javascript
const info = await transporter.sendMail(mailOptions);
console.log('Email sent successfully:', info.messageId);
```

**What Happens:**
1. Nodemailer connects to GoDaddy SMTP server
2. Authenticates with username/password
3. Sends email with specified content
4. Returns message ID on success

### Step 11: Response to Frontend

**Success Response:**
```javascript
return res.status(200).json({ 
    success: true, 
    message: 'Email sent successfully',
    messageId: info.messageId
});
```

**Error Response:**
```javascript
return res.status(500).json({ 
    success: false, 
    error: 'Failed to send email',
    details: error.message,
    code: error.code
});
```

### Step 12: User Feedback

**Success:**
- Modal closes
- Thank you modal appears
- Shows confirmation message
- Displays contact information

**Error:**
- Alert message shown
- User can retry
- Alternative contact methods displayed

---

## Technical Components

### 1. Nodemailer Library

**Purpose:** Node.js module for sending emails

**Key Features:**
- SMTP protocol support
- SSL/TLS encryption
- Authentication handling
- HTML email formatting
- Attachment support
- Connection pooling

**Installation:**
```bash
npm install nodemailer
```

**Basic Usage:**
```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config);
await transporter.sendMail(mailOptions);
```

### 2. Vercel Serverless Functions

**What are Serverless Functions?**
- Backend code that runs on-demand
- No server management required
- Automatic scaling
- Pay per execution
- Located in `api/` directory

**How Vercel Handles Them:**
1. Detects files in `api/` folder
2. Creates API endpoints automatically
3. `api/send-email.js` → `/api/send-email`
4. Runs Node.js runtime
5. Handles HTTP requests/responses

**Benefits:**
- No server setup
- Automatic HTTPS
- Global CDN
- Environment variables
- Built-in logging

### 3. GoDaddy SMTP Server

**Server Details:**
- Host: `smtpout.secureserver.net`
- Port: 465 (SSL) or 587 (TLS)
- Authentication: Required
- Encryption: SSL/TLS

**Authentication Flow:**
1. Client connects to SMTP server
2. Server requests credentials
3. Client sends username/password
4. Server verifies against email account
5. Connection established if valid

**Sending Limits:**
- 250 emails per day per account
- ~100 emails per hour
- Up to 100 recipients per email

### 4. Environment Variables

**Purpose:** Store sensitive configuration securely

**Storage Locations:**
- Local: `.env` file (not committed to Git)
- Production: Vercel Dashboard

**How They Work:**
```javascript
// Access in code
const smtpHost = process.env.SMTP_HOST;
```

**Security:**
- Never committed to version control
- Encrypted in Vercel
- Only accessible to serverless functions
- Different values per environment

---

## Email Flow Diagram

```
┌─────────────────┐
│   User Browser  │
│  (questionnaire │
│   or contact)   │
└────────┬────────┘
         │
         │ 1. Fill form & submit
         │
         ▼
┌─────────────────┐
│   JavaScript    │
│  Form Handler   │
│  (validation)   │
└────────┬────────┘
         │
         │ 2. AJAX POST request
         │    /api/send-email
         │
         ▼
┌─────────────────┐
│     Vercel      │
│   Serverless    │
│    Function     │
└────────┬────────┘
         │
         │ 3. Load environment
         │    variables
         │
         ▼
┌─────────────────┐
│   Nodemailer    │
│   Transporter   │
│   (SMTP client) │
└────────┬────────┘
         │
         │ 4. Connect & authenticate
         │
         ▼
┌─────────────────┐
│    GoDaddy      │
│   SMTP Server   │
│ (smtpout.       │
│ secureserver)   │
└────────┬────────┘
         │
         │ 5. Send email
         │
         ▼
┌─────────────────┐
│   Recipient     │
│   Email Inbox   │
│ (info@langa     │
│  events.com)    │
└─────────────────┘
```

---


## Security & Authentication

### SMTP Authentication

**How It Works:**

1. **Plain Authentication (PLAIN)**
   - Username and password sent to server
   - Encrypted via SSL/TLS
   - Most common method

2. **Connection Security:**
   ```javascript
   secure: true,  // Use SSL
   tls: {
       rejectUnauthorized: true,  // Verify server certificate
       ciphers: 'SSLv3'           // Encryption method
   }
   ```

3. **Credential Storage:**
   - Stored as environment variables
   - Never in source code
   - Encrypted in Vercel
   - Trimmed to remove whitespace

### Email Security Features

**SPF (Sender Policy Framework)**
```
v=spf1 include:secureserver.net -all
```
- Verifies sender is authorized
- Prevents email spoofing
- Configured in DNS

**DKIM (DomainKeys Identified Mail)**
```
s1._domainkey.langaevents.com → s1.dkim.langaevents_com.3de.onsecureserver.net
```
- Digital signature for emails
- Verifies email wasn't tampered with
- Configured in DNS

**DMARC (Domain-based Message Authentication)**
```
v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net
```
- Policy for failed authentication
- Reporting mechanism
- Prevents phishing

### Why From Address Can't Be Changed

**Security Reasons:**
1. **Prevents Spoofing** - Can't pretend to be someone else
2. **SMTP Verification** - Server checks From matches authenticated account
3. **Anti-Spam** - Reduces spam and phishing
4. **SPF/DKIM** - DNS records verify sender domain

**Solution:**
- Use `replyTo` field for customer email
- Display customer email prominently in body
- Add customer name to subject line

---

## Error Handling

### Common Errors and Solutions

#### 1. "Missing credentials for PLAIN"

**Cause:** Username or password not set

**Solution:**
```javascript
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({
        error: 'SMTP credentials not configured'
    });
}
```

**Fix:** Add SMTP_USER and SMTP_PASS to Vercel environment variables

#### 2. "Connection timeout"

**Cause:** Can't reach SMTP server

**Possible Issues:**
- Wrong SMTP host
- Wrong port
- Firewall blocking connection
- Network issues

**Solution:**
```javascript
try {
    await transporter.verify();
} catch (error) {
    console.error('Connection failed:', error);
    // Try alternative port or host
}
```

#### 3. "Authentication failed"

**Cause:** Wrong username or password

**Solution:**
- Verify credentials at https://email.secureserver.net/
- Reset password in GoDaddy
- Check for typos or extra spaces
- Ensure email account is active

#### 4. "Invalid recipients"

**Cause:** Recipient email address is invalid

**Solution:**
```javascript
if (!mailOptions.to || !mailOptions.to.includes('@')) {
    throw new Error('Invalid recipient email');
}
```

### Error Logging

**Console Logging:**
```javascript
console.log('SMTP Configuration:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER
});
```

**Vercel Logs:**
```bash
# View real-time logs
vercel logs --follow

# View recent logs
vercel logs
```

**Error Response Format:**
```json
{
    "success": false,
    "error": "Failed to send email",
    "details": "Connection timeout",
    "code": "ETIMEDOUT"
}
```

---

## Configuration

### Environment Variables

**Required Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Mail server address | `smtpout.secureserver.net` |
| `SMTP_PORT` | Port number | `465` or `587` |
| `SMTP_SECURE` | Use SSL | `true` or `false` |
| `SMTP_USER` | Email username | `info@langaevents.com` |
| `SMTP_PASS` | Email password | `your-password` |
| `SMTP_FROM_EMAIL` | Sender email | `info@langaevents.com` |
| `SMTP_FROM_NAME` | Sender name | `Langa Events` |
| `SMTP_TO_EMAIL` | Recipient email | `info@langaevents.com` |
| `SMTP_REJECT_UNAUTHORIZED` | Verify SSL cert | `true` |

### Local Development Setup

**1. Create `.env` file:**
```bash
cp .env.example .env
```

**2. Edit `.env`:**
```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@langaevents.com
SMTP_PASS=your-password
SMTP_FROM_EMAIL=info@langaevents.com
SMTP_FROM_NAME=Langa Events
SMTP_TO_EMAIL=info@langaevents.com
SMTP_REJECT_UNAUTHORIZED=true
```

**3. Install dependencies:**
```bash
npm install
```

**4. Test locally:**
```bash
npm start  # Simple HTTP server (forms won't send)
# OR
vercel dev  # Full serverless environment
```

### Production Deployment

**1. Add environment variables in Vercel:**
- Go to Vercel Dashboard
- Select project
- Settings → Environment Variables
- Add all 9 variables

**2. Deploy:**
```bash
vercel --prod
```

**3. Verify:**
- Visit `/api/test-env` to check variables
- Submit test form
- Check email delivery

---

## Troubleshooting

### Debugging Checklist

**1. Check Environment Variables:**
```bash
# Visit this URL
https://www.langaevents.com/api/test-env
```

Expected output:
```json
{
    "hasUser": true,
    "hasPass": true,
    "userLength": 20,
    "passLength": 18
}
```

**2. Check Vercel Logs:**
```bash
vercel logs
```

Look for:
- SMTP Configuration output
- Connection verification
- Error messages

**3. Test SMTP Credentials:**
- Log into https://email.secureserver.net/
- Use same username/password
- If can't log in, reset password

**4. Test Different Ports:**

Try port 587:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

Try port 80:
```env
SMTP_PORT=80
SMTP_SECURE=false
```

**5. Check DNS Records:**
- Verify MX records point to GoDaddy
- Verify SPF record exists
- Verify DKIM records exist

### Common Issues

**Issue: Emails go to spam**

**Solutions:**
- Verify SPF, DKIM, DMARC records
- Warm up email account (send gradually)
- Avoid spam trigger words
- Include unsubscribe link
- Use consistent From address

**Issue: Slow email delivery**

**Causes:**
- SMTP server load
- Network latency
- Email size (attachments)

**Solutions:**
- Use faster SMTP port (587)
- Reduce email size
- Implement retry logic

**Issue: Rate limiting**

**GoDaddy Limits:**
- 250 emails/day
- ~100 emails/hour

**Solutions:**
- Upgrade to higher plan
- Use dedicated email service (SendGrid)
- Implement queue system

---

## Performance Optimization

### Connection Pooling

**Current Implementation:**
- New connection per email
- Connection closed after sending

**Optimization (for high volume):**
```javascript
const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // ... other config
});
```

### Caching

**Environment Variables:**
- Loaded once per function execution
- Cached by Vercel
- No need to optimize

### Async Processing

**Current:**
- Synchronous email sending
- User waits for completion

**Future Enhancement:**
```javascript
// Queue email for background processing
await queueEmail(formData);
return res.status(200).json({ success: true });
```

---

## Monitoring & Analytics

### Email Tracking

**What to Track:**
- Number of emails sent
- Success/failure rate
- Response time
- Error types

**Implementation:**
```javascript
// Log to analytics service
analytics.track('email_sent', {
    type: 'event_inquiry',
    timestamp: new Date(),
    success: true
});
```

### Vercel Analytics

**Built-in Metrics:**
- Function invocations
- Execution time
- Error rate
- Bandwidth usage

**Access:**
- Vercel Dashboard → Analytics
- View trends over time
- Set up alerts

---

## Future Enhancements

### 1. Email Templates

**Current:** HTML string in code

**Enhancement:** Use template engine
```javascript
const template = await loadTemplate('event-inquiry');
const html = template.render(formData);
```

### 2. Attachment Support

**Add file uploads:**
```javascript
attachments: [{
    filename: 'event-details.pdf',
    content: fileBuffer
}]
```

### 3. Email Queue

**For high volume:**
- Use Redis or database
- Background worker processes emails
- Retry failed emails
- Rate limiting

### 4. Multiple Recipients

**CC/BCC support:**
```javascript
cc: 'sales@langaevents.com',
bcc: 'archive@langaevents.com'
```

### 5. Auto-Reply

**Send confirmation to customer:**
```javascript
// After sending to business
await sendCustomerConfirmation(customerEmail);
```

### 6. Email Validation

**Verify email exists:**
```javascript
const emailValidator = require('email-validator');
if (!emailValidator.validate(email)) {
    throw new Error('Invalid email');
}
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check Vercel logs for errors
- Monitor email delivery rate
- Review spam reports

**Monthly:**
- Rotate SMTP password
- Review environment variables
- Update dependencies
- Check email limits

**Quarterly:**
- Review DNS records
- Test disaster recovery
- Update documentation
- Security audit

### Dependency Updates

**Check for updates:**
```bash
npm outdated
```

**Update nodemailer:**
```bash
npm update nodemailer
```

**Test after updates:**
```bash
npm test
vercel --prod
```

---

## Support & Resources

### Documentation Links

- **Nodemailer:** https://nodemailer.com/
- **Vercel Serverless:** https://vercel.com/docs/functions
- **GoDaddy Email:** https://www.godaddy.com/help/email
- **SMTP Protocol:** https://tools.ietf.org/html/rfc5321

### Getting Help

**GoDaddy Support:**
- Phone: 1-480-505-8877
- Chat: Available in account dashboard
- Email: support@godaddy.com

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com

### Contact

For questions about this implementation:
- Review code in `api/send-email.js`
- Check logs: `vercel logs`
- Test endpoint: `/api/test-env`

---

## Conclusion

The Langa Events email service is a robust, secure, and scalable solution for handling event inquiries. It leverages modern serverless architecture, industry-standard email protocols, and best practices for security and reliability.

**Key Strengths:**
- ✅ Serverless architecture (no server management)
- ✅ Secure SMTP authentication
- ✅ Proper email authentication (SPF, DKIM, DMARC)
- ✅ Error handling and logging
- ✅ User-friendly interface
- ✅ Easy to maintain and update

**Maintenance Requirements:**
- Minimal ongoing maintenance
- Monitor logs occasionally
- Update dependencies periodically
- Rotate passwords regularly

The system is production-ready and handles all common scenarios effectively.

---

**Document Version:** 1.0  
**Last Updated:** February 20, 2026  
**Author:** Technical Documentation  
**Status:** Production
