import express from 'express';
import { getForms, getForm, createForm, updateForm, deleteForm, deleteForms, submitFormResponse, getFormResponses, exportFormResponses } from '../controllers/formController.js';

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getForm);
router.post('/', createForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);
router.post('/delete-multiple', deleteForms);
router.post('/:id/responses', submitFormResponse);
router.get('/:id/responses', getFormResponses);
router.get('/:id/responses/export', exportFormResponses);

export default router;
