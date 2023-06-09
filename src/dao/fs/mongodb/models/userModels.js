import mongoose from "mongoose";

const collection = "User";

const schema = new mongoose.Schema({
    nombre:String,
    apellido: String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }

},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const userModels = mongoose.model(collection,schema);

export default userModels;