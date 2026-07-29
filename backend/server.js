require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Initialize database and seed admin user if needed
const db = low(new FileSync('db.json'));
db.defaults({ users: [], projects: [], services: [], references: [] }).read().write();
const users = db.get('users').value();
if (!users || users.length === 0) {
  const adminHash = bcrypt.hashSync('admin123', 10);
  db.get('users').push({
    id: Date.now(),
    name: 'Admin',
    email: 'admin@portfolio.com',
    password: adminHash,
    role: 'admin',
    bio: null,
    created_at: new Date().toISOString()
  }).write();
  console.log('✅ Admin user seeded');
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/references', require('./routes/references'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
