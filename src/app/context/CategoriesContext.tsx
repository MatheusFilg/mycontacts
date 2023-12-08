'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

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
  const URL = 'http://localhost:3001' || process.env.BASE_URL

  useEffect(() => {
    fetch(`${URL}/categories`)
      .then(async (response) => {
        const json = await response.json()
        setCategories(json)
      })
      .catch((error) => {
        console.log('erro', error)
      })
  }, [URL])

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
