const Note = require('../models/Note')



// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message == 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    if (err.message == 'incorrect password') {
        errors.password = 'that password is incorrect';
    }
    //duplicate error codes
    if (err.code == 11000) {
        errors.email = 'email is already registered';
        return errors;
    }
    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}




module.exports.getnotes = async (req, res) => {
    const user_id = res.locals.user._id;
    const notes = await Note.getNotes(user_id);
    res.locals.notes = notes;
    res.render('notes/contents');
}
module.exports.addnote_get = (req, res) => {
    res.render('notes/create');

}
module.exports.addnote_post = async (req, res) => {

    const { user_id,text} = req.body;

    try {
        const note = await Note.create({user_id,text});
        res.status(201).json({ user: user_id });
    }
    catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ errors });
    }

}
module.exports.deletenote = async (req, res) => {
    const note_id = req.params.id;
    try {
        console.log('Deleting',note_id);
        await Note.deletenote({note_id});
        res.redirect('/');
    }
    catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).redirect('/');
    }
}

module.exports.updatenote = (req, res) => {
    res.send('updatenote');
}
module.exports.singlenote_get = async (req,res) =>{
    // console.log('this note:',req.params.id);
    const note_id = req.params.id;

    const note = await Note.getNote(note_id);
    res.render('notes/note',{note});
}

