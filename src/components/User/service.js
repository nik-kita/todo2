const UserModel = require('./model');

function findByNik(nik) {
    return UserModel.findOne({ nik }).exec();
}

function create(data) {
    UserModel.create(data);
}

module.exports = {
    findByNik,
    create,
};
