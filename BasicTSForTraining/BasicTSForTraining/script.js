var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var data = [];
var editingId = null;
var form = document.getElementById("form");
var nameInput = document.getElementById("name");
var ageInput = document.getElementById("age");
var tableBody = document.querySelector("#dataTable tbody");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = nameInput.value.trim();
    var age = parseInt(ageInput.value.trim());
    if (editingId !== null) {
        var index = data.findIndex(function (item) { return item.id === editingId; });
        if (index !== -1) {
            data[index] = __assign(__assign({}, data[index]), { name: name, age: age });
            editingId = null;
        }
    }
    else {
        var newData = { id: data.length + 1, name: name, age: age };
        data.push(newData);
    }
    renderTable();
    form.reset();
});
var renderTable = function () {
    tableBody.innerHTML = "";
    data.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = "\n        <td>".concat(item.name, "</td>\n        <td>").concat(item.age, "</td>\n        <td>\n          <button onclick=\"edit(").concat(item.id, ")\">Edit</button>\n          <button onclick=\"remove(").concat(item.id, ")\">Delete</button>\n        </td>\n      ");
        tableBody.appendChild(row);
    });
};
var edit = function (id) {
    editingId = id;
    var item = data.find(function (item) { return item.id === id; });
    if (item) {
        nameInput.value = item.name;
        ageInput.value = String(item.age);
    }
};
var add = function () {
    form.reset();
    editingId = null;
};
var reset = function () {
    form.reset();
    editingId = null;
};
var remove = function (id) {
    data = data.filter(function (item) { return item.id !== id; });
    renderTable();
};
