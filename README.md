<img src="https://github.com/user-attachments/assets/865caf71-aa8c-44c5-8fb0-c6b762cc4653" width="100"/>

# [SoccerStat](https://soccerstat-test-frontend.vercel.app/)

## Обзор
Soccer stat — это тестовое веб-приложение, разработанное на стороннем api [football-data.org](www.football-data.org), оно реализует возможность просмотра матчей и статистики.

## Возможности
- **Просмотр лиг**
- **Просмотр команд**
- **Просмотр матчей**
- **Фильтрация по названиям**
- **Фильтрация по датам**

## Используемые технологии
- **Frontend:** NextJS, HTML, CSS, Tailwind, Chakra ui

## Установка
Чтобы настроить проект локально, выполните следующие шаги:

Предисловие: не забудьте в корень проекта поместить файл '.env.local', в котором будет api token в формате: NEXT_PUBLIC_API_TOKEN=your_token и NEXT_PUBLIC_BASE_URL_API=https://api.football-data.org/v4. Получить api token можно, создав аккаунт на [сервисе](https://www.football-data.org/client/register).

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

4. Выполните сборку приложения (можно пропустить при запуске в dev режиме):
    ```
    make build
    ```

5. Запустите приложение локально ('make dev' для запуска в dev режиме):
    ```
    make run
    ```

6. Откройте браузер и перейдите по адресу:
    ```
    http://localhost:3000
    ```

## Использование

### Страница просмотра лиг:
![Screenshot_20240715_160634](https://github.com/user-attachments/assets/267ec25e-85e7-485d-868d-baeee352aedb)


### Страница просмотра команд:
![Screenshot_20240715_160655](https://github.com/user-attachments/assets/1d6f6f0c-16e6-4db0-9425-0a6c6d4d8c7c)


### Страница просмотра матчей:
![Screenshot_20240715_160713](https://github.com/user-attachments/assets/778a4780-1774-44ac-9ad8-3505c02b5817)

## Контакты

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/dekimiq)\
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/+79270712518)\
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dekimiq@gmail.com)
