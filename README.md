# los-datos-y-vos

Aplicación web del proyecto "_Bring Open Data to Your School_" realizado con [Eidos](http://www.aeidos.com.ar/), [Aerolab](https://aerolab.co/) y [The Open Data Institute - ODI](https://theodi.org/).

## Actividad pedagógica

El proyecto _Los datos y vos_ forma parte de una actividad pedagógica diseñada para acercar datos abiertos a chicos en edad de secundaria. Conocé más en la guía ["La escuela en la nube: datos abiertos en el aula"](Guia-los-datos-y-vos.pdf).

## Estructura del repositorio

* `data`: CSVs con datos originales del censo para construir indicadores, IDs censales y lista de barrios/comunas de la CABA.
* `indicadores`: CSVs y archivos en formato excel con los indicadores construidos para usar en la aplicación. También hay una tabla con datos falsos.
* `src`: Contiene el código del proyecto web para _Los datos y vos_.

## Instalación

### Instrucciones para configurar firebase

* Ingresar a https://firebase.google.com/ y hacer `log-in` con una cuenta de google.
* Ir a la consola de firebase y crear un nuevo proyecto: (ejemplo: "los-datos-y-vos").
* Hacer clic en el icono que dice "Añade firebase a tu aplicación web", y copiar el array javascript que contiene la configuración, por ejemplo:
```javascript
  var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseUrl",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
  };
```
* Dirigirse a la solapa "Database", luego a la lengüeta "Reglas" (para permitir el acceso a la base de datos sin necesidad de estar loggeados) y modificar el código de la siguiente manera:

```javascript
  {
    "rules": {
      ".read": "auth == null",
      ".write": "auth == null"
    }
  }
```

* Publicar los cambios.
* Pegar la `config` previamente copiada en el archivo de configuración: `src/app/module.js`
* Seguir los pasos detallados debajo para realizar un `deploy`.

### Instrucciones para realizar el deploy

* Requisitos: tener instalado [node](https://nodejs.org/es/download/) (versión 6.9~) + [gulp](https://gulpjs.com/).
* Una vez descargado el proyecto, situarse desde la terminal en la carpeta `open-data-school/los-dayos-y-vos`.
* Correr el comando `gulp production --deploy`. El mismo generará la carpeta "open-data-school/docs", que contiene los archivos estáticos compilados necesarios para que se vean los cambios en [Github pages](https://pages.github.com/).
* Luego de correr el proceso, hacer `commit` y `push` al repositorio con los archivos actualizados.

### Instrucciones para levantar una instancia local

* Requisitos: tener instalado [node](https://nodejs.org/es/download/) (versión 6.9~)
* Una vez descargado el proyecto situarse desde la terminal en la carpeta `open-data-school/los-dayos-y-vos`.
* Correr `npm install` si se levanta la instancia local por primera vez.
* Correr `npm start` para levantar la instancia local.

## Créditos

* [Eidos](http://www.aeidos.com.ar/) por su apoyo en el desarrollo pedagógico y el despliegue de la prueba del prototipo con chicos.
* [Aerolab](https://aerolab.co/) por el diseño UX y UI.
* [The Open Data Institute (ODI)](https://theodi.org/) por su apoyo metodológico y financiero.

## Contacto

Te invitamos a [crearnos un issue](https://github.com/datosgobar/los-datos-y-vos/issues/new?title=Encontre%20un%20bug%20en%20los-datos-y-vos) en caso de que encuentres algún bug o tengas feedback de alguna parte de `los-datos-y-vos`.

Para todo lo demás, podés mandarnos tu comentario o consulta a [datos@modernizacion.gob.ar](mailto:datos@modernizacion.gob.ar).
