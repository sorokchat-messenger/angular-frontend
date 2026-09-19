# Requirements Management Plan - SorokChat Messenger

**Тип за ISO 15289:2019:** Plan

## 1. Джерела вимог
- Бізнес-цілі (BRS).
- Потреби стейкхолдерів (StRS).
- Операційна концепція (OpsCon).
- Аудит безпеки.

## 2. Атрибути вимог
Кожна вимога має:
- ID (FR-xx, NFR-xx, StR-xx).
- Пріоритет (Critical/High/Medium/Low).
- Джерело.
- Критерій верифікації.
- Статус (Draft/Approved/Implemented/Verified).

## 3. Трасування
Матриця трасування: `StR → SyRS → SRS → Test`.

## 4. Управління змінами
- Зміна оформлюється через Change Request (див. `request/`).
- Оцінюється вплив на архітектуру та тести.
- Після затвердження - оновлюються відповідні документи.

## 5. Інструменти
- Git + Markdown (документація).
- Issue Tracker (GitHub Issues).
- CI для перевірки посилань та лінків.