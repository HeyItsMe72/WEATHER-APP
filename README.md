# Weather
![HTML5](https://img.shields.io/badge/HTML%20-orange?style=plastic&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS%20-blue?style=plastic&logo=CSS3)
![JavaScript](https://img.shields.io/badge/JavaScript%20-yellow?style=plastic&logo=JavaScript&logoColor=white)


![JavaSciptAPIs](https://img.shields.io/badge/APIs%20-red?style=for-the-badge&logo=JavaScript&logoColor=black&label=Vanilla%20JavaScript&labelColor=%23FFE800&color=%23FF8B00)

![ResponsiveSite](https://img.shields.io/badge/Responsive%20Site%20-%234559EA?style=for-the-badge&logoColor=black&label=100%25&labelColor=%23CA95EC)

![WeatherApp](https://github.com/HeyItsMe72/WEATHER-APP/assets/124311622/f7c7118b-09e2-4ee2-b15e-65754f3db777)

## Introducción 
El sitio *Weather App* es una página creada para experimentar las funcionalidades del lenguaje de JavaScript; utiliza el API de [Open Weather](https://openweathermap.org/), la cual es su versión gratuita, proporciona la información necesaria para indicarle al usuario datos como: fecha, hora, temperatura, descripción del clima, temperaturas máximas y mínimas, viento, humedad y hora de salida y puesta del sol. Toda esta información se presenta al usuario dentro de un contenedor, accediendo a su ubicación por medio del código, utilizando el método de *getcurrentPosition()* de la propiedad *geolocation* del objeto *navigator*.

Para obtener más información sobre este método y cómo utilizarlo se puede visitar: [Geolocation: getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)

NOTA: para entender el código, es importante conocer bien el APi utilizada; qué información nos brinda y cómo podemos acceder a ella. 

**CSS *styles.css***

Todos los estilos requeridos para el sitio son creados en este archivo, utilizando Grid Flexbox para generar un diseño responsivo sin utilizar media queries.

**JavaScript *index.js***

*index.js* es el archivo donde se encuentra toda la funcionalidad del sitio. Se comienza obteniendo las varibles importantes del contenido del DOM en donde desglosaremos toda la información que el API brinda.

***Listeners***

Para que el código funcione, se accede a la ubicación actual del usuario en cuanto la ventana es cargada (*load event*), esto nos permite configurar el url de consulta para la API. Para acceder a esta información se utiliza el método *getCurrentPosition()* en el que se utilizan tres parámeros: función ejecutada en caso de éxito (*success*), función en caso de error, por ejemplo, que el usuario no de acceso a su ubicación (*error*), y las opciones, que nos permiten especificar aspectos de la ejecución del método, como: exactitud de la ubicación (*enableHighAccuracy*), tiempo máximo de espera a la ejecución (*timeout*), y si la posición almacenada a caché es o no utilitaria (*maximiumAge*). 

Por su parte, el evento *click* permite identificar si el *reload* fue accedido para reactualizar la información del sitio (realizar una nueva consulta a la API).

***Funciones Auxiliares***

La función *createElement* nos permite generar contenido HTML de forma dinámica, reduciendo las líneas de código escrito por cada contenido que se necesite ser creado; acepta dos parámetros: 
* El elemento que se ha de crear (listas, títulos, párrafos, etc.): ***el***.
* El contenido que tendrá este elemento: ***content***.

La función *changeUNIX* es una función auxiliar que permite cambiar las unidades de unix del json arrojado por la consulta a horas y minutos. Esto es almacena dentro de la variable *time* y es devuelta para poder ser mostrada al usuario dentro del contendor. 

***Funciones principales***

La función de *error* modifica el contenido del contenedor principal y muestra el error ocurrido, además de enviarlo a la consola del usuario.

La función de *success* envuelve todo el código que será utilizado en caso de que el usuario acepte el acceso a su ubicación al visitar el sitio, esto incluye (a grandes rasgos): 
* Obtener las coordenadas de la ubicación actual: *latitud, longitud*.
* Generar el URL de la consulta a la API: *urlGeo*
* Realizar la petición fetch.
En el caso de éxito de la petición fetch, se accede a la información del json y se agrega como contenido de las variables obtenidas del DOM, además de crear nuevos elementos con la información obtenida. En caso de error, el interior del contenido principal es sustituído por el estatus y mensaje del error.

## Mejoras 
![Mejoras](https://img.shields.io/badge/Weather%20-%23FF0000?style=for-the-badge&logoColor=black&label=%C3%81reas%20de%20oportunidad&labelColor=%23FFBD00)

Una de las mejoras que podrían mejorar la experiencia y calidad del sitio, es generar consultas automáticas cada cierto tiempo, que permitan mantener actualizada la información sin necesidad de que el usuario lo haga manualmente. Y aunque la información que proporciona esta API gratuita es de buen contenido, una versión de paga podría complementar el sitio, agregando más información, como una predicción climática de los días de la semana en curso o por horas. 
