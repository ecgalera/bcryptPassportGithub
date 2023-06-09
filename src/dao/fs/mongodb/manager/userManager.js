import userModels from "../models/userModels.js";

export default class UserManager{

    getUser = (params) =>{
        return userModels.findOne(params)
    }
    getUserById = (id) =>{
        return userModels.findById(id)
    }

    createUser = (user) =>{
        return userModels.create(user)
    }

    updateUser = (id, user) =>{
        return userModels.findByIdAndUpdate(id, {$set:user})
    }
    
    deleteUser = (id)=>{
        return userModels.findByIdAndDelete(id)
    }
}