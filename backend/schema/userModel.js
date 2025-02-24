const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    picture:{type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    },

    {
        timestamps:true
    }
);

userSchema.methods.matchPassword = async function (pass){    
    return await bcrypt.compare(pass,this.password);
}

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next();
        console.log('true');
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model("User",userSchema);

module.exports = User;