'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Select } from './UI/Select'
import { SelectItem } from './UI/Select/SelectItem'
import { Input } from './Input'
import { RegisterData, RegisterValidationSchema } from '../utils/schema'
import { formatPhone } from '../utils/formatPhone'
import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { ContactsContext } from '../context/ContactsContext'

export default function RegisterForm() {
  const handleRegisterNewContact = useContextSelector(
    ContactsContext,
    (context) => {
      return context.handleRegisterNewContact
    },
  )

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterValidationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { phone: '' },
  })

  // input mask do input de phone
  const phoneValue = watch('phone')
  useEffect(() => {
    setValue('phone', formatPhone(phoneValue))
  }, [phoneValue, setValue])

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit(handleRegisterNewContact)}
      noValidate
    >
      <div className="mb-6 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          className="w-full rounded border border-transparent bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          type="email"
          placeholder="E-mail"
          className="w-full rounded border border-transparent bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className="w-full rounded border border-transparent bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          placeholder="Telefone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Categoria"
              value={field.value}
              onValueChange={(value) => {
                return field.onChange(value)
              }}
            >
              <SelectItem value="instagram" text="Instagram" />
              <SelectItem value="linkedin" text="Linkedin" />
              <SelectItem value="whatsapp" text="Whatsapp" />
            </Select>
          )}
        />
      </div>

      <button className="w-full rounded bg-primary-500 p-4 px-4 py-2 text-lg font-bold text-white shadow-md outline-none focus-visible:shadow-lg focus-visible:shadow-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-400">
        Cadastrar
      </button>
    </form>
  )
}
