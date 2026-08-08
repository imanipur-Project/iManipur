import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { contactSchema } from "./schema";

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return contactSchema.parse(data);
  })
  .handler(async ({ data }) => {
    try {
      const { firstName, lastName, email, message } = data;

      const apiKey = process.env["RESEND_API_KEY"];
      if (!apiKey) {
        throw new Error("Server is missing RESEND_API_KEY configuration");
      }

      const resend = new Resend(apiKey);

      const safeFirstName = escapeHtml(firstName);
      const safeLastName = escapeHtml(lastName);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message);

      const { data: resendData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "heyimanipur@gmail.com",
        replyTo: email,
        subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage:\n${message}`,
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error("Email service provider rejected the request");
      }

      return { success: true, id: resendData?.id };
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
  });
