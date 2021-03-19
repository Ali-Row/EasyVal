const $ = document;
// All 3 Navbar buttons
const darkModeButton = $.querySelector('.dark-mode-button');
const infoButton = $.querySelector('.info-button');
const profileButton = $.querySelector('.profile-button');
// All modals
const modal = $.querySelector('.modal');
const yesNoModal = $.querySelector('.yes-no-modal');
const alertModal = $.querySelector('.alert-modal');
const infoModal = $.querySelector('.info-modal');
// Close buttons for all modals
const closeModalButton = $.querySelector('.close-button');
const closeAlertModalButton = $.querySelector('.close-alert-modal-button');
const closeInfoModalButton = $.querySelector('.close-info-modal-button');
// Internal buttons for all modals
const updateInfoButton = $.querySelector('.update-info-button');
const deleteInfoButton = $.querySelector('.delete-info-button');
const yesButton = $.querySelector('.yes-button');
const noButton = $.querySelector('.no-button');
// Form
const inputFields = $.querySelector('.input-fields');
const saveStudentButton = $.querySelector('.save-student-button');
const courseTypeMenuButton = $.querySelectorAll('.course-type-item');
// Eval page and generate form button
const evalPage = $.querySelector('.eval-page');
const openEvalFormButton = $.querySelector('.open-eval-form');

const showModalWithStudentData = (modalName) => {
    showModal(modalName);
    const modalFullName = $.querySelector('.modal-full-name');
    const modalEmail = $.querySelector('.modal-email');
    const modalClasscode = $.querySelector('.modal-classcode');
    const modalCourseType = $.querySelector('.modal-course-type');
    const modalTutorName = $.querySelector('.modal-tutor-name');

    modalFullName.innerHTML = 'Full Name: ' + readFromLocalStorage('student-info').fullName;
    modalEmail.textContent = 'Email: ' + readFromLocalStorage('student-info').email;
    modalClasscode.textContent = 'Classcode: ' + readFromLocalStorage('student-info').classcode;
    modalCourseType.textContent = 'Course Type: ' + readFromLocalStorage('student-info').courseType;
    modalTutorName.textContent = 'Tutor Name: ' + readFromLocalStorage('student-info').tutorName;
};

const hideModal = (modalName) => {
    modalName.classList.remove('is-active');
};

const showModal = (modalName) => {
    modalName.classList.add('is-active');
};

const saveToLocalStorage = (data) => {
    localStorage.setItem('student-info', JSON.stringify(data));
};

const readFromLocalStorage = (dataKeyName) => {
    const currentData = JSON.parse(localStorage.getItem(dataKeyName));
    return currentData;
};

const deleteFromLocalStorage = (dataKeyName) => {
    localStorage.removeItem(dataKeyName);
};

const generateEvalPage = () => {
    if (inputFields.style.display === 'none') {
        inputFields.style.display = 'block';
        evalPage.style.display = 'none';
    } else {
        inputFields.style.display = 'none';
        evalPage.style.display = 'block';
    }

    const welcomeMessage = $.querySelector('.welcome-message');
    const firstName = readFromLocalStorage('student-info').fullName.split(' ')[0];
    welcomeMessage.textContent = `👋 Welcome back, ${firstName}!`;
};

const showHomeScreen = () => {
    if (inputFields.style.display === 'none') {
        inputFields.style.display = 'block';
        evalPage.style.display = 'none';
    }
};

const removeActiveClassFromCourse = () => {
    courseTypeMenuButton.forEach(button => button.classList.remove('active'));
}
    courseTypeMenuButton.forEach(button => {         
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            courseType = this.textContent;
            removeActiveClassFromCourse();
            this.classList.add('active');
        })
    });

const getStudentInfo = () => {
    const fullName = $.querySelector('.full-name').value.trim();
    const email = $.querySelector('.email').value.trim();
    const classcode = $.querySelector('.classcode').value.trim();
    const tutorName = $.querySelector('.tutor-name').value.trim();

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
    const fullName = readFromLocalStorage('student-info').fullName;
    const email = readFromLocalStorage('student-info').email;
    const classcode = readFromLocalStorage('student-info').classcode;
    const courseType = readFromLocalStorage('student-info').courseType;
    const tutorName = readFromLocalStorage('student-info').tutorName;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const date = `&entry.401287639_year=${year}&entry.401287639_month=${month}&entry.401287639_day=${day}&entry.307452879=50`;
    const studentInfo = `?&entry.737967299=${fullName}&entry.760591640=${email}&entry.526528092=${classcode}&entry.698926831=No&entry.831839664=${tutorName}&entry.134267295=${courseType}${date}`;
    openEvalFormButton.href = `https://docs.google.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform${studentInfo}`;
};

// helper function to help slimline the dark mode function below
const addDarkModeClass = (element, className) => {
    element.forEach((x) => x.classList.toggle(className));
};

const toggleDarkMode = () => {
    const body = $.querySelector('body');
    const navbar = $.querySelector('.navbar');
    const button = $.querySelectorAll('.button');
    const input = $.querySelectorAll('.input');
    const modalHeader = $.querySelectorAll('.modal-card-head');
    const modalBody = $.querySelectorAll('.modal-card-body');
    const modalFooter = $.querySelectorAll('.modal-card-foot');
    const dropdownMenu = $.querySelector('.dropdown-menu');
    const dropdownToggle = $.querySelector('.dropdown-toggle');
    const hr = $.querySelectorAll('hr');
    const p = $.querySelectorAll('p');
    const footer = $.querySelector('.footer');
    dropdownMenu.classList.toggle('dropdown-menu-dark')
    dropdownToggle.classList.toggle('is-dark')
    body.classList.toggle('dark-mode-background-is-active');
    navbar.classList.toggle('dark-mode-background-is-active');
    footer.classList.toggle('dark-mode-background-is-active');
    addDarkModeClass(button, 'is-dark');
    addDarkModeClass(input, 'dark-mode-is-active-offset');
    addDarkModeClass(input, 'dark-mode-text-is-active');
    addDarkModeClass(modalHeader, 'dark-mode-is-active-offset');
    addDarkModeClass(modalHeader, 'dark-mode-text-is-active');
    addDarkModeClass(modalBody, 'dark-mode-is-active-offset');
    addDarkModeClass(modalBody, 'dark-mode-text-is-active');
    addDarkModeClass(modalFooter, 'dark-mode-is-active-offset');
    addDarkModeClass(modalFooter, 'dark-mode-text-is-active');
    addDarkModeClass(hr, 'dark-mode-background-is-active');
    addDarkModeClass(hr, 'dark-mode-text-is-active');
    addDarkModeClass(p, 'dark-mode-text-is-active');
};

profileButton.addEventListener('click', () => {
    readFromLocalStorage('student-info') ? showModalWithStudentData(modal) : showModal(alertModal);
});

saveStudentButton.addEventListener('click', () => {
    getStudentInfo();
    generateEvalPage();
});

yesButton.addEventListener('click', () => {
    const fullName = $.querySelector('.full-name');
    const email = $.querySelector('.email');
    const classcode = $.querySelector('.classcode');
    const tutorName = $.querySelector('.tutor-name');
    fullName.value = '';
    email.value = '';
    classcode.value = '';
    tutorName.value = '';
    deleteFromLocalStorage('student-info');
    hideModal(modal);
    hideModal(yesNoModal);
    showHomeScreen();
});

noButton.addEventListener('click', () => hideModal(yesNoModal));

closeModalButton.addEventListener('click', () => hideModal(modal));
closeAlertModalButton.addEventListener('click', () => hideModal(alertModal));
closeInfoModalButton.addEventListener('click', () => hideModal(infoModal));
infoButton.addEventListener('click', () => showModal(infoModal));
openEvalFormButton.addEventListener('click', fillOutForm);

updateInfoButton.addEventListener('click', () => {
    showHomeScreen();
    hideModal(modal);
    const fullName = $.querySelector('.full-name');
    const email = $.querySelector('.email');
    const classcode = $.querySelector('.classcode');
    const tutorName = $.querySelector('.tutor-name');
    fullName.value = readFromLocalStorage('student-info').fullName;
    email.value = readFromLocalStorage('student-info').email;
    classcode.value = readFromLocalStorage('student-info').classcode;
    tutorName.value = readFromLocalStorage('student-info').tutorName;
});

deleteInfoButton.addEventListener('click', () => {
    showModal(yesNoModal);
});

darkModeButton.addEventListener('click', () => {
    toggleDarkMode();
    const moonIcon = $.querySelector('.fa-moon');
    moonIcon.classList.toggle('rotateIn');
    const isDarkMode = JSON.parse(localStorage.getItem('is-dark-mode'));
    isDarkMode ? localStorage.setItem('is-dark-mode', false) : localStorage.setItem('is-dark-mode', true);
});

const maybeTryDarkMode = $.querySelector('.maybe-try-dark-mode');
const isDarkMode = readFromLocalStorage('is-dark-mode');
isDarkMode ? toggleDarkMode() : null;
isDarkMode ? (maybeTryDarkMode.textContent = 'Maybe try light mode you might prefer it? 😉') : (maybeTryDarkMode.textContent = 'Maybe try dark mode you might prefer it? 😉');
// If there is data in localStorage generate the eval page else show the home screen.
readFromLocalStorage('student-info') ? generateEvalPage() : showHomeScreen();
