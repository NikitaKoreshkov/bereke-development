'use client';

import { useCallback, useEffect, useState } from 'react';
import { Toast } from '../components/AdminFormBits';

type MediaItem = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
};

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/media', { cache: 'no-store' });
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2500);
    return () => window.clearTimeout(timer);
  }, [message]);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
      }
      setMessage('Файлы загружены');
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(url: string) {
    if (!confirm('Удалить файл с диска и из базы?')) return;
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      setMessage('Не удалось удалить');
      return;
    }
    setMessage('Удалено');
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--admin-muted)]">
            Медиатека
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl">Файлы</h2>
          <p className="mt-2 max-w-xl text-[var(--admin-muted)]">
            Загружайте фото здесь или прямо в блоках. При замене в поле изображения старый
            `/uploads/...` файл удаляется автоматически.
          </p>
        </div>
        <label className="admin-btn admin-btn-primary cursor-pointer">
          {uploading ? 'Загрузка…' : 'Загрузить'}
          <input
            type="file"
            multiple
            accept="image/*,video/mp4,video/webm,video/quicktime,video/*,application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              void onUpload(e.target.files);
              e.target.value = '';
            }}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="admin-card overflow-hidden">
            {item.mimeType.startsWith('image/') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.filename} className="h-44 w-full object-cover" />
            ) : (
              <div className="flex h-44 items-center justify-center bg-black/[0.04] text-sm text-[var(--admin-muted)]">
                {item.mimeType}
              </div>
            )}
            <div className="space-y-3 p-4">
              <p className="truncate text-sm font-medium">{item.filename}</p>
              <p className="break-all text-xs text-[var(--admin-muted)]">{item.url}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost"
                  onClick={() => {
                    void navigator.clipboard.writeText(item.url);
                    setMessage('URL скопирован');
                  }}
                >
                  Копировать
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => void onDelete(item.url)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="admin-card border-dashed p-10 text-center text-sm text-[var(--admin-muted)]">
          Пока нет загруженных файлов.
        </div>
      ) : null}

      <Toast message={message} />
    </div>
  );
}
