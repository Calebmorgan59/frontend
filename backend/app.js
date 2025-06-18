import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import alumniRoutes from './routes/alumniRoutes.js';

// Import middleware
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection function - Fixed to remove deprecated options
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔄 MongoDB connection closed due to app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Middleware
app.use(logger); // Custom logging middleware

// CORS configuration - Fixed to include missing headers
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost:5174'
    ];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Cookie',
    'content-profile',    // This fixes the CORS error
    'prefer',            // For PostgREST compatibility
    'accept-profile',    // For PostgREST compatibility
    'X-Requested-With',  // Common header
    'Accept',            // Common header
    'Origin',            // Common header
    'Cache-Control'      // Common header
  ]
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Namal Alumni Network API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      events: '/api/events',
      alumni: '/api/alumni'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    message: 'Namal Alumni Network Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      name: mongoose.connection.name || 'Not connected'
    },
    server: {
      port: PORT,
      node_version: process.version,
      memory_usage: process.memoryUsage()
    }
  };

  res.status(200).json(healthStatus);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/alumni', alumniRoutes);

// REST API v1 routes (PostgREST-style)
app.use('/api/rest/v1', (req, res, next) => {
  console.log(`REST API Request: ${req.method} ${req.path}`);
  console.log('Query params:', req.query);
  next();
});

// Event registrations endpoint
app.get('/api/rest/v1/event_registrations', async (req, res) => {
  try {
    // Parse the columns parameter if provided
    let columns = null;
    if (req.query.columns) {
      try {
        columns = JSON.parse(decodeURIComponent(req.query.columns));
      } catch (e) {
        // If parsing fails, try splitting by comma
        columns = req.query.columns.replace(/"/g, '').split(',');
      }
    }
    
    console.log('Requested columns:', columns);
    
    // Mock data for now - replace with your actual database query
    const mockData = [
      {
        event_title: "Alumni Networking Event",
        event_date: "2025-07-15",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        requirements: "Vegetarian meal"
      },
      {
        event_title: "Tech Career Fair",  
        event_date: "2025-08-20",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+0987654321",
        requirements: "Wheelchair access"
      }
    ];
    
    // If columns are specified, filter the data
    let responseData = mockData;
    if (columns && Array.isArray(columns)) {
      responseData = mockData.map(item => {
        const filtered = {};
        columns.forEach(col => {
          if (item.hasOwnProperty(col)) {
            filtered[col] = item[col];
          }
        });
        return filtered;
      });
    }
    
    res.json(responseData);
  } catch (error) {
    console.error('Error in event_registrations endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Generic REST endpoint for other tables
app.get('/api/rest/v1/:table', (req, res) => {
  res.status(404).json({
    error: 'Table not found',
    message: `Table '${req.params.table}' is not available`,
    available_tables: ['event_registrations']
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /api/auth',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/users',
      'GET /api/events',
      'GET /api/alumni'
    ]
  });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    suggestion: 'Check the API documentation for available endpoints'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🚀 Server Information:');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`📍 Local URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log('\n✨ Ready to handle requests!\n');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('💡 Try using a different port or kill the process using this port');
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

export default app;