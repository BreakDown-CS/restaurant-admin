import { Form } from 'antd'
import type { ReactNode } from 'react'
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface FormFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> {
  control: Control<TValues>
  name: TName
  label: string
  children: (
    field: ControllerRenderProps<TValues, TName> & { id: string },
  ) => ReactNode
}

export function FormField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({ control, name, label, children }: FormFieldProps<TValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          htmlFor={name}
          validateStatus={fieldState.error ? 'error' : undefined}
          help={fieldState.error?.message}
        >
          {children({ ...field, id: name })}
        </Form.Item>
      )}
    />
  )
}
