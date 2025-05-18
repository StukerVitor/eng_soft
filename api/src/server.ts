import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import commentRoutes from './routes/commentRoutes';
import errorHandler from './middlewares/errorHandler';

// Create and configure Express app
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/tasks', commentRoutes);

// Global error handler
app.use(errorHandler);

// Export only the app – **no server.listen** – so tests can import
export default app;
