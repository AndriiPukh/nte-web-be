const { Router } = require('express');
const passport = require('../../auth/services/passport');
const { authRouter } = require('../../auth');
const { userRouter } = require('../../user');
const { multer } = require('../services/storage');
const { uploadFile } = require('../utils/uploadFileToStorage');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  multer.single('photo'),
  async (req, res, next) => {
    if (!req.file) {
      res.status(400).send('No file upload.');
    }
    const fileUrl = await uploadFile(req.file);
    res.status(200).json({ fileUrl });
  }
);

module.exports = router;
