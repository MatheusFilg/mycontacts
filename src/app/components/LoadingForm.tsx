import Skeleton from 'react-loading-skeleton'

export default function LoadingForm() {
  return (
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
  )
}
