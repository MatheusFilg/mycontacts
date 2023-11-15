/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import emptybox from '../public/emptybox.png'

export default function NoContacts() {
  return (
    <div className="flex w-[500px] flex-col items-center space-y-4">
      <a href="/register" className="mt-1.5 outline-none">
        <button className="rounded border-2 border-primary-500 bg-transparent p-3 px-4 py-2 text-base font-bold text-primary-500 shadow-md outline-none focus-visible:shadow-md focus-visible:shadow-primary-500">
          Novo Contato
        </button>
      </a>
      <div className=" mb-4 h-0.5 w-full rounded bg-zinc-400/20" />
      <Image src={emptybox} alt="caixa vazia azul" />
      <div className="w-[400px] text-center text-zinc-400">
        <p>
          Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
          <strong className="text-primary-500">”Novo contato”</strong> à cima
          para cadastrar o seu primeiro!
        </p>
      </div>
    </div>
  )
}
