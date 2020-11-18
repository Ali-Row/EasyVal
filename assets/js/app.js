const profileButton = document.querySelector(".profile-button");
const infoButton = document.querySelector(".info-button");
const darkModeButton = document.querySelector(".dark-mode-button");
const closeModalButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal");
const alertModal = document.querySelector(".alert-modal");
const closeAlertModalButton = document.querySelector(".close-alert-modal-button");
const yesNoModal = document.querySelector(".yes-no-modal");
const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");
const updateInfo = document.querySelector(".update-info");
const deleteInfo = document.querySelector(".delete-info");
const saveStudentButton = document.querySelector(".save");
const inputFields = document.querySelector(".input-fields");
const evalPage = document.querySelector(".eval");
const openEvalFormButton = document.querySelector(".open-eval-form");
const courseTypeButton = document.querySelectorAll("#courseTypeButton");


const showModal = () => {
    modal.classList.add("is-active");
    const modalFullName = document.querySelector(".modal-full-name");
    const modalEmail = document.querySelector(".modal-email");
    const modalClasscode = document.querySelector(".modal-classcode");
    const modalCourseType = document.querySelector(".modal-course-type");
    const modalTutorName = document.querySelector(".modal-tutor-name");

    modalFullName.textContent = "Full Name: " + readFromLocalStorage().fullName;
    modalEmail.textContent = "Email: " + readFromLocalStorage().email;
    modalClasscode.textContent = "Classcode: " + readFromLocalStorage().classcode;
    modalCourseType.textContent = "Course Type: " + readFromLocalStorage().courseType;
    modalTutorName.textContent = "Tutor Name: " + readFromLocalStorage().tutorName;
};

const hideModal = () => {
    modal.classList.remove("is-active");
};

const showYesNoModal = () => {
    yesNoModal.classList.add("is-active");
};

const hideYesNoModal = () => {
    yesNoModal.classList.remove("is-active");
};

const showAlertModal = () => {
    alertModal.classList.add("is-active");
};

const hideAlertModal = () => {
    alertModal.classList.remove("is-active");
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
    const firstName = readFromLocalStorage().fullName.split(' ')[0];
    welcomeMessage.textContent = `👋 Welcome back, ${firstName}!`
};

const showHomeScreen = () => {
    if (inputFields.style.display === "none") {
        inputFields.style.display = "block";
        evalPage.style.display = "none";
    }
};

const getStudentInfo = () => {
    const fullName = document.querySelector(".full-name").value.trim();
    const email = document.querySelector(".email").value.trim();
    const classcode = document.querySelector(".classcode").value.trim();
    const courseType = document.querySelector(".course-type").value.trim();
    const tutorName = document.querySelector(".tutor-name").value.trim();

    const studentObject = new GenerateStudentObject(fullName, email, classcode, courseType, tutorName);
    saveToLocalStorage(studentObject);
};

class GenerateStudentObject {
    constructor(fullName, email, classcode, courseType, tutorName) {
        this.fullName = fullName;
        this.email = email;
        this.classcode = classcode;
        this.courseType = courseType;
        this.tutorName = tutorName;
    }
}

const fillOutForm = () => {

    const fullName = readFromLocalStorage().fullName
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

const toggleDarkMode = () => {
    const html = document.querySelector('html');
    const navbar = document.querySelector('.navbar');
    const button = document.querySelectorAll('.button');
    const input = document.querySelectorAll('.input');
    const modalHeader = document.querySelectorAll('.modal-card-head');
    const modalBody = document.querySelectorAll('.modal-card-body');
    const modalFooter = document.querySelectorAll('.modal-card-foot');
    const hr = document.querySelectorAll('hr');
    const p = document.querySelectorAll('p');
    const footer = document.querySelector('.footer');

    html.classList.toggle('dark-mode-background-is-active');
    navbar.classList.toggle('dark-mode-background-is-active');
    footer.classList.toggle('dark-mode-background-is-active');
    button.forEach(x=>x.classList.toggle('is-dark'));

    input.forEach(x=>x.classList.toggle('dark-mode-is-active-offset'));
    input.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));

    modalHeader.forEach(x=>x.classList.toggle('dark-mode-is-active-offset'));
    modalHeader.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));

    modalBody.forEach(x=>x.classList.toggle('dark-mode-is-active-offset'));
    modalBody.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));

    modalFooter.forEach(x=>x.classList.toggle('dark-mode-is-active-offset'));
    modalFooter.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));

    hr.forEach(x=>x.classList.toggle('dark-mode-background-is-active'));
    hr.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));

    p.forEach(x=>x.classList.toggle('dark-mode-text-is-active'));


}

// If there is data in localStorage generate the eval page else show the home screen.
readFromLocalStorage() ? generateEvalPage() : showHomeScreen();

profileButton.addEventListener("click", () => {
    readFromLocalStorage() ? showModal() : showAlertModal();
});
closeModalButton.addEventListener("click", hideModal);

saveStudentButton.addEventListener("click", () => {
    getStudentInfo();
    generateEvalPage();
});

deleteInfo.addEventListener("click", () => {
    showYesNoModal();
});

yesButton.addEventListener("click", () => {
    const fullName = document.querySelector(".full-name");
    const email = document.querySelector(".email");
    const classcode = document.querySelector(".classcode");
    const courseType = document.querySelector(".course-type");
    const tutorName = document.querySelector(".tutor-name");

    fullName.value = '';
    email.value = '';
    classcode.value = '';
    courseType.value = '';
    tutorName.value = '';
    deleteFromLocalStorage();
    hideYesNoModal();
    hideModal();
    showHomeScreen();  
})

noButton.addEventListener("click", hideYesNoModal)

updateInfo.addEventListener("click", () => {
    showHomeScreen();
    hideModal();
    const fullName = document.querySelector(".full-name");
    const email = document.querySelector(".email");
    const classcode = document.querySelector(".classcode");
    const courseType = document.querySelector(".course-type");
    const tutorName = document.querySelector(".tutor-name");

    fullName.value = readFromLocalStorage().fullName;
    email.value = readFromLocalStorage().email;
    classcode.value = readFromLocalStorage().classcode;
    courseType.value = readFromLocalStorage().courseType;
    tutorName.value = readFromLocalStorage().tutorName;
});

openEvalFormButton.addEventListener("click", fillOutForm);
closeAlertModalButton.addEventListener("click", hideAlertModal);
darkModeButton.addEventListener("click", () => {
    toggleDarkMode();
    const moonIcon = document.querySelector('.fa-moon');
    moonIcon.classList.toggle('rotateIn');
});