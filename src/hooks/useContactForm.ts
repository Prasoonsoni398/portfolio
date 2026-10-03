"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ContactFormData, ContactFormErrors, ContactFormStatus } from "@/types/contact";
import { validateContactForm } from "@/lib/validations";

const initialData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>({
    submitting: false,
    success: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus({ submitting: true, success: false });

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_fp638bb";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zxr38k5";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!publicKey) {
        throw new Error("EmailJS Public Key is missing. Please add your NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env");
      }

      // Send directly via client-side EmailJS SDK (No backend required)
      const emailjs = (await import("@emailjs/browser")).default;
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      });

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Portfolio Inquiry",
          message: formData.message,
          time: currentTime
        },
        publicKey
      );

      setStatus({ submitting: false, success: true, error: undefined });
      setFormData(initialData);

      // Trigger celebratory confetti for interactive feedback
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: unknown) {
      console.error("EmailJS submission error:", err);
      setStatus({
        submitting: false,
        success: false,
        error: err instanceof Error ? err.message : "Failed to dispatch email. Please check your credentials."
      });
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setStatus({ submitting: false, success: false });
  };

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
    resetForm
  };
}
