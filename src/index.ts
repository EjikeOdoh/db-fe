const table = document.querySelector('table')!
const tb = document.querySelector('tbody')!
const form = document.querySelector('form')!
const loader = document.getElementById('loader')!


type Student = {
    _id: string,
    fName: string,
    lName: string,
    dob: Date,
    country: string,
    program: string,
    year: number
}

// Api details
const url: string = "https://dbms-dxyg.onrender.com/students";

function createEl(arg: string): HTMLElement {
    return document.createElement(arg)
}

let isLoading: boolean;

async function fetchStudents(): Promise<Student[]> {
    let data: Student[] = []
    try {
        isLoading = true
        loader.style.display = "block"
        table.style.display = 'none'
        const res = await fetch(url)
        data = await res.json()
       
    } catch (error) {
        console.log(error)
    } finally {
        isLoading = false
        loader.style.display = "none"
        table.style.display = 'block'
    }
    return data
}

function renderStudents(arr: Student[]) {
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
    }
    )
}

async function load() {
    const data = await fetchStudents()
    renderStudents(data)
}

load()

