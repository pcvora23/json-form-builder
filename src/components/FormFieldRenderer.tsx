// Import necessary UI components and dependencies
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";

// Define Field and FormFieldRendererProps interfaces for typing the form field properties and component props
interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: any[];
  min?: number;
  max?: number;
  step?: number;
}

interface FormFieldRendererProps {
  field: Field;
  onChange: (value: any) => void;
  setValue: any;
  formData: any;
}

// Function to generate marks for sliders based on min, max, and step values
const getDefaultMarks = (
  min: number = 0,
  max: number = 10,
  step: number = 1
) => {
  const defaultValueArray: number[] = [];
  for (let currentValue = min; currentValue <= max; currentValue += step) {
    defaultValueArray.push(currentValue);
  }
  if (!defaultValueArray.includes(max)) {
    defaultValueArray.push(max);
  }
  const defaultMarks: any = {};
  defaultValueArray.forEach((item: number) => {
    defaultMarks[item] = { label: item };
  });
  return defaultMarks;
};

// Main form field renderer component
const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  onChange,
  formData,
  setValue,
}) => {
  switch (field.type) {
    case "text":
      return (
        // Render text input
        <Input
          type="text"
          placeholder={field.placeholder}
          className="w-full"
          name={field.name}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        // Render textarea input
        <Textarea
          name={field.name}
          placeholder={field.placeholder}
          className="w-full"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "dropdown":
      return (
        // Render dropdown select
        <Select onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${field.label}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option: any, index: number) =>
              typeof option === "string" ? (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ) : (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        // Render radio group
        <RadioGroup
          name={field.name}
          className="flex flex-wrap items-center gap-x-4 min-h-10"
          onValueChange={onChange}
        >
          {field.options?.map((option: any, index: number) =>
            typeof option === "string" ? (
              <label key={index} className="flex items-center">
                <RadioGroupItem value={option} className="mr-2" />
                {option}
              </label>
            ) : (
              <label key={option.value} className="flex items-center">
                <RadioGroupItem value={option.value} className="mr-2" />
                {option.label}
              </label>
            )
          )}
        </RadioGroup>
      );

    case "checkbox":
      return (
        // Render checkboxes
        <div className="flex flex-col">
          {field.options?.map((option: any, index: number) => (
            <label key={index} className="flex items-center">
              <Checkbox
                value={option.value}
                className="mr-2"
                onCheckedChange={(isChecked: any) => {
                  const currentValues = formData[field.name] || [];
                  let updatedValues;

                  // Update selected checkbox values
                  if (isChecked) {
                    updatedValues = [...currentValues, option.label];
                  } else {
                    updatedValues = currentValues.filter(
                      (value: any) => value !== option.label
                    );
                  }

                  setValue(field.name, updatedValues);
                  console.log(updatedValues);
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      );

    case "number":
      return (
        // Render number input
        <Input
          type="number"
          name={field.name}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          className="w-full"
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );

    case "slider":
      return (
        // Render slider
        <Slider
          dots
          marks={getDefaultMarks(field.min, field.max, field?.step)}
          min={field.min}
          max={field.max}
          step={field.step}
          className="w-full"
          onChangeComplete={onChange}
        />
      );
    // in case if we have any other form field type then add here as a new case
    default:
      return null; // Return null if field type is not recognized
  }
};

export default FormFieldRenderer;
