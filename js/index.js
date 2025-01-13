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
const table = document.querySelector('table');
const tb = document.querySelector('tbody');
const form = document.querySelector('form');
const loader = document.getElementById('loader');
// Api details
const url = "https://dbms-dxyg.onrender.com/students";
function createEl(arg) {
    return document.createElement(arg);
}
let isLoading;
function fetchStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        try {
            isLoading = true;
            loader.style.display = "block";
            table.style.display = 'none';
            const res = yield fetch(url);
            data = yield res.json();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            isLoading = false;
            loader.style.display = "none";
            table.style.display = 'block';
        }
        return data;
    });
}
function renderStudents(arr) {
    arr.forEach(x => {
        const newDate = new Date(x.dob);
        const date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: "numeric",
            day: "numeric"
        }).format(newDate);
        const row = createEl('tr');
        const fName = createEl('td');
        const lName = createEl('td');
        const dob = createEl('td');
        const program = createEl('td');
        const year = createEl('td');
        const action = createEl('td');
        fName.innerText = x.fName;
        lName.innerText = x.lName;
        dob.innerText = date;
        program.innerText = x.program;
        year.innerText = x.year.toString();
        action.innerHTML = `<a class="action" href="student.html?id=${x._id}">View more</a>`;
        row.appendChild(fName);
        row.appendChild(lName);
        row.appendChild(dob);
        row.appendChild(program);
        row.appendChild(year);
        row.appendChild(action);
        tb.appendChild(row);
    });
}
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchStudents();
        renderStudents(data);
    });
}
load();
