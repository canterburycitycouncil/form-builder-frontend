import React from "react";
import { ComponentRenderProps } from "./types";
//@ts-ignore
import { Input } from "govuk-react-jsx";

export const ComponentRender = ({
  fieldType,
  formValues,
  onChange,
}: ComponentRenderProps) => {
  console.log("field type:", fieldType);
  console.log("formValues:", formValues);
  return (
    <>
      {fieldType.type === "TextField" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e)}
          label={{
            children: fieldType.title,
          }}
          value={formValues[fieldType.name]}
          type={fieldType.type}
        />
      )}

      {fieldType.type === "TelephoneNumberField" && (
        <Input
          id={fieldType.name}
          label={{
            children: fieldType.title,
          }}
          onChange={(e: any) => onChange(e)}
          value={formValues[fieldType.name]}
          type="number"
        />
      )}

      {fieldType.type === "EmailAddressField" && (
        <Input
          id={fieldType.name}
          label={{
            children: fieldType.title,
          }}
          onChange={(e: any) => onChange(e)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}

      {fieldType.type === "MultilineTextField" && (
        <Input
          id={fieldType.name}
          label={{
            children: fieldType.title,
          }}
          onChange={(e: any) => onChange(e)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}

      {fieldType.type === "SelectField" && (
        <Input
          id={fieldType.name}
          label={{
            children: fieldType.title,
          }}
          onChange={(e: any) => onChange(e)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}
    </>
  );
};
