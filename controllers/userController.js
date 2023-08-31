const { user } = require('../models');


const userController = {
  async getUserProfile(req, res) {
    try {
      const User = await user.findByPk(req.user_id, {
        attributes: { exclude: ['password'] },
      });

      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(User);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

 
};

module.exports = userController;
