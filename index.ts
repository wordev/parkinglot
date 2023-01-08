import bodyparser from 'body-parser'
import express, { Request, Response, Application } from 'express';
import router from './src/routes'
import compression from 'compression'
import helmet from 'helmet'
import 'dotenv/config';

const app: Application = express();
const PORT = process.env.PORT || 8000;
app.use(bodyparser.json())
app.use(compression())
app.use(helmet())

app.use(router)
console.log(process.env.DB_HOST);

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
})