const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
require('./src/db/patient');
const patientRouter = require('./src/routes/patients');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/patients',patientRouter);

mongoose.connect('mongodb://localhost/Medicine',{userNewUrlParser: true,useUnifiedTopology:true})
mongoose.connection
.on('error',console.log)
.once('open',() => {
    app.listen(PORT,() => console.log(`started listening on port ${PORT}`));
})
