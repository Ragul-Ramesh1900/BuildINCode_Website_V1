import app from '../server/server.js';
import { connectDB } from '../server/config/db.js';

export default async (req, res) => {
  // Ensure database is connected
  await connectDB();
  
  // Let Express handle the request
  return app(req, res);
};
