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