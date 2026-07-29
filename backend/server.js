require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Seed admin user if db.json is empty or missing
const dbPath = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbPath) || fs.readFileSync(dbPath, 'utf8').trim() === '') {
  const seedData = {
    users: [
      {
        id: Date.now(),
        name: 'Admin',
        email: 'admin@portfolio.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        bio: null,
        created_at: new Date().toISOString()
      }
    ],
    projects: [],
    services: [],
    references: []
  };
  fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2));
  console.log('✅ Database seeded with admin user');
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/references', require('./routes/references'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
