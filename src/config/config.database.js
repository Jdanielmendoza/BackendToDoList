import pkg from 'pg'; 
import 'dotenv/config.js'; 
const {Pool, Client} = pkg; 


export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max : 10, // Número máximo de conexiones en el pool , por default es 10 si no se especifica 
    ssl:{
      rejectUnauthorized: false
    }
  })  

 //pool.connect(); 


 /* export const client = new Client({
     user: process.env.DB_USER,
     host: process.env.DB_HOST,
     database: process.env.DB_NAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT,
   })
   //client.connect() ; */
