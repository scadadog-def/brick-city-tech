import { useEffect, useState } from 'react'

export function useMe() {
  const [loading, setLoading] = useState(true)
  const [member, setMember] = useState(null)

  async function refresh() {
    setLoading(true)
    try {
      const res = await fetch('/me', { credentials: 'include' })
      const data = await res.json().catch(() => ({}))
      setMember(data?.member || null)
    } catch {
      setMember(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { loading, member, refresh, setMember }
}
