import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/',
  auth.authRole(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
);
router.post(
  '/',
  auth.authRole(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.addCowZodSchema),
  CowController.addCow
);
router.get(
  '/:id',
  auth.authRole(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  CowController.getSingleCow
);

router.patch(
  '/:id',
  auth.authRole(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);
router.delete(
  '/:id',
  auth.authRole(ENUM_USER_ROLE.SELLER),
  CowController.deleteCow
);

export const CowRoutes = router;
