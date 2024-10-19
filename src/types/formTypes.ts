export interface Option {
  label: string;
  value?: string;
}

export interface Field {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: (string | Option)[];
  min?: number;
  max?: number;
  step?: number;
}

export interface Group {
  title: string;
  fields: Field[];
}

export interface FormData {
  form: {
    title: string;
    description: string;
    groups: Group[];
  };
}
