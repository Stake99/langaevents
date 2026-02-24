import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { success: false, error: 'SMTP credentials not configured' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASS.trim(),
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
      },
    })

    await transporter.verify()

    const customerEmail = formData.email
    const customerName = formData.name

    let emailContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">'
    emailContent += '<h2 style="color: #2C2C2C; border-bottom: 3px solid #FFC300; padding-bottom: 10px;">New Event Inquiry</h2>'
    
    if (customerEmail || customerName) {
      emailContent += '<div style="background: #FFF8E1; padding: 15px; border-left: 4px solid #FFC300; margin: 20px 0;">'
      emailContent += '<h3 style="margin: 0 0 10px 0; color: #2C2C2C;">Customer Contact</h3>'
      if (customerName) emailContent += `<p style="margin: 5px 0;"><strong>Name:</strong> ${customerName}</p>`
      if (customerEmail) emailContent += `<p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>`
      emailContent += '</div>'
    }
    
    emailContent += '<div style="margin-top: 20px;">'
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'email' && key !== 'name' && value) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => (l as string).toUpperCase())
        if (Array.isArray(value)) {
          emailContent += `<p style="margin: 10px 0;"><strong>${label}:</strong><br>${value.join('<br>')}</p>`
        } else {
          emailContent += `<p style="margin: 10px 0;"><strong>${label}:</strong> ${value}</p>`
        }
      }
    }
    emailContent += '</div></div>'

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Langa Events'}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL || 'info@langaevents.com',
      subject: `[${customerName}] New Event Inquiry - Langa Events`,
      html: emailContent,
      replyTo: customerEmail,
    }

    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    })

  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message
    }, { status: 500 })
  }
}
