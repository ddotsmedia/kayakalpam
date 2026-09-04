import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readData<T>(name: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, `${name}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeData<T>(name: string, data: T): void {
  try {
    const filePath = path.join(DATA_DIR, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error(`Failed to write data/${name}.json:`, e);
  }
}
