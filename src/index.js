import dotenv from "dotenv";
dotenv.config();

console.log("ENV CHECK:", process.env.MONGODB_URI);
console.log("Current Directory:", process.cwd());

import connectDb from "./db/index.js";

connectDb();


// first approach 
// ( async () => {
//     try {
//         await mongoose.connect('$ {process.env.MONGODB_URI} /${DB_NAME}')
        
//     } catch (error) {
//         console.error("ERROR",error)
//         throw err
        
//     }
// })()