"use strict";
const table = document.querySelector('table');
const tb = document.querySelector('tbody');
const form = document.querySelector('form');
const loader = document.getElementById('loader');
const searchForm = document.getElementById('search-form');
const btnContainer = document.getElementById('btn-container');
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const name = formData.get('name')?.toString().split(' ').sort().map(str => str.toLowerCase()).join("");
    const url = "https://dbms-dxyg.onrender.com/students/search?name=" + name;
    console.log(url);
    await fetchStudents(url);
    searchForm.reset();
});
// Api details
const url = "https://dbms-dxyg.onrender.com/students?program";
function createEl(arg) {
    return document.createElement(arg);
}
let isLoading;
async function fetchStudents(url) {
    const token = localStorage.getItem('token');
    try {
        // Set loading state
        isLoading = true;
        loader.style.display = "block";
        table.style.display = "none";
        // Fetch data
        const res = await fetchWithToken(url, 'GET', token);
        // Check if the response is okay
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const { currentPage, data: students, nextPage, previousPage, totalCount } = data;
        // Render the students
        renderStudents(students);
        // Update buttons
        btnContainer.innerHTML = `
            <button 
                ${previousPage ? `onclick="fetchStudents('${encodeURI("https://" + previousPage)}')"` : "disabled"}>
                Previous
            </button>          
            <button 
                ${nextPage ? `onclick="fetchStudents('${encodeURI("https://" + nextPage)}')"` : "disabled"}>
                Next
            </button>
        `;
    }
    catch (error) {
        console.error("Error fetching students:", error);
    }
    finally {
        // Reset loading state
        isLoading = false;
        loader.style.display = "none";
        table.style.display = "block";
    }
}
function renderStudents(arr) {
    tb.replaceChildren();
    if (arr.length > 0) {
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
    return;
}
fetchStudents(url);
function handleSelect(evt) {
    const el = evt.target;
    console.log(el.value);
}
function fetchWithToken(url, method, token, body) {
    return fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body
    });
}
