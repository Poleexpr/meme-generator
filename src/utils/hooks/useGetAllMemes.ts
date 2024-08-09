import { useEffect, useState } from 'react'

interface Data {
  data: {
    memes: {
      url: string
    }[]
  }
  success: boolean
}

type AllMemes = {
  url: string
}

export const useGetAllMemes = (url: string) => {
  const [allMemes, setAllMemes] = useState<AllMemes[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const getMemes = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(res.statusText)
        const data: Data = (await res.json()) as Data
        setIsLoading(false)
        setAllMemes(data.data.memes)
        setError('')
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
        setIsLoading(false)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMemes()
  }, [url])
  return { allMemes, error, isLoading }
}
