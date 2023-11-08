'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { PenSquare, Trash } from 'lucide-react'
import Modal from './UI/Modal/index'
import { IContacts } from '../(routes)/(home)/page'

interface ContactProps {
  contact: IContacts
  deleteContact: (id: unknown) => void
}

export default function ContactCard({ contact, deleteContact }: ContactProps) {
  return (
    <div className="flex flex-row justify-between rounded bg-white p-4 shadow-md">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <h1 className="text font-bold">{contact.name}</h1>
          <span className="rounded bg-primary-300 p-1 text-xs font-bold uppercase text-primary-500">
            {contact.category_name}
          </span>
        </div>
        <span className="text-sm font-normal text-zinc-400">
          {contact.email}
        </span>
        <span className="text-sm font-normal text-zinc-400">
          {contact.phone}
        </span>
      </div>

      <div className="flex h-auto flex-row items-center gap-2">
        <a href="/edit" className="mt-1.5 outline-none">
          <button className="focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            <PenSquare className="text-primary-500" />
          </button>
        </a>

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button className="focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2">
              <Trash className="text-red-400" />
            </button>
          </AlertDialog.Trigger>
          <Modal deleteContact={deleteContact} contactName={contact.name} />
        </AlertDialog.Root>
      </div>
    </div>
  )
}
