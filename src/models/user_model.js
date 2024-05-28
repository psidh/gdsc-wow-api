import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        required : true
    },
});

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;

