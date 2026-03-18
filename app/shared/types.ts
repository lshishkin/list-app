export type ContactType = 'phone' | 'email' | 'address';

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
  description?: string;
  createdAt: number;
}