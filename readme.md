# TechWierdo Assignment
## How to run:
1. run **npm i** to install required dependecies
2. run **npm start** to run the server.
---
## Endpoints
*Server Runs on localhost:5000*
### create a new patient :
    * endPoint: POST /patients
    * body: (form-urlEncoded)
        * name:patientName

### Get details of all the patients:
    * endPoint: GET /patients

###  Add Medcines for the patient:
    * endPoint: PUT /patients/:patientId/medicines
    * example: localhost:5000/patients/6087eb751e246731408d8b68/medicines
    * body (raw json):
        {    
            "name" :"crocin",
            "type": "tablet",
            "to":"12/04/2021",
            "from":"10/04/2021",
            "quantity":1,
            "time":["morning","evening","afternoon"]
        }

### Patient takes a medicine

    * endPoint: /patients/:patientId/medicine-schedule
    * example: localhost:5000/patients/6087eb751e246731408d8b68/medicine-schedule
    * body (raw json) :
            {
                "id":"6087ebd41e246731408d8b69",
                "date":"2021-12-02",
                "time":["morning","afternoon"]
            }
### Check which medicines are taken and which are not
    * endPoint: GET /patients/:patientId/medicine-schedule
    * query-param: date
    * example: localhost:5000/patients/6087eb751e246731408d8b68/medicine-schedule?date=2021-12-04
    




