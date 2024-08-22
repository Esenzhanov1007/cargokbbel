# Первый этап сборки - создание сборочного этапа с именем "build"
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения в контейнер
COPY . .

# Выполняем сборку приложения
RUN npm run build

# Второй этап - использование NGINX для обслуживания собранного приложения
FROM nginx:alpine

# Копируем сгенерированные файлы сборки из первого этапа в NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]
