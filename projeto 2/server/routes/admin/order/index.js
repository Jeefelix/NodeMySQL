const express = require('express');
const orderService = require('../../../services/orderService');

module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;
  const order = orderService(config.mysql.client);

  router.get('/', async (req, res) => {

    try {
      // Get all orders
      const orderResult = await order.getAll();
      // Run map on the data to convert it into nested arrays with orders and orderitems
      const orders = orderResult.map(item => item.get({ plain: true }));
      return res.render('admin/orders', { orders });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error fetching the orders',
      });
      log.fatal(err);
      return next(err);
    }
  });

  router.get('/setshipped/:orderId', async (req, res) => {

    try {
      await order.setStatus(req.params.orderId, 'Shipped');
      req.session.messages.push({
        type: 'success',
        text: 'Status updated',
      });
      return res.redirect('/admin/orders');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an updaeting the order',
      });
      log.fatal(err);
      return res.redirect('/admin/orders');
    }
  });

  return router;
};
