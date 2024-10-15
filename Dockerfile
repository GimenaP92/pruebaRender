# Usa la imagen base de Node.js
FROM node:18

# ---------------------
# Configuración para el Backend
# ---------------------
# Establece el directorio de trabajo para el backend
WORKDIR /usr/src/app/back

# Copia los archivos de package.json y package-lock.json del backend
COPY ./back/package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el resto de los archivos del backend
COPY ./back .

# ---------------------
# Configuración para el Frontend
# ---------------------
# Establece el directorio de trabajo para el frontend
WORKDIR /usr/src/app/front

# Copia los archivos de package.json y package-lock.json del frontend
COPY ./front/package*.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el resto de los archivos del frontend
COPY ./front .

# Compila el frontend (si es necesario)
RUN npm run build

# Expone el puerto en el que la aplicación escucha
EXPOSE 3001
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
