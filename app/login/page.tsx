'use client'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams.get('from') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      router.push(from)
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
      <h2 style={{ margin: 0 }}>Private Site</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
        autoFocus
      />
      {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
      <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Enter</button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
