import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

// router.get('/', CowController.getAllCows);
router.post(
  '/',
  auth.authRole(ENUM_USER_ROLE.BUYER),
  validateRequest(OrderValidation.addOrderZodSchema),
  OrderController.cowOrder
);

router.get(
  '/',
  auth.authRole(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.BUYER
  ),
  OrderController.getAllOrders
);

router.get(
  '/:id',
  auth.authRole(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.BUYER
  ),
  OrderController.getOrder
);

export const OrderRoutes = router;
