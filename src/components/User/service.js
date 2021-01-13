const UserModel = require('./model');
const TaskService = require('../Task/service');

function findByNik(nik) {
    return UserModel.findOne({ nik }).exec();
}

function create(user) {
    return UserModel.create(user);
}

async function createGoalAndReturnId(nik, goal) {
    const user = await UserModel
        .findOneAndUpdate({ nik }, { $push: { goals: goal } }, { new: true });
    // eslint-disable-next-line no-underscore-dangle
    const goalId = user.goals[user.goals.length - 1]._id;
    return goalId;
}

async function getGoal(nik, goalId) {
    const user = await UserModel.findOne({ nik }).exec();
    // eslint-disable-next-line no-underscore-dangle
    const goal = user.goals.find((g) => g._id.toString() === goalId);
    return goal;
}

async function addTask(goalId, taskData) {
    const user = await UserModel.findOne({ goals: { $elemMatch: { _id: goalId } } });
    taskData.owner = user._id;
    const task = await TaskService.create(taskData);
    const goal = user.goals.find((g) => g._id.toString() === goalId);
    goal.tasks.push(task._id);
    user.save();
}

function logout(nik) {
    return UserModel.findOneAndUpdate({ nik }, { token: null }).exec();
}

async function getAll() {
    const all = await UserModel.find({}).exec();
    console.log(all);
    return all;
}

module.exports = {
    getGoal,
    findByNik,
    create,
    createGoalAndReturnId,
    addTask,
    logout,
    getAll,
};
