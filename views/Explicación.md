# Explicación código

```js
Me dice que en la vista la variable datos is undefined import fs from 'fs'
import express from 'express';
import xml2js from 'xml2js'



const app= express();

app.use(express.json());
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set('views', './views')


app.set('view engine', 'ejs'); 
app.set('views', './views'); 

app.get('/',(req,res)=>{

    const datos=leerDatos()

    res.render("index",datos)

})

app.listen(3000, () => {
    console.log(`Server listing on http://localhost:3000`);
});

function leerDatos(){

const parser=new xml2js.Parser();

    fs.readFile('feed.atom','utf8', (err, xmlData)=>{

        parser.parseString(xmlData,(err, result)=>{

            if(err){
                console.error(err)
                return 
            }
            const datos=result.feed.entry;

            datos.forEach(entry => {
                 console.log(entry)
                return entry
               
            });
        })

    })
}
```
Para que este código no funciona:

- fs.readFile es asíncrono.

Esto significa que leerDatos() termina su ejecución antes de que fs.readFile lea el archivo, así que no devuelve nada (undefined).

Además, el return entry dentro de forEach no devuelve nada fuera del callback, no sirve para enviar datos a tu vista.

Por estás razones al hacer res.render('index', datos) datos es undefined.


Una solución

```js
import express from 'express';
import fs from 'fs/promises'
import xml2js from 'xml2js'

const app= express();

app.use(express.json());
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set('views', './views')


app.set('view engine', 'ejs'); 
app.set('views', './views'); 

app.get('/',async (req,res)=>{

    const datos=await leerDatos()

    res.render("index",{datos})

})

app.listen(3000, () => {
    console.log(`Server listing on http://localhost:3000`);
});

async function leerDatos(){

const parser=new xml2js.Parser();
const xmlData= await fs.readFile('feed.atom','utf8');
const result = await parser.parseStringPromise(xmlData)

  return result.feed.entry;
}
```

Como mostrar los datos en una plantilla 

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos XML</title>
</head>
<body>
    <main>
        <p>Prueba</p>
        <% datos.forEach(entry =>{%>
        <div id="container">
            <h2><%= entry.title %></h2>

            <% entry.content.forEach(contenido =>{%>

            <p><%- contenido._ %></p>
            <%})%>
            
        </div>
        <% })%>
    </main>
</body>
</html>
```

datos es un array
content es un array de objecto con el siguiente formato:xml2js lo convierte en un objeto con una propiedad _ para el contenido y $ para los atributos, así:

{
  _: "<p>...</p>",       // el contenido real
  $: { type: "html" }    // los atributos
}

Arxhivo xml:
<content type="html">...</content>
