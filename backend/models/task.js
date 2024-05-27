const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TaskSchema = new schema({
    title:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum:['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
