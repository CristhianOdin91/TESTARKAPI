# TESTARKAPI
REST API para manejo de Tareas.

## Instalar dependencias
Para instalar dependencias es necesario tener instalado NodeJS, se recomienda una versión mayor o igual a 12.14.1

Una vez instalado NodeJS y NPM es necesario ejecutar el siguiente comando:

```console
> npm install
```

En caso de tener instalado Yarn se tendrían que instalar dependencias con:

```console
> yarn install
```

## Variables de entorno

Para el correcto funcionamiento de la aplicación será necesario que las siguientes variables de entorno se encuentren configuradas:

| Nombre de la variable | Descripción | Valor |
|-----------| ----------- |  ----------- |
| MONGO_HOST | Servidor al que se conectará el manejador de la base de datos en MongoDB. | localhost |
| MONGO_DB | Base de datos en MongoDB. | testark
| MONGO_USER | Usuario utilizado para realizar la autenticación al servidor MongoDB. | xxxx |
| MONGO_PASSWORD | Contraseña del usuario de autenticación en MongoDB. | xxxx |
| MONGO_PORT | Puerto de acceso al servidor MongoDB. | 27017
| MONGO_URI | Endpoint de Base de Datos Mongo. En caso de proporcionar uno las variables anteriores son ignoradas. | mongodb://[user]:[password]@[host]:[port]/[database]

Es posible configurar dichas variables de entorno a través de un archivo .env dentro de la carpeta raíz del proyecto.

## Inicial la aplicación

_NPM_

```console
> npm start
```

_Yarn_

```console
> yarn start
```

Al iniciar la aplicación, ésta se ejecutará en el puerto 3000 si no se especifica un puerto en la variable de entorno PORT.

[http://{host}:3000](http://localhost:3000)

## Documentación API

Es posible consultar la documentación de la API a través del siguiente enlace:

[http://{host}:3000/api-docs](http://localhost:3000/api-docs)

## Comandos disponibles

Los siguientes son comandos disponibles que se pueden ejecutar haciendo uso de NPM o Yarn:


* Ejecuta las pruebas unitarias que se encuentran en el directorio `./test`

_NPM_

```console
> npm test
```

_Yarn_

```console
> yarn test
```


* Inicia la aplicación en modo desarrollo

_NPM_

```console
> npm run start:dev
```

_Yarn_

```console
> yarn start:dev
```


* Inicia la aplicación en modo producción

_NPM_

```console
> npm run start:prod
```

_Yarn_

```console
> yarn start:prod
```


* Realiza el empaquetado de la aplicación dentro del directorio `./dist`

_NPM_

```console
> npm run build
```

_Yarn_

```console
> yarn build
```


* Elimina el directorio `./dist` junto con su contenido

_NPM_

```console
> npm run clean
```

_Yarn_

```console
> yarn clean
```


* Inicia la aplicación a partir de la existencia del directorio `./dist`

_NPM_

```console
> npm run serve
```

_Yarn_

```console
> yarn serve
```
