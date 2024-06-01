import { useAppStore } from '@/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<JSON> {
  const token = useAppStore.getState().token

  return await fetch(`${import.meta.env.VITE_API_URL}/${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  }).then((res) => res.json())
}
