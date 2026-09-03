'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('bereke@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка входа');
        return;
      }
      router.push(search.get('next') || '/admin');
      router.refresh();
    } catch {
      setError('Не удалось войти');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-login-card">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--admin-muted)]">
        Bereke CMS
      </p>
      <h1 className="mt-3 text-3xl tracking-[0.08em]">Вход</h1>
      <p className="mt-2 text-sm text-[var(--admin-muted)]">Управление контентом сайта</p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="admin-label">Email</span>
          <input
            className="admin-input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="admin-label">Пароль</span>
          <input
            className="admin-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-[var(--admin-danger)]">{error}</p> : null}

      <button type="submit" disabled={loading} className="admin-btn admin-btn-primary mt-8 w-full">
        {loading ? 'Вход…' : 'Войти'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="admin-shell admin-login-bg">
      <Suspense
        fallback={<div className="admin-login-card text-sm text-[var(--admin-muted)]">Загрузка…</div>}
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
