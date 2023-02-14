import mongoose from "mongoose";

export const config = {
    jwt:{
        secret:'secret',
        expires:'1h'
    },
    mongooseUrl: 'mongodb+srv://ahmed:1234@cluster0.hw5s09h.mongodb.net/?retryWrites=true&w=majority',

}