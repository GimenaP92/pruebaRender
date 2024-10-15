# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY ./back/package*.json ./
COPY ./front/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el proyecto (si es necesario)
RUN npm run build

# Expone el puerto en el que la aplicación escucha
EXPOSE 3001
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
