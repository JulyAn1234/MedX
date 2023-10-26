import { Schema, model, models } from "mongoose";
import { UserSchema } from "./user";
const ClinicSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    direction: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    users: { type: [UserSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const Clinic = models.Clinic || model("Clinic", ClinicSchema);
export default Clinic;















// import mongoose, { Schema, Document } from 'mongoose';

// interface IUser {
//     id: string;
//     username: string;
//     permissions: string[];
//     password: string;
// }

// interface IClinic extends Document {
//     email: string;
//     imageUrl: string;
//     name: string;
//     direction: string;
//     phoneNumber: string;
//     users: IUser[];
//     medicalHistories: string[];
//     dates: Date[];
// }

// const userSchema = new Schema({
//     id: { type: String, required: true },
//     username: { type: String, required: true },
//     permissions: { type: [String], required: true },
//     password: { type: String, required: true },
// });

// const clinicSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//     },
//     imageUrl: { type: String, required: true },
//     name: { type: String, required: true },
//     direction: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     users: { type: [userSchema], required: true },
//     medicalHistories: { type: [String], required: true },
//     dates: { type: [Date], required: true },
// });

// export default mongoose.model<IClinic>('Clinic', clinicSchema);
