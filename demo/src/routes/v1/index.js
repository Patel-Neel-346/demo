import express from 'express';

import usersRoute from './user.route.js';
import domainsRoute from './domain.route.js';
import promocodesRoute from './promocode.route.js';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/domains', domainsRoute);
router.use('/promocodes', promocodesRoute);

export default router;
