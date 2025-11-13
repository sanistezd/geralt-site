import express from 'express';
import {
    getAllCases,
    getCase,
    createCase,
    updateCase,
    deleteCase,
    getCaseStats,
    getFeaturedCases
} from '../controllers/caseController.js';

const router = express.Router();

router.route('/')
    .get(getAllCases)
    .post(createCase);

router.route('/stats')
    .get(getCaseStats);

router.route('/featured')
    .get(getFeaturedCases);

router.route('/:id')
    .get(getCase)
    .patch(updateCase)
    .delete(deleteCase);

export default router;