import express from 'express';
import * as alumniController from '../controllers/alumniController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/alumni - Get all alumni
router.get('/', alumniController.getAllAlumni);

// GET /api/alumni/:id - Get alumni by ID
router.get('/:id', alumniController.getAlumniById);

// GET /api/alumni/search - Search alumni
router.get('/search', alumniController.searchAlumni);

// GET /api/alumni/stats - Get alumni statistics
router.get('/stats', alumniController.getAlumniStats);

// POST /api/alumni - Create alumni profile (protected)
router.post('/', authenticate, alumniController.createAlumniProfile);

// PUT /api/alumni/:id - Update alumni profile (protected)
router.put('/:id', authenticate, alumniController.updateAlumniProfile);

// DELETE /api/alumni/:id - Delete alumni profile (protected)
router.delete('/:id', authenticate, alumniController.deleteAlumniProfile);

export default router;