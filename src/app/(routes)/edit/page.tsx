import { ArrowLeft } from 'lucide-react'
import FormGroup from '../../components/FormGroup'

export default function Edit() {
  return (
    <div className="flex w-[500px] flex-col items-start">
      <a
        href="/"
        className="mb-2 flex flex-row items-center gap-2 text-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <ArrowLeft size={20} />
        <h1 className="font-bold">Voltar</h1>
      </a>

      <h1 className="mb-6 text-2xl font-bold">Editar Matheus Filg</h1>

      <FormGroup />
    </div>
  )
}
