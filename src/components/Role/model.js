const { Schema } = require('mongoose');
const connection = require('../../config/connection');

const RoleSchema = new Schema(
    {
        role: {
            type: String,
        },
        users: {
            type: {
                type: [{ type: Schema.Types.ObjectId, ref: 'users' }],
            },
            default: [],
        },
    },
    {
        collection: 'roles',
        versionKey: false,
    },
);

module.exports = connection.model('RoleModel', RoleSchema);
