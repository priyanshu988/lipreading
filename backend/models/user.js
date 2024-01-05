const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, required: true },
    name: { type: String, required: true },
    RequiredLanguage: { type: String, required:true},
    RequiredLevel: { type: String,required:true },
    BeginnerAttempts: { type: [Number], required:true},
    IntermediateAttempts: { type: [Number], required:true},
    ExpertAttempts: { type: [Number], required:true},
    BeginnerSolved: {type: [Boolean], required:true},
    ExpertSolved : {type: [Boolean], required:true},
    IntermediateSolved : {type: [Boolean], required:true},
    dateOfBirth: { type: Date, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
