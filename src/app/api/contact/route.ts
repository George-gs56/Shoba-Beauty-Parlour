import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const origin = new URL(request.url).origin;
    const logoUrl = `${origin}/images/beauty_old.png`;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    // 2. Check if environment variables are set
    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.');
      return NextResponse.json(
        { error: 'Email configuration error on server.' },
        { status: 500 }
      );
    }

    // 3. Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // 4. Set up email details
    // A. Notification to the salon owner
    const salonMailOptions = {
      from: `"${name} (Contact Form)" <${gmailUser}>`,
      to: 'jenics23@gmail.com',
      replyTo: email,
      subject: `💕 New Inquiry from ${name} - Shoba Beauty Parlour`,
      text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #070707; border: 1px solid #c8a27d; border-radius: 8px; color: #f7f4f0;">
          <h2 style="color: #c8a27d; border-bottom: 1px solid #c8a27d; padding-bottom: 10px; font-family: 'Playfair Display', serif; font-weight: normal;">Get in Touch Form / Salon Inquiry form</h2>
          <p style="margin: 15px 0;"><strong style="color: #c8a27d;">Name:</strong> ${name}</p>
          <p style="margin: 15px 0;"><strong style="color: #c8a27d;">Email:</strong> <a href="mailto:${email}" style="color: #c8a27d; text-decoration: none;">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #111111; border-radius: 4px; border-left: 3px solid #c8a27d;">
            <p style="margin: 0; font-weight: bold; color: #c8a27d; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; line-height: 1.6; color: #a9a59f; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #6e6a64; text-align: center; border-top: 1px solid rgba(200, 162, 125, 0.15); padding-top: 15px;">
            Submitted via Shoba Beauty Parlour Contact Form.
          </p>
        </div>
      `,
    };

    // B. Confirmation to the customer
    const customerMailOptions = {
      from: `"Shoba Beauty Parlour" <${gmailUser}>`,
      to: email,
      subject: `💕 We've received your message! - Shoba Beauty Parlour`,
      text: `Hello ${name},\n\nThank you for contacting Shoba Beauty Parlour. We have received your inquiry and will get back to you shortly.\n\nYour Message:\n"${message}"\n\nWarm regards,\nShoba Beauty Parlour Team`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #070707; border: 1px solid rgba(200, 162, 125, 0.2); border-radius: 12px; color: #f7f4f0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:logo" alt="Shoba Logo" style="max-height: 80px; width: auto; margin-bottom: 15px;" />
            <h1 style="color: #c8a27d; margin: 0 0 10px 0; font-family: Georgia, serif; font-weight: 300; letter-spacing: 2px;">SHOBA</h1>
            <p style="color: #a9a59f; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">Beauty Parlour</p>
          </div>
          
          <div style="background-color: rgba(22, 22, 22, 0.7); padding: 25px; border-radius: 8px; border: 1px solid rgba(200, 162, 125, 0.15); line-height: 1.7;">
            <p style="font-size: 16px; margin-top: 0; color: #f7f4f0;">Hello <strong style="color: #c8a27d;">${name}</strong>,</p>
            <p style="color: #a9a59f;">Thank you for reaching out to Shoba Beauty Parlour. We have successfully received your inquiry and our team is looking over it.</p>
            <p style="color: #a9a59f;">We will get in touch with you at this email address (<strong style="color: #f7f4f0;">${email}</strong>) as soon as possible, typically within 24 hours.</p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #111111; border-radius: 6px; border-left: 2px solid #c8a27d;">
              <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #c8a27d; font-weight: bold;">Your Inquiry:</p>
              <p style="margin: 0; font-style: italic; color: #a9a59f; font-size: 14px; white-space: pre-wrap;">"${message}"</p>
            </div>
            
            <p style="color: #a9a59f; margin-bottom: 0;">If you need urgent assistance or wish to book a session immediately, feel free to call us directly or drop a message on WhatsApp at <strong style="color: #c8a27d;">+91 9994062045</strong>.</p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; border-top: 1px solid rgba(200, 162, 125, 0.15); padding-top: 20px;">
            <p style="color: #a9a59f; font-size: 14px; margin: 0 0 5px 0;">Shoba Beauty Parlour</p>
            <p style="color: #6e6a64; font-size: 12px; margin: 0;">No:220/B, KTM Nagar, Elathagiri, Krishnagiri, Tamil Nadu 635108</p>
            <p style="color: #6e6a64; font-size: 11px; margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} Shoba Beauty Parlour LLC. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'beauty_old.png',
          path: path.join(process.cwd(), 'public/images/beauty_old.png'),
          cid: 'logo'
        }
      ]
    };

    // 5. Send emails concurrently
    await Promise.all([
      transporter.sendMail(salonMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json({ success: true, message: 'Emails sent successfully.' });
  } catch (error: any) {
    console.error('Error in contact form API handler:', error);
    return NextResponse.json(
      { error: 'Failed to send emails.', details: error.message },
      { status: 500 }
    );
  }
}
