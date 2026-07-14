import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").max(120).optional().or(z.literal("")),
  treatmentInterest: z.string().min(1, "Please choose an area of interest").max(80),
  message: z.string().min(5, "Please tell us a little more").max(2000),
  type: z.string().max(40).optional(),
  country: z.string().max(60).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const treatmentOptions = [
  "Visha Chikitsa (Toxicology)",
  "Kayakalpa Chikitsa",
  "Panchakarma",
  "Shirodhara",
  "Njavara Kizhi",
  "Pizhichil",
  "Classical Medicines",
  "General Enquiry",
];
