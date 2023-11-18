import * as z from 'zod'

export enum CategoryContact {
  instagram = 'instagram',
  whatsapp = 'whatsapp',
  linkedin = 'linkedin',
}

export const RegisterValidationSchema = z.object({
  name: z
    .string({
      required_error: 'O nome do contato é obrigatório',
      invalid_type_error: 'O nome do contato só pode conter letras',
    })
    .min(3, 'O nome deve conter no mínimo 3 letras'),
  email: z
    .string({
      required_error: 'O email do contato é obrigatório',
    })
    .email({ message: 'Email inválido' })
    .min(8, 'O email tem que conter no mínimo 8 letras'),
  phone: z.coerce
    .string({
      required_error: 'O número do contato é obrigatório',
    })
    .min(15, { message: 'Mínimo de caracteres necessário' })
    .max(15, { message: 'Limite de caracteres atingido' }),
  category: z.nativeEnum(CategoryContact, {
    errorMap: () => {
      return { message: 'Informe a categoria do Contato' }
    },
  }),
})

export type RegisterData = z.infer<typeof RegisterValidationSchema>
