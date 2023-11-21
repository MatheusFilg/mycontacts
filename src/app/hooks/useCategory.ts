import { useContext } from 'use-context-selector'
import { CategoriesContext } from '../context/CategoriesContext'

export function useCategory() {
  const category = useContext(CategoriesContext)
  return category
}
