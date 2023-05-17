import { Router } from 'express';

import Division from '../controllers/division.controller';

const router = Router();

const {
  getAllDivisionById,
  getAllDivisions,
  softDeleteDivisionById,
  updateDivision,
  addDivision,
  recoveryDivisionById,
} = Division;

router.post('/division', addDivision);
router.get('/divisions', getAllDivisions);
router.put('/division/:id', updateDivision);
router.get('/division/:id', getAllDivisionById);
router.put('/division/:id/recovery', recoveryDivisionById);
router.put('/division/:id/delete', softDeleteDivisionById);

export default router;
