import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyparser.json({ limit: "30mb" }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Listenting -----> PORT:${PORT}`);
});
