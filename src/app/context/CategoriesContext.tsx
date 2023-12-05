'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { URL } from './ContactsContext'

interface ICategory {
  name: string
  id: string
}

interface CategoryContextType {
  categories: ICategory[]
}

interface CategoriesProvideProps {
  children: ReactNode
}

export const CategoriesContext = createContext({} as CategoryContextType)

export function CategoriesProvider({ children }: CategoriesProvideProps) {
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    fetch(`${URL}/categories`)
      .then(async (response) => {
        const json = await response.json()
        setCategories(json)
      })
      .catch((error) => {
        console.log('erro', error)
      })
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
