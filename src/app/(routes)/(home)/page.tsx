'use client'

import { MoveDown, MoveUp } from 'lucide-react'
import ContactCard from '../../components/ContactCard'

import { ChangeEvent } from 'react'
import { useContextSelector } from 'use-context-selector'
import { ContactsContext } from '@/app/context/ContactsContext'

export interface IContacts {
  id: string
  name: string
  email: string
  phone: string
  category_name: string
}

export default function Home() {
  const filteredContacts = useContextSelector(ContactsContext, (context) => {
    return context.filteredContacts
  })

  const handleOrderContacts = useContextSelector(ContactsContext, (context) => {
    return context.handleOrderContacts
  })

  const orderBy = useContextSelector(ContactsContext, (context) => {
    return context.orderBy
  })

  const handleDeleteContact = useContextSelector(ContactsContext, (context) => {
    return context.handleDeleteContact
  })

  const setSearchTerm = useContextSelector(ContactsContext, (context) => {
    return context.setSearchTerm
  })

  const searchTerm = useContextSelector(ContactsContext, (context) => {
    return context.searchTerm
  })

  function handleSearchContact(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex w-[500px] flex-col items-center">
      <input
        className="mb-8 w-full rounded-3xl border border-transparent bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
        type="text"
        placeholder="Pesquisar contato..."
        value={searchTerm}
        onChange={handleSearchContact}
      />
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-950">
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </h1>
        <a href="/register" className="mt-1.5 outline-none">
          <button className="rounded border-2 border-primary-500 bg-transparent p-3 px-4 py-2 text-base font-bold text-primary-500 shadow-md outline-none focus-visible:shadow-md focus-visible:shadow-primary-500">
            Novo Contato
          </button>
        </a>
      </div>

      <div className=" mb-4 h-0.5 w-full rounded bg-zinc-400/20" />

      <div className="flex w-full flex-col items-start">
        <button
          onClick={handleOrderContacts}
          className="mb-1.5 flex flex-row items-center gap-0.5 text-base font-bold text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Nome
          <span>
            {orderBy === 'asc' ? <MoveUp size={20} /> : <MoveDown size={20} />}
          </span>
        </button>

        <div className="flex w-full flex-col gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              contact={contact}
              key={contact.id}
              deleteContact={() => handleDeleteContact(contact.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
