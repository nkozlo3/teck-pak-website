import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message } = data;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing Fields" }), {
      status: 400,
    });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kozlowskineil@gmail.com",
      subject: "New Contact Request from Teck-Pak Website",
      html: `
			<h3>New Message</h3>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong><br/>${message}</p>
		`,
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
