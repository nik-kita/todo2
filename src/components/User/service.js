const UserModel = require('./model');

function findByNik(nik) {
    return UserModel.findOne({ nik }).exec();
}

function create(data) {
    UserModel.create(data);
}

function addGoalForUser(nik, goal) {
    return UserModel.findOneAndUpdate({ nik }, { $push: { goals: goal } }).exec();
}

module.exports = {
    findByNik,
    create,
    addGoalForUser,
};
