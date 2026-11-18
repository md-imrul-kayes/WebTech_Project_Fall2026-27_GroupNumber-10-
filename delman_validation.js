document.getElementById("delmanForm").addEventListener("submit", function(event) {

    let message = document.getElementById("delmanMessage");

    // ---------- Collect values ----------
    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let dob = document.getElementById("dob").value;
    let nid = document.getElementById("nid").value.trim();
    let photo = document.getElementById("photo").files[0];
    let vehicle = document.getElementById("vehicle").value;
    let plate = document.getElementById("plate").value.trim();
    let license = document.getElementById("license").value.trim();
    let area = document.getElementById("area").value;
    let experience = document.getElementById("experience").value.trim();
    let emergency = document.getElementById("emergency").value.trim();
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let terms = document.getElementById("terms").checked;

    let gender = document.querySelector('input[name="gender"]:checked');
    let shift = document.querySelector('input[name="shift"]:checked');

    message.innerHTML = "";


    // ---------- 1. Full Name ----------
    let namePattern = /^[A-Za-z]+(?:[ .'-]+[A-Za-z]+)*$/;

    if (fullname === "") {
        event.preventDefault();
        message.innerHTML = "Full name cannot be empty.";
        return;
    }

    if (!namePattern.test(fullname)) {
        event.preventDefault();
        message.innerHTML = "Name should contain only letters.";
        return;
    }


    // ---------- 2. Email ----------
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        event.preventDefault();
        message.innerHTML = "Email cannot be empty.";
        return;
    }

    if (!emailPattern.test(email)) {
        event.preventDefault();
        message.innerHTML = "Enter a valid email address.";
        return;
    }


    // ---------- 3. Phone ----------
    let phonePattern = /^01[3-9][0-9]{8}$/;

    if (phone === "") {
        event.preventDefault();
        message.innerHTML = "Phone number cannot be empty.";
        return;
    }

    if (!phonePattern.test(phone)) {
        event.preventDefault();
        message.innerHTML =
            "Enter a valid 11-digit Bangladeshi mobile number.";
        return;
    }


    // ---------- 4. Date of Birth (must be 18 or older) ----------
    if (dob === "") {
        event.preventDefault();
        message.innerHTML = "Please select your date of birth.";
        return;
    }

    let birthDate = new Date(dob + "T00:00:00");
    let today = new Date();

    today.setHours(0, 0, 0, 0);

    if (birthDate > today) {
        event.preventDefault();
        message.innerHTML = "Date of birth cannot be in the future.";
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        event.preventDefault();
        message.innerHTML = "You must be at least 18 years old.";
        return;
    }


    // ---------- 5. Gender ----------
    if (!gender) {
        event.preventDefault();
        message.innerHTML = "Please select your gender.";
        return;
    }


    // ---------- 6. NID ----------
    if (nid === "") {
        event.preventDefault();
        message.innerHTML = "NID number cannot be empty.";
        return;
    }

    if (!/^[0-9]{10,17}$/.test(nid)) {
        event.preventDefault();
        message.innerHTML = "NID must contain 10 to 17 digits.";
        return;
    }


    // ---------- 7. Profile Photo (required) ----------
    if (!photo) {
        event.preventDefault();
        message.innerHTML = "Please upload your profile photo.";
        return;
    }

    if (!photo.type.startsWith("image/")) {
        event.preventDefault();
        message.innerHTML = "Please select a valid image file.";
        return;
    }

    if (photo.size > 2 * 1024 * 1024) {
        event.preventDefault();
        message.innerHTML = "Profile photo must be less than 2 MB.";
        return;
    }


    // ---------- 8. Vehicle ----------
    if (vehicle === "") {
        event.preventDefault();
        message.innerHTML = "Please select a vehicle type.";
        return;
    }

    // Motorbike / scooter need a plate number and a driving license.
    // Bicycle does not, so those two fields stay optional for it.
    if (vehicle !== "bicycle") {

        if (plate === "") {
            event.preventDefault();
            message.innerHTML = "Vehicle plate number cannot be empty.";
            return;
        }

        if (!/^[A-Za-z0-9\- ]{4,25}$/.test(plate)) {
            event.preventDefault();
            message.innerHTML =
                "Enter a valid plate number (letters, numbers, space or hyphen).";
            return;
        }

        if (license === "") {
            event.preventDefault();
            message.innerHTML = "Driving license number cannot be empty.";
            return;
        }

        if (!/^[A-Za-z0-9\-]{5,20}$/.test(license)) {
            event.preventDefault();
            message.innerHTML =
                "Enter a valid driving license number (5-20 letters or numbers).";
            return;
        }
    }


    // ---------- 9. Working Area ----------
    if (area === "") {
        event.preventDefault();
        message.innerHTML = "Please select a working area.";
        return;
    }


    // ---------- 10. Availability Shift ----------
    if (!shift) {
        event.preventDefault();
        message.innerHTML = "Please select an availability shift.";
        return;
    }


    // ---------- 11. Experience (0 - 30 years) ----------
    if (experience === "") {
        event.preventDefault();
        message.innerHTML = "Please enter your delivery experience.";
        return;
    }

    if (!/^[0-9]+$/.test(experience) || Number(experience) > 30) {
        event.preventDefault();
        message.innerHTML = "Experience must be a whole number between 0 and 30.";
        return;
    }


    // ---------- 12. Emergency Contact ----------
    if (emergency === "") {
        event.preventDefault();
        message.innerHTML = "Emergency contact number cannot be empty.";
        return;
    }

    if (!phonePattern.test(emergency)) {
        event.preventDefault();
        message.innerHTML =
            "Enter a valid 11-digit Bangladeshi emergency contact number.";
        return;
    }

    if (emergency === phone) {
        event.preventDefault();
        message.innerHTML =
            "Emergency contact must be different from your own phone number.";
        return;
    }


    // ---------- 13. Password ----------
    if (password === "") {
        event.preventDefault();
        message.innerHTML = "Password cannot be empty.";
        return;
    }

    if (password.length < 6) {
        event.preventDefault();
        message.innerHTML = "Password must contain at least 6 characters.";
        return;
    }

    let numberPattern = /[0-9]/;

    if (!numberPattern.test(password)) {
        event.preventDefault();
        message.innerHTML = "Password must contain at least one number.";
        return;
    }

    if (cpassword === "") {
        event.preventDefault();
        message.innerHTML = "Please confirm your password.";
        return;
    }

    if (password !== cpassword) {
        event.preventDefault();
        message.innerHTML = "Passwords do not match.";
        return;
    }


    // ---------- 14. Terms ----------
    if (!terms) {
        event.preventDefault();
        message.innerHTML = "Please agree to the terms and conditions.";
        return;
    }


    // ---------- All checks passed ----------
    event.preventDefault();
    message.innerHTML = "Delivery Man Registration Successful!";

});

document.getElementById("delmanForm").addEventListener("reset", function() {
    document.getElementById("delmanMessage").innerHTML = "";
});
