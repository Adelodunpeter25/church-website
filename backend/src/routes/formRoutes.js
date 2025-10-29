import express from 'express';
import { getForms, getForm, createForm, updateForm, deleteForm, submitFormResponse, getFormResponses } from '../controllers/formController.js';

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getForm);
router.post('/', createForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);
router.post('/:id/responses', submitFormResponse);
router.get('/:id/responses', getFormResponses);

export default router;
