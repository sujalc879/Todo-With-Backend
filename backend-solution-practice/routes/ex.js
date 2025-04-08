// import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// const app = express();
// const PORT = 3000;

// Manually define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
path.join(__filename , "..", "..", "..", "/frontend-solution-practice", "/index.html")


