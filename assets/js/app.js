const profileButton = document.querySelector(".profile");
const helpButton = document.querySelector(".question");
const deleteButtonModal = document.querySelector(".delete");
const modal = document.querySelector(".modal");
const updateInfo = document.querySelector(".update-info");
const deleteInfo = document.querySelector(".delete-info");
const saveStudentButton = document.querySelector(".save");
const inputFields = document.querySelector(".input-fields");
const evalPage = document.querySelector(".eval");
const openEvalFormButton = document.querySelector(".open-eval-form");


const showModal = () => {
    modal.classList.add("is-active");
    const modalName = document.querySelector(".modal-name");
    const modalEmail = document.querySelector(".modal-email");
    const modalClasscode = document.querySelector(".modal-classcode");
    const modalCourseType = document.querySelector(".modal-course-type");
    const modalTutorName = document.querySelector(".modal-tutor-name");


    modalName.textContent = "Name: " + readFromLocalStorage().name;
    modalEmail.textContent = "Email: " + readFromLocalStorage().email;
    modalClasscode.textContent = "Classcode: " + readFromLocalStorage().classcode;
    modalCourseType.textContent = "Course Type: " + readFromLocalStorage().courseType;
    modalTutorName.textContent = "Tutor Name: " + readFromLocalStorage().tutorName;

};

const hideModal = () => {
    modal.classList.remove("is-active");
};

const saveToLocalStorage = (data) => {
    localStorage.setItem("student-info", JSON.stringify(data));
};

const readFromLocalStorage = () => {
    const currentData = JSON.parse(localStorage.getItem("student-info"));
    return currentData;
};

const deleteFromLocalStorage = () => {
    localStorage.removeItem("student-info");
};

const generateEvalPage = () => {
    if (inputFields.style.display === "none") {
        inputFields.style.display = "block";
        evalPage.style.display = "none";
    } else {
        inputFields.style.display = "none";
        evalPage.style.display = "block";
    }

    const welcomeMessage = document.querySelector('.welcome-message');
    const firstName = readFromLocalStorage().name.split(' ')[0];
    welcomeMessage.textContent = `👋 Welcome back, ${firstName}!`
};

const showHomeScreen = () => {
    if (inputFields.style.display === "none") {
        inputFields.style.display = "block";
        evalPage.style.display = "none";
    }
};

const getStudentInfo = () => {
    const name = document.querySelector(".name").value.trim();
    const email = document.querySelector(".email").value.trim();
    const classcode = document.querySelector(".classcode").value.trim();
    const courseType = document.querySelector(".course-type").value.trim();
    const tutorName = document.querySelector(".tutor-name").value.trim();
    const studentObject = new GenerateStudentObject(name, email, classcode, courseType, tutorName);
    saveToLocalStorage(studentObject);
};

class GenerateStudentObject {
    constructor(name, email, classcode, courseType, tutorName) {
        this.name = name;
        this.email = email;
        this.classcode = classcode;
        this.courseType = courseType;
        this.tutorName = tutorName;
    }
}

const fillOutForm = () => {

    const fullName = readFromLocalStorage().name
    const email = readFromLocalStorage().email
    const classcode = readFromLocalStorage().classcode
    const courseType = "FSF - Full Stack Flex Web Development(Javascript)";
    const tutorName = readFromLocalStorage().tutorName.split(' ').reverse().join(', ');
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const date = `&entry.401287639_year=${year}&entry.401287639_month=${month}&entry.401287639_day=${day}`
    const studentInfo = `?&entry.737967299=${fullName}&entry.760591640=${email}&entry.526528092=${classcode}&entry.698926831=No&entry.831839664=${tutorName}&entry.134267295=${courseType}${date}`;
    openEvalFormButton.href = `https://docs.google.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform${studentInfo}`
}

// If there is data in localStorage generate the eval page else show the home screen.
readFromLocalStorage() ? generateEvalPage() : showHomeScreen();

profileButton.addEventListener("click", () => {
    readFromLocalStorage() ? showModal() : alert('Fill out fields first');
});
deleteButtonModal.addEventListener("click", hideModal);

saveStudentButton.addEventListener("click", () => {
    getStudentInfo();
    generateEvalPage();
});

deleteInfo.addEventListener("click", () => {
    deleteFromLocalStorage();
    window.location.reload();
});

updateInfo.addEventListener("click", () => {
    showHomeScreen();
    hideModal();
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const classcode = document.querySelector(".classcode");
    const courseType = document.querySelector(".course-type");
    const tutorName = document.querySelector(".tutor-name");

    name.value = readFromLocalStorage().name;
    email.value = readFromLocalStorage().email;
    classcode.value = readFromLocalStorage().classcode;
    courseType.value = readFromLocalStorage().courseType;
    tutorName.value = readFromLocalStorage().tutorName;
});

openEvalFormButton.addEventListener("click", fillOutForm);
