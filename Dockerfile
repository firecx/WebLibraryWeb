FROM nginx:1.29

# Удаляем стандартные файлы
RUN rm -rf /usr/share/nginx/html/*

# Копируем вашу статику
COPY . /usr/share/nginx/html

# (Опционально) кастомный конфиг
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]