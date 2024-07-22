const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI with your Cloud project and location
const vertex_ai = new VertexAI({
  project: 'baat-karo-22760',
  location: 'asia-south1'
});
const model = 'gemini-1.5-pro-001';

// Instantiate the generative model
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95
  },
  safetySettings: [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' }
  ],
  systemInstruction: {
    parts: [{ text: 'You are an automatic task generator based on the project use case.' }]
  }
});

const requestPayload = {
  contents: [
    {
      role: 'user',
      parts: [
        { text: 'I will give you an extracted text from a PDF which contains the data about the project. You have to analyze the text and create a custom name which is suitable for the project and decide the below things. The things you have to decide are 1. The name of the project' },
        { text: '5. Each sprint should have different tasks which should be assigned to the employees based on their skill set. Every task should have:' },
        { text: 'ii. The description of the task so that the employee can understand the details about the task (maximum of 20 to 30 words)' },
        { text: 'Your reply should be in JSON format which is ready to be consumed by the frontend developer. Your response should contain the below information. You have to strictly follow this and you need to follow the stated structure.\n\nExtract it to the following structure:\n{\n  Name of the project: <Add the project name here (make sure the project name is professional and formal)>\n},\n{\n  Tech Stack of the project: <Add the tech stacks needed for the project here. (make sure we have only 1 technology for each of the contexts Front end, Back end, Database, and Other)>\n},\n{\n  Number of tasks: <Give the number of tasks (make sure to have at least 10 tasks)>,\n  Tasks: [\n    {\n      TaskId: <You can generate starting from 1>,\n      Name of the Task: <Enter the name of task>,\n      Time: <Enter the time required task>,\n      Description of the Task: <Give the description for each task.>\n    }\n  ]\n}' },
        { text: 'The above structure is a JSON object and don\'t generate any kind of indexes other than what I have asked. Important Note: don\'t add any \'\\n\' in the response, return the response in JSON with an array of objects. Remove benefits, implementation plan, risks and mitigation strategies, and future enhancements' }
      ]
    }
  ]
};

async function generateContent() {
  try {
    const streamingResp = await generativeModel.generateContentStream(requestPayload);

    let aggregatedResponse = '';
    
    for await (const item of streamingResp.stream) {
      // Process each chunk of the stream
      aggregatedResponse += JSON.stringify(item);
    }

    // Output the aggregated response
    process.stdout.write('aggregated response: ' + aggregatedResponse + '\n');
  } catch (error) {
    console.error('Error generating content:', error);
  }
}

generateContent();
