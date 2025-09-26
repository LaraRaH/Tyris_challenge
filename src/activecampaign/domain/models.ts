export interface ACContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // extensible: phone, tags, custom fields...
}

export interface ACErrorPayload {
  message: string;
  status?: number;
  details?: unknown;
}
