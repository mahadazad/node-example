import { Router } from 'express';
import { Container } from 'typedi';

import { PersonController } from '../controllers/person';
import { registerController } from './register-controller';

export const router = Router();

router.post('/person', registerController(PersonController, 'create'));
router.put('/person/:id', registerController(PersonController, 'modify'));
router.get('/person/:id', registerController(PersonController, 'getPerson'));
router.delete('/person/:id', registerController(PersonController, 'delete'));
router.get('/persons', registerController(PersonController, 'listAll'));
