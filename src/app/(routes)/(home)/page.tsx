'use client'

import { useContextSelector } from 'use-context-selector'
import { ContactsContext } from '@/app/context/ContactsContext'
import HomeContent from '../../components/Home/HomeContent'
import HomeLoading from '../../components/Home/HomeLoading'

export default function Home() {
  const loading = useContextSelector(ContactsContext, (context) => {
    return context.loading
  })

  return <div>{loading ? <HomeLoading /> : <HomeContent />}</div>
}
