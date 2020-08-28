var i;
var userInput = [];
	const { google } = require('googleapis');
const credentials = require('./credentials.json');
const scopes = [
'https://www.googleapis.com/auth/spreadsheets'
];
const auth = new google.auth.JWT(
  credentials.client_email,
 null,
  credentials.private_key, scopes
);

auth.authorize(function(err, tokens){
if(err){
console.log(err);
return;
} else {
console.log('connected!');
gsrun(auth);
};
});

async function gsrun(cl) {
const gsapi = google.sheets({version: 'v4', auth: cl });
//variable to abotain questions & answers & User Answers from spreadsheet
const qaGet = {
spreadsheetId: '1XFRzVJ5nsXnjiRBvk5zSd1MfHmUv5s8J8ZF-bUeYgFw',
range: 'Y9Geog!A2:D4'
};
//variable to abotain BOTH FakeUserInputs from spreadsheet
const fakeUserInputGet = {
spreadsheetId: '1XFRzVJ5nsXnjiRBvk5zSd1MfHmUv5s8J8ZF-bUeYgFw',
range: 'Y9Geog!E2:F4'
};
const fakeUserScoreGet = {
spreadsheetId: '1XFRzVJ5nsXnjiRBvk5zSd1MfHmUv5s8J8ZF-bUeYgFw',
range: 'Y9Geog!H2:I4'
};
//variable to create FakeUserInputs
let fakeUserInput = await gsapi.spreadsheets.values.get(fakeUserInputGet);
//console.log(fakeUserInput.data.values);
//variable to create fakeUserScore
let fakeUserScore = await gsapi.spreadsheets.values.get(fakeUserScoreGet);
console.log(fakeUserScore.data.values);
//variable to create Questions
 let qas = await gsapi.spreadsheets.values.get(qaGet);
// console.log(qas.data.values);
	//Inner loop single pass through
 for(i = 0; i <= qas.data.values.length - 1; i++){
if (qas.data.values[i][2] == "N") {
	console.log(qas.data.values[i][0]);//questions
	//input FakeUserInput into UserInput and check for correct or
let userInput = fakeUserInput.data.values[i][0];
qas.data.values[i][3] = userInput;
console.log(qas.data.values[i][3]);
	//automatically check if userinput(which for now is the value of fakeuserinput) is correct
	console.log(qas.data.values[i][1]); //answers
// button for right or wrong here
console.log(fakeUserScore.data.values[i][0]);
let userScore = fakeUserScore.data.values[i][0];
qas.data.values[i][2] = userScore;
};
console.log(qas.data.values);
 };
}
