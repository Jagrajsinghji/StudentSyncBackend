const Notification = require('../models/notification');

// POST /noti
exports.createNoti = async (req, res) => {
    try {
      const dataFromReqBody = req.body;
      const newNoti = new Notification(dataFromReqBody);
      await newNoti.save();
      res.status(201).send(newNoti);
    } catch (error) {
      if (error.name === 'CastError') {
          return res.status(400).send('Invalid format. Check your request Id value. ');
      }
      res.status(400).send(error);
    }
};

// POST /noti/userid
exports.getNotiByUser = async (req, res) => {

    try {
        const userid = req.params.userid;

        const notifications = await Notification.find({ userId : userid});

        if (notifications.length === 0) {
            return res.status(404).json({ message: "No notification found for this user." });
        }

        res.status(200).json(notifications);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(500).send(error);
    }
}