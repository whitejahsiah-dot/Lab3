const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role, bio } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email and password are required' });

  const emailExists = db.get('users').find({ email }).value();
  if (emailExists) return res.status(400).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role: role || null,
    bio: bio || null,
    created_at: new Date().toISOString(),
  };
  db.get('users').push(user).write();

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const user = db.get('users').find({ email }).value();
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
