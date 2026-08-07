import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { sendContactEmail } from "../lib/actions";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  message: z.string().min(5, "Message is too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setStatus("loading");
      await sendContactEmail({ data });
      setStatus("idle");
      reset();
      toast.success("Message sent successfully! We'll be in touch.");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex w-full flex-col gap-5 text-left">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            className="rounded-sm border border-border bg-background px-4 py-2.5 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="John"
          />
          {errors.firstName && <span className="text-[11px] text-red-500">{errors.firstName.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
            Last Name
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            className="rounded-sm border border-border bg-background px-4 py-2.5 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Doe"
          />
          {errors.lastName && <span className="text-[11px] text-red-500">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          Email Address
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="rounded-sm border border-border bg-background px-4 py-2.5 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="john@example.com"
        />
        {errors.email && <span className="text-[11px] text-red-500">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mobile" className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          Mobile Number
        </label>
        <input
          {...register("mobile")}
          id="mobile"
          type="tel"
          className="rounded-sm border border-border bg-background px-4 py-2.5 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="+91 98765 43210"
        />
        {errors.mobile && <span className="text-[11px] text-red-500">{errors.mobile.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className="resize-y rounded-sm border border-border bg-background px-4 py-3 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="How can we work together?"
        />
        {errors.message && <span className="text-[11px] text-red-500">{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 flex w-full items-center justify-center rounded-sm bg-primary px-4 py-3 font-mono text-[12px] tracking-wider uppercase text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
