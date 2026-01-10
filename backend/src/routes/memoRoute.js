
import express from 'express';
import {deleteMemo, getAllMemos, postMemo, updateMemo} from "../controllers/memoController.js";

const router = express.Router();

router.get('/', getAllMemos);
router.post('/', postMemo);
router.put('/:id', updateMemo);
router.delete('/:id', deleteMemo);

export default router;
