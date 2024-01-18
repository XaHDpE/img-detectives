// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// export default app;
