require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const assetbundlesDirectory = path.join(__dirname, 'assetbundles');

const app = express();

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/unitydb');

// Middlewares
app.set('trust proxy', 1); 

app.use(helmet());
//app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(assetbundlesDirectory));

// const limiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
//   max: parseInt(process.env.RATE_LIMIT_MAX || '200')
// });
// app.use(limiter);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  validate: { xForwardedForHeader: false },
});
app.use(limiter);
app.use(cors({
  origin: 'https://bodega-backend-vtp8.onrender.com',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// health
app.get('/', (req, res) => res.json({ status: 200, message: 'Unity backend running' }));

// Error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
