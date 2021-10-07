import React from "react";
export type fieldType = {
  name: string;
};

export interface FieldProps {
  field: fieldType;
  onChange: (e: any) => void;
  formValues: any;
}

interface ComponentRenderProps {
  fieldType: fieldType;
  formValues: any;
  onChange: (e: any) => void;
}

export const ComponentRender = ({
  fieldType,
  formValues,
  onChange,
}: ComponentRenderProps) => {
  return (
    <>
      {fieldType.name === "TextField" && (
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
      )}
    </>
  );
};
