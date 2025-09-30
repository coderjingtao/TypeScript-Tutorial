import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();
app.use(express.json());

// Register Routes
app.use('/api', routes);

// 404 hander
app.use((req: Request, res: Response, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
