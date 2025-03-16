import { FileService } from "../services/files.services.js";

export default function logger(req, res, next) {
  const timestamp = new Date().toISOString();

  const log = `${timestamp} ${req.method} ${req.url}\n`;

  new FileService().appendFile("calls.log", log);
  next();
}
