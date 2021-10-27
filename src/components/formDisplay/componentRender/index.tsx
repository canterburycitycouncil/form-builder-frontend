import React from "react";
import { ComponentRenderProps } from "./types";
//@ts-ignore
import { Input, Radios } from "govuk-react-jsx";
import { inputTypes } from "./utils";

export const ComponentRender = ({
  fieldType,
  formValues,
  onChange,
}: ComponentRenderProps) => {
  return (
    <>
      {inputTypes.includes(fieldType.type) && (
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

      {fieldType.type === "RadiosField" && (
        <Radios
          fieldset={{
            legend: {
              children: fieldType.title,
            },
          }}
          hint={{
            children:
              "This includes changing your last name or spelling your name differently.",
          }}
          items={[
            {
              children: "Yes",
              value: "yes",
            },
            {
              children: "No",
              value: "no",
            },
          ]}
          name={fieldType.name}
          onChange={(e: any) => onChange(e)}
          value={formValues[fieldType.name]}
        />
      )}
    </>
  );
};
