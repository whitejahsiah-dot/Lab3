const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database');
const auth = require('../middleware/auth');

const stripPassword = (u) => {
  const { password, ...rest } = u;
  return rest;
};

router.get('/', (req, res) => {
  const users = db.get('users').value().slice().reverse().map(stripPassword);
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = db.get('users').find({ id: Number(req.params.id) }).value();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(stripPassword(user));
});


router.post('/', (req, res) => {
  const { name, email, role, bio } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
  const emailExists = db.get('users').find({ email }).value();
  if (emailExists) return res.status(400).json({ message: 'Email already in use' });
  const user = { id: Date.now(), name, email, role: role || null, bio: bio || null, created_at: new Date().toISOString() };
  db.get('users').push(user).write();
  res.status(201).json(user);
});


router.put('/:id', auth, async (req, res) => {
  const { name, email, role, bio, password } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
  const existing = db.get('users').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'User not found' });
  const updates = { name, email, role: role || null, bio: bio || null };
  if (password) updates.password = await bcrypt.hash(password, 10);
  db.get('users').find({ id: Number(req.params.id) }).assign(updates).write();
  const user = db.get('users').find({ id: Number(req.params.id) }).value();
  res.json(stripPassword(user));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.get('users').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'User not found' });
  db.get('users').remove({ id: Number(req.params.id) }).write();
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
