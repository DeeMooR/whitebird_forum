## [Whitebird Forum][1]

#### [Видеообзор][2]

Форум со списком постов, комментариями, поиском, валидацией данных, приоритетами постов, личным кабинетом и админ-панелью.

Ограничение бэкенда: \
Так как [api][3] публичное, изменение данных на сервере не происходит. Поэтому при каждом переходе между страницами внесённые изменения сбрасываются на дефолтные значения. \
Список избранного, лайки/дизлайки, созданные посты и комментарии <ins>не очищаются до перезагрузки страницы</ins>, так как хранятся локально.

---

### **Функционал**:
#### **Неавторизованный пользователь**:
- Просмотр списка постов
- Фильтрация постов по никнейму, email
- Просмотр поста на отдельной странице
- Просмотр комментариев к посту
- Авторизация

#### **Авторизованный пользователь**:
- Добавление постов в избранное
- Страница со своими постами и избранными
- Создание, редактирование и удаление своих постов
- Ставить лайки/дизлайки на посты
- Писать комментарии
- Просматривать и изменять информацию в личном кабинете
- Удаление аккаунта
- ***+функционал неавторизованного пользователя***

#### **Админ**:
- Устанавливать постам приоритет от 1 до 10
- Менять посты местами в рамках одинакового приоритета
- Просматривать список всех пользователей
- Поиск пользователя по никнейму, email
- Редактирование, удаление пользователя
- **_+функционал авторизованного пользователя_**
  
---
### **Стек технологий**: 
- React, TypeScript, Redux-Saga
- Axios, react-hook-form
- SCSS, HTML

---
### **Запуск проекта**: 
1. npm install
2. npm start

[1]: https://deemoor.github.io/whitebird_forum/
[2]: https://drive.google.com/file/d/1X1RMVg7Xocod6WHrmVtMR7IAKBCAFH-G/view?usp=drive_link
[3]: https://jsonplaceholder.typicode.com/