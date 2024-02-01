import * as express from 'express';

import { getSampleData } from '../controllers/sampleController';

import { Login,GetUserList } from '../controllers/userController';


const router = express.Router();

router.get('/sample/data', getSampleData);


//User Routes
router.post('/users/login',Login)
router.get('/users/list',GetUserList)
export default router;
