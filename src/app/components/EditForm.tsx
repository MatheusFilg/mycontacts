'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Select } from './UI/Select'
import { SelectItem } from './UI/Select/SelectItem'
import { Input } from './Input'
import { RegisterData, RegisterValidationSchema } from '../utils/schema'
import { CreateContactProps, IContact } from '../context/ContactsContext'
import { useEffect } from 'react'
import { useCategory } from '../hooks/useCategory'

interface ContactProps {
  contactInfo: IContact | undefined
  editContact: (data: CreateContactProps) => void
}

export default function EditForm({ contactInfo, editContact }: ContactProps) {
  const { loadCategories, categories } = useCategory()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterValidationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    loadCategories()
  })

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit(editContact)}
      noValidate
    >
      <div className="mb-6 flex flex-col gap-4">
        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="text"
          placeholder="Nome"
          {...register('name')}
          defaultValue={contactInfo?.name}
          error={errors.name?.message}
        />

        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="email"
          placeholder="E-mail"
          {...register('email')}
          defaultValue={contactInfo?.email}
          error={errors.email?.message}
        />

        <Input
          className="w-full rounded border bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
          type="phone"
          placeholder="Telefone"
          {...register('phone')}
          max={15}
          defaultValue={contactInfo?.phone}
          error={errors.phone?.message}
        />

        <Controller
          name="category_id"
          defaultValue={contactInfo?.category_id}
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
        disabled={!isValid || !isDirty}
        className="w-full rounded bg-primary-500 p-4 px-4 py-2 text-lg font-bold text-white shadow-md outline-none focus-visible:shadow-lg focus-visible:shadow-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        Editar Cadastro
      </button>
    </form>
  )
}
