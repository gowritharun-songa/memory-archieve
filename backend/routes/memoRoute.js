
import express from 'express';
import {deleteMemo, getAllMemos, postMemo, getById, updateMemo} from "../controllers/memoController.js";

const router = express.Router();

router.get('/', getAllMemos);
router.get('/:id', getById);
router.post('/', postMemo);
router.put('/:id', updateMemo);
router.delete('/:id', deleteMemo);

export default router;
