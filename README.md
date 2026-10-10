# Bereke Development — сайт бизнес-центра

**Прод:** <https://bc-bereke.kz> · **Демо-сборка:** <https://bereke-development.vercel.app>

Оба промера совпали до знака: HTTP 200, 7 586 видимых знаков текста, 25 изображений,
битых нет, `<h1>` один, hero-видео `videos/bereke-hero.mp4` играет. То есть демо на Vercel
отдаёт ровно то же, что сервер клиента.

Одностраничник БЦ класса А в Алматы плюс отдельные разделы застройки и продажи, и
полноценная админка, где контент правится по секциям.

## Публичные страницы

| Маршрут | Что внутри |
| --- | --- |
| `/` | Видео-первый экран, планировки, галерея, контакты |
| `/spaces` | Помещения и калькулятор подбора |
| `/developer` | О застройщике |
| `/privacy-policy`, `/terms-of-use` | Правовые разделы |

## Админка

`/admin` с входом на собственных сессиях: `/admin/login`, `/admin` (дашборд),
`/admin/sections/[section]` (редактор текстов по секциям), `/admin/settings`,
`/admin/media` и `/admin/calculator`. Соответствующие API лежат в `app/api/admin/**`:
`login`, `logout`, `me`, `content`, `media`, `upload`.

## Стек и контент

- Next.js 16, App Router, TypeScript, Tailwind CSS
- Эталон контактов, адресов и соцсетей — в `lib/site-data.ts` (телефон, WhatsApp,
  Instagram, PDF-брошюра, два адреса)
- Плавающая кнопка консультации и футер ведут в мессенджеры, а не в форму на базе
- Изображения — в `public/images/`, видео первого экрана — в `public/videos/`

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
