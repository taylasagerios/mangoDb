const mongoose = require('mongoose');
const reactionSchema = reqire('./models/reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
       type: Date,
       default: Date.now,
       get: timestamp => timestamp.toLocalString()
    },
    reactions: [reactionSchema]

});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});
const thought = mongoose.model('thought', thoughtSchema);

module.exports = thought;