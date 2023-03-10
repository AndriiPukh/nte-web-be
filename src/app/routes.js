const { Router } = require('express');
const passport = require('./services/passport');
const { authRouter } = require('../auth');

const router = Router();
router.use('/auth', authRouter);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { session } = req;
    res.status(200).json({ ...session });
  }
);

module.exports = router;
