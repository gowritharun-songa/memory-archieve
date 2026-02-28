
import express from 'express';
import {
  deleteMemo,
  getAllMemos,
  postMemo,
  getById,
  updateMemo} from "../controllers/memoController.js";

import uploadImage from "../middleware/upload.js";

const router = express.Router();

router.get('/', getAllMemos);
router.get('/:id', getById);
router.post('/', uploadImage , postMemo);
router.put('/:id', uploadImage ,updateMemo);
router.delete('/:id', deleteMemo);

export default router;