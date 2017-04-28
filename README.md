<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>README</title>
<link rel="stylesheet" href="https://stackedit.io/res-min/themes/base.css">
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>

<div class="container">

# Nodepop

_Esta es una aplicación con la que ponemos en práctica lo aprendido de NodeJS y MongoDB. Para empezar tenemos que preparar el entorno:_

* * *

## Índice

<div class="toc">*   [Nodepop](#nodepop)*   [Índice](#índice)
    *   [ Preparando el entorno](#preparando-el-entorno)*   [Preparar MongoDB](#preparar-mongodb)
        *   [Inicializamos la base de datos](#inicializamos-la-base-de-datos)
        *   [Iniciando nodepop](#iniciando-nodepop)
    *   [  API  Nodepop](#api-nodepop)*   [Modelos](#modelos)*   [Modelo anuncio:](#modelo-anuncio)
            *   [Modelo Usuario](#modelo-usuario)
        *   [Rutas anuncios](#rutas-anuncios)*   [Rutas anuncios:](#rutas-anuncios-1)
            *   [Filtros y condiciones para anuncios:](#filtros-y-condiciones-para-anuncios)
        *   [Autenticacion](#autenticacion)*   [JsonWebToken](#jsonwebtoken)*   [ jwt_config.js](#jwtconfigjs)
                *   [ jwt_auth.js](#jwtauthjs)
        *   [Registro](#registro)*   [Cipher](#cipher)*   [cipher_config.js](#cipherconfigjs)
                *   [ cipher.js](#cipherjs)
        *   [Internacionalización](#internacionalización)

</div>

* * *

* * *

## ** Preparando el entorno**

* * *

### Preparar MongoDB

*   Creamos un archivo _startMongo.bat_ en el directorio **_C:\Program Files\MongoDB\Server\3.4_**   y escribimos:

    > C:\”Program Files”\MongoDB\Server\3.4\bin\mongod –dbpath ./data/db –directoryperdb
*   Abrimos la consola de comandos y nos posicionamos en el directorio donde hemos creado el _.bat_ y lo iniciamos con el comando `startMongo`

Ahora que ya tenemos MongoDB ejecutándose continuamos con la consola NodeJS.

* * *

### Inicializamos la base de datos

Hemos creado un script de manera que sea más sencillo inicializar la base de datos. Lo iniciamos con el comando:

> npm run installDB

Este script se encuentra en la carpeta del proyecto nodepop con el nombre `install_bd.js`

El script está hecho con promesas, de manera que vamos añadiendo uno a uno los anuncios y usuarios y una vez finalicen todos cerramos la conexión.

* * *

    inicializarBD()
        .then(an => {
            return anadirAnuncio(anuncio1)})
        .then(us =>{
            return anadirUsuario(usuario)})
        .then(()=>{
            mongoose.disconnect(err =>{
               *--Controlamos errores--*
            });
        })

* * *

### Iniciando nodepop

Si no lo tenemos instalado, instalamos **_nodemon_**

    npm i nodemon --global

Y lo iniciamos poniendo en la consola de _node _`nodemon`. Si todo ha salido correctamente deberá mostrar en la consola:

> [nodemon] 1.11.0 
> 
>   [nodemon] to restart at any time, enter `rs`
> 
>   [nodemon] watching: _._
> 
>   [nodemon] starting `node ./bin/www`
> 
>   Listening on port 3000 
> 
>   Conectado a mongodb

* * *

* * *

## **  API  Nodepop**

* * *

### Modelos

_Para los modelos hemos añadido el módulo `mongoose` para crear los esquemas de cada uno. Hemos creado para nuestra aplicación dos modelos:_

* * *

*   #### **Modelo anuncio:**

    La estructura que van a tener los anuncios será:

        Const anuncioSchema = mongoose.Schema({
        nombre: {
            type: String,
            index: true },
        precio: Number,
        venta: Boolean,
        foto: {
            type: String,
            index: true },
        tags: [String]
        });

    _Utilizamos index para agilizar las búsquedas._

* * *

*   #### **Modelo Usuario**

    El esquema de usuario tiene la siguiente estructura:

        const usuarioSchema = mongoose.Schema({
           nombre: String,
            email: {
                type: String,
                index: true,
                unique: true},
            clave: String
        });

    Como el usuario se va a identificar con el email, éste será único e identificativo para cada usuario registrado.

* * *

### Rutas anuncios

#### Rutas anuncios:

Si la ruta es `localhost:3000/api/anuncios` mostrará la lista completa de anuncios  en formato json.

> **Nota: **  será necesario estar [logeado](#Autenticacion) para esto.

* * *

#### Filtros y condiciones para anuncios:

Los anuncios pueden ser filtrados de varias maneras:

**Por defecto:**

1.  **Sort**: Se ordenan los anuncios por un atributo (nombre, precio…)

    > localhost:3000/api/anuncios?sort=nombre      //ordenación por nombre
2.  **Select**: Se muestran los atributos que se indican (p.e: nombre)

    > localhost:3000/api/anuncios?select=precio    //Solo muestra los precios
3.  **Limit**: Se muestran un número n de anuncios.

    > localhost:3000/api/anuncios?limit=2  //muestra 2 elementos
4.  **Skip**:  Se salta n elementos.

    > localhost:3000/api/anuncios?skip=1 //se salta un elemento de cada dos

* * *

**Filtrado más complejo:**

Se puede filtrar:

*   **Búsqueda avanzada por nombre:** Busca nombre de artículos que comiencen por la cadena introducida.

    > //obtenemos _caja_, _cartulina_…
    > 
    > localhost:3000/api/anuncios?nombre=ca
*   **Búsqueda por tags:**

    > //obtenemos aquellos que tengan ese tag ‘office’
    > 
    > localhost:3000/api/anuncios?tag=office
*   **Búsqueda de anuncios a la venta:**

    > //Anuncios a la venta
    > 
    > localhost:3000/api/anuncios?venta=true
*   **Búsqueda por rango de precios:**

    > //Precios entre 10 y 50 € 
    > 
    >   localhost:3000/api/anuncios?precio=10-50
    > 
    > //Mayores que 10 
    > 
    >    localhost:3000/api/anuncios?precio=10-
    > 
    > //Menores que 120 
    > 
    >     localhost:3000/api/anuncios?precio=-120
    > 
    > //con precio = 30 
    > 
    >      localhost:3000/api/anuncios?precio=30

* * *

### Autenticacion

#### JsonWebToken

Utilizamos jwt para poder identificar al usuario y restringir cierta información de nuestra aplicación (en este caso los anuncios).

> const jwt = require(‘jsonwebtoken’);

* * *

_**Creación de los ficheros para jwt**_

##### __ jwt_config.js__

Creamos un módulo nuevo llamado _‘jwt_config’_ que utilizaremos para guardar la clave secreta (necesaria para **crear el token de autenticación**), y cuando expira (en este caso 2 días):

        jwtSecret: 'fqrkefrkferqfqerf', 
        jwtConfig: {
            expiresIn: '2d'
        }

* * *

##### _ jwt_auth.js_

A continuación creamos el módulo _‘jwt_auth’_ que se encargará de obtener y **comprobar el token** mediante un middleware.

    const token = req.body.token || req.query.token || req.get('x-access-token');

    if(!token){
        *-- No se ha encontrado token --*
    }

    jwt.verify(token, config.jwtSecret,(err, tokenDecod)=>{
        if(err){
            *--Token no valido--*
        }
        *-- token válido --*
    });

Una vez comprobado navegaremos identificado.

> **nota: ** Por el momento no no hemos implementado el login funcional, por lo  
> 
>   que habrá que pasarle el token con GET.

* * *

### Registro

Para registrar un usuario hace falta mandar con POST el nombre del usuario, email (que debe ser único en la bd) y una contraseña.

* * *

#### Cipher

Utilizaremos de nuevo dos archivos (uno de configuración y otro de declaración).

##### __cipher_config.js__

        {
        algoritmo:'aes192',
        pass: 'miContraseñaUltraSegura'
        }

##### __ cipher.js__

Se va a encrgar de cifrar y descifrar, de manera que a partir de un algoritmo definido en el archivo de config y una clave lo encripta.

    cifrar: function cifrarClave(clave){
        const cifrar = crypto.createCipher(algoritmo, pass);
        let encriptado = cifrar.update(clave,'utf8','hex');

        return encriptado += cifrar.final('hex');       
    }

### Internacionalización

—– En curso —–

</div>
