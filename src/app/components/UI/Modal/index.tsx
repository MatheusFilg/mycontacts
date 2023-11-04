'use client'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

export default function Modal() {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
        <AlertDialog.Content className="w-[450px] rounded bg-white p-6">
          <AlertDialog.Title className="mb-2 text-2xl font-bold text-red-400">
            Tem certeza que deseja remover o contato ”Matheus Filg”?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-8">
            Esta ação não poderá ser desfeita!
          </AlertDialog.Description>
          <div className="flex flex-row justify-end gap-2">
            <AlertDialog.Cancel className="text-zinc-300">
              Cancelar
            </AlertDialog.Cancel>
            <AlertDialog.Action className="rounded bg-red-400 px-4 py-2 font-bold text-white">
              Deletar
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  )
}
