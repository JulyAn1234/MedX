import { connectToMongodb } from "@/libs/mongodb";
import Clinic from "@/models/clinic";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectToMongodb();

    const { email, imageUrl, name, direction, phoneNumber, users } = await request.json();

    const clinic = new Clinic({
    email,
    imageUrl,
    name,
    direction,
    phoneNumber,
    users
    });

    const savedClinic = await clinic.save();
    console.log(savedClinic);

    return NextResponse.json(
      {
        email,
        name,
        users,
        createdAt: savedClinic.createdAt,
        updatedAt: savedClinic.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}