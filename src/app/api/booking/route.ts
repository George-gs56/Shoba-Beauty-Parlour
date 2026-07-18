import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, service, date, time, notes } = await request.json();

    // 1. Validation
    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, service, date, and time are required.' },
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

    const origin = new URL(request.url).origin;
    const logoUrl = `${origin}/images/beauty_old.png`;

    // 3. Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Treat service values to readable format
    const formatService = (val: string) => {
      const servicesMap: Record<string, string> = {
        "traditional-bridal": "Traditional Bridal Makeup",
        "hd-bridal": "HD Bridal Makeup",
        "airbrush-bridal": "Airbrush Bridal Makeup",
        "engagement": "Engagement & Roka Makeup",
        "mehendi-sangeet": "Mehendi & Sangeet Makeup",
        "bridesmaid": "Bridesmaid & Family Makeup",
        "high-glam": "High-Glam Evening Makeup",
        "cocktail": "Cocktail & Reception Makeup",
        "festive": "Festive & Party Makeup",
        "editorial": "Editorial & Fashion Makeup",
        "corporate": "Corporate & Headshot Makeup",
        "minimalist": "Minimalist 'No-Makeup' Makeup"
      };
      return servicesMap[val] || val;
    };

    const serviceLabel = formatService(service);

    // 4. Set up email details
    // A. Notification to the salon owner
    const salonMailOptions = {
      from: `"${name} (Booking Inquiry)" <${gmailUser}>`,
      to: 'whitegeorge5611@gmail.com',
      replyTo: email,
      subject: `📅 New Booking Request: ${name} - ${serviceLabel}`,
      text: `You have received a new booking reservation request:\n\nName: ${name}\nEmail: ${email}\nService: ${serviceLabel}\nDate: ${date}\nTime: ${time}\nSpecial Requests: ${notes || 'None'}`,
      html: `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; background-color: #070707; border: 1px solid #c8a27d; border-radius: 8px; color: #f7f4f0;">
          <h2 style="color: #c8a27d; border-bottom: 1px solid #c8a27d; padding-bottom: 10px; font-family: 'Playfair Display', serif; font-weight: normal; margin-top: 0;">New Reservation Request</h2>
          <p style="margin: 12px 0;"><strong style="color: #c8a27d;">Client Name:</strong> ${name}</p>
          <p style="margin: 12px 0;"><strong style="color: #c8a27d;">Client Email:</strong> <a href="mailto:${email}" style="color: #c8a27d; text-decoration: none;">${email}</a></p>
          <p style="margin: 12px 0;"><strong style="color: #c8a27d;">Treatment:</strong> ${serviceLabel}</p>
          <p style="margin: 12px 0;"><strong style="color: #c8a27d;">Requested Date:</strong> ${date}</p>
          <p style="margin: 12px 0;"><strong style="color: #c8a27d;">Requested Slot:</strong> ${time}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #111111; border-radius: 4px; border-left: 3px solid #c8a27d;">
            <p style="margin: 0; font-weight: bold; color: #c8a27d; margin-bottom: 8px;">Special Requests / Notes:</p>
            <p style="margin: 0; line-height: 1.6; color: #a9a59f; white-space: pre-wrap;">${notes || 'No custom preferences shared.'}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #6e6a64; text-align: center; border-top: 1px solid rgba(200, 162, 125, 0.15); padding-top: 15px;">
            Submitted via Shoba Beauty Parlour Reservation System.
          </p>
        </div>
      `,
    };

    // B. Confirmation to the customer
    const customerMailOptions = {
      from: `"Shoba Beauty Parlour" <${gmailUser}>`,
      to: email,
      subject: `📅 Reservation Requested! - Shoba Beauty Parlour`,
      text: `Hello ${name},\n\nWe have received your reservation request for ${serviceLabel} on ${date} at ${time}.\n\nWe will review the slot availability and contact you shortly to confirm.\n\nWarm regards,\nShoba Beauty Parlour Team`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #070707; border: 1px solid rgba(200, 162, 125, 0.2); border-radius: 12px; color: #f7f4f0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:logo" alt="Shoba Logo" style="max-height: 80px; width: auto; margin-bottom: 15px;" />
            <h1 style="color: #c8a27d; margin: 0 0 10px 0; font-family: Georgia, serif; font-weight: 300; letter-spacing: 2px;">SHOBA</h1>
            <p style="color: #a9a59f; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">Beauty Parlour</p>
          </div>
          
          <div style="background-color: rgba(22, 22, 22, 0.7); padding: 25px; border-radius: 8px; border: 1px solid rgba(200, 162, 125, 0.15); line-height: 1.7;">
            <p style="font-size: 16px; margin-top: 0; color: #f7f4f0;">Hello <strong style="color: #c8a27d;">${name}</strong>,</p>
            <p style="color: #a9a59f;">Thank you for requesting an experience at Shoba Beauty Parlour! We have successfully logged your reservation request.</p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #111111; border-radius: 8px; border: 1px solid rgba(200, 162, 125, 0.15);">
              <h3 style="color: #c8a27d; margin-top: 0; margin-bottom: 15px; font-weight: normal; font-size: 16px; border-bottom: 1px solid rgba(200, 162, 125, 0.15); padding-bottom: 8px;">Reservation Summary</h3>
              <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #c8a27d;">Treatment:</strong> ${serviceLabel}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #c8a27d;">Date:</strong> ${date}</p>
              <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #c8a27d;">Preferred Time:</strong> ${time}</p>
              ${notes ? `<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #c8a27d;">Requests:</strong> <em>"${notes}"</em></p>` : ''}
            </div>

            <p style="color: #a9a59f;">We are currently verifying the requested slot availability. One of our booking coordinators will contact you shortly to officially finalize and confirm your appointment.</p>
            <p style="color: #a9a59f; margin-bottom: 0;">If you need to make changes or have questions, please reach us on WhatsApp at <strong style="color: #c8a27d;">+91 9994062045</strong>.</p>
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

    return NextResponse.json({ success: true, message: 'Reservation emails sent successfully.' });
  } catch (error: any) {
    console.error('Error in booking form API handler:', error);
    return NextResponse.json(
      { error: 'Failed to send reservation emails.', details: error.message },
      { status: 500 }
    );
  }
}
