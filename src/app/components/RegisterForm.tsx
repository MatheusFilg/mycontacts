'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Select } from './UI/Select'
import { SelectItem } from './UI/Select/SelectItem'
import { Input } from './Input'
import { RegisterData, RegisterValidationSchema } from '../utils/schema'
import { formatPhone } from '../utils/formatPhone'
import { useEffect } from 'react'
import { useContact } from '../hooks/useContact'
import { useCategory } from '../hooks/useCategory'

export default function RegisterForm() {
  const { handleRegisterNewContact } = useContact()
  const { loadCategories, categories } = useCategory()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterValidationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { phone: '' },
  })

  const phoneValue = watch('phone')
  useEffect(() => {
    setValue('phone', formatPhone(phoneValue))
  }, [phoneValue, setValue])

  useEffect(() => {
    loadCategories()
  })

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit(handleRegisterNewContact)}
      noValidate
    >
      <div className="mb-6 flex flex-col gap-4">
        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="text"
          placeholder="Nome"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="phone"
          placeholder="Telefone"
          {...register('phone')}
          maxLength={15}
          error={errors.phone?.message}
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Categoria"
              value={field.value}
              onValueChange={(value) => {
                return field.onChange(value)
              }}
            >
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  text={category.name}
                />
              ))}
            </Select>
          )}
        />
      </div>

      <button
        disabled={!isValid}
        className="w-full rounded bg-primary-500 p-4 px-4 py-2 text-lg font-bold text-white shadow-md outline-none focus-visible:shadow-lg focus-visible:shadow-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        Cadastrar
      </button>
    </form>
  )
}
