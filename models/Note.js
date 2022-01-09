const mongoose = require('mongoose');
const { ObjectId } = require('mongoose')


const noteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'User not mentioned'],
    },
    text: {
        type: String,
        required: [true, 'The note cannot be empty']
    },
});


// fire a function after a doc saved to db
noteSchema.post('save', function (doc, next) {
    console.log('note was created & saved', doc);
    next();

});


noteSchema.statics.getNotes = async function (user_id) {
    const notes = await this.find({ user_id: user_id });
    return notes;
}
noteSchema.statics.getNote = async function (note_id) {
    try {

        const note = await this.findOne({ _id: note_id });
        return note;
    }
    catch (err) {
        console.log(err);
    }
}
noteSchema.statics.deleteNote = async function (note_id) {
    try {
        await this.deleteOne({ _id: note_id }); 
        return true;
    }
    catch (err) {
        console.log(err);
    }

}


const Note = mongoose.model('note', noteSchema);

module.exports = Note;
