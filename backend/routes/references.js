const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const refs = db.get('refs').value().slice().reverse();
  res.json(refs);
});

router.get('/:id', (req, res) => {
  const ref = db.get('refs').find({ id: Number(req.params.id) }).value();
  if (!ref) return res.status(404).json({ message: 'Reference not found' });
  res.json(ref);
});

router.post('/', (req, res) => {
  const { name, position, company, email, phone, testimonial } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const ref = { id: Date.now(), name, position: position || null, company: company || null, email: email || null, phone: phone || null, testimonial: testimonial || null, created_at: new Date().toISOString() };
  db.get('refs').push(ref).write();
  res.status(201).json(ref);
});

router.put('/:id', (req, res) => {
  const { name, position, company, email, phone, testimonial } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const existing = db.get('refs').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Reference not found' });
  db.get('refs').find({ id: Number(req.params.id) }).assign({ name, position: position || null, company: company || null, email: email || null, phone: phone || null, testimonial: testimonial || null }).write();
  const ref = db.get('refs').find({ id: Number(req.params.id) }).value();
  res.json(ref);
});

router.delete('/:id', (req, res) => {
  const existing = db.get('refs').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Reference not found' });
  db.get('refs').remove({ id: Number(req.params.id) }).write();
  res.json({ message: 'Reference deleted successfully' });
});

module.exports = router;
