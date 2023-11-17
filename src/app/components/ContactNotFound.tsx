import Header from './Home/HomeHeader'
import question from '../public/question.png'
import Image from 'next/image'

export default function ContactNotFound() {
  return (
    <div>
      <Header />
      <div className="flex flex-row items-center justify-center gap-6">
        <Image src={question} alt="lupa vermelha com interrogação" />
        <h1 className="text-zinc-400">Nenhum contato foi encontrado</h1>
      </div>
    </div>
  )
}
