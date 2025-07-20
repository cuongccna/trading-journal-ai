import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import usersRouter from './routes/users.js';
import tradesRouter from './routes/trades.js';
import accountsRouter from './routes/accounts.js';
import tagsRouter from './routes/tags.js';
import notesRouter from './routes/notes.js';
import assetsRouter from './routes/assets.js';
import authRouter from './routes/auth.js';
import { requireAuth } from './controllers/authController.js';
import strategiesRouter from './routes/strategies.js';
import assetTypesRouter from './routes/assetTypes.js';
import userPlansRouter from './routes/userPlans.js';
import userProfilesRouter from './routes/userProfiles.js';
import exchangeApiKeysRouter from './routes/exchangeApiKeys.js';
import aiInsightsRouter from './routes/aiInsights.js';
import marketFlowsRouter from './routes/marketFlows.js';
import flowInsightsRouter from './routes/flowInsights.js';
import loginRouter from './routes/login.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/auth', authRouter);
app.use('/api/trades', requireAuth, tradesRouter);
app.use('/api/strategies', strategiesRouter);
app.use('/api/asset_types', assetTypesRouter);
app.use('/api/user_plans', userPlansRouter);
app.use('/api/user_profiles', userProfilesRouter);
app.use('/api/exchange_api_keys', exchangeApiKeysRouter);
app.use('/api/aiinsights', aiInsightsRouter);
app.use('/api/market_flows', marketFlowsRouter);
app.use('/api/flow_insights', flowInsightsRouter);
app.use('/api/login', loginRouter);
app.use('/api/dashboard', dashboardRouter);

app.get('/', (req, res) => {
  res.send('Trading Journal API (Firestore) is up!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));