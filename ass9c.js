/**
 * Created by USER on 14/05/2017.
 */

// Prevent form action
$("#form1").submit(function (e) {
    e.preventDefault();
});

// Add event listener to form submit button
document.getElementById("form1").addEventListener('submit', submitForm);

//Store form data
function submitForm() {

    //variable declaration
    var firstName;
    var lastName;
    var address;
    var email;
    var password;
    var confirmPassword;

    //Get form elements value
    firstName = document.getElementById("ctrl1").value;
    lastName = document.getElementById("ctrl2").value;
    address = document.getElementById("ctrl3").value;
    email = document.getElementById("ctrl4").value;
    password = document.getElementById("ctrl5").value;
    confirmPassword = document.getElementById("ctrl6").value;

    //Validate input elements
    if (!isValid(firstName, lastName, address, email, password, confirmPassword)) {
        return false;
    }

    var user = {
        "Firstname": firstName,
        "Lastname": lastName,
        "Address": address,
        "Email": email,
        "Password": password,
        "ConfirmPassword": confirmPassword
    };

    //Store form data in localStorage
    if (localStorage.getItem('users') === null) {
        var users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        var users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    fetchUsers();
}
/**
 *
 */
// Retrieve data from LocalStorage
function fetchUsers() {
    // Get user data from localStorage
    var users = JSON.parse(localStorage.getItem('users'));
    //Create object for user table
    var usersSection = document.getElementById('table1').getElementsByTagName('tbody')[0];
    usersSection.innerHTML = '';
    for (var i = 0; i < users.length; i++) {
        //Insert each item in user table
        usersSection.innerHTML += ' <tr>' +
            '<td>' + users[i].Firstname + '</td>' +
            '<td>' + users[i].Lastname + '</td>' +
            '<td>' + users[i].Address + '</td>' +
            '<td>' + users[i].Email + '</td>' +
            '</tr>';
    }
}

/**
 *
 * @param firstname
 * @param lastname
 * @param address
 * @param email
 * @param password
 * @param confirm_password
 * @returns {boolean}
 */
//Form data validation
function isValid(firstname, lastname, address, email, password, confirm_password) {
    // Validate each form elements
    if (!firstname || !lastname || !address || !email || !password || !confirm_password) {
        alert('Please fill in the form');
        return false;
    }
    //Validate email format
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        alert('Enter valid email');
        return false;
    }
    return true;
}
