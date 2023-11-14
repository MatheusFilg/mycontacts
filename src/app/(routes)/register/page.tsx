import { ArrowLeft } from 'lucide-react'
import RegisterForm from '../../components/RegisterForm'
import Skeleton from 'react-loading-skeleton'

const loading = false

export default function Register() {
  return (
    <div className="flex w-[500px] flex-col">
      {loading ? (
        <div className="flex w-[500px] flex-1 flex-col">
          <Skeleton
            className="flex w-20 flex-1 animate-pulse rounded-md bg-zinc-300 p-2"
            count={1}
          />
          <Skeleton
            className="flex w-[180px] flex-1 animate-pulse rounded-md bg-zinc-300 p-2"
            count={1}
          />
          <Skeleton
            count={5}
            className="flex w-full flex-1 animate-pulse rounded-md bg-zinc-300 p-3"
          />
        </div>
      ) : (
        <div className="flex w-[500px] flex-col items-start">
          <a
            href="/"
            className="mb-2 flex flex-row items-center gap-2 text-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft size={20} />
            <h1 className="font-bold">Voltar</h1>
          </a>

          <h1 className="mb-6 text-2xl font-bold">Novo Contato</h1>

          <RegisterForm />
        </div>
      )}
    </div>
  )
}
