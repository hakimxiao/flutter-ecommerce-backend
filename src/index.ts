import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: 'Backend Typescript berjalan normal!'})
});

app.listen(PORT, () => {
    console.log(`Server aktiv dan sedang mengudara di PORT ${PORT}`)
})
