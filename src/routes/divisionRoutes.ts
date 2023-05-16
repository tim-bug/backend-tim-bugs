import { Router } from 'express';

import Division from '../controllers/division';

const router = Router();

const { getAllDivisionById, getAllDivisions, softDeleteDivision, updateDivision, addDivision } =
  Division;

router.post('/division', addDivision);
router.get('/divisions', getAllDivisions);
router.put('/division/:id', updateDivision);
router.get('/division/:id', getAllDivisionById);
router.put('/division-delete/:id', softDeleteDivision);

export default router;
