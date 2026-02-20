// Serverless function for sending emails via Nodemailer
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Check if credentials exist
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP credentials!');
      console.error('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'MISSING');
      console.error('SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'MISSING');
      return res.status(500).json({
        success: false,
        error: 'SMTP credentials not configured',
        details: 'SMTP_USER or SMTP_PASS is missing'
      });
    }

    // Trim credentials to remove any whitespace
    const smtpUser = process.env.SMTP_USER.trim();
    const smtpPass = process.env.SMTP_PASS.trim();

    // Log configuration for debugging (without password)
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: smtpUser,
      userLength: smtpUser.length,
      passLength: smtpPass.length
    });

    // Create transporter with custom SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
        ciphers: 'SSLv3'
      },
      requireTLS: true,
      debug: true,
      logger: true
    });

    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Format the email content
    let emailContent = '<h2>New Event Inquiry from Langa Events Website</h2>';
    
    // Add all form fields to email
    for (const [key, value] of Object.entries(formData)) {
      if (key !== '_subject' && value) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Handle array values (like services)
        if (Array.isArray(value)) {
          emailContent += `<p><strong>${label}:</strong><br>${value.join('<br>')}</p>`;
        } else {
          emailContent += `<p><strong>${label}:</strong> ${value}</p>`;
        }
      }
    }

    emailContent += '<hr><p style="color: #999; font-size: 12px;">This email was sent from the Langa Events website questionnaire form.</p>';

    // Email options
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Langa Events'}" <${process.env.SMTP_FROM_EMAIL || smtpUser}>`,
      to: process.env.SMTP_TO_EMAIL || 'info@langaevents.com',
      subject: formData._subject || 'New Event Inquiry - Langa Events',
      html: emailContent,
      replyTo: formData.email || formData.Email || smtpUser
    };

    console.log('Sending email...');
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email error:', error);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message,
      code: error.code
    });
  }
};
