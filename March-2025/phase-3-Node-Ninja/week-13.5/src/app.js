import express from 'express'

const app = express();
// import routes
import healthCheckRouter from './routes/healthcheck.route';

app.use("app/v1/healthcheck", healthCheckRouter)

export default app;