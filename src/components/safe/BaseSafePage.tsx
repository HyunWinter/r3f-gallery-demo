// Imports
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function BaseSafePage({
  safeCode,
  children,
}: {
  safeCode: string
  children: React.ReactNode
}) {
  const [isVerified, setIsVerified] = useState(false)

  // 드래그 방지 함수
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  // 페이지 복붙 방지 함수
  const router = useRouter()

  const redirectTo404 = useCallback(() => {
    router.push('/404')
  }, [router])

  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return

    // if url has safeCode, replace url without redirect
    // else, redirect to /
    if (router.query.dKey && safeCode && router.query.dKey === safeCode) {
      // create a url without any params
      const url = new URL(window.location.href)
      window.history.replaceState({}, '', url.pathname)
      setIsVerified(true)
    }
    else {
      redirectTo404()
    }
  }, [router.query.dKey, safeCode, router.isReady, redirectTo404])

  // contextmenu 방지 함수
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextmenu)

    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  if (!isVerified) {
    return null
  }

  return <div
    onDragStart={handleDragStart}
    onContextMenu={handleContextMenu}
  >
    {children}
  </div>
}
