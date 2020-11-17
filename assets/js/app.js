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

    modalName.textContent = "Name: " + readFromLocalStorage().name;
    modalEmail.textContent = "Email: " + readFromLocalStorage().email;
    modalClasscode.textContent = "Classcode: " + readFromLocalStorage().classcode;
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
    const studentObject = new GenerateStudentObject(name, email, classcode);
    saveToLocalStorage(studentObject);
};

class GenerateStudentObject {
    constructor(name, email, classcode) {
        this.name = name;
        this.email = email;
        this.classcode = classcode;
    }
}

const fillOutForm = () => {
    const name = readFromLocalStorage().name
    const email = readFromLocalStorage().email
    const classcode = readFromLocalStorage().classcode
    // openEvalFormButton.href = `https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform?&entry.1626809215=${classcode}&entry.1262798942=${name}&entry.1509111758=${email}&entry.737967299=Alistair%20Rowden`
    openEvalFormButton.href = `eval form link goes here!!`
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
});
openEvalFormButton.addEventListener("click", fillOutForm)
