const $ = document;
const profileButton = $.querySelector(".profile-button");
const infoButton = $.querySelector(".info-button");
const darkModeButton = $.querySelector(".dark-mode-button");
const closeModalButton = $.querySelector(".close-button");
const modal = $.querySelector(".modal");
const alertModal = $.querySelector(".alert-modal");
const infoModal = $.querySelector(".info-modal");
const closeInfoModalButton = $.querySelector(".close-info-modal-button");
const closeAlertModalButton = $.querySelector(".close-alert-modal-button");
const yesNoModal = $.querySelector(".yes-no-modal");
const yesButton = $.querySelector(".yes-button");
const noButton = $.querySelector(".no-button");
const updateInfo = $.querySelector(".update-info");
const deleteInfo = $.querySelector(".delete-info");
const saveStudentButton = $.querySelector(".save");
const inputFields = $.querySelector(".input-fields");
const evalPage = $.querySelector(".eval");
const openEvalFormButton = $.querySelector(".open-eval-form");
const courseTypeButton = $.querySelectorAll("#courseTypeButton");


const showModal = () => {
    modal.classList.add("is-active");
    const modalFullName = $.querySelector(".modal-full-name");
    const modalEmail = $.querySelector(".modal-email");
    const modalClasscode = $.querySelector(".modal-classcode");
    const modalCourseType = $.querySelector(".modal-course-type");
    const modalTutorName = $.querySelector(".modal-tutor-name");

    modalFullName.innerHTML = "Full Name: " + readFromLocalStorage().fullName;
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
const showInfoModal = () => {
    infoModal.classList.add("is-active");
};

const hideInfoModal = () => {
    infoModal.classList.remove("is-active");
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

    const welcomeMessage = $.querySelector('.welcome-message');
    const firstName = readFromLocalStorage().fullName.split(' ')[0];
    welcomeMessage.textContent = `👋 Welcome back, ${firstName}!`
};

const showHomeScreen = () => {
    if (inputFields.style.display === "none") {
        inputFields.style.display = "block";
        evalPage.style.display = "none";
    }
};

const getStudentInfo = (event) => {
    const fullName = $.querySelector(".full-name").value.trim();
    const email = $.querySelector(".email").value.trim();
    const classcode = $.querySelector(".classcode").value.trim();
    const courseType = $.querySelector(".course-type").value.trim();
    const tutorName = $.querySelector(".tutor-name").value.trim();

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
    const courseType = readFromLocalStorage().courseType;
    const tutorName = readFromLocalStorage().tutorName;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    

    const date = `&entry.401287639_year=${year}&entry.401287639_month=${month}&entry.401287639_day=${day}&entry.307452879=50`
    const studentInfo = `?&entry.737967299=${fullName}&entry.760591640=${email}&entry.526528092=${classcode}&entry.698926831=No&entry.831839664=${tutorName}&entry.134267295=${courseType}${date}`;
    openEvalFormButton.href = `https://docs.google.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform${studentInfo}`
}
// helper function to help with the dark mode function below
const darkModeHelper = (element, className) => {
    element.forEach(x=>x.classList.toggle(className));
}

const toggleDarkMode = () => {
    const html = $.querySelector('html');
    const navbar = $.querySelector('.navbar');
    const button = $.querySelectorAll('.button');
    const input = $.querySelectorAll('.input');
    const modalHeader = $.querySelectorAll('.modal-card-head');
    const modalBody = $.querySelectorAll('.modal-card-body');
    const modalFooter = $.querySelectorAll('.modal-card-foot');
    const hr = $.querySelectorAll('hr');
    const p = $.querySelectorAll('p');
    const footer = $.querySelector('.footer');

    html.classList.toggle('dark-mode-background-is-active');
    navbar.classList.toggle('dark-mode-background-is-active');
    footer.classList.toggle('dark-mode-background-is-active');

    darkModeHelper(button, 'is-dark');
    darkModeHelper(input, 'dark-mode-is-active-offset');
    darkModeHelper(input, 'dark-mode-text-is-active');
    darkModeHelper(modalHeader, 'dark-mode-is-active-offset');
    darkModeHelper(modalHeader, 'dark-mode-text-is-active');
    darkModeHelper(modalBody, 'dark-mode-is-active-offset');
    darkModeHelper(modalBody, 'dark-mode-text-is-active');
    darkModeHelper(modalFooter, 'dark-mode-is-active-offset');
    darkModeHelper(modalFooter, 'dark-mode-text-is-active');
    darkModeHelper(hr, 'dark-mode-background-is-active');
    darkModeHelper(hr, 'dark-mode-text-is-active');
    darkModeHelper(p, 'dark-mode-text-is-active');
}


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
    const fullName = $.querySelector(".full-name");
    const email = $.querySelector(".email");
    const classcode = $.querySelector(".classcode");
    const courseType = $.querySelector(".course-type");
    const tutorName = $.querySelector(".tutor-name");

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
    const fullName = $.querySelector(".full-name");
    const email = $.querySelector(".email");
    const classcode = $.querySelector(".classcode");
    const courseType = $.querySelector(".course-type");
    const tutorName = $.querySelector(".tutor-name");

    fullName.value = readFromLocalStorage().fullName;
    email.value = readFromLocalStorage().email;
    classcode.value = readFromLocalStorage().classcode;
    courseType.value = readFromLocalStorage().courseType;
    tutorName.value = readFromLocalStorage().tutorName;
});

openEvalFormButton.addEventListener("click", fillOutForm);
infoButton.addEventListener("click", showInfoModal);
closeInfoModalButton.addEventListener("click", hideInfoModal);
closeAlertModalButton.addEventListener("click", hideAlertModal);
darkModeButton.addEventListener("click", () => {
    toggleDarkMode();
    const moonIcon = $.querySelector('.fa-moon');
    moonIcon.classList.toggle('rotateIn');
    const isDarkMode = JSON.parse(localStorage.getItem('is-dark-mode'));
    isDarkMode ? localStorage.setItem('is-dark-mode', false) : localStorage.setItem('is-dark-mode', true);  
});
const maybeTryDarkMode = $.querySelector('.maybe-try-dark-mode');
const isDarkMode = JSON.parse(localStorage.getItem('is-dark-mode'));
isDarkMode ? toggleDarkMode() : null;
isDarkMode ? maybeTryDarkMode.textContent = 'Maybe try light mode you might prefer it? 😉' : maybeTryDarkMode.textContent = 'Maybe try dark mode you might prefer it? 😉';

// If there is data in localStorage generate the eval page else show the home screen.
readFromLocalStorage() ? generateEvalPage() : showHomeScreen();