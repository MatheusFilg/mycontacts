'use client'

import { ArrowLeft } from 'lucide-react'
import EditForm from '@/app/components/EditForm'
import {
  ContactsContext,
  CreateContactProps,
} from '@/app/context/ContactsContext'
import { useContextSelector } from 'use-context-selector'
import { useRouter } from 'next/navigation'

interface ContactProps {
  params: {
    slug: string
  }
}

export default function Edit({ params }: ContactProps) {
  const contacts = useContextSelector(ContactsContext, (context) => {
    return context.contacts
  })

  const router = useRouter()

  const filteredEditContacts = contacts.find(
    (contact) => contact.id === params.slug,
  )

  async function handleEditContact(data: CreateContactProps) {
    fetch(`http://localhost:3001/contacts/${params.slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      router.refresh()
      return response.json()
    })
    window.location.href = 'http://localhost:3000/'
  }

  return (
    <div className="flex w-[500px] flex-col items-start">
      <a
        href="/"
        className="mb-2 flex flex-row items-center gap-2 text-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <ArrowLeft size={20} />
        <h1 className="font-bold">Voltar</h1>
      </a>

      <h1 className="mb-6 text-2xl font-bold">
        Editar {filteredEditContacts?.name}
      </h1>

      <EditForm
        contactInfo={filteredEditContacts}
        editContact={handleEditContact}
      />
    </div>
  )
}
