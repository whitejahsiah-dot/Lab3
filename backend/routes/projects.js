const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const projects = db.get('projects').value().slice().reverse();
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const project = db.get('projects').find({ id: Number(req.params.id) }).value();
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.post('/', (req, res) => {
  const { title, description, technologies, url } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const project = { id: Date.now(), title, description: description || null, technologies: technologies || null, url: url || null, created_at: new Date().toISOString() };
  db.get('projects').push(project).write();
  res.status(201).json(project);
});

router.put('/:id', (req, res) => {
  const { title, description, technologies, url } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const existing = db.get('projects').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Project not found' });
  db.get('projects').find({ id: Number(req.params.id) }).assign({ title, description: description || null, technologies: technologies || null, url: url || null }).write();
  const project = db.get('projects').find({ id: Number(req.params.id) }).value();
  res.json(project);
});

router.delete('/:id', (req, res) => {
  const existing = db.get('projects').find({ id: Number(req.params.id) }).value();
  if (!existing) return res.status(404).json({ message: 'Project not found' });
  db.get('projects').remove({ id: Number(req.params.id) }).write();
  res.json({ message: 'Project deleted successfully' });
});

module.exports = router;
