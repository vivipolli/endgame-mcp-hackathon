import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.resolve(__dirname, "../masa_api_logs.txt");

fs.writeFileSync(
  logFile,
  `=== Logs started at ${new Date().toISOString()} ===\n`
);
console.log(`Log file initialized at: ${logFile}`);

interface EnvInfo {
  nodeVersion: string;
  platform: string;
  arch: string;
  pid: number;
  cwd: string;
  execPath: string;
  env: {
    NODE_ENV?: string;
    PATH?: string;
  };
}

const envInfo: EnvInfo = {
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch,
  pid: process.pid,
  cwd: process.cwd(),
  execPath: process.execPath,
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PATH: process.env.PATH,
  },
};

fs.appendFileSync(
  logFile,
  `Environment info:\n${JSON.stringify(envInfo, null, 2)}\n\n`
);

process.on("uncaughtException", (err: Error) => {
  const errorMsg = `Uncaught error: ${err.message}\n${err.stack}`;
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${errorMsg}\n`);
  console.error(errorMsg);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  const errorMsg = `Unhandled promise rejection: ${reason}`;
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${errorMsg}\n`);
  console.error(errorMsg);
});

export function log(message: string): void {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  try {
    fs.appendFileSync(logFile, entry);
    console.log(`[LOG] ${message}`);
  } catch (error) {
    console.error(`Error writing to log file: ${error}`);
  }
}

export function logJson(label: string, data: any): void {
  try {
    const json = JSON.stringify(data, null, 2);
    log(`${label}:\n${json}`);
  } catch (error) {
    log(`Error serializing data for ${label}: ${error}`);
  }
} 