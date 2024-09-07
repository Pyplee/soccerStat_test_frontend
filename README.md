<img src="https://github.com/user-attachments/assets/865caf71-aa8c-44c5-8fb0-c6b762cc4653" width="100"/>

# SoccerStat

## Обзор
Soccer stat — это тестовое веб-приложение, разработанное на стороннем api [football-data.org](www.football-data.org), оно реализует возможность просмотра матчей и статистики.

Ссылка на deployment - работающую версию, находится в блоке about, на главной страницы репозитория.

## Возможности
- **Просмотр лиг**
- **Просмотр команд**
- **Просмотр матчей**
- **Фильтрация по названиям**
- **Фильтрация по датам**
- **Смена цветовой темы**
- **Смена языка**

## Используемые решения (Frontend):
- **Vite**
- **React**
- **TypeScript**
- **Chakra UI**

## Установка
Чтобы настроить проект локально и запустить его в dev режиме выполните следующие шаги:

Предисловие: не забудьте в корень проекта поместить файл '.env.local', в котором будет api token, иначе накладывается много ограничений на использование api. Переменная в формате: VITE_PUBLIC_API_TOKEN=your_api_token. Получить api token можно создав аккаунт на [сервисе](https://www.football-data.org/client/register) используемого api.

1. Клонируйте репозиторий:
    ```
    git clone [url]
    ```

2. Перейдите в каталог проекта:
    ```
    cd soccerstat_test_frontend
    ```

3. Установите зависимости:
    ```
    make install
    ```
4. Запустите приложение локально, в dev режиме:
    ```
    make dev
    ```

5. Откройте браузер и перейдите по адресу:
    ```
    http://localhost:3000
    ```

## Использование

### Страница просмотра лиг:
![Screenshot_20240907_133500](https://github.com/user-attachments/assets/58ec837c-3438-4b36-b01c-d2b6cb2b7cda)

### Страница просмотра команд:
![Screenshot_20240907_133619](https://github.com/user-attachments/assets/b0d1d242-4f75-411c-8262-88b4045e4036)

### Страница просмотра матчей:
![Screenshot_20240907_133547](https://github.com/user-attachments/assets/5a899c10-9570-41ca-8547-f433b36d5fd0)

### Темная тема:
![Screenshot_20240907_133633](https://github.com/user-attachments/assets/0ded9f48-a1fd-450c-ba7d-c7f1ba87d64c)

### Смена языка:
![Screenshot_20240907_133652](https://github.com/user-attachments/assets/dad987bc-dddb-4bc8-8e90-1ff89428351e)

## Контакты

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/dekimiq)\
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/+79270712518)\
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dekimiq@gmail.com)
