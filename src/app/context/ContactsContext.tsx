/* eslint-disable camelcase */
'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { createContext } from 'use-context-selector'

export interface IContact {
  id: string
  name: string
  email: string
  phone: string
  category_id: string
  category_name?: string
}

export interface CreateContactProps {
  name: string
  email: string
  phone: string
  category_id: string
  category_name?: string
}

interface ContactContextType {
  contacts: IContact[]
  orderBy: string
  handleOrderContacts: () => void
  handleDeleteContact: (id: unknown) => void
  setSearchTerm: Dispatch<SetStateAction<string>>
  filteredContacts: IContact[]
  searchTerm: string
  handleRegisterNewContact: (data: CreateContactProps) => Promise<void>
  loading: boolean
  setContacts: Dispatch<SetStateAction<IContact[]>>
}

interface ContactsProvideProps {
  children: ReactNode
}

export const ContactsContext = createContext({} as ContactContextType)

export function ContactsProvider({ children }: ContactsProvideProps) {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json()
        setContacts(json)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log('erro', error)
      })
  }, [orderBy])

  async function handleRegisterNewContact(data: CreateContactProps) {
    const { name, phone, email, category_id } = data

    if (name && phone && email && category_id) {
      fetch('http://localhost:3001/contacts', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
          category_id,
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
    console.log(setContacts)
    window.location.href = 'http://localhost:3000/'
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

  function handleOrderContacts() {
    setOrderBy((orderBy) => (orderBy === 'asc' ? 'desc' : 'asc'))
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
        loading,
        setContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
