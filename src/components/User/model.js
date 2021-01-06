const { Schema } = require('mongoose');
const connection = require('../../config/connection');

const GoalShema = new Schema(
    {
        title: {
            type: String,
            default: Date.now,
        },
        description: {
            type: String,
            default: null,
        },
        tasks: {
            type: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
            default: [],
        },
    },
    {
        collection: 'goals',
        versionKey: false,
    },
);

const UserSchema = new Schema(
    {
        email: {
            type: String,
        },
        nik: {
            type: String,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
            default: null,
        },
        goals: {
            type: [{ type: GoalShema }],
            default: [],
        },
    },
    {
        collection: 'users',
        versionKey: false,
    },
);

module.exports = connection.model('UserModel', UserSchema);
