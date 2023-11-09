'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { createContext } from 'use-context-selector'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  category_name: 'instagram' | 'whatsapp' | 'linkedin'
}

interface CreateContactProps {
  name: string
  email: string
  phone: string
  category: 'instagram' | 'whatsapp' | 'linkedin'
}

interface ContactContextType {
  contacts: Contact[]
  orderBy: string
  handleOrderContacts: () => void
  handleDeleteContact: (id: unknown) => void
  setSearchTerm: Dispatch<SetStateAction<string>>
  filteredContacts: Contact[]
  searchTerm: string
  handleRegisterNewContact: (data: CreateContactProps) => Promise<void>
}

interface ContactsProvideProps {
  children: ReactNode
}

export const ContactsContext = createContext({} as ContactContextType)

export function ContactsProvider({ children }: ContactsProvideProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json()
        setContacts(json)
      })
      .catch((error) => {
        console.log('erro', error)
      })
  }, [orderBy])

  async function handleRegisterNewContact(data: CreateContactProps) {
    const { name, phone, email } = data

    if (name && phone && email) {
      fetch('http://localhost:3001/contacts', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setContacts([...contacts, data])
        })
    }
    window.location.href = 'http://localhost:3000/'
  }

  function handleOrderContacts() {
    setOrderBy((orderBy) => (orderBy === 'asc' ? 'desc' : 'asc'))
  }

  function handleDeleteContact(id: unknown) {
    fetch(`http://localhost:3001/contacts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setContacts((contacts) => {
        return contacts.filter((item) => item.id !== id)
      })
    })
  }

  const filteredContacts = contacts.filter(
    ({ name }) => name?.includes(searchTerm),
  )

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        handleOrderContacts,
        orderBy,
        handleDeleteContact,
        setSearchTerm,
        filteredContacts,
        searchTerm,
        handleRegisterNewContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
