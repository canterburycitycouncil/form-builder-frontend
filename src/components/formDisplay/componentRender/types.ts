export type fieldType = {
  type:
    | "TextField"
    | "MultilineTextField"
    | "YesNoField"
    | "DateField"
    | "TimeField"
    | "DateTimeField"
    | "DatePartsField"
    | "DateTimePartsField"
    | "SelectField"
    | "AutocompleteField"
    | "RadiosField"
    | "CheckboxesField"
    | "NumberField"
    | "UkAddressField"
    | "TelephoneNumberField"
    | "EmailAddressField"
    | "FileUploadField"
    | "Para"
    | "Html"
    | "InsetText"
    | "Details"
    | "FlashCard"
    | "List";
  name: string;
  title: string;
};

export interface FieldProps {
  field: fieldType;
  onChange: (e: any) => void;
  formValues: any;
}

export interface ComponentRenderProps {
  fieldType: fieldType;
  formValues: any;
  onChange: (e: any) => void;
}
