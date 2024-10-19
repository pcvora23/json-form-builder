// validationSchema.ts
import { Field } from "@/types/formTypes";
import * as Yup from "yup";

export const createValidationSchema = (fields: Field[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field: any) => {
    switch (field.type) {
      case "text":
        shape[field.name] = field.required
          ? Yup.string().required(`${field.label} is required`)
          : Yup.string().nullable();
        break;
      case "textarea":
        shape[field.name] = field.required
          ? Yup.string().required(`${field.label} is required`)
          : Yup.string().nullable();
        break;
      case "number":
        shape[field.name] = field.required
          ? Yup.number()
              .required(`${field.label} is required`)
              .min(field.min, `${field.label} must be at least ${field.min}`)
              .max(field.max, `${field.label} must be at most ${field.max}`)
          : Yup.number().nullable();
        break;
      case "dropdown":
        shape[field.name] = field.required
          ? Yup.string().required(`${field.label} is required`)
          : Yup.string().nullable();
        break;
      case "radio":
        shape[field.name] = field.required
          ? Yup.string().required(`${field.label} is required`)
          : Yup.string().nullable();
        break;
      case "checkbox":
        shape[field.name] = Yup.array().of(Yup.string());
        break;
      case "slider":
        shape[field.name] = Yup.number()
          .min(field.min, `${field.label} must be at least ${field.min}`)
          .max(field.max, `${field.label} must be at most ${field.max}`);
        break;
      default:
        break;
    }
  });

  return Yup.object().shape(shape);
};
