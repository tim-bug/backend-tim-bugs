import { Router } from 'express';

import UserLevel from '../controllers/userLevel.controller';

const router = Router();

const {
  addUserLevel,
  getUserLevels,
  updateUserLevel,
  getUserLevelById,
  recoveryUserLevelById,
  softDeleteUserLevelById,
} = UserLevel;

router.post('/level', addUserLevel);
router.get('/levels', getUserLevels);
router.put('/level/:id', updateUserLevel);
router.get('/level/:id', getUserLevelById);
router.put('/level/:id/recovery', recoveryUserLevelById);
router.put('/level/:id/delete', softDeleteUserLevelById);

export default router;
