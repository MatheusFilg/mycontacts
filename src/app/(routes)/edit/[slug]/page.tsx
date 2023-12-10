'use client'

import { ArrowLeft } from 'lucide-react'
import EditForm from '@/app/components/EditForm'
import { CreateContactProps } from '@/app/context/ContactsContext'
import { useRouter } from 'next/navigation'
import { useContact } from '@/app/hooks/useContact'
import LoadingForm from '@/app/components/LoadingForm'
import { toast } from 'react-toastify'

interface ContactProps {
  params: {
    slug: string
  }
}

export default function Edit({ params }: ContactProps) {
  const { contacts, loading } = useContact()
  const filteredEditContact = contacts.find(
    (contact) => contact.id === params.slug,
  )
  const router = useRouter()

  async function handleEditContact(data: CreateContactProps) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contacts/${params.slug}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )

      if (response.status === 400) {
        return toast.error('Nenhuma alteração feita')
      }
      toast.success('Cadastro editado com sucesso')
      router.refresh()
      await response.json()
      window.location.href = '/'
    } catch (error: any) {
      if (error.status === 400) {
        return toast.error('Nenhuma alteração feita')
      } else {
        return toast.warning('Erro interno do Servidor')
      }
    }
  }

  return (
    <div>
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

          <h1 className="mb-6 text-2xl font-bold">
            Editar {filteredEditContact?.name}
          </h1>

          <EditForm
            filteredEditContact={filteredEditContact}
            handleEditContact={handleEditContact}
          />
        </div>
      )}
    </div>
  )
}
