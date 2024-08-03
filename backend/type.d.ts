declare namespace NodeJS {
     interface ProcessEnv {
          PORT: number;
          DB_URL: string;
          JWT_SECRET: string;
     }
}

declare namespace Express {
     interface Request {
          id: string;
         user?: JwtPayload;
     }
 }