const UserModel = require('./model');
const GoalModel = require('../Goal/model').model;

function findByNik(nik) {
    return UserModel.findOne({ nik }).exec();
}

function create(data) {
    UserModel.create(data);
}

function addGoalForUser(nik, goal) {
    return UserModel.findOneAndUpdate({ nik }, { $push: { goals: goal } }).exec();
}

function findGoalById(nik, _id) {
    return UserModel.findOne({ nik }).select({ goals: { $elemMatch: { _id } } });
}

module.exports = {
    findByNik,
    create,
    addGoalForUser,
    findGoalById,
};
