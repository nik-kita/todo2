const TaskModel = require('./model');

async function checkOwner(req, res, next) {
    const owner = await TaskModel.findById(req.params.taskId).populate('owner').exec();
    console.log(owner);
    if (owner.nik === req.query.nik) {
        next();
    } else {
        res.status(404).json({ sms: 'You should login!...' });
        owner.token = null;
        owner.save();
    }
}

module.exports = {
    checkOwner,
};
