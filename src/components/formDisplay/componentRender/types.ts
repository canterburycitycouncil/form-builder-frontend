export type fieldType = {
  name: string;
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
