'use client'

import HomeContent from '../../components/Home/HomeContent'
import HomeLoading from '../../components/Home/HomeLoading'
import { useContact } from '@/app/hooks/useContact'

export default function Home() {
  const { loading } = useContact()

  return <div>{loading ? <HomeLoading /> : <HomeContent />}</div>
}
