function validateForm() {
    let fullname = document.getElementById("fullname").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let terms = document.getElementById("terms").checked;

    let namePattern = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
    let emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    let phonePattern = /^01[3-9][0-9]{8}$/;

    if (fullname == "") {
        document.getElementById("customerMessage").innerHTML = "Full name cannot be empty.";
        return false;
    }

    if (!namePattern.test(fullname)) {
        document.getElementById("customerMessage").innerHTML = "Enter a valid name.";
        return false;
    }

    if (username == "") {
        document.getElementById("customerMessage").innerHTML = "Username cannot be empty.";
        return false;
    }

    if (username.length < 3 || username.length > 20) {
        document.getElementById("customerMessage").innerHTML = "Username must be 3 to 20 characters.";
        return false;
    }

    if (!/^[A-Za-z0-9_]+$/.test(username)) {
        document.getElementById("customerMessage").innerHTML = "Username can contain only letters, numbers and underscore.";
        return false;
    }

    if (email == "") {
        document.getElementById("customerMessage").innerHTML = "Email cannot be empty.";
        return false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("customerMessage").innerHTML = "Enter a valid email address.";
        return false;
    }

    if (phone == "") {
        document.getElementById("customerMessage").innerHTML = "Phone number cannot be empty.";
        return false;
    }

    if (!phonePattern.test(phone)) {
        document.getElementById("customerMessage").innerHTML = "Enter a valid Bangladeshi phone number.";
        return false;
    }

    if (address == "") {
        document.getElementById("customerMessage").innerHTML = "Delivery address cannot be empty.";
        return false;
    }

    if (address.length < 10) {
        document.getElementById("customerMessage").innerHTML = "Address must contain at least 10 characters.";
        return false;
    }

    if (password == "") {
        document.getElementById("customerMessage").innerHTML = "Password cannot be empty.";
        return false;
    }

    if (password.length < 6) {
        document.getElementById("customerMessage").innerHTML = "Password must contain at least 6 characters.";
        return false;
    }

    if (!/[0-9]/.test(password)) {
        document.getElementById("customerMessage").innerHTML = "Password must contain at least one number.";
        return false;
    }

    if (cpassword == "") {
        document.getElementById("customerMessage").innerHTML = "Please confirm your password.";
        return false;
    }

    if (password != cpassword) {
        document.getElementById("customerMessage").innerHTML = "Passwords do not match.";
        return false;
    }

    if (!terms) {
        document.getElementById("customerMessage").innerHTML = "Please accept the terms and conditions.";
        return false;
    }

    document.getElementById("customerMessage").innerHTML = "Customer Registration Successful!";
    return false;
}

document.getElementById("customerForm").addEventListener("reset", function() {
    document.getElementById("customerMessage").innerHTML = "";
});
