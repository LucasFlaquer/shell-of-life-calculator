import { Controller, useFormContext } from 'react-hook-form'
import MaskedInput from 'react-text-mask'

interface Props {
  fieldName: string
}

const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

export function DateInput({ fieldName }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[fieldName]?.message as string

  return (
    <div className="field">
      <label htmlFor={fieldName}>Data de Fabricação</label>
      <Controller
        control={control}
        name={fieldName}
        defaultValue=""
        render={({ field }) => (
          <MaskedInput
            placeholder="__/__/____"
            mask={DATE_MASK}
            guide={false}
            onChange={field.onChange}
            onBlur={field.onBlur}
            id={field.name}
            value={field.value}
          />
        )}
      />
      <span className="error">{error}</span>
    </div>
  )
}
