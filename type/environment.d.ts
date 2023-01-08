export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      DB_USER: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}