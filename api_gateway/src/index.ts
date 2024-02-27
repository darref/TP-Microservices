import express, { NextFunction, Request, Response } from "express"
import "dotenv/config"
import cors from 'cors'
import { createProxyMiddleware } from "http-proxy-middleware";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { nextTick } from "process";


const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000

const app = express();
app.use(cors());

const secretKey = "testSecretKey"
const checkToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
}

const proxyConfigVoiture = {
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {"^\/voiture": "/"}
}
const routerVoitureProxy = createProxyMiddleware(proxyConfigVoiture);

const proxyConfigPyapp = {
  target: "http://localhost:8000",
  changeOrigin: true,
  pathRewrite: {"^\/pyapp": "/"}
}
const routerPyappProxy = createProxyMiddleware(proxyConfigPyapp);

app.get('/voiture',checkToken ,  routerVoitureProxy);
app.get('/hello',checkToken ,  routerVoitureProxy);
app.get('/pyapp',checkToken, routerPyappProxy);
app.get('/auth' , (req: Request, res: Response) => {
  const pl: JwtPayload = {
    // Vous pouvez spécifier les données que vous voulez inclure dans le JWT ici
    // Par exemple, l'ID de l'utilisateur, son rôle, ou d'autres informations pertinentes
    // Ces données peuvent être récupérées lors de la vérification du JWT plus tard
    username: 'testuser',
  };

  const token = jwt.sign(pl, secretKey);
  console.log(token);
  
  res.send(token);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});