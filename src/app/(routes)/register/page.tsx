'use client'

import { ArrowLeft } from 'lucide-react'
import RegisterForm from '../../components/RegisterForm'
import { useContact } from '@/app/hooks/useContact'
import LoadingForm from '@/app/components/LoadingForm'

export default function Register() {
  const { loading } = useContact()

  return (
    <div className="flex w-[500px] flex-col">
      {loading ? (
        <LoadingForm />
      ) : (
        <div className="flex w-[500px] flex-col items-start">
          <a
            href="/"
            className="mb-2 flex flex-row items-center gap-2 text-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft size={20} />
            <h1 className="font-bold">Voltar</h1>
          </a>

          <h1 className="mb-6 text-2xl font-bold">Novo Contato</h1>

          <RegisterForm />
        </div>
      )}
    </div>
  )
}
