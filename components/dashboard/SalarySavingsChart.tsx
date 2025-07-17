'use client'

import { useEffect, useState } from 'react'

export default function SavingsComparison() {
  const [savings, setSavings] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || ''
      try {
        const res = await fetch('/api/user/summary', {
          headers: { Authorization: `Bearer ${token}` },
        })

        const json = await res.json()
        const all = json?.data || []
        const latest = all.length > 0 ? all[all.length - 1] : {}

        const s = Number(latest?.savings || 0)
        const e = Number(latest?.expenses || 0)
        const p = (s + e) > 0 ? Math.round((s / (s + e)) * 100) : 0

        setSavings(s)
        setExpenses(e)
        setPercentage(p)
      } catch (err) {
        console.error('Comparison fetch error:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="text-sm text-zinc-300 flex flex-wrap items-center justify-center gap-4 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700 shadow-sm">
      <span className="text-emerald-400 font-semibold">Savings: ₹{savings.toLocaleString()}</span>
      <span className="text-rose-400 font-semibold">Expenses: ₹{expenses.toLocaleString()}</span>
      <span className="text-cyan-400 font-semibold">Saved: {percentage}%</span>
    </div>
  )
}
