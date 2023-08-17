'use client'

import { useEffect, useState } from 'react'

export default function Use<T>(callBack: () => Promise<any>) {
  const [result, setResult] = useState<T | null>(null)

  useEffect(() => {
    callBack().then((res: T) => {
      setResult(res)
    })
  })

  return {
    isLoading: result === null,
    data: result,
  }
}
