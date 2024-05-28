import 'dotenv/config';
import express from 'express';
import path from 'path';
import roomatesRouter from './routes/roomates.route.js'
import gastosRouter from './routes/gastos.route.js'
import cors from 'cors'


const app = express(); 

const __dirname = import.meta.dirname

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/roommates', roomatesRouter)
app.use('/gastos', gastosRouter)



const PORT = process.env.PORT || 5115
app.listen(PORT, () => {
    console.log(`Puerto funcionando en http://localhost:${PORT}`)
})