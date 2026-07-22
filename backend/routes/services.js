const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const services = db.get('services').value().slice().reverse();
  res.json(services);
});

router.get('/:id', (req, res) => {
  const service = db.get('services').find({ id: Number(req.params.id) }).value();
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

router.post('/', (req, res) => {
  const { name, description, price } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const service = { id: Date.now(), name, description: description || null, price: price || null, created_at: new Date().toISOString() };
  db.get('services').push(service).write();
  res.status(201).json(service);
});

router.put('/:id', (req, res) => {
  const { name, description, price } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const existing = db.get('services').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Service not found' });
  db.get('services').find({ id: Number(req.params.id) }).assign({ name, description: description || null, price: price || null }).write();
  const service = db.get('services').find({ id: Number(req.params.id) }).value();
  res.json(service);
});

router.delete('/:id', (req, res) => {
  const existing = db.get('services').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Service not found' });
  db.get('services').remove({ id: Number(req.params.id) }).write();
  res.json({ message: 'Service deleted successfully' });
});

module.exports = router;
