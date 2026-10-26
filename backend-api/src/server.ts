import "dotenv/config"

import app from './app';

const PORT = Number(process.env.PORT ?? 5000);
const HOST = '0.0.0.0';

if(!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a number between 1 and 65535");
}

const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server meroket di: http://${HOST}:${PORT}`)
})

function shutdown(signal:string) {
    console.log(`${signal} diterima: Menutup Server 🟢🟠🔴`)
    server.close(() => process.exit(0))
}

process.on("SIGINT", () => shutdown("SIGNINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"))
