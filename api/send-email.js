// Serverless function for sending emails via Nodemailer
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Create transporter with custom SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     // e.g., smtp.gmail.com, smtp.office365.com
      port: parseInt(process.env.SMTP_PORT) || 587,  // Usually 587 for TLS, 465 for SSL
      secure: process.env.SMTP_SECURE === 'true',    // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,   // Your SMTP username
        pass: process.env.SMTP_PASS    // Your SMTP password
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false' // Allow self-signed certs if needed
      }
    });

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
      to: process.env.SMTP_TO_EMAIL || 'info@langaevents.com', // Recipient email
      subject: formData._subject || 'New Event Inquiry - Langa Events',
      html: emailContent,
      replyTo: formData.email || formData.Email || process.env.SMTP_USER
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};
