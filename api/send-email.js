// Serverless function for sending emails via Nodemailer
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Log configuration for debugging (without password)
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER
    });

    // Create transporter with custom SMTP credentials
    // GoDaddy often works better with port 587 and requireTLS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
        ciphers: 'SSLv3' // Some GoDaddy servers need this
      },
      requireTLS: true, // Force TLS
      debug: true, // Enable debug output
      logger: true // Log to console
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
      from: `"${process.env.SMTP_FROM_NAME || 'Langa Events'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL || 'info@langaevents.com',
      subject: formData._subject || 'New Event Inquiry - Langa Events',
      html: emailContent,
      replyTo: formData.email || formData.Email || process.env.SMTP_USER
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
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message,
      code: error.code
    });
  }
};
