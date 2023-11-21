'use client'

import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

interface ICategory {
  name: string
  id: string
}

interface CategoryContextType {
  categories: ICategory[]
  loadCategories: () => void
}

interface CategoriesProvideProps {
  children: ReactNode
}

export const CategoriesContext = createContext({} as CategoryContextType)

export function CategoriesProvider({ children }: CategoriesProvideProps) {
  const [categories, setCategories] = useState<ICategory[]>([])

  function loadCategories() {
    fetch('http://localhost:3001/categories')
      .then(async (response) => {
        const json = await response.json()
        setCategories(json)
      })
      .catch((error) => {
        console.log('erro', error)
      })
  }

  return (
    <CategoriesContext.Provider value={{ categories, loadCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
