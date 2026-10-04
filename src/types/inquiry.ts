export type InquiryStatus = "new" | "in_review" | "contacted" | "archived";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
  replySent?: boolean;
}
