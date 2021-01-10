const { Schema } = require('mongoose');

const connection = require('../../config/connection');

const TaskSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        name: {
            type: String,
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'tasks',
            default: null,
        },
        subtasks: {
            type: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
            default: [],
        },
    },
    {
        collection: 'tasks',
        versionKey: false,
    },
);

module.exports = connection.model('TaskModel', TaskSchema);
