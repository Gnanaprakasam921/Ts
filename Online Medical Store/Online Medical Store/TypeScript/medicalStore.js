var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 10;
var OrderIdAutoIncrement = 100;
var CurrentUserId;
var CurrentUserName;
var NewUserNameStatus = false;
var NewUserAgeStatus = false;
var NewUserPhoneNumberStatus = false;
var User = /** @class */ (function () {
    function User(paramUserName, paramUserAge, paramUserPhoneNumber) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = paramUserName;
        this.UserAge = paramUserAge;
        this.UserPhoneNumber = paramUserPhoneNumber;
    }
    return User;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
    }
    return MedicineInfo;
}());
var Order = /** @class */ (function () {
    function Order(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
    return Order;
}());
var UserArrayList = new Array();
UserArrayList.push(new User("Hemanth", 23, 9789011226));
UserArrayList.push(new User("Harish", 23, 9445153060));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50));
MedicineList.push(new MedicineInfo("Colpal", 5, 60));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70));
MedicineList.push(new MedicineInfo("Iodex", 5, 80));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100));
var OrderList = new Array();
function newUserPage() {
    var homePage = document.getElementById('homePage');
    var newUserPage = document.getElementById('newUserPage');
    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
function signUp() {
    if (NewUserNameStatus == true &&
        NewUserAgeStatus == true &&
        NewUserPhoneNumberStatus == true) {
        var newUserName = document.getElementById('newUserName').value;
        var newUserAge = document.getElementById('newUserAge').value;
        var newUserPhoneNumber = document.getElementById('newUserPhoneNumber').value;
        UserArrayList.push(new User(newUserName, +newUserAge, +newUserPhoneNumber));
        displayHomePage();
    }
    else {
        alert("Please fill out the form fully.");
    }
}
function checkNewUserName(paramNewUserName) {
    var newUserName = document.getElementById(paramNewUserName).value;
    var newUserNameMessage = document.getElementById(paramNewUserName + "Message");
    var newUserNameRegex = /^[a-zA-Z]{3,20}$/;
    if (newUserNameRegex.test(newUserName)) {
        NewUserNameStatus = true;
        newUserNameMessage.style.visibility = "hidden";
    }
    else {
        NewUserNameStatus = false;
        newUserNameMessage.innerHTML = "Please enter valid name";
        newUserNameMessage.style.visibility = "visible";
        newUserNameMessage.style.color = "tomato";
        newUserNameMessage.style.marginLeft = "10px";
    }
}
function checkNewUserAge(paramNewUserAge) {
    var newUserAge = document.getElementById(paramNewUserAge).value;
    var newUserAgeMessage = document.getElementById(paramNewUserAge + "Message");
    var newUserAgeRegex = /^\d{1,2}$/;
    if (newUserAgeRegex.test(newUserAge)) {
        NewUserAgeStatus = true;
        newUserAgeMessage.style.visibility = "hidden";
    }
    else {
        NewUserAgeStatus = false;
        newUserAgeMessage.innerHTML = "Please enter valid age";
        newUserAgeMessage.style.visibility = "visible";
        newUserAgeMessage.style.color = "tomato";
        newUserAgeMessage.style.marginLeft = "10px";
    }
}
function checkNewUserPhoneNumber(paramNewUserPhoneNumber) {
    var newUserPhoneNumber = document.getElementById(paramNewUserPhoneNumber).value;
    var newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message");
    var newUserPhoneNumberRegex = /^\d{10}$/;
    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {
        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }
}
function existingUserPage() {
    var homePage = document.getElementById('homePage');
    var existingUserPage = document.getElementById('existingUserPage');
    var availableUser = document.getElementById('availableUser');
    homePage.style.display = "none";
    existingUserPage.style.display = "block";
    availableUser.innerHTML = "<h2>Available User</h2>";
    for (var i = 0; i < UserArrayList.length; i++) {
        availableUser.innerHTML += "User Name : " + UserArrayList[i].UserName + " | User Id : " + UserArrayList[i].UserId + "<br>";
    }
}
function signIn() {
    var noExistingUserIdChecker = false;
    var existingUserId = document.getElementById('existingUserId').value;
    var existingUserIdRegex = /^UI\d{4}$/;
    if (existingUserIdRegex.test(existingUserId)) {
        for (var i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].UserId == existingUserId) {
                CurrentUserId = UserArrayList[i].UserId;
                CurrentUserName = UserArrayList[i].UserName;
                medicinePage();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Enter Valid User Id");
        }
    }
    else {
        alert("Enter Valid User Id.");
    }
}
function medicinePage() {
    var existingUserPage = document.getElementById('existingUserPage');
    var medicinePage = document.getElementById('medicinePage');
    var greet = document.getElementById('greet');
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    greet.innerHTML = "<h3>Hello " + CurrentUserName + "</h3>";
}
function medicineListCheck() {
    var medicineInfo = document.getElementById('medicineInfo');
    var medicineList = document.getElementById('medicineList');
    var medicineName = medicineList[medicineList.selectedIndex].innerHTML;
    for (var i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineName == medicineName) {
            medicineInfo.innerHTML = "Medicine Id : " + MedicineList[i].MedicineId + " --- Medicine Name : " + MedicineList[i].MedicineName + " --- Medicine Count : " + MedicineList[i].MedicineCount + " --- Medicine Price : " + MedicineList[i].MedicinePrice + " ";
            displayRequiredCount();
        }
    }
}
function displayRequiredCount() {
    var medicineInfo = document.getElementById('medicineInfo');
    var requiredCount = document.getElementById('requiredCount');
    medicineInfo.style.display = "block";
    requiredCount.style.display = "block";
}
function buyMedicine() {
    var proceed = true;
    var finalMedicineRequiredCount = 0;
    var medicineList = document.getElementById('medicineList');
    var medicineRequiredCount = document.getElementById('medicineRequiredCount').value;
    var medicineName = medicineList[medicineList.selectedIndex].innerHTML;
    var medicineRequiredCountRegex = /^\d{1,3}$/;
    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (var i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].MedicineName == medicineName) {
                if (MedicineList[i].MedicineCount > 0) {
                    if ((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0) {
                        proceed = confirm("We only have " + MedicineList[i].MedicineCount + " " + MedicineList[i].MedicineName + ". Do you want to buy " + MedicineList[i].MedicineCount + " " + MedicineList[i].MedicineName + "?");
                        if (proceed) {
                            finalMedicineRequiredCount = MedicineList[i].MedicineCount;
                        }
                    }
                    else {
                        finalMedicineRequiredCount = +medicineRequiredCount;
                    }
                    if (proceed) {
                        MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;
                        OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, finalMedicineRequiredCount));
                        alert("Purchase Success.");
                        displayHomePage();
                    }
                }
                else if (MedicineList[i].MedicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }
        }
    }
    else {
        alert("Please enter valid Required Count");
    }
}
function showHistory() {
    var historyDisplay = document.getElementById('historyDisplay');
    historyDisplay.style.display = "block";
    var orderCount = 0;
    historyDisplay.innerHTML = "<h3>Order History</h3>";
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].UserId == CurrentUserId) {
            historyDisplay.innerHTML += "You buyed " + OrderList[i].MedicineCount + " " + OrderList[i].MedicineName + "<br>";
            orderCount++;
        }
    }
    if (orderCount == 0) {
        historyDisplay.innerHTML += "Order History is empty.<br>";
    }
}
function displayHomePage() {
    CurrentUserId = "";
    CurrentUserName = "";
    var medicineList = document.getElementById('medicineList');
    medicineList.selectedIndex = 0;
    var requiredCount = document.getElementById('requiredCount');
    var medicineInfo = document.getElementById('medicineInfo');
    var historyDisplay = document.getElementById('historyDisplay');
    var medicinePage = document.getElementById('medicinePage');
    var newUserPage = document.getElementById('newUserPage');
    var existingUserPage = document.getElementById('existingUserPage');
    var homePage = document.getElementById('homePage');
    document.getElementById('medicineRequiredCount').value = null;
    document.getElementById('existingUserId').value = null;
    requiredCount.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    medicineInfo.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homePage.style.display = "block";
}
