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
    let emailContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
    emailContent += '<h2 style="color: #2C2C2C; border-bottom: 3px solid #FFC300; padding-bottom: 10px;">New Event Inquiry from Langa Events Website</h2>';
    
    // Highlight the customer's email at the top
    const customerEmail = formData.email || formData.Email;
    const customerName = formData.name || formData.fullName;
    
    if (customerEmail || customerName) {
      emailContent += '<div style="background: #FFF8E1; padding: 15px; border-left: 4px solid #FFC300; margin: 20px 0;">';
      emailContent += '<h3 style="margin: 0 0 10px 0; color: #2C2C2C;">Customer Contact Information</h3>';
      if (customerName) {
        emailContent += `<p style="margin: 5px 0;"><strong>Name:</strong> ${customerName}</p>`;
      }
      if (customerEmail) {
        emailContent += `<p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #2C2C2C; font-weight: bold;">${customerEmail}</a></p>`;
      }
      emailContent += '</div>';
    }
    
    // Add all form fields to email
    emailContent += '<div style="margin-top: 20px;">';
    for (const [key, value] of Object.entries(formData)) {
      if (key !== '_subject' && key !== 'email' && key !== 'Email' && key !== 'name' && key !== 'fullName' && value) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Handle array values (like services)
        if (Array.isArray(value)) {
          emailContent += `<p style="margin: 10px 0;"><strong style="color: #2C2C2C;">${label}:</strong><br>${value.join('<br>')}</p>`;
        } else {
          emailContent += `<p style="margin: 10px 0;"><strong style="color: #2C2C2C;">${label}:</strong> ${value}</p>`;
        }
      }
    }
    emailContent += '</div>';

    emailContent += '<hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">';
    emailContent += '<p style="color: #999; font-size: 12px; text-align: center;">This email was sent from the Langa Events website questionnaire form.</p>';
    emailContent += '</div>';

    // Email options
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Langa Events'}" <${process.env.SMTP_FROM_EMAIL || smtpUser}>`,
      to: process.env.SMTP_TO_EMAIL || 'info@langaevents.com',
      subject: formData._subject || 'New Event Inquiry - Langa Events',
      html: emailContent,
      replyTo: customerEmail || smtpUser // Reply-To will be the customer's email
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
