import { Router } from 'express';
import { apiRequestLimit } from '../utils/index';
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

const rateLimit = apiRequestLimit({
  duration: 5,
  max: 30,
});

router.post('/division', rateLimit, addDivision);
router.get('/divisions', rateLimit, getAllDivisions);
router.put('/division/:id', rateLimit, updateDivision);
router.get('/division/:id', rateLimit, getAllDivisionById);
router.put('/division/:id/recovery', rateLimit, recoveryDivisionById);
router.put('/division/:id/delete', rateLimit, softDeleteDivisionById);

export default router;
