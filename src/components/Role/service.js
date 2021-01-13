const RoleModel = require('./model');
const UserService = require('../User/service');

async function makeAdmin(nik) {
    const userId = (await UserService.findByNik(nik).exec())._id;
    if (await RoleModel.exists({ role: 'admin' }).exec()) {
        RoleModel.findOneAndUpdate(
            { role: 'admin' },
            { $push: { users: userId } },
        );
    } else {
        const adminRole = new RoleModel({ role: 'admin' });
        adminRole.users.push(userId);
        adminRole.save();
    }
}

async function isAdmin(nik) {
    if (await RoleModel.exists({ role: 'admin' }).exec()) {
        const adminRolePromise = RoleModel.findOne({ role: 'admin' }).exec();
        const userPromise = UserService.findByNik(nik);
        const [adminRole, user] = Promise.all(adminRolePromise, userPromise);
        return adminRole.users.some((id) => id === user._id);
    }
    return false;
}

module.exports = {
    makeAdmin,
    isAdmin,
};
