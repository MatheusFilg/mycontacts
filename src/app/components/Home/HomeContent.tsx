'use client'

import ContactCard from '@/app/components/ContactCard'
import EmptyContacts from '@/app/components/EmptyContacts'
import { MoveUp, MoveDown } from 'lucide-react'
import Header from './HomeHeader'
import { useContact } from '@/app/hooks/useContact'
import ContactNotFound from '../ContactNotFound'

export default function HomeContent() {
  const {
    filteredContacts,
    contacts,
    handleOrderContacts,
    orderBy,
    handleDeleteContact,
  } = useContact()

  const isEmpty = contacts.length === 0
  const contactNotFound = filteredContacts.length === 0

  return (
    <div>
      {isEmpty ? (
        <EmptyContacts />
      ) : contactNotFound ? (
        <ContactNotFound />
      ) : (
        <div className="flex w-[500px] flex-col items-center">
          <Header />
          <div className="flex w-full flex-col items-start">
            <button
              onClick={handleOrderContacts}
              className="mb-1.5 flex flex-row items-center gap-0.5 text-base font-bold text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Nome
              <span>
                {orderBy === 'asc' ? (
                  <MoveUp size={20} />
                ) : (
                  <MoveDown size={20} />
                )}
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
      )}
    </div>
  )
}
