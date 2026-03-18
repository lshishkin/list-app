# Контактная книжка (Next.js App)

Приложение «Контактная книжка» реализовано на **Next.js App Router** с использованием **Redux** для хранения данных и **React Bootstrap** для UI.

## 📌 Что реализовано

- **CRUD для контактов** (добавление/редактирование/удаление)
- **Фильтрация** по типу (телефон, email, адрес) и сортировка по дате
- **Форма** с валидацией через **react-hook-form + zod**
- **Структура по FSD (Feature Sliced Design)**:
  - `features/contacts/ui` — все React‑компоненты (UI)
  - `features/contacts/model` — стейт/типизация (Redux slice + types)
  - `features/contacts/index.ts` — public API фичи
- **Страница** `app/page.tsx` остаётся Server Component; интерактивность — в Client Components.

## 🚀 Запуск

```bash
npm install
npm run dev
```

Откройте: http://localhost:3000

## 🧱 Структура (важные файлы)

- `app/page.tsx` — серверная обёртка + точка входа
- `app/features/contacts/ui/Contacts.tsx` — клиентский контейнер с логикой
- `app/features/contacts/model/contactsSlice.ts` — Redux slice
- `app/features/contacts/model/types.ts` — типы контактов
- `app/features/contacts/ui/ContactForm.tsx` — форма с валидацией
- `app/store/store.ts` — redux store

## 🛠 Технологии

- Next.js (App Router)
- React 18
- Redux Toolkit
- React Bootstrap
- react-hook-form + zod
