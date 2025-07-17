'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function ClientSidebarLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!hasMounted) return null // SSR mismatch prevention

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main
        className={`flex-1 overflow-y-auto bg-black text-white transition-all duration-300`}
        style={{ marginLeft: isMobile ? 0 : 288 }} // 72rem sidebar width
      >
        {children}
      </main>
    </div>
  )
}
