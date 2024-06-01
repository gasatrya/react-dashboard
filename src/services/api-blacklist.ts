import fetcher from '@/utils/fetch'

export async function blacklistRequest(
  url: string,
  { arg }: { arg: { id: number | string } }
) {
  return await fetcher(`${url}/${arg.id}`, {
    method: 'DELETE',
  })
}
