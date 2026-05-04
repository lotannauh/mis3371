/* ===============================
   GLOBALS + HELPERS
   =============================== */

let errorCount = 0;

function byId(x){
    return document.getElementById(x);
}


/* ===============================
   ERROR DISPLAY SYSTEM
   =============================== */

function showErr(id, msg){
    let el = byId(id + "_error");
    if(el){
        el.innerHTML = msg;
    }
}

function clearErr(id){
    let el = byId(id + "_error");
    if(el){
        el.innerHTML = "";
    }
}


/* ===============================
   DATE DISPLAY
   =============================== */

function loadDateNow(){

    let d = new Date();

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];

    let formatted =
        "Today date is: " +
        days[d.getDay()] + ", " +
        months[d.getMonth()] + " " +
        d.getDate() + ", " +
        d.getFullYear();

    let el = byId("date_display_v1");
    if(el){
        el.innerHTML = formatted;
    }
}
function attachRadioLiveValidation(name, errId, msg){

let radios = document.getElementsByName(name);

for(let i=0;i<radios.length;i++){
radios[i].onclick = function(){
chkRadio(name, errId, msg);
};
}

}

/* ===============================
   NAME VALIDATION
   =============================== */

function chkFName(){
let v = byId("fName").value.trim();

if(v.length > 30){
    showErr("fName","Maximum 30 characters allowed");
    return false;
}

let r = /^[A-Za-z'\- ]{1,30}$/;

if(!r.test(v)){
    showErr("fName","Invalid first name");
    return false;
}

clearErr("fName");
return true;
}

function chkMI(){
    let v = byId("mid_init").value.trim();

    if(v === ""){
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

function chkLName(){
let v = byId("LName").value.trim();

if(v.length > 30){
    showErr("LName","Maximum 30 characters allowed");
    return false;
}

let r = /^[A-Za-z'\- ]{1,30}$/;

if(!r.test(v)){
    showErr("LName","Invalid last name");
    return false;
}

clearErr("LName");
return true;
}


/* ===============================
   DOB
   =============================== */

function chkDOB(){

    let v = byId("dob").value;
    if(!v){
        showErr("dob","DOB required");
        return false;
    }

    let d = new Date(v);
    let now = new Date();
    let old = new Date();
    old.setFullYear(now.getFullYear() - 120);

    if(d > now || d < old || isNaN(d.getTime())){
        showErr("dob","Invalid date range");
        return false;
    }

    clearErr("dob");
    return true;
}


/* ===============================
   SSN
   =============================== */

function fmtSSN(el){

let v = el.value.replace(/\D/g,"");

if(v.length > 9){
v = v.substring(0,9);
}

if(v.length > 5){
el.value = v.slice(0,3)+"-"+v.slice(3,5)+"-"+v.slice(5);
}
else if(v.length > 3){
el.value = v.slice(0,3)+"-"+v.slice(3);
}
else{
el.value = v;
}

}
function chkSSN(){

let v = byId("ssn").value;

let r = /^\d{3}-\d{2}-\d{4}$/;

if(!r.test(v)){
showErr("ssn","SSN must be 000-00-0000");
return false;
}

clearErr("ssn");
return true;
}

/* ===============================
   EMAIL
   =============================== */

function chkEmail(){

let f = byId("email");
let v = f.value.trim().toLowerCase();

if(v.length > 50){
showErr("email","Email must be 50 characters or less");
return false;
}

let r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!r.test(v)){
showErr("email","Invalid email format");
return false;
}

clearErr("email");
return true;
}


/* ===============================
   PHONE
   =============================== */

function formatPhone(el){

let v = el.value.replace(/\D/g,"");

if(v.length > 10){
v = v.substring(0,10);
}

if(v.length > 6){
el.value = v.slice(0,3) + "-" + v.slice(3,6) + "-" + v.slice(6);
}
else if(v.length > 3){
el.value = v.slice(0,3) + "-" + v.slice(3);
}
else{
el.value = v;
}

}
function chkPhone(){

let v = byId("phone").value.trim();

let r = /^\d{3}-\d{3}-\d{4}$/;

if(!r.test(v)){
showErr("phone","Phone must be 000-000-0000");
return false;
}

clearErr("phone");
return true;
}


/* ===============================
   ADDRESS / CITY / STATE / ZIP
   =============================== */

function chkAddr1(){
    let v = byId("addr1").value.trim();

    if(v.length < 2 || v.length > 30){
        showErr("addr1","2–30 characters");
        return false;
    }

    clearErr("addr1");
    return true;
}

function chkCity(){
    let v = byId("city").value.trim();

    if(v.length < 2 || !/^[A-Za-z ]+$/.test(v)){
        showErr("city","Letters only");
        return false;
    }

    clearErr("city");
    return true;
}

function chkState(){
    let v = byId("state").value;

    if(v === ""){
        showErr("state","Select a state");
        return false;
    }

    clearErr("state");
    return true;
}

function chkZip(){
    let v = byId("zip").value;

    if(!/^\d{5}$/.test(v)){
        showErr("zip","5 digits only");
        return false;
    }

    clearErr("zip");
    return true;
}


/* ===============================
   USER ID + PASSWORD
   =============================== */

function chkUser(){

    let v = byId("userid").value;

    if(v.length < 5 || v.length > 20){
        showErr("userid","5–20 characters");
        return false;
    }

    if(/^\d/.test(v)){
        showErr("userid","Cannot start with number");
        return false;
    }

    if(!/^[A-Za-z0-9_-]+$/.test(v)){
        showErr("userid","No spaces or symbols");
        return false;
    }

    clearErr("userid");
    return true;
}

function chkPwd(){

let p1 = byId("p1").value;
let p2 = byId("p2").value;
let u = byId("userid").value;

if(p1.length < 8 || p1.length > 30){
showErr("p1","Password must be 8–30 characters");
return false;
}

if(!(/[A-Z]/.test(p1) && /[a-z]/.test(p1) && /\d/.test(p1) && /[!@#%^&*()\-_=+\/><.,`~]/.test(p1))){
showErr("p1","Must include upper, lower, number, special char");
return false;
}

if(p1 === u){
showErr("p1","Password cannot match User ID");
return false;
}

if(p1 !== p2){
showErr("p2","Passwords do not match");
return false;
}

clearErr("p1");
clearErr("p2");
return true;
}


/* ===============================
   RADIO BUTTONS + SLIDER
   =============================== */

function chkRadio(name, errId, msg){

let radios = document.getElementsByName(name);

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

    let el = byId("health");
    if(!el){
        return true; // prevents runtime crash
    }

    let v = parseInt(el.value,10);

    if(v < 1 || v > 10){
        showErr("health","Select health between 1 and 10");
        return false;
    }

    clearErr("health");
    return true;
}

function updateHealth(v){
    let el = byId("health_label");
    if(el){
        el.innerHTML = v;
    }
}


/* ===============================
   MASTER VALIDATION
   =============================== */

function validateAll(){

let ok = true;

if(
chkFName() &&
chkMI() &&
chkLName() &&
chkDOB() &&
chkSSN() &&
chkEmail() &&
chkPhone() &&
chkAddr1() &&
chkCity() &&
chkState() &&
chkZip() &&
chkUser() &&
chkPwd() &&
chkRadio("gender","gender","Select gender") &&
chkRadio("vaccinated","vaccinated","Select vaccinated option") &&
chkRadio("insurance","insurance","Select insurance option") &&
chkHealth()
){
byId("realSubmit").style.display="inline";
alert("OK");
}else{
byId("realSubmit").style.display="none";
alert("Fix errors before submitting");
}

}


/* ===============================
   INIT
   =============================== */

window.onload=function(){
loadDateNow();
updateHealth(5);

attachRadioLiveValidation("gender","gender","Select gender");
attachRadioLiveValidation("vaccinated","vaccinated","Select vaccinated option");
attachRadioLiveValidation("insurance","insurance","Select insurance option");
};
