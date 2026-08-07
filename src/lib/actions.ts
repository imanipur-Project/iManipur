import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    message: string;
  }) => {
    if (!data.firstName || !data.email || !data.message) {
      throw new Error("Missing required fields");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const { firstName, lastName, email, mobile, message } = data;
      
      // Initialize Resend inside the handler to ensure process.env is loaded
      // and prevent client-side bundling errors
      const resend = new Resend(process.env['RESEND_API_KEY']);

      const { data: resendData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "heyimanipur@gmail.com",
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile || "N/A"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(error.message);
      }

      return { success: true, id: resendData?.id };
    } catch (error: any) {
      console.error("Failed to send email:", error);
      throw new Error(error.message || "Failed to send email");
    }
  });
