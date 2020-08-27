var i;
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
const opt = {
spreadsheetId: '1XFRzVJ5nsXnjiRBvk5zSd1MfHmUv5s8J8ZF-bUeYgFw',
range: 'Y9Geog!A2:C4'
};
 let data = await gsapi.spreadsheets.values.get(opt);
 console.log(data.data.values.length);
 console.log("here");
 for(i = 0; i <= data.data.values.length - 1; i++){
	 console.log(data.data.values[i][0]);
  console.log(i);
 };
}
