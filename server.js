//import dependancies
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');


dotenv.config();



//Create a database connection
const db = mysql.createConnection({
    user : process.env.DB_USERNAME,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

// check for connection
db.connect((err) => {
    if(err) {
        return console.log('Error connecting to Mysql', err.message);
    }
    console.log('Connection succesfull!.Mysql id :',db.threadId);
});

// Question 1 goes here

const patients_Details = 'SELECT patient_id,first_name,last_name,date_of_birth FROM patients';
app.get('/patients', (req,res) =>{
    db.query(patients_Details,(err,data) =>{
        if(err){
             return res.status(500).send('Could not fetch data!',err.message);
        }
            res.status(200).send(data);
    });
});

// Question 2 goes here

const providers = 'SELECT * FROM providers'
app.get('/providers', (req,res) =>{
    db.query(providers, (err,data) =>{
        if(err){
            return res.status(500).send('Error fetching data',err.message);
        }
        res.status(200).send(data);
    });
});


// Question 3 goes here

const patients_first_name = 'SELECT first_name From patients';
app.get('/first_name',(req,res) =>{
    db.query(patients_first_name,(err,data) =>{
        if(err) {
            return res.status(500).send('Error fetching data',err.message);
        }
        res.status(200).send(data);
    });
});


//Question 4 goes here
const speciality = 'SELECT * FROM providers ORDER BY provider_speciality';
app.get('/speciality',(req,res) =>{
    db.query(speciality,(err,data) => {
        if(err) {
            return res.status(500).send('error fetching data',err.message);
        }
        res.status(200).send(data);
    });
});

//listen to the server
   app.listen(process.env.PORT, () => {
     console.log(`server is runnig on http://localhost:${process.env.PORT}`)
   })

//Message to browser
app.get('/',(req,res) => {
    res.send('Server started succesfully!')
})