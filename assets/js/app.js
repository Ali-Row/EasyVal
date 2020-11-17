const profileButton = document.querySelector(".profile");
const helpButton = document.querySelector(".question");
const deleteButtonModal = document.querySelector(".delete");
const modal = document.querySelector(".modal");
const updateInfo = document.querySelector(".update-info");
const deleteInfo = document.querySelector(".delete-info");
const saveStudentButton = document.querySelector(".save");
const inputFields = document.querySelector(".input-fields");
const evalPage = document.querySelector(".eval");

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
