import {Schema, model, models } from 'mongoose'

const userSchema = new Schema ({


})

const User = models.User || model('User', userSchema);
export default User;