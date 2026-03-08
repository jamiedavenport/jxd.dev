import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().min(10),
    }),
    handler: async ({ name, email, message }) => {
      const { error } = await resend.emails.send({
        from: "hi@lucid.jxd.dev",
        to: "x@jxd.dev",
        replyTo: email,
        subject: `Contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      if (error) throw new Error("Failed to send. Please try again.");
      return { success: true };
    },
  }),
};
