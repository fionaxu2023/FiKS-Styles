const router = require('express').Router()
const { Order , User} = require('../db/index')

router.post('/', async (req, res, next) => {
  try {
    const newItem = await Order.create(req.body)
    res.json(newItem)
  } catch (err) {
    res.send(err)

  }
})

//history order

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.findAll({
      where: { userId: user.id }
    });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
