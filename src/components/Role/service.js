const RoleModel = require('./model');
const UserService = require('../User/service');

async function isAdmin(nik) {
    const isAdminCreated = await RoleModel.exists({ role: 'admin' });
    if (isAdminCreated) {
        const adminRolePromise = RoleModel.findOne({ role: 'admin' }).exec();
        const userPromise = UserService.findByNik(nik);
        const [adminRole, user] = await Promise.all([adminRolePromise, userPromise]);
        return adminRole.users.some((id) => id.toString() === user._id.toString());
    }
    return false;
}

async function makeAdmin(nik, password) {
    if (password !== 'sudo') {
        return;
    }
    const userId = (await UserService.findByNik(nik))._id;
    const isAdminCreated = await RoleModel.exists({ role: 'admin' });
    if (!isAdminCreated) {
        await RoleModel.create({ role: 'admin' });
        RoleModel.findOneAndUpdate(
            { role: 'admin' },
            { $push: { users: userId } },
        ).exec();
        return;
    }
    const admin = await isAdmin(nik);
    if (!admin) {
        RoleModel.findOneAndUpdate(
            { role: 'admin' },
            { $push: { users: userId } },
        ).exec();
    }
}

module.exports = {
    makeAdmin,
    isAdmin,
};
