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
