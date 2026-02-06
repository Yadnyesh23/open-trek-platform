import { Router } from 'express'
import {getAllTreks ,getTrekByID ,createTrek , getMyTreks,updateTrek,deleteTrek} from '../controllers/treks.controller.js'
import { protect } from "../middlewares/auth.middleware.js";
const router = Router()

router.get("/treks/my", protect, getMyTreks);

router.get('/treks', getAllTreks)
router.get('/treks/:id', getTrekByID)
router.post('/treks', protect,createTrek)
router.put("/treks/:id", protect, updateTrek);
router.delete("/treks/:id", protect, deleteTrek);



export default router