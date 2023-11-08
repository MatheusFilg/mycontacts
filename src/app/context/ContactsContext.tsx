'use client'

import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  category_name: 'instagram' | 'whatsapp' | 'linkedin'
}

interface ContactContextType {
  contacts: Contact[]
}

interface ContactsProvideProps {
  children: ReactNode
}

export const ContactsContext = createContext({} as ContactContextType)

export function ContactsProvider({ children }: ContactsProvideProps) {
  const [contacts, setContacts] = useState<Contact[]>([])

  return (
    <ContactsContext.Provider value={{ contacts }}>
      {children}
    </ContactsContext.Provider>
  )
}
