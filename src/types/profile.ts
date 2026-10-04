export interface ProfileSettings {
  name: string;
  title: string;
  shortTitle: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  availableForHire: boolean;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  siteUrl: string;
  resumePath: string;
}
