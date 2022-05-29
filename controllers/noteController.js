const Note = require('../models/Note');
const mongoose = require('mongoose');





module.exports.getnotes = async (req, res) => {
    const user_id = res.locals.user._id;
    const notes = await Note.getNotes(user_id);
    const dates = [];
    notes.forEach((note)=>{
        var date = String(mongoose.Types.ObjectId(note['_id']).getTimestamp()).substring(0,15);
        dates.push(date);
    })
    res.render('notes/contents',{notes:notes,dates:dates});
}
module.exports.addnote_get = (req, res) => {
    res.render('notes/create');

}
module.exports.addnote_post = async (req, res) => {

    const user_id = res.locals.user._id;
    const {text} = req.body;

    try {
        const note = await Note.create({user_id,text});
        res.redirect('/notes');
    }
    catch (err) {
        console.log(err);
        res.status(400).render('error');
    }

}
module.exports.deletenote = async (req, res) => {
    const note_id = req.params.id;
    const user_id = res.locals.user._id;

    try {
        await Note.deleteNote(note_id,user_id);
        console.log('deletion performed')
        res.redirect('/notes');
    }
    catch (err) {
        console.log(err);
        res.status(400).render('error');
    }
}

module.exports.updatenote_get = async (req, res) => {
    const note_id = req.params.id;
    const user_id = res.locals.user._id;
    const note = await Note.getNote(note_id,user_id);
    if(note)
        res.render('notes/update',{note:note});
    else
        res.render('error');
}
module.exports.updatenote_post = async (req, res) => {
    const {text} = req.body;
    const note_id = req.params.id;
    const user_id = res.locals.user._id;
    try {
        const note = await Note.update(note_id,text,user_id);
        if(note)
            res.redirect('/notes');
            else
                res.render('error');
    }
    catch (err) {
        console.log(err);
        res.status(400).render('error');
    }
}
module.exports.singlenote_get = async (req,res) =>{
    // console.log('this note:',req.params.id);
    const user_id = res.locals.user._id;
    const note_id = req.params.id;
    try {
        const note = await Note.getNote(note_id,user_id);
        if(note)
            res.render('notes/note',{note});
        else
            res.status(400).render('error');
    }
    catch (err) {
        console.log(err);
        res.status(400).render('error');
    }
   
}

