import 'express';

declare module 'express' {
  interface Request {
    user_id?: number;
  }
}