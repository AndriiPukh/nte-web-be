const { Router } = require('express');
const { authRouter } = require('../auth');

const router = Router();
router.get('/', (req, res) => {
  const { session } = req;
  session.user = { userId: 'id' };
  res.status(200).json({ ...session });
});
router.use('/auth', authRouter);

module.exports = router;
