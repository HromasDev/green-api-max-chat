# MAX Chat — GREEN-API

Тестовое задание: SPA для отправки и получения текстовых сообщений в MAX через GREEN-API. Полный
текст задания — в [`docs/TASK.md`](docs/TASK.md) с отметками о выполнении и списком осознанных
допущений (важно: формат `chatId`).

## Запуск

Нужны **Node 20+** и **pnpm**.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Бэкенда нет — приложение обращается напрямую к `https://api.green-api.com`. На экране входа нужно
ввести свои `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API (инстанс должен быть
авторизован в MAX — залогинен по QR).

```bash
pnpm build && pnpm preview   # прод-сборка
pnpm test                    # vitest
pnpm typecheck                # tsc -b
pnpm lint                     # oxlint
pnpm check                    # prettier
```

Git-хуки ставятся автоматически (`prepare` → lefthook): pre-commit гоняет typecheck и линт по
staged-файлам, pre-push — весь тестовый прогон. Те же проверки — в CI (`.github/workflows/ci.yml`).

## Как пользоваться

1. Войти по `idInstance` / `apiTokenInstance`.
2. В сайдбаре ввести номер телефона получателя и нажать «Новый чат».
3. Написать сообщение и отправить — уйдёт через `SendMessage`.
4. Ответ получателя из MAX появится в чате сам: приложение постоянно вычитывает очередь
   уведомлений GREEN-API (`receiveNotification`) и удаляет обработанные (`deleteNotification`).

Интерфейс адаптивен: на узких экранах сайдбар и окно переписки переключаются вместо сжатия.
Ширина сайдбара регулируется перетаскиванием на десктопе. Тема (светлая/тёмная) переключается
кнопкой в шапке и сохраняется между визитами.

## Стек

React 19 · TypeScript · Vite · TanStack Router · TanStack Query · React Hook Form + Zod ·
Zustand (persist в localStorage) · Feature-Sliced Design · Tailwind v4 ·
TanStack Virtual (виртуализация списка сообщений) · lucide-react · oxlint · prettier ·
lefthook · vitest

## Архитектура

```
src/
  app/       провайдеры (query client), роутер, глобальные стили
  routes/    тонкие адаптеры TanStack Router — маршруты, beforeLoad-редиректы
  pages/     экраны: логин, чат
  widgets/   составные блоки: сайдбар со списком чатов, окно переписки
  features/  пользовательские сценарии: логин, создание чата, отправка и приём сообщений
  entities/  предметные сущности: инстанс (credentials), чат, сообщение
  shared/    клиент GREEN-API, форматирование телефона, UI-кит, тесты
```

Слой видит только слои строго ниже — правило проверяется `no-restricted-imports` в
`.oxlintrc.json` отдельно для каждого слоя.

Файлы React-компонентов — с суффиксом `*.component.tsx`.

## Работа с GREEN-API

Три метода из задания плюс один вспомогательный — всё в `src/shared/api/green-api/client.ts`,
без SDK (обёртка над `fetch` тоньше, чем интеграция пакета для четырёх эндпоинтов):

| Метод                 | Зачем                                                      |
| --------------------- | ---------------------------------------------------------- |
| `getStateInstance`    | проверка учётных данных на экране входа                    |
| `sendMessage`         | отправка текстового сообщения                              |
| `receiveNotification` | поллинг очереди входящих уведомлений (technology-http-api) |
| `deleteNotification`  | подтверждение обработки уведомления                        |

Компоненты работают только с `ChatMessage`/`ChatVm` (`entities/`) — сырые DTO GREEN-API наружу из
`shared/api` не выходят.
