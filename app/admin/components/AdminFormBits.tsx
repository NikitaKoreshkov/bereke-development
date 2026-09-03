'use client';

import { useState } from 'react';

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
};

export function Field({ label, value, onChange, multiline, type = 'text' }: FieldProps) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {multiline ? (
        <textarea className="admin-textarea" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          className="admin-input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  variant = 'inline',
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  variant?: 'inline' | 'panel';
}) {
  return (
    <div className={variant === 'panel' ? 'admin-toggle-panel' : 'admin-toggle-inline'}>
      <span className="text-sm font-medium text-[var(--admin-ink)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="admin-switch"
      >
        <span className="admin-switch-knob" />
      </button>
    </div>
  );
}

async function uploadFile(file: File, replaceUrl?: string) {
  const form = new FormData();
  form.append('file', file);
  if (replaceUrl?.startsWith('/uploads/')) {
    form.append('replaceUrl', replaceUrl);
  }
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Ошибка загрузки');
  }
  return data as { url: string };
}

async function deleteManagedUpload(url: string) {
  if (!url.startsWith('/uploads/')) return;
  await fetch('/api/admin/media', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadFile(file, value);
      onChange(data.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-media-drop">
      <span className="admin-label">{label}</span>
      <div className="admin-media-preview">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--admin-muted)]">
            Нет изображения
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="admin-btn admin-btn-gold cursor-pointer">
          {uploading ? 'Загрузка и оптимизация…' : 'Загрузить с компьютера'}
          <input
            type="file"
            accept="image/*,video/mp4,video/webm,video/quicktime,application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              void onUpload(e.target.files?.[0] ?? null);
              e.target.value = '';
            }}
          />
        </label>
        {value ? (
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={() => {
              void deleteManagedUpload(value);
              onChange('');
            }}
          >
            Удалить
          </button>
        ) : null}
      </div>
      <p className="text-xs leading-relaxed text-[var(--admin-muted)]">
        Файл загружается локально и оптимизируется на сервере. Лимита размера нет.
      </p>
    </div>
  );
}

export function MediaListField({
  label,
  values,
  onChange,
  accept,
  kind,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  accept: string;
  kind: 'photo' | 'video';
}) {
  const [uploading, setUploading] = useState(false);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const next = [...values];
      for (const file of Array.from(files)) {
        const data = await uploadFile(file);
        next.push(data.url);
      }
      onChange(next);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  }

  async function removeAt(index: number) {
    const url = values[index];
    const next = values.filter((_, i) => i !== index);
    onChange(next);
    await deleteManagedUpload(url);
  }

  return (
    <div className="admin-media-drop">
      <span className="admin-label">{label}</span>
      {values.length > 0 ? (
        <div className="admin-media-grid">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="admin-media-tile">
              {kind === 'video' || url.match(/\.(mp4|webm|mov)$/i) ? (
                <video src={url} muted playsInline preload="metadata" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" />
              )}
              <button
                type="button"
                className="admin-media-tile-remove"
                onClick={() => void removeAt(index)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-black/[0.03] px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
          Файлы ещё не загружены
        </div>
      )}
      <label className="admin-btn admin-btn-gold cursor-pointer self-start">
        {uploading ? 'Загрузка и оптимизация…' : 'Загрузить с компьютера'}
        <input
          type="file"
          multiple
          accept={accept}
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            void onUpload(e.target.files);
            e.target.value = '';
          }}
        />
      </label>
      <p className="text-xs leading-relaxed text-[var(--admin-muted)]">
        Можно выбрать несколько файлов. Лимита размера нет — фото и видео оптимизируются при
        загрузке.
      </p>
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return <div className="admin-toast">{message}</div>;
}

export function SaveBar({
  saving,
  onSave,
  message,
}: {
  saving: boolean;
  onSave: () => void;
  message?: string | null;
}) {
  return (
    <>
      <div className="admin-savebar">
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="admin-btn admin-btn-primary px-8"
        >
          {saving ? 'Сохранение…' : 'Сохранить изменения'}
        </button>
      </div>
      <Toast message={message ?? null} />
    </>
  );
}
