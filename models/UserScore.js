// models/UserScore.js
const mongoose = require('mongoose');

const UserScoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    questions: [{
        questionId: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        userAnswer: {
            type: String,
            required: true
        },
        correctAnswer: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }]
});

module.exports = mongoose.model('UserScore', UserScoreSchema);