var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var userSchema=new mongoose.Schema({
    local:{
        username:String,
        password:String
    }
});

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSalt(9));
}

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.local.password);
}

moduleexports=mongoose.model('User',userSchema);