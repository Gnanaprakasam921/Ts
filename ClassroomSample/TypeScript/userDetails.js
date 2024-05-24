"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Contact {
    constructor(id, name, email, phone, dob, balance, languages, photo) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.balance = balance;
        this.languages = languages;
        this.photo = photo;
    }
}
let userArrayList = new Array();
renderContacts();
function renderContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        // userArrayList.push(new Contact(201, "Abi", "abi@gmail.com", "9876536807", "3/04/2001", 2000, ["Tamil"], [" "]))
        // userArrayList.push(new Contact(202, "AbiS S", "abi1234@gmail.com", "638997655", "3/07/2001", 1000, ["English"], [" "]))
        try {
            const tableBody = document.getElementById("contactTableBody");
            tableBody.innerHTML = "";
            userArrayList.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.dob}</td>         
            <td>${contact.balance}</td>
            <td>${contact.languages.join(',')}</td>
            <td><img src="${contact.photo[0]}" style="width: 100px; height: auto;" alt="Photo"</td>
            <td>
            <button onclick="editContact('${contact.id}')">Edit</button>
            <button onclick="deleteContact('${contact.id}')">Delete</button>
            `;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching details: ', error);
        }
    });
}
//initialization
let editingID = 0;
const form_1 = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("date");
const balanceInput = document.getElementById("balance");
// const languagesInput=document.getElementById("") as HTMLInputElement;
const photoInput = document.getElementById("fileInput");
const selectElement = document.getElementById("multiselect");
form_1.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const dob = dobInput.value.trim();
    const balance = parseFloat(balanceInput.value.trim());
    const file = (_a = photoInput.files) === null || _a === void 0 ? void 0 : _a[0];
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    const reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        if (editingID !== 0) {
            const contact1 = {
                id: userArrayList.length,
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                languages: selectedOptions,
                balance: balance,
                photo: [base64String]
            };
            updateContact(editingID, contact1);
        }
        else {
            const contact1 = {
                id: userArrayList.length + 1,
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                languages: selectedOptions,
                balance: balance,
                photo: [base64String]
            };
            addContact(contact1);
        }
    };
    if (file) {
        reader.readAsDataURL(file);
    }
    form_1.reset;
});
function addContact(contact_1) {
    userArrayList.push(contact_1);
    renderContacts();
}
function updateContact(editingID, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        userArrayList.forEach(contact_1 => {
            if (editingID == contact_1.id) {
                contact_1.id = contact.id;
                contact_1.name = contact.name;
                contact_1.email = contact.email;
                contact_1.phone = contact.phone;
                contact_1.dob = contact.dob;
                contact_1.balance = contact.balance;
                contact_1.languages = contact.languages;
                contact_1.photo = contact.photo;
            }
        });
        renderContacts();
    });
}
function editContact(editingID1) {
    editingID = parseInt(editingID1);
    const item = userArrayList.find((item) => item.id === editingID);
    if (item) {
        nameInput.value = item.name;
        emailInput.value = item.email;
        phoneInput.value = item.phone;
        balanceInput.value = String(item.balance);
        if (item.languages.length > 0) {
            // Set the value of the select element to the first language in the array
            selectElement.value = item.languages[0];
            // If there are multiple languages, you may want to select additional options or handle them differently
            for (let i = 1; i < item.languages.length; i++) {
                // Assuming each language option has a unique value
                const languageOption = selectElement.querySelector(`option[value="${item.languages[i]}"]`);
                if (languageOption) {
                    languageOption.selected = true;
                }
            }
        }
        else {
            // If no languages are specified, you may want to set a default option or handle it differently
            selectElement.value = ""; // or some default value
        }
        const dobDate = new Date(item.dob);
        const formattedDOB = dobDate.toLocaleDateString("es-CL").split("-");
        const format = formattedDOB[2] + "-" + formattedDOB[1] + "-" + formattedDOB[0];
        dobInput.value = format;
    }
}
function deleteContact(editingID1) {
    editingID = parseInt(editingID1);
    userArrayList = userArrayList.filter((item) => item.id == editingID);
    renderContacts();
}
