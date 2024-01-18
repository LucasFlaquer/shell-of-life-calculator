import { useForm, FormProvider } from 'react-hook-form'
import './App.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { DateInput } from './components/DateInput'
import { createDateFromBRLFormat } from './utils/date-brl-format'

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
  const form = useForm<FormData>({ resolver: zodResolver(schema) })
  const { handleSubmit, reset } = form

  function clearData() {
    reset()
    setExpirationPercentage(-1)
    setDeliveryDate('')
  }

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
    <FormProvider {...form}>
      <h1>Calculadora de validade de produtos</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DateInput fieldName="fabricattedAt" />
          <DateInput fieldName="expiresAt" />
          <DateInput fieldName="deliveryDate" />
          <button type="submit">calcular</button>
        </form>
        <div className="result">
          {expirationPercentage >= 0 && (
            <>
              <p>
                Na data de entrega {deliveryDate} o produto estará com{' '}
                {expirationPercentage.toFixed(2)}% de validade restante
              </p>
              <button onClick={clearData}>Novo cálculo</button>
            </>
          )}
        </div>
      </div>
    </FormProvider>
  )
}

export default App
