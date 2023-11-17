import { useContext } from 'use-context-selector'
import { ContactsContext } from '../context/ContactsContext'

export function useContact() {
  const context = useContext(ContactsContext)
  return context
}
