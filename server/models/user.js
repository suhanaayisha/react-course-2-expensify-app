const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // The "user id" people sign in with; stored lowercase so "Suhana" and "suhana" are the same account
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9._-]{3,30}$/, 'User ID must be 3–30 characters: letters, numbers, dots, dashes or underscores']
    },
    passwordHash: {
        type: String,
        required: true
    }
});

// Never send the password hash to the client
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.passwordHash;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
