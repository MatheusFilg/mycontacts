import Skeleton from 'react-loading-skeleton'

export default function HomeLoading() {
  return (
    <div className="flex w-[500px] flex-col">
      <Skeleton
        className="flex h-[58px] w-full flex-1 animate-pulse rounded-md bg-zinc-300 p-2"
        count={1}
      />
      <div className="flex w-full flex-row justify-between">
        <Skeleton
          className="flex h-[32px] w-[180px] flex-1 animate-pulse rounded-md bg-zinc-300 p-2"
          count={1}
        />
        <Skeleton
          className="flex h-[45px] w-[180px] flex-1 animate-pulse rounded-md bg-zinc-300 p-2"
          count={1}
        />
      </div>
      <Skeleton
        count={1}
        className="flex h-[25px] w-[75px] flex-1 animate-pulse rounded-md bg-zinc-300 p-3"
      />
      <Skeleton
        count={1}
        className="flex h-[300px] w-full flex-1 animate-pulse rounded-md bg-zinc-300 p-3"
      />
    </div>
  )
}
