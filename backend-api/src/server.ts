import dotenv from "dotenv";
dotenv.config();

import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log("==================================================");
    console.log(`🚀 Server meroket di: http://${HOST}:${PORT}`);
    console.log(`📁 Static file di: http://${HOST}:${PORT}/uploads`)
    console.log("==================================================");

})