const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
    Level: { type: String, required: true },
    Link: { type: String, required: true },
    Number: { type: Number, required: true },
    Options: { type: [String], required: true },
    Answer: { type: String, required:true},
    
});

const Video = mongoose.model('Video', VideosSchema);

module.exports = Video;
