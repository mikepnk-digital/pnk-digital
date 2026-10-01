export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  // Project builder specific fields
  features?: string[];
  timeline?: string;
  // Spam protection fields
  website?: string; // Honeypot — should always be empty from real users
  _t?: number; // Elapsed milliseconds since form mount
}

export interface QuoteRequestInput extends ContactFormInput {
  projectType: string;
  features: string[];
  timeline: string;
  budget: string;
}

export interface EnquiryRecord {
  enquiryId: string;
  createdAt: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  features?: string[];
  timeline?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: 'contact-form' | 'quote-request';
  ipAddress?: string;
  userAgent?: string;
  ttl?: number;
}

export interface ApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Tech Support Plans landing pages (POST /api/tech-support)
export interface TechSupportBookingInput {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  staff: string;
  plan: string;
  headache: string;
  variant: 'a' | 'b';
  utm: Record<string, string>;
  website?: string; // Honeypot
  _t?: number; // Elapsed ms since form became interactive (JS path only)
}

export interface TechSupportEnquiryRecord {
  enquiryId: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  staff?: string;
  plan: string;
  message: string;
  variant: 'a' | 'b';
  utm?: Record<string, string>;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: 'tech-support-plans';
  ipAddress?: string;
  userAgent?: string;
  ttl?: number;
}
