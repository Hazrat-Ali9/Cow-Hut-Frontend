import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get(
  '/users/my-profile',
  auth.authRole(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  UserController.getMyProfile
);

router.get(
  '/users/:id',
  auth.authRole(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);
router.get(
  '/users/',
  auth.authRole(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers
);

router.patch(
  '/users/my-profile',
  auth.authRole(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  validateRequest(UserValidation.updateMyProfileZodSchema),
  UserController.updateMyProfile
);

router.patch(
  '/users/:id',
  auth.authRole(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router.delete(
  '/users/:id',
  auth.authRole(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
