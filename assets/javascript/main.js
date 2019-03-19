// *Initialize Firebase
var config = {
    apiKey: "AIzaSyD6XHXI6txissUhvUEAZhWQEDPCT5s9PbM",
    authDomain: "employee-management-data-b9e83.firebaseapp.com",
    databaseURL: "https://employee-management-data-b9e83.firebaseio.com",
    projectId: "employee-management-data-b9e83",
    storageBucket: "",
    messagingSenderId: "814544928302"
};
firebase.initializeApp(config);

var database = firebase.database();
var dataRef = database.ref();


// * Add input to table
$("#employeeName").focus();
$(document).on("click", "#submit", function (event) {

    event.preventDefault();

    var employeeName = $("#employeeName").val().trim();
    var role = $("#role").val().trim();
    var startDate = $("#startDate").val().trim();
    var monthlyRate = $("#monthlyRate").val().trim();

    var newRow = $("<div>").addClass("row");
    var newName = $("<div>").addClass("col-md-2").text(employeeName);
    var newRole = $("<div>").addClass("col-md-2").text(role);
    var monthsWorked = startDate.diff(moment(), "months");

    var newStartDate = $("<div>").addClass("col-md-2").text(startDate);
    var newMonthsworked = $("<div>").addClass("col-md-2").text(monthsWorked);
    var newMonthlyRate = $("<div>").addClass("col-md-2").text(monthlyRate);
    var newTotalBilled = $("<div>").addClass("col-md-2").text(newMonthsworked * newMonthlyRate);
    var pageBreak = $("<hr>").addClass("my-2");

    //* Put together employee to send to firebase
    var newEmployee = {
        name: employeeName,
        role: role,
        start: startDate,
        rate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(newEmployee);

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().start);
        console.log(childSnapshot.val().rate);
        console.log(childSnapshot.val().dateAdded);
    });


    newRow.append(newName).append(newRole).append(newStartDate).append(newMonthsworked).append(newMonthlyRate).append(newTotalBilled);
    $("#new-user").append(newRow).append(pageBreak);

    employeeName = $("#employeeName").val("");
    role = $("#role").val("");
    startDate = $("#startDate").val("");
    monthlyRate = $("#monthlyRate").val("");

    $("#employeeName").focus();

});