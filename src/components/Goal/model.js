const { Schema } = require('mongoose');
const connection = require('../../config/connection');

const GoalSchema = new Schema(
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

module.exports.schema = GoalSchema;
module.exports.model = connection.model('GoalModel', GoalSchema);
