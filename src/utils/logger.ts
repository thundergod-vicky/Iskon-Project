import winston from 'winston';

// Default to Console transport for serverless environments (like Netlify)
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.simple()
  })
];

// Only attempt to write physical files in local development.
// Serverless functions (production) have read-only filesystems and will crash on mkdir 'logs'
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports
});

export default logger;
