import React from "react";
import { ComponentRenderProps } from "./types";
//@ts-ignore
import { Input } from "govuk-react-jsx";

export const ComponentRender = ({
  fieldType,
  formValues,
  onChange,
}: ComponentRenderProps) => {
  const inputTypes =
    fieldType.type === "TextField" ||
    "EmailAddressField" ||
    "NumberField" ||
    "TelephoneNumberField" ||
    "DateField" ||
    "DateTimeField" ||
    "DateTimePartsField" ||
    "UkAddressField";

  return (
    <>
      {inputTypes ? (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e)}
          label={{
            children: fieldType.title,
          }}
          value={formValues[fieldType.name]}
          type={fieldType.type}
        />
      ) : null}

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
