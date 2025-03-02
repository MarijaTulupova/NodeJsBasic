import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "homework.txt");
fs.writeFileSync(filePath, "Homework 02 in Basic Node");
fs.appendFileSync(filePath, "\nFINISHED!");

const text = fs.readFileSync(filePath, "utf-8");
console.log(text);
