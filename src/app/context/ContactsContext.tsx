'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Id, toast } from 'react-toastify'

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
  searchTerm: string
  loading: boolean
  setSearchTerm: Dispatch<SetStateAction<string>>
  setContacts: Dispatch<SetStateAction<IContact[]>>
  filteredContacts: IContact[]
  handleOrderContacts: () => void
  handleDeleteContact: (id: unknown) => void
  handleRegisterNewContact: (
    data: CreateContactProps,
  ) => Promise<Id | undefined>
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

  const filteredContacts = contacts.filter(
    ({ name }) => name?.includes(searchTerm),
  )

  useEffect(() => {
    setLoading(true)

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contacts?orderBy=${orderBy}`)
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

    if (data) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/contacts`,
          {
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
          },
        )

        if (response.status === 400) {
          return toast.error('Email já Cadastrado')
        }

        const data = await response.json()

        toast.success('Cadastro registrado com sucesso')
        setContacts([...contacts, data])
        window.location.href = '/'
      } catch (error: any) {
        if (error.status === 400) {
          return toast.error('Email já Cadastrado')
        } else {
          return toast.warning('Erro interno do Servidor')
        }
      }
    }
  }

  function handleDeleteContact(id: unknown) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setContacts((contacts) => {
        return contacts.filter((item) => item.id !== id)
      })
      toast.success('Cadastro Deletado com Sucesso')
    })
  }

  function handleOrderContacts() {
    setOrderBy((orderBy) => (orderBy === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        orderBy,
        searchTerm,
        loading,
        setSearchTerm,
        setContacts,
        filteredContacts,
        handleOrderContacts,
        handleDeleteContact,
        handleRegisterNewContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
