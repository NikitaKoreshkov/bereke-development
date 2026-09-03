'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SiteContentData } from '@/lib/content-types';

export function useAdminContent() {
  const [content, setContent] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content', { cache: 'no-store' });
      if (!res.ok) throw new Error('Не удалось загрузить контент');
      setContent(await res.json());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  const save = useCallback(async (next: SiteContentData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка сохранения');
      }
      setContent(next);
      setMessage('Сохранено');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Ошибка сохранения');
      throw error;
    } finally {
      setSaving(false);
    }
  }, []);

  return { content, setContent, loading, saving, message, setMessage, save, reload: load };
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
