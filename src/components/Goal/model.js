const { Schema } = require('mongoose');

const connection = require('../../config/connection');

const GoalSchema = new Schema(
    {
        name: {
            type: String,
            default: Date.now,
        },
        tasks: {
            type: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
            default: null,
        },
    },
    {
        collection: 'goals',
        versionKey: false,
    },
);

module.exports.model = connection.model('GoalModel', GoalSchema);
module.exports.schema = GoalSchema;
