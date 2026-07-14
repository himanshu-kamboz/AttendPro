let editEmployeeId = null;

const saveAttendanceBtn = document.getElementById("saveAttendance");

if (saveAttendanceBtn) {
    saveAttendanceBtn.addEventListener("click", saveAttendance);
}

if (saveAttendanceBtn) {
    saveAttendanceBtn.addEventListener("click", saveAttendance);
}

let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});

function updateTimeDate() {
    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    document.getElementById("current-date").textContent = date;
    document.getElementById("current-time").textContent = time;
}

updateTimeDate();

setInterval(updateTimeDate, 1000);

const employeeForm = document.getElementById("employeeForm");

if (employeeForm) {
    employeeForm.addEventListener("submit", saveEmployees)
}

function saveEmployees(e) {
    e.preventDefault();

    const employee = {
        id: document.getElementById("employeeId").value.trim(),
        name: document.getElementById("employeeName").value.trim(),
        email: document.getElementById("employeeEmail").value.trim(),
        phone: document.getElementById("employeePhone").value.trim(),
        department: document.getElementById("employeeDepartment").value.trim(),
        designation: document.getElementById("employeeDesignation").value.trim(),
        joining: document.getElementById("employeeJoining").value.trim()
    };
    console.log(employee);


    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (editEmployeeId) {

        const index = employees.findIndex(emp => emp.id === editEmployeeId);

        employees[index] = employee;

        editEmployeeId = null;

    } else {

        employees.push(employee);

    }

    localStorage.setItem("employees", JSON.stringify(employees));

    employeeForm.reset();

    displayEmployees();

    alert("Employee Added Successfully!");
}


const employeeTableBody = document.getElementById("employeeTableBody");

const employeeSearch = document.getElementById("employeeSearch");

if (employeeSearch) {
    employeeSearch.addEventListener("input", displayEmployees);
}

const employeeDepartmentFilter = document.getElementById("employeeDepartmentFilter");

if (employeeDepartmentFilter) {
    employeeDepartmentFilter.addEventListener("change", displayEmployees);
}

const employeeSort = document.getElementById("employeeSort");

if (employeeSort) {
    employeeSort.addEventListener("change", displayEmployees);
}

function displayEmployees() {

    if (!employeeTableBody) return;

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    const selectedDepartment = employeeDepartmentFilter.value;

    const sortBy = employeeSort.value;

    const search = employeeSearch ? employeeSearch.value.trim().toLowerCase() : "";

    employees = employees.filter(employee =>
        employee.name.toLowerCase().includes(search) ||
        employee.id.toLowerCase().includes(search)
    );

    if (selectedDepartment !== "") {
        employees = employees.filter(employee =>
            employee.department === selectedDepartment
        );
    }

    if (sortBy === "name") {

        employees.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    }

    if (sortBy === "joining") {

        employees.sort((a, b) => {
            return new Date(a.joining) - new Date(b.joining);
        });

    }

    employeeTableBody.innerHTML = "";

    employees.forEach(employee => {

        employeeTableBody.innerHTML += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.id}</td>
                <td>${employee.department}</td>
                <td>${employee.designation}</td>
                <td>
                    <button class="action-btn btn-ghost" data-action="view" data-id="EMP003"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg></button>
                   <button class="action-btn btn-ghost"
                    onclick="editEmployee('${employee.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></button>
                   <button class="action-btn btn-danger"
                    onclick="deleteEmployee('${employee.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M2 21a8 8 0 0 1 11.873-7"/>
                        <circle cx="10" cy="8" r="5"/>
                        <path d="m17 17 5 5"/>
                        <path d="m22 17-5 5"/>
                    </svg>
                </button>

                </td>
            </tr>
        `;

    })

}

displayEmployees();

function deleteEmployee(id) {

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees = employees.filter(employee => employee.id !== id);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

}

function editEmployee(id) {

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    let employee = employees.find(emp => emp.id === id);

    if (!employee) {
        alert("Employee not found");
        return;
    }

    document.getElementById("employeeId").value = employee.id;
    document.getElementById("employeeName").value = employee.name;
    document.getElementById("employeeEmail").value = employee.email;
    document.getElementById("employeePhone").value = employee.phone;
    document.getElementById("employeeDepartment").value = employee.department;
    document.getElementById("employeeDesignation").value = employee.designation;
    document.getElementById("employeeJoining").value = employee.joining;

    editEmployeeId = id;
}

const attendanceTableBody = document.getElementById("attendanceTableBody");

function displayAttendanceEmployees() {

    if (!attendanceTableBody) return;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    attendanceTableBody.innerHTML = "";

    employees.forEach(employee => {

        attendanceTableBody.innerHTML += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.designation}</td>
                <td>
                    <select class="status-select" data-id="${employee.id}">
                    <option value="Present" selected="">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Work From Home">Work From Home</option>
                  </select>


                </td>
            </tr>
        `;
    });

}

displayAttendanceEmployees();

function saveAttendance() {

    const attendance = [];

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const date = document.getElementById("attendanceDate").value;

    if (!date) {
        alert("Please select a date.");
        return;
    }

    const statusSelects = document.querySelectorAll(".status-select");

    statusSelects.forEach((select, index) => {

        attendance.push({

            id: employees[index].id,
            name: employees[index].name,
            department: employees[index].department,
            designation: employees[index].designation,
            date: date,
            status: select.value

        });

    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("Attendance Saved Successfully!");

}

const statusSelects = document.querySelectorAll(".status-select");

function updateDashboard() {

    const totalEmployees = document.getElementById("totalEmployees");
    const presentEmployees = document.getElementById("presentEmployees");
    const absentEmployees = document.getElementById("absentEmployees");
    const leaveEmployees = document.getElementById("leaveEmployees");

    if (!totalEmployees) return;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    totalEmployees.textContent = employees.length;

    const present = attendance.filter(emp => emp.status === "Present").length;
    const absent = attendance.filter(emp => emp.status === "Absent").length;
    const leave = attendance.filter(emp => emp.status === "Leave").length;

    presentEmployees.textContent = present;
    absentEmployees.textContent = absent;
    leaveEmployees.textContent = leave;
}

updateDashboard();

const recentAttendanceBody = document.getElementById("recentAttendanceBody");

function displayRecentAttendance() {

    if (!recentAttendanceBody) return;

    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    recentAttendanceBody.innerHTML = "";

    attendance.forEach(record => {

        recentAttendanceBody.innerHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.department}</td>
                <td>${record.date}</td>
                <td>${record.status}</td>
            </tr>
        `;

    });

}

displayRecentAttendance();

const historyTableBody = document.getElementById("historyTableBody");

const historySearch = document.getElementById("historySearch");

if (historySearch) {
    historySearch.addEventListener("input", displayHistory);
}

const historyDateFilter = document.getElementById("historyDateFilter");

if (historyDateFilter) {
    historyDateFilter.addEventListener("change", displayHistory);
}

const historyDepartmentFilter = document.getElementById("historyDepartmentFilter");

if (historyDepartmentFilter) {
    historyDepartmentFilter.addEventListener("change", displayHistory);
}

const historySort = document.getElementById("historySort");

if (historySort) {
    historySort.addEventListener("change", displayHistory);
}

function displayHistory() {

    if (!historyTableBody) return;

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const search = historySearch ? historySearch.value.trim().toLowerCase() : "";

    const selectedDepartment = historyDepartmentFilter
        ? historyDepartmentFilter.value
        : "";

    const sortBy = historySort ? historySort.value : "date-desc";

    const selectedDate = historyDateFilter ? historyDateFilter.value : "";

    attendance = attendance.filter(record =>
        record.name.toLowerCase().includes(search) ||
        record.id.toLowerCase().includes(search)
    );

    if (selectedDate !== "") {

        attendance = attendance.filter(record =>
            record.date === selectedDate
        );

    }

    if (selectedDepartment !== "") {

        attendance = attendance.filter(record =>
            record.department === selectedDepartment
        );

    }

    if (sortBy === "date-desc") {

        attendance.sort((a, b) => new Date(b.date) - new Date(a.date));

    }

    else if (sortBy === "date-asc") {

        attendance.sort((a, b) => new Date(a.date) - new Date(b.date));

    }

    else if (sortBy === "name") {

        attendance.sort((a, b) => a.name.localeCompare(b.name));

    }

    historyTableBody.innerHTML = "";

    attendance.forEach(record => {

        historyTableBody.innerHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.department}</td>
                <td>${record.date}</td>
                <td>${record.status}</td>
            </tr>
        `;

    });

}

displayHistory();

function updateReports() {

    const totalEmployees = document.getElementById("reportTotalEmployees");
    const presentEmployees = document.getElementById("reportPresentEmployees");
    const absentEmployees = document.getElementById("reportAbsentEmployees");
    const leaveEmployees = document.getElementById("reportLeaveEmployees");

    if (!totalEmployees) return;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    totalEmployees.textContent = employees.length;

    presentEmployees.textContent =
        attendance.filter(emp => emp.status === "Present").length;

    absentEmployees.textContent =
        attendance.filter(emp => emp.status === "Absent").length;

    leaveEmployees.textContent =
        attendance.filter(emp => emp.status === "Leave").length;

}

updateReports();

const reportTableBody = document.getElementById("reportTableBody");

function displayReports() {

    if (!reportTableBody) return;

    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const departments = {};

    attendance.forEach(record => {

        if (!departments[record.department]) {

            departments[record.department] = {
                present: 0,
                absent: 0,
                leave: 0,
                halfDay: 0,
                wfh: 0
            };

        }

        switch (record.status) {

            case "Present":
                departments[record.department].present++;
                break;

            case "Absent":
                departments[record.department].absent++;
                break;

            case "Leave":
                departments[record.department].leave++;
                break;

            case "Half Day":
                departments[record.department].halfDay++;
                break;

            case "Work From Home":
                departments[record.department].wfh++;
                break;

        }

    });

    reportTableBody.innerHTML = "";

    for (let department in departments) {

        reportTableBody.innerHTML += `
            <tr>
                <td>${department}</td>
                <td>${departments[department].present}</td>
                <td>${departments[department].absent}</td>
                <td>${departments[department].leave}</td>
                <td>${departments[department].halfDay}</td>
                <td>${departments[department].wfh}</td>
            </tr>
        `;

    }

}

displayReports();

const exportDataBtn = document.getElementById("exportData");

if (exportDataBtn) {
    exportDataBtn.addEventListener("click", exportAttendance);
}

function exportAttendance() {

    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    if (attendance.length === 0) {
        alert("No attendance records found!");
        return;
    }

    const jsonData = JSON.stringify(attendance, null, 2);

    const blob = new Blob([jsonData], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-report.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

const backupDataBtn = document.getElementById("backupData");

if (backupDataBtn) {
    backupDataBtn.addEventListener("click", backupData);
}

function backupData() {

    const data = {
        employees: JSON.parse(localStorage.getItem("employees")) || [],
        attendance: JSON.parse(localStorage.getItem("attendance")) || []
    };

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "AttendPro-Backup.json";

    link.click();

    URL.revokeObjectURL(url);

}

const restoreDataInput = document.getElementById("restoreData");

if (restoreDataInput) {
    restoreDataInput.addEventListener("change", restoreData);
}

function restoreData(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const data = JSON.parse(e.target.result);

            localStorage.setItem(
                "employees",
                JSON.stringify(data.employees || [])
            );

            localStorage.setItem(
                "attendance",
                JSON.stringify(data.attendance || [])
            );

            alert("Backup Restored Successfully!");

            location.reload();

        } catch (error) {

            alert("Invalid Backup File!");

        }

    };

    reader.readAsText(file);

}

const clearDataBtn = document.getElementById("clearData");

if (clearDataBtn) {
    clearDataBtn.addEventListener("click", clearAllData);
}

function clearAllData() {

    const confirmDelete = confirm(
        "Are you sure you want to delete all data?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem("employees");
    localStorage.removeItem("attendance");
    localStorage.removeItem("tasks");
    localStorage.removeItem("loggedIn");

    alert("All Data Deleted Successfully!");

    window.location.href = "index.html";

}

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
}

function toggleTheme() {

    if (themeToggle.checked) {

        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");

    } else {

        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");

    }

}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.checked = true;
    }

}