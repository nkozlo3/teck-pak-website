import type { APIRoute } from "astro";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message, honey, confirm_email } = data;
  if (honey) {
    return new Response(JSON.stringify({ error: "Spam Detected" }), {
      status: 422,
    });
  }

  const EXPECTED_CAPTCHA_ = "TECKPAC_VERIFIED_2026@email.com";

  if (confirm_email !== EXPECTED_CAPTCHA_) {
    return new Response(JSON.stringify({ error: "Spam Detected" }), {
      status: 422,
    });
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing Fields" }), {
      status: 400,
    });
  }

  try {
    await resend.emails.send({
      from: "Contact Form <website@teckpac.com>",
      to: "pdecleir@teckpac.com",
      subject: `New Inquiry from ${name} on Teck-Pak Website`,
      replyTo: email,
      html: `
			<h3>New Message</h3>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<div style="white-space: pre-wrap; font-family: sans-serif;">${message}</div>`,
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
};
