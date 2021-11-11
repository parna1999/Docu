import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 3001,
  DB_USER:process.env.DB_USER,
  DB_PASS:process.env.DB_PASS,
 // MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://parna_Docu_app:parna_1234@cluster0.5l8pg.mongodb.net/Docu?retryWrites=true&w=majority',

};