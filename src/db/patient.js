const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
    name: {type: String,required:true},
    medicines: [
        {
            name: String,
            medicineType: String,
            quantity: Number,
            from: Date,
            to: Date,
            time: [String]

        }
    ],
    medicinesTaken: [
        {
            _id:false,
            id: Schema.ObjectId,
            date: Date,
            time: [String],

        }
    ]

});
mongoose.set('debug',true);
mongoose.model('Patient',patientSchema);