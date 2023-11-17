import { useContact } from '@/app/hooks/useContact'
import { ChangeEvent } from 'react'

export default function Header() {
  const { searchTerm, setSearchTerm, filteredContacts } = useContact()

  function handleSearchContact(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }
  return (
    <div className="flex w-[500px] flex-col items-center">
      <input
        className="mb-8 w-full rounded-3xl border border-transparent bg-white p-4 shadow-md outline-none placeholder:text-zinc-400 focus-within:border focus-within:border-primary-500 focus-within:border-opacity-100"
        type="text"
        placeholder="Pesquisar contato..."
        value={searchTerm}
        onChange={handleSearchContact}
      />
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-950">
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </h1>
        <a href="/register" className="mt-1.5 outline-none">
          <button className="rounded border-2 border-primary-500 bg-transparent p-3 px-4 py-2 text-base font-bold text-primary-500 shadow-md outline-none focus-visible:shadow-md focus-visible:shadow-primary-500">
            Novo Contato
          </button>
        </a>
      </div>
      <div className=" mb-4 h-0.5 w-full rounded bg-zinc-400/20" />
    </div>
  )
}
