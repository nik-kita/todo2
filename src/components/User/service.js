const UserModel = require('./model');

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

async function getGoal(goalId) {
    const user = await UserModel.findOne({ goals: { $elemMatch: { _id: goalId } } });
    // eslint-disable-next-line no-underscore-dangle
    const goal = user.goals.find((g) => g._id.toString() === goalId);
    return goal;
}

module.exports = {
    getGoal,
    findByNik,
    create,
    createGoalAndReturnId,
};
