# 🎭 Автоматизоване тестування з Playwright
[![Node.js CI](https://github.com/leogasmus/r_d_playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/leogasmus/r_d_playwright/actions/workflows/playwright.yml)
[![npm version](https://img.shields.io/npm/v/playwright.svg)](https://www.npmjs.com/package/playwright) <!-- GEN:chromium-version-badge -->[![Chromium version](https://img.shields.io/badge/chromium-136.0.7103.33-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)<!-- GEN:stop --> <!-- GEN:firefox-version-badge -->[![Firefox version](https://img.shields.io/badge/firefox-137.0-blue.svg?logo=firefoxbrowser)](https://www.mozilla.org/en-US/firefox/new/)<!-- GEN:stop -->

Цей проєкт містить автоматизовані **E2E** та **API** тести, реалізовані з використанням фреймворку [Playwright](https://playwright.dev/).
для сайту https://new.fophelp.pro/

🔹 Опис фреймворку

Цей фреймворк використовує наступні технології для автоматизації тестування:

* Playwright: Це фреймворк для автоматизації браузерів, розроблений Microsoft. Він дозволяє писати надійні end-to-end тести для сучасних веб-додатків. Playwright підтримує всі сучасні браузери (Chromium, WebKit, Firefox) і працює на різних платформах (Windows, macOS, Linux).

 * Page Object Model (POM): Це патерн проектування, який використовується для створення об'єктів, що представляють веб-сторінки або їхні компоненти. Кожен об'єкт сторінки містить локатори елементів та методи для взаємодії з ними. POM покращує структуру коду, зменшує дублювання та полегшує підтримку тестів.

* Фікстури: Це механізм Playwright для надання спільного контексту та ресурсів для тестів. Фікстури дозволяють налаштовувати середовище тестування, наприклад, ініціалізувати з'єднання з API, налаштовувати стан програми або надавати доступ до сторінок.

* Docker: Це платформа для контейнеризації, яка дозволяє запускати додатки в ізольованих середовищах. Використання Docker забезпечує відтворюваність тестового середовища, спрощує налаштування та інтеграцію з CI/CD.

*  GitHub Actions: Це платформа для автоматизації робочих процесів розробки програмного забезпечення. GitHub Actions дозволяє автоматизувати збірку, тестування та розгортання коду. У цьому фреймворку GitHub Actions використовується для автоматичного запуску тестів при змінах коду.

---

## 📦 Встановлення залежностей

> Потрібно мати встановлений Node.js (версія 22.x)

```bash
npx playwright install --with-deps
```

## 🚀 Запуск тестів

### 🔹 Всі тести (E2E + API)

```bash
npm run test
```

### 🔹 Лише API тести

```bash
npm run test:api
```

## 🐳 Запуск у Docker

    Для запуску тестів у Docker використовується Playwright контейнер з браузерами.

### 🔹 Побудова та запуск з Docker (усі тести)

```bash
docker build -t r_d_playwright .
docker run --rm -e BASE_URL=http://your-api -e EMAIL=user@example.com -e PASSWORD=secret r_d_playwright
```

> Переконайтесь, що .env змінні (BASE_URL, EMAIL, PASSWORD) передані у контейнер.

## 📁 Структура тестів

```
tests/
├── e2e/       # UI тести для браузерів
│   └── expenses.spec.ts
├── api/       # API тести
│   └── transactions.spec.ts
```

## 🛠 Корисні скрипти

* `bash npm test`  - Запуск усіх тестів
* `npm run test:api` - Запуск лише API тестів
* `npm run lint` - Перевірка коду на помилки (ESLint)
* `npm run lint:fix` - Автоматичне виправлення ESLint помилок

## 📄 .env змінні

Для запуску тестів потрібно створити файл .env у корені проєкту:

```
BASE_URL=http://localhost:3000
EMAIL=test@example.com
PASSWORD=yourpassword
```

## 📦 CI

У проєкті налаштовано GitHub Actions для автоматичного запуску тестів при пуші у гілку main.

## 📃 Звіт

Після завершення тестів генерується HTML-звіт у папці:

```bash
playwright-report/
```
