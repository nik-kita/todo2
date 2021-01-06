const { Schema } = require('mongoose');
const connection = require('../../config/connection');
const GoalSchema = require('../Goal/model').schema;

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
            type: [{ type: GoalSchema }],
            default: [],
        },
    },
    {
        collection: 'users',
        versionKey: false,
    },
);

module.exports = connection.model('UserModel', UserSchema);
