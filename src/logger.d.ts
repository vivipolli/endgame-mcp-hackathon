declare module './logger.js' {
  export function log(message: string): void;
  export function logJson(label: string, data: any): void;
} 