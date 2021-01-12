const TaskModel = require('./model');
const UserModel = require('../User/model');

async function checkOwner(req, res, next) {
    const task = await TaskModel.findById(req.params.taskId).exec();
    const owner = await UserModel.findById(task.owner).exec();
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
