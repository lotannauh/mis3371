window.onload = function() {
    const dateObj = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date_display_v1").innerHTML = "Today is: " + dateObj.toLocaleDateString(undefined, options);

    const dobField = document.getElementById("dob");
    const today = new Date().toISOString().split("T")[0];
    const longAgo = new Date();
    longAgo.setFullYear(longAgo.getFullYear() - 120);
    const minDate = longAgo.toISOString().split("T")[0];
    
    dobField.setAttribute("max", today);
    dobField.setAttribute("min", minDate);
};

function updateSlider(val) {
    document.getElementById("salary_label").innerText = val;
}

function validatePasswords() {
    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;
    const uid = document.getElementById("userid").value;

    if (p1 !== p2) {
        alert("ERROR: Passwords do not match!");
        return false;
    }
    if (p1.toLowerCase().includes(uid.toLowerCase())) {
        alert("ERROR: Password cannot contain your User ID!");
        return false;
    }
    return true;
}

function reviewInfo() {
    const form = document.getElementById("patientForm");
    const output = document.getElementById("output_content");
    const reviewArea = document.getElementById("review_display_area");
    
    const labelMapping = {
        "fName": "First Name",
        "mid_init": "Middle Initial",
        "LName": "Last Name",
        "dob_date": "Date of Birth",
        "ssn_secret": "Social Security Number",
        "user_email": "Email Address",
        "phone_num": "Phone Number",
        "addr1": "Address Line 1",
        "city_val": "City",
        "state_dropdown": "State",
        "zip_code": "Zip Code",
        "salary_slide": "Desired Salary",
        "hx": "Medical History",
        "vax": "Vaccinated",
        "ins": "Insurance",
        "username_id": "User ID",
        "pwd1": "Password"
    };

    let resultHTML = "<table border='1' style='width:100%; border-collapse: collapse; background-color: white;'>";
    resultHTML += "<tr style='background-color:#2c3e50; color:white;'><th>Field</th><th>Your Entry</th></tr>";
    
    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        
        if (element.name && element.value && element.type !== "button" && element.type !== "submit" && element.type !== "reset" && element.name !== "pwd2") {
            
            if ((element.type === "checkbox" || element.type === "radio") && !element.checked) {
                continue;
            }

            let label = labelMapping[element.name] || element.name;
            let val = element.value;
            
            if (element.name === "zip_code" && val.length > 5) {
                val = val.substring(0, 5);
            }
            
            resultHTML += "<tr><td style='padding:8px;'><strong>" + label + "</strong></td><td style='padding:8px;'>" + val + "</td></tr>";
        }
    }
    
    resultHTML += "</table>";
    output.innerHTML = resultHTML;
    reviewArea.style.display = "block";
    reviewArea.scrollIntoView({behavior: 'smooth'});
}