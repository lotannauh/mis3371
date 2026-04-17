let errorCount=0;

function byId(x){
return document.getElementById(x);
}


//error system
function showErr(id,msg){
let el=byId(id+"_error");
if(el){
el.innerHTML=msg;
}
}

function clearErr(id){
let el=byId(id+"_error");
if(el){
el.innerHTML="";
}
}


//date stuff
function loadDateNow(){

let d=new Date();

let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months=["January","February","March","April","May","June","July","August","September","October","November","December"];

let dayName=days[d.getDay()];
let monthName=months[d.getMonth()];
let date=d.getDate();
let year=d.getFullYear();

let formatted="Today date is: "+dayName+", "+monthName+" "+date+", "+year;

let el=byId("date_display_v1");

if(el){
el.innerHTML=formatted;
}

}


//first name
function chkFName(){
let v=byId("fName").value.trim();
let r=/^[A-Za-z'\- ]{1,30}$/;

if(!r.test(v)){
showErr("fName","Invalid first name");
return false;
}

clearErr("fName");
return true;
}


//middle initial
function chkMI(){

let v=byId("mid_init").value.trim();

if(v===""){
clearErr("mid_init");
return true;
}

if(!/^[A-Za-z]$/.test(v)){
showErr("mid_init","One letter only");
return false;
}

clearErr("mid_init");
return true;
}


//last name
function chkLName(){
let v=byId("LName").value.trim();
let r=/^[A-Za-z'\- ]{1,30}$/;

if(!r.test(v)){
showErr("LName","Invalid last name");
return false;
}

clearErr("LName");
return true;
}


//dob check
function chkDOB(){

let v=byId("dob").value;

if(!v){
showErr("dob","DOB required");
return false;
}

let d=new Date(v);
let now=new Date();
let old=new Date();
old.setFullYear(now.getFullYear()-120);

if(d>now || d<old || isNaN(d.getTime())){
showErr("dob","Invalid date range");
return false;
}

clearErr("dob");
return true;
}


//ssn
function fmtSSN(el){

let v=el.value.replace(/\D/g,"");

if(v.length>9){
v=v.substring(0,9);
}

if(v.length>5){
el.value=v.slice(0,3)+"-"+v.slice(3,5)+"-"+v.slice(5);
}
else if(v.length>3){
el.value=v.slice(0,3)+"-"+v.slice(3);
}
else{
el.value=v;
}

if(v.length!==9){
showErr("ssn","9 digits required");
return false;
}

clearErr("ssn");
return true;
}


//email
function chkEmail(){

let f=byId("email");
f.value=f.value.toLowerCase();

let r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!r.test(f.value)){
showErr("email","Invalid email");
return false;
}

clearErr("email");
return true;
}


//phone
function chkPhone(){

let v=byId("phone").value;
let r=/^\d{3}-\d{3}-\d{4}$/;

if(!r.test(v)){
showErr("phone","Format 000-000-0000");
return false;
}

clearErr("phone");
return true;
}


//addr
function chkAddr1(){

let v=byId("addr1").value.trim();

if(v.length<2 || v.length>30){
showErr("addr1","2–30 characters");
return false;
}

clearErr("addr1");
return true;
}


//city
function chkCity(){

let v=byId("city").value.trim();

if(v.length<2){
showErr("city","City too short");
return false;
}

clearErr("city");
return true;
}


//state
function chkState(){

let v=byId("state").value;

if(v===""){
showErr("state","Select a state");
return false;
}

clearErr("state");
return true;
}


//zip
function chkZip(){

let v=byId("zip").value;

if(!/^\d{5}$/.test(v)){
showErr("zip","5 digits only");
return false;
}

clearErr("zip");
return true;
}


//userid
function chkUser(){

let v=byId("userid").value;

if(/^\d/.test(v)){
showErr("userid","Cannot start with number");
return false;
}

if(!/^[A-Za-z0-9_-]{5,20}$/.test(v)){
showErr("userid","5–20 chars, no spaces");
return false;
}

clearErr("userid");
return true;
}


//password
function chkPwd(){

let p1=byId("p1").value;
let p2=byId("p2").value;
let u=byId("userid").value;

if(p1.length<8){
showErr("p1","Min 8 characters");
return false;
}

if(!(/[A-Z]/.test(p1) && /[a-z]/.test(p1) && /\d/.test(p1))){
showErr("p1","Upper, lower, number required");
return false;
}

if(p1===u){
showErr("p1","Password ≠ User ID");
return false;
}

if(p1!==p2){
showErr("p2","Passwords do not match");
return false;
}

clearErr("p1");
clearErr("p2");
return true;
}


// --------- RADIO + SLIDER VALIDATION ---------

function chkRadio(name, errId, msg){
let radios=document.getElementsByName(name);
for(let i=0;i<radios.length;i++){
if(radios[i].checked){
clearErr(errId);
return true;
}
}
showErr(errId,msg);
return false;
}

function chkHealth(){
let v=byId("health").value;
if(v<1 || v>10){
showErr("health","Select health between 1 and 10");
return false;
}
clearErr("health");
return true;
}


//slider display
function updateHealth(v){
let el=byId("health_label");
if(el){
el.innerHTML=v;
}
}


//validate all
function validateAll(){

errorCount=0;

if(!chkFName())errorCount++;
if(!chkMI())errorCount++;
if(!chkLName())errorCount++;
if(!chkDOB())errorCount++;
if(!fmtSSN(byId("ssn")))errorCount++;
if(!chkEmail())errorCount++;
if(!chkPhone())errorCount++;
if(!chkAddr1())errorCount++;
if(!chkCity())errorCount++;
if(!chkState())errorCount++;
if(!chkZip())errorCount++;
if(!chkUser())errorCount++;
if(!chkPwd())errorCount++;

if(!chkRadio("gender","gender","Select gender"))errorCount++;
if(!chkRadio("vaccinated","vaccinated","Select vaccinated option"))errorCount++;
if(!chkRadio("insurance","insurance","Select insurance option"))errorCount++;
if(!chkHealth())errorCount++;

if(errorCount===0){
byId("realSubmit").style.display="inline";
alert("Validation successful. You may submit.");
}
else{
byId("realSubmit").style.display="none";
alert("Fix errors before submitting");
}

}


//init
window.onload=function(){
loadDateNow();
updateHealth(5);
};
