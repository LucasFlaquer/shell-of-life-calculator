import { useForm, Controller } from 'react-hook-form'
import './App.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MaskedInput from 'react-text-mask'
import { useState } from 'react'

const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
function createDateFromBRLFormat(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(
    `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
  )
  return date.getTime()
}
const schema = z.object({
  fabricattedAt: z.string().refine((arg: string) => {
    if (arg.trim() === '') {
      return false // Empty string is not valid
    }
    try {
      return !isNaN(createDateFromBRLFormat(arg))
    } catch (error) {
      return false
    }
  }, 'Data Inválida'),
  expiresAt: z.string().refine((arg: string) => {
    if (arg.trim() === '') {
      return false // Empty string is not valid
    }
    try {
      return !isNaN(createDateFromBRLFormat(arg))
    } catch (error) {
      return false
    }
  }, 'Data Inválida'),
  deliveryDate: z.string().refine((arg: string) => {
    if (arg.trim() === '') {
      return false // Empty string is not valid
    }
    try {
      return !isNaN(createDateFromBRLFormat(arg))
    } catch (error) {
      return false
    }
  }, 'Data Inválida'),
})

type FormData = z.infer<typeof schema>

function App() {
  const [expirationPercentage, setExpirationPercentage] = useState(-1)
  const [deliveryDate, setDeliveryDate] = useState('')
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fabricattedAt: '',
      expiresAt: '',
      deliveryDate: '',
    },
  })

  function onSubmit(values: FormData) {
    try {
      const fabricattedAt = createDateFromBRLFormat(values.fabricattedAt)
      const expiredDate = createDateFromBRLFormat(values.expiresAt)
      const today = createDateFromBRLFormat(values.deliveryDate)
      const expirationTime = expiredDate - fabricattedAt
      const todayCalc = today - fabricattedAt
      const expirationPercentage = (100 * todayCalc) / expirationTime
      console.log(
        expirationPercentage,
        fabricattedAt,
        expirationPercentage,
        today,
      )
      setExpirationPercentage(100 - expirationPercentage)
      setDeliveryDate(values.deliveryDate)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Calculadora de validade de produtos</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="fabricattedAt">Data de Fabricação</label>
            <Controller
              control={control}
              name={'fabricattedAt'}
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
            <span className="error">{errors.expiresAt?.message}</span>
          </div>
          <div className="field">
            <label htmlFor="">Data de Validade</label>
            <Controller
              control={control}
              name={'expiresAt'}
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
            <span className="error">{errors.fabricattedAt?.message}</span>
          </div>
          <div className="field">
            <label htmlFor="">Data de entrega estimada</label>
            <Controller
              control={control}
              name={'deliveryDate'}
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
            <span className="error">{errors.deliveryDate?.message}</span>
          </div>
          <button type="submit">calcular</button>
        </form>
        <div className="result">
          {expirationPercentage >= 0 && (
            <p>
              Na data de entrega {deliveryDate} o produto estará com{' '}
              {expirationPercentage.toFixed(2)}% de validade restante
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
