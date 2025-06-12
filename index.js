import express from 'express';
import gptHandler from './gptHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', gptHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
