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
    participant S as Server
    participant R as Recipient

    U->>C: Введення тексту
    C->>C: AES-256-CBC (plaintext, key)
    C->>C: Обчислення MAC
    C->>S: {ciphertext, mac} (WSS)
    S-->>R: {ciphertext, mac}
    R->>R: Перевірка MAC
    alt MAC валідний
        R->>R: AES-CBC decrypt
        R->>U: Відображення
    else MAC невалідний
        R->>U: Попередження про цілісність
    end
```

### Модель загроз (STRIDE)

| Загроза | Приклад | Контрзахід |
|---------|---------|------------|
| Spoofing | Підміна користувача | 2FA, TLS, цифрові підписи |
| Tampering | Зміна повідомлення в дорозі | MAC (HMAC-SHA-256 / GCM) |
| Repudiation | Заперечення відправки | Цифровий підпис |
| Information disclosure | Читання сервером | E2E (AES-256-GCM) |
| Denial of service | Flood запитами | Rate limiting, WAF |
| Elevation of privilege | Ескалація прав | RBAC, перевірка на сервері |

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
| IndexedDB | Повідомлення (ciphertext), чати | До logout |
| localStorage | Налаштування UI, мова | Постійно
| memory (in-tab) | Розшифровані ключі | До закриття вкладки |
| httpOnly cookie | Refresh token | 7 діб |

## View-04: Подання розгортання (VP-04)

### Deployment Diagram
```mermaid
graph LR
    Browser[Browser SPA<br/>Angular bundle] -->|HTTPS| CDN[CDN<br/>static]
    Browser -->|WSS| WS[WebSocket server]
    Browser -->|HTTPS| API[REST API]
    API --> DB[(DB)]
    WS --> DB
    API --> Auth[Auth service]
```

### Вимоги до середовиша

| Компонент | Технологія | Примітка | 
|-----------|------------|----------|
| SPA bundle | Static hosting / CDN | gzip + brotli |
| REST API | Node (Nestjs) | TLS 1.3 |
| WebSocket | Окремий сервіс | Horizontal scaling |
| DB | PostgreSQL (метадані) | Без plaintext-повідомлень |

### Мережеві вимоги

- Усі з'єднання — HTTPS/WSS.
- HSTS enabled.
- CSP: заборона unsafe-inline, eval.