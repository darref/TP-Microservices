import express from "express"
import "dotenv/config"
import cors from 'cors'

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3001

const app = express();
app.use(cors());


app.get('/hello', (req, res) => {
    res.send('hello world'); 
  });

app.get('/', (req, res) => {
  res.send('ceci est la route / de voiture');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
  