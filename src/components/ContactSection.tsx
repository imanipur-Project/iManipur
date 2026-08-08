import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendContactEmail } from "../lib/actions";
import { contactSchema, type ContactFormValues } from "../lib/schema";
import { Clock, Mail, MapPin, MessageCircle, Phone, Users, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendContactEmail({ data });
      reset();
      toast.success("Message sent successfully! We'll be in touch.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div id="contact" className="min-h-screen py-20 scroll-mt-20">
      {/* Hero Section — with radial gradient background adapted from ali imam cta-01 */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        {/* Radial gradient background glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, var(--gold-primary) 0%, var(--background) 75%)",
            opacity: 0.12,
          }}
        />
        {/* Repeating radial pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 100%, transparent 0px, transparent 20px, var(--gold-primary) 20px, var(--gold-primary) 21px)",
            opacity: 0.05,
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="border-border bg-card mb-8 inline-flex items-center gap-2 rounded-none border px-4 py-2">
            <MessageCircle className="text-primary h-4 w-4" />
            <span className="text-foreground text-sm font-medium font-mono uppercase tracking-widest">
              Get in touch
            </span>
          </div>
          <h2 className="text-foreground mb-6 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
            Let's work on <span className="text-primary">Manipur</span> together.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            If you are working on something for Manipur — in culture, education, or a new idea — we
            would like to hear about it.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative z-10 mx-auto mt-8 mb-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <QuickContactCard
            icon={<Mail className="h-6 w-6" />}
            title="Email Us"
            value="heyimanipur@gmail.com"
            description="We respond within a few days"
            href="mailto:heyimanipur@gmail.com"
          />
          <QuickContactCard
            icon={<Phone className="h-6 w-6" />}
            title="Call Us"
            value="+91 79822 84458"
            description="Available during business hours"
            href="tel:+917982284458"
          />
          <QuickContactCard
            icon={<MapPin className="h-6 w-6" />}
            title="Location"
            value="Manipur, India"
            description="Based locally, working globally"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-foreground mb-2 text-3xl font-bold">Send a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="firstName"
                    className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground"
                  >
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    id="firstName"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className="rounded-none border border-border bg-background px-4 py-3 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <span id="firstName-error" className="text-[11px] text-destructive">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="lastName"
                    className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    id="lastName"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className="rounded-none border border-border bg-background px-4 py-3 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <span id="lastName-error" className="text-[11px] text-destructive">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="rounded-none border border-border bg-background px-4 py-3 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span id="email-error" className="text-[11px] text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="resize-y rounded-none border border-border bg-background px-4 py-3 text-[14px] text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="How can we work together?"
                />
                {errors.message && (
                  <span id="message-error" className="text-[11px] text-destructive">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-none bg-primary px-4 py-4 font-mono text-[12px] tracking-wider uppercase text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>

          {/* Contact Info & Benefits */}
          <div className="space-y-12">
            <div>
              <h2 className="text-foreground mb-8 text-3xl font-bold">Why Reach Out?</h2>
              <div className="space-y-6">
                <BenefitCard
                  icon={<MessageCircle className="h-5 w-5" />}
                  title="Collaborate with us"
                  description="We are constantly looking for partners, researchers, and creators to build the future of Manipur together."
                />
                <BenefitCard
                  icon={<Users className="h-5 w-5" />}
                  title="Join the Community"
                  description="Connect with a growing network of individuals dedicated to advancing culture and education."
                />
                <BenefitCard
                  icon={<Clock className="h-5 w-5" />}
                  title="Long-Term Vision"
                  description="We invest time in verifiable, long-lasting initiatives rather than short-lived projects."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface QuickContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  href?: string;
}

function QuickContactCard({ icon, title, value, description, href }: QuickContactCardProps) {
  const inner = (
    <div className="border-border bg-card hover:border-primary/50 h-full rounded-none border p-8 transition-all duration-300">
      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-6 inline-flex rounded-none p-4 transition-colors">
        {icon}
      </div>
      <h3 className="text-foreground mb-2 font-mono text-sm tracking-widest uppercase">{title}</h3>
      <p className="text-foreground mb-2 text-lg font-medium">{value}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block">
        {inner}
      </a>
    );
  }
  return <div className="group block">{inner}</div>;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex gap-5 border border-border bg-card p-6 rounded-none">
      <div className="bg-primary/10 text-primary flex-shrink-0 rounded-none p-3 h-fit">{icon}</div>
      <div>
        <h3 className="text-foreground font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
