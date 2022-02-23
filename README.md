[![Tests](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

**К сожалению, сейчас тесты не пройти, потому что там стоит проверка импортов и просит удалить пакеты cookie-parser и jsonwebtoken**

# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/akomissarov2020/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
```


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
