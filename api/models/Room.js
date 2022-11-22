import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    price: {
        type: Number,
        required: true,
      },
    desc: {
        type: String,
        required: true       
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers:[{number: Number, unavailableDates:[{type: [Date]}] }],
    /*  Ukázka toho na jakém principu funguje struktura pole roomNumbers výše 
        [
        {number: 101, unavailableDates:[01.05.2022,02.05.2022]},
        {number: 102, unavailableDates:[]},
        {number: 103, unavailableDates:[]},
        ]*/
},
{timestamps:true}
);

export default mongoose.model("Room", RoomSchema);