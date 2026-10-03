export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueYear: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}
