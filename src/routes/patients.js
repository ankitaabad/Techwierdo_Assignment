const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sendResponse = require('../../helpers/send-response');
const Patient = mongoose.model('Patient');
//create a patient
router.post('/', (req,res) => {
    const patient =  new Patient({'name': req.body.name});
    patient.save((err) => {
        sendResponse({res,err,message:'patient created','status':201})
    });

});

router.get('/',async (req,res) => {
    Patient.find((err,result)=>sendResponse({res,err,result}));
});


//add medicine
router.put('/:patient/medicines',(req,res)=>{
    const conditions = {'_id':req.params.patient}
    console.log(req.body); 
    const update = {'$push' :{'medicines':req.body}};
    Patient.updateOne(conditions,update,onInsert);
    function onInsert(err){
        sendResponse({res,err,status:201,message:'medicine details added'})
        
    }
});

//medicine taken

router.put('/:patient/medicine-schedule',(req,res) => {
    const {id,date,time} = req.body;
    
    const conditions1 = {
        '_id':req.params.patient,
        'medicines': {$elemMatch:{_id:id,}},
    }
    const conditions2 = {
        'medicinesTaken.id':id,
        'medicinesTaken.date':date
    }
    const update1 = {'$addToSet' :{'medicinesTaken.$.time':time}};

    Patient.updateOne({...conditions1,...conditions2},update1,onInsert);
    function onInsert(err,docs){    
        if(docs?.nModified===0){
            const update2 = {'$addToSet': {'medicinesTaken':req.body}};
            Patient.updateOne(conditions1,update2,onUpdate);
            function onUpdate(err){
                sendResponse({res,err,message:'medicine-schedule updated'});
                    
            }
        }
        else{
            sendResponse({res,err,message:'medicine-schedule updated'});
        }
    }
    

});

// medicine to take

router.get('/:patient/medicine-schedule',async (req,res) => {
    const date = req.query.date;
    const conditions = {
        '_id':req.params.patient,
        'medicines.from': {'$lte':date},
        'medicines.to':{'$gte':date},
        'medicinesTaken.date':date
    }
    
    Patient.findOne(conditions,getResult);
    function getResult(err,data){
        let result =  [];
        
        const {medicines:medicinesToTake,medicinesTaken} =data;
        medicinesToTake?.forEach((medicineToTake) => {
            let takenTime= [],notTakenTime =[];
            const medicineTaken = medicinesTaken.find(({id}) => id.toString() == medicineToTake._id.toString());
            console.log('outside',medicineTaken);
            if(!medicineTaken){
                notTakenTime = [...medicineToTake.time];
            }
            medicineToTake?.time.forEach((time)=>{
                if(medicineTaken?.time.includes(time)){
                    takenTime.push(time);
                }
                else{
                    notTakenTime.push(time);
                }
            })
            result.push({
                id: medicineToTake._id,
                medicine: medicineToTake.name,
                takenTime,
                notTakenTime
            });
                
        });

        
        sendResponse({res,err,result})
    }   

})

module.exports = router;
