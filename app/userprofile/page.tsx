'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'

export default function UserProfilePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [monthlySalary, setMonthlySalary] = useState(0)
  const [gender, setGender] = useState<'male' | 'female' | 'unspecified'>('unspecified')
  const [currency, setCurrency] = useState('INR')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const { setUser } = useUser()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        const profile = data?.profile || {}
        setName(profile.fullName || '')
        setEmail(profile.email || '')
        setMonthlySalary(Number(profile.monthlySalary) || 0)
        setGender(profile.gender || 'unspecified')
        setCurrency(profile.currency || 'INR')
        setUser({
          fullName: profile.fullName || '',
          email: profile.email || '',
          monthlySalary: Number(profile.monthlySalary) || 0,
          gender: profile.gender || 'unspecified',
          currency: profile.currency || 'INR',
        })


      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [setUser])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          monthlySalary,
          gender,
          currency,
        }),
      })

      if (res.ok) {
        setUser({
          fullName: name,
          email,
          monthlySalary,
          gender,
          currency,
        })
        window.dispatchEvent(new Event('profileUpdated'))
        setMessage('✅ Profile updated successfully.')
      } else {
        setMessage('❌ Failed to update profile.')
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      setMessage('❌ Error occurred while saving.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded opacity-60 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Monthly Salary</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={e => setMonthlySalary(Number(e.target.value))}
            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Gender</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value as 'male' | 'female' | 'unspecified')}
            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
          >
            <option value="unspecified">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Currency</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
          >
            {['INR', 'USD', 'EUR', 'GBP'].map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && <p className="text-sm text-cyan-400 mt-2">{message}</p>}
      </div>
    </div>
  )
}
