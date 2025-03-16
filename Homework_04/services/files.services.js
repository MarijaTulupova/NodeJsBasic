import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = (filename) => join(__dirname, `../data/${filename}`);

export class FileService {
  async readFile(filename) {
    const arr = await fs.readFile(filePath(filename), "utf-8");
    const parsedArr = JSON.parse(arr);
    return parsedArr;
  }
  async writeFile(filename, data) {
    const stringifiedData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath(filename), stringifiedData);
  }
  async appendFile(filename, log) {
    await fs.appendFile(filePath(filename), log);
  }
}
