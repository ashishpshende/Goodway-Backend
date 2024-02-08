import * as express from 'express';

import { getSampleData } from '../controllers/sampleController';

import { Login,GetUserList, GetUser } from '../controllers/userController';
import { GetParcelByCnNo, GetParcelById, GetParcelList, SaveParcel, UpdateParcel, UpdateParcelStatus } from '../controllers/parcelController';


const router = express.Router();

router.get('/sample/data', getSampleData);


//User Routes
router.post('/users/login',Login);
router.get('/users/list',GetUserList);
router.get('/users/info',GetUser)


// Parcel Routes
router.get('/parcels/list',GetParcelList);
router.get('/parcels/infoById',GetParcelById);
router.get('/parcels/infoByCnNo',GetParcelByCnNo);
router.post('/parcels/save',SaveParcel);
router.put('/parcels/update',UpdateParcel);
router.patch('/parcels/updateStatus',UpdateParcelStatus);




export default router;
