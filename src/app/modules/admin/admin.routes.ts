import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.addAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;
