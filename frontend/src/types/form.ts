export interface Form {
  id: string;
  title: string;
  description?: string;
  type: 'registration' | 'survey' | 'feedback' | 'application';
  status: 'active' | 'inactive' | 'closed';
  fields: FormField[];
  responses: number;
  createdAt: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  memberId?: string;
  responses: Record<string, any>;
  submittedAt: string;
}
