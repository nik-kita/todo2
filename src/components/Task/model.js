const { Schema } = require('mongoose');
const connection = require('../../config/connection');

const TaskSchema = new Schema(
    {
        name: {
            type: String,
        },
        done: {
            type: Boolean,
            default: false,
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'tasks',
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
