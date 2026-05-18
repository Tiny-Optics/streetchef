import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({status: 'ok'});
});

app.get('/api', (_req, res) => {
  res.json({name: 'StreetChef API', version: '0.0.0'});
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`StreetChef backend listening on http://0.0.0.0:${PORT}`);
});
