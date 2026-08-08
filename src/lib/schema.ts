import * as z from "zod";

/**
 * Shared contact form schema.
 * Imported by both ContactSection.tsx (client validation)
 * and lib/actions.ts (server-side validation).
 */
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().trim().min(5, "Message is too short"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
