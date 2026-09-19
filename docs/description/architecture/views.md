# Architecture Views - SorokChat Messenger

**Тип за ISO 15289:2019:** Description
**Стандарт:** ISO/IEC/IEEE 42010:2022

Тут наведено конкретні подання (Views) - реалізації точок зору
із `viewpoints.md`.

---

## View-01: Функціональне подання (реалізує VP-01)

### Діаграма компонентів (Mermaid)

```mermaid
graph TD
    App[app/] --> Pages[pages/]
    Pages --> Widgets[widgets/]
    Widgets --> Features[features/]
    Features --> Entities[entities/]
    Entities --> Shared[shared/]

    Features --> F1[auth]
    Features --> F2[send-message]
    Features --> F3[rotate-key]
    Features --> F4[manage-chat]
```

### Ключові Use Cases
| UC | Назва | Пов'язані FR |
|----|--------|--------------|
| UC-01 | Реєстрація | FR-01 |
| UC-02 | Вхід | FR-02 |
| UC-03 | Створення чату | FR-04 |
| UC-04| Надсилання повідомлення | FR-08 |
| UC-05 | Ротація ключа | FR-06 |
| UC-06 | Перегляд офлайн | FR-09 |

### Правила FSD
- Залежності - лише зверзу донизу.
- Кожен слайс має `index.ts` у якості публічного API.

## View-02: Безпекове подання (VP-02)
```mermaid
sequenceDiagram
    participant U as User
    participant C as Client (WebCrypto)
    participant D as IndexedDB
    participant R as Recipient

    U->>C: Введення тексту
    C->>D: Отримання ключа та токена
    C->>C: AES-256-CBC encrypt (plaintext, key)
    C->>C: HMAC-SHA-256 (ciphertext, key)
    C->>R: {ciphertext, mac}
    R->>R: Перевірка MAC
    alt MAC валідний
        R->>R: AES-256-CBC decrypt
        R->>U: Відображення
    else MAC невалідний
        R->>U: Попередження про цілісність
    end
```

### Модель загроз (STRIDE)

| Загроза | Приклад | Контрзахід |
|---------|---------|------------|
| Spoofing | Підміна користувача | 2FA, цифрові підписи |
| Tampering | Зміна повідомлення в дорозі | MAC (HMAC-SHA-256) |
| Repudiation | Заперечення відправки | Цифровий підпис |
| Information disclosure | Читання даних в браузері | E2E (AES-256-CBC), зберігання токенів і ключів в IndexedDB |
| Denial of service | Flood запитами | Rate limiting, UI-обмеження |
| Elevation of privilege | Ескалація прав | RBAC, перевірка прав у UI |

### Життєвий цикл ключа

```mermaid
stateDiagram-v2
    [*] --> Generated
    Generated --> Distributed
    Distributed --> Active
    Active --> Rotating: ініціює адмін
    Rotating --> Distributed: новий ключ
    Active --> Revoked: видалення учасника
    Revoked --> [*]
```

## View-03: Інформаційне подання (VP-03)

### ER-діаграма (локальне сховище, IndexedDB)

```mermaid
erDiagram
    USER ||--o{ CHAT : participates
    CHAT ||--o{ MESSAGE : contains
    CHAT ||--|| CHAT_KEY : has
    MESSAGE ||--|| MAC : verified_by

    USER {
        string id PK
        string username
        string publicKey
    }
    CHAT {
        string id PK
        string name
        string type
    }
    MESSAGE {
        string id PK
        string chatId FK
        blob ciphertext
        string status
        datetime timestamp
    }
    CHAT_KEY {
        string chatId FK
        blob encryptedKey
        int version
    }
```

### Стан повідомлення

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Encrypted
    Encrypted --> Queued: офлайн
    Encrypted --> Sent: онлайн
    Queued --> Sent: відновлення мережі
    Sent --> Delivered
    Delivered --> Read
    Read --> [*]
```

### Сховище браузера

| Сховище | Що зберігається | Термін |
|---------|-----------------|--------|
| IndexedDB | Access token, ключі шифрування, повідомлення (ciphertext), чати, офлайн-черга | До logout |
| HttpOnly secure cookie | Refresh token | До expiry / logout |
| localStorage | Налаштування UI, мова | Постійно |
| memory (in-tab) | Тимчасові розшифровані ключі/сесійні дані | До закриття вкладки |

## View-04: Подання розгортання (VP-04)

> Цей документ описує лише frontend-систему. Backend та інфраструктура розглядаються як зовнішні інтеграції, а не як внутрішній компонент фронтенду.

### Deployment Diagram
```mermaid
graph LR
    Browser[Browser SPA<br/>Angular bundle] -->|HTTPS| CDN[CDN<br/>static]
    Browser -->|HTTPS| External[External backend services]
    Browser -->|WSS| External
```

### Вимоги до середовища

| Компонент | Технологія | Примітка |
|-----------|------------|----------|
| SPA bundle | Static hosting / CDN | gzip + brotli |
| Browser storage | IndexedDB | Токени, ключі, офлайн-дані |
| External integration | Backend services | Розглядається як зовнішній зв'язок, не вхід у scope |

### Мережеві вимоги

- Усі зовнішні з'єднання — HTTPS/WSS.
- HSTS enabled.
- CSP: заборона unsafe-inline, eval.
- У frontend описі немає жодного внутрішнього бекенд-компонента; усі сервіси є зовнішньою інтеграцією.