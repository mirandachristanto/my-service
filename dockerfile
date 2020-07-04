FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add --no-cache --virtual builds-deps build-base python libjpeg-turbo-dev libpng-dev autoconf automake libtool libltdl zlib zlib-dev nasm wget ca-certificates
RUN npm config set python /usr/bin/python
COPY docker_lib/sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub
COPY docker_lib/glibc.apk ./
COPY docker_lib/libz.tar.xz ./
RUN apk add glibc.apk
RUN mkdir -p libz
RUN tar -xf libz.tar.xz -C libz
RUN cp libz/usr/lib/libz.so.* /usr/glibc-compat/lib
RUN rm glibc.apk
RUN rm libz.tar.xz
RUN rm -rf libz

COPY package*.json ./

RUN npm i
RUN npm install pngquant-bin --save
RUN npm install gifsicle --save
RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
