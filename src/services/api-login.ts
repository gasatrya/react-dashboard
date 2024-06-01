import fetcher from '@/utils/fetch'

export async function loginRequest(
  url: string,
  { arg }: { arg: { username: string; password: string } }
) {
  return await fetcher(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}
