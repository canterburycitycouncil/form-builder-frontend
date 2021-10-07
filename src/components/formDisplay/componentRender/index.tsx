import React from "react";
import { ComponentRenderProps } from "./types";
//@ts-ignore
import { Input } from "govuk-react-jsx";

export const ComponentRender = ({
  fieldType,
  formValues,
  onChange,
}: ComponentRenderProps) => {
  return (
    <>
      {/* {fieldType.name === "TextField" && (
        <input
          className="frontendTextfield"
          name={fieldType.name}
          value={formValues[fieldType.name]}
          onChange={(e) => onChange(e)}
        />
      )}

      {fieldType.name === "TelephoneNumberField" && (
        <input
          className="frontendTextfield"
          name={fieldType.name}
          value={formValues[fieldType.name]}
          onChange={(e) => onChange(e)}
        />
      )}

      {fieldType.name === "EmailAddressField" && (
        <input
          className="frontendTextfield"
          name={fieldType.name}
          value={formValues[fieldType.name]}
          onChange={(e) => onChange(e)}
        />
      )}

      {fieldType.name === "MultilineTextField" && (
        <textarea
          className="frontendTextarea"
          name={fieldType.name}
          value={formValues[fieldType.name]}
          onChange={(e) => onChange(e)}
        />
      )}
      {fieldType.name === "select" && (
        <textarea
          className="frontendTextarea"
          name={fieldType.name}
          value={formValues[fieldType.name]}
          onChange={(e) => onChange(e)}
        />
      )} */}

      {fieldType.name === "TextField" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e.target.value)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}

      {fieldType.name === "TelephoneNumberField" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e.target.value)}
          value={formValues[fieldType.name]}
          type="number"
        />
      )}

      {fieldType.name === "EmailAddressField" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e.target.value)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}

      {fieldType.name === "MultilineTextField" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e.target.value)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}

      {fieldType.name === "select" && (
        <Input
          id={fieldType.name}
          onChange={(e: any) => onChange(e.target.value)}
          value={formValues[fieldType.name]}
          type="text"
        />
      )}
    </>
  );
};
