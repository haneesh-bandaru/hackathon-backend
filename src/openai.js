const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
require('dotenv').config();
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors())

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// OpenAI credentials
const apiKey = process.env.API_KEY;
const endpoint = process.env.ENDPOINT;

// Endpoint to upload a document and rephrase its content
app.post('/upload', upload.single('file'), async (req, res) => {
console.log('File received');
//
//console.log('File buffer:', req.file.buffer);

const fileName = req.file;
console.log('File name:', fileName.originalname);
try {
    if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const options = {};
    pdfExtract.extractBuffer(fileName.buffer, options, (err, data) => {
    if (err) {
    console.log('Error extracting PDF:', err);
    return res.status(500).json({ error: 'Error extracting PDF' });
    }
    let pageData = "";
data.pages.forEach((eachPage) => {
pageData += eachPage.content.reduce((prev, next) => prev + next.str, "");
});

// Prepare the data for the request
const requestData = JSON.stringify({
"messages": [
{
    "role": "system",
"content": "You are a technical business analyst where you have indepth knowledge on the tech stacks needed and also the timelines"
},
{
"role": "user",
"content": `Extract and${pageData}Structure:
Title - Provide a formal title based on the input text.
ProjectId - Display the project Id number which is there in the input you got
Client - Identify who has given the project to us.
Timeline - Specify the time needed for the project in months.4. Complexity of the project - Classify the project
as Basic, Intermediate, or Advanced.
Tech stacks needed for the project - You have to predict the latest tech stacks names that can be
used for the project's usecase and list the
technologies required for them in the following categories:
Front end, Back end, Database, and other (like cloud and other services)
calculate the required time based on the complexity of the task and return it in the form of hours.
create tasks and the time required for each task based on
the complexity of the task.
Tasks - List the tasks involved in the project with the following details:

Extract it to the following structure:
{
Name of the project: <Add the project name here (make sure the project name is professional and formal )>
},
{
Tech Stacks needed: <Add the tech stacks needed for the project here. 
(make sure we have only 1 technologies for each of the contexts Frontend, Backend, Database and Other)>
You have to strictly follow this and you need to follow the stated structure.
},
{
Number of tasks:<Give the number of tasks (make sure to hav atleast 10 tasks)>,
Task:[{
TaskId : You can generate starting from 1
Name of the Task:<Enter the name of task>,
Time:<Enter the time required task>.
Description of the Task:<Give the description for each task.>
}]
}]
}]
}

The above structure is json object and don't generate any kind of indexes other than what I have asked.
Important Note: dont add any '\n' in the response, return the response in json with array of objects.
Remove benefits, implementation plan, risks and mitigation strategies and future enhancements
`