import FormFieldRenderer from "@/components/FormFieldRenderer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createValidationSchema } from "@/helper/validationSchema";
import { useToast } from "@/hooks/use-toast";
import { Group } from "@/types/formTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface PersonalInformationFormProps {
  group: Group;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  group,
}) => {
  // dynamic validation schema for group
  const validationSchema = createValidationSchema(group.fields);
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  }: any = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formData = watch();

  const onSubmit = (data: any) => {
    // Filter the submitted data to include only the fields relevant to the current form group
    const groupData = Object.keys(data)
      .filter((key) => group.fields.some((field) => field.name === key))
      .reduce((obj: any, key: any) => {
        obj[key] = data[key];
        return obj;
      }, {});

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(groupData, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <>
      {/* Form title */}
      <h2 className="mb-4 text-xl font-semibold">{group.title}</h2>

      {/* Form structure */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded-lg dark:border-gray-700"
      >
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          {group.fields.map((field) => (
            <div key={field.name} className="mb-4">
              {/* Field label */}
              <Label
                htmlFor={field.name}
                className="block mb-2 font-medium"
                required={field?.required}
              >
                {field.label}
              </Label>

              {/* Render input component dynamically based on field type */}
              <Controller
                control={control}
                name={field.name}
                render={({ field: controllerField }) => (
                  <FormFieldRenderer
                    {...controllerField}
                    field={field}
                    setValue={setValue}
                    formData={formData}
                  />
                )}
              />

              {/* Validation error */}
              {errors[field.name] && (
                <div className="text-red-600">{errors[field.name].message}</div>
              )}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default PersonalInformationForm;
