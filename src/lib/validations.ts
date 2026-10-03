import { ContactFormData, ContactFormErrors } from "@/types/contact";

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = "Please provide a subject for your inquiry.";
  }

  if (!data.message || data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters in length.";
  }

  return errors;
}
