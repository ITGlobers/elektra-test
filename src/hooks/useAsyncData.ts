import { useEffect, useState } from 'react'

export const useAsyncData = (asyncFn: () => Promise<any>, params: any[]) => {

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await asyncFn()
        setData(result)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, params)

  return { data, loading, error }
}
