var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var bookmarkTableContent = document.getElementById("tableContent");
var submitBtn = document.getElementById("submitBtn")
var bookmarkData = [];


if (getDataLocalStorage() != null) {
    bookmarkData = getDataLocalStorage();
    displayBookmark();
}



function addBookmark() {

    if (validateInput(bookmarkNameInput) && validateInput(bookmarkURLInput)) {

        var bookmarkDetails = {
            bookmarkName: bookmarkNameInput.value,
            bookmarkURL: bookmarkURLInput.value,
        };
        bookmarkData.push(bookmarkDetails);
        sendDataLocalStorage();
        displayBookmark();

        clearForm();
    }
    else {
        alert('Site Name or URL is not valid, Please follow the rules below :\n - Site name must contain at least 3 characters \n - Site URL must be a valid one ');
    }
}

function displayBookmark() {
    var bBox = ``;
    for (var i = 0; i < bookmarkData.length; i++) {
        bBox += `<tr>
<td class="pt-3">${i + 1}</td>
<td class="pt-3">${bookmarkData[i].bookmarkName}</td>
<td>
    <button class="btn btn-visit" id="visitBtn-${i}" index="${i}">
     <i class="fa-solid fa-eye pe-2"></i>Visit
      </button></td>
<td>
<button class="btn btn-delete pe-2" id="deleteBtn-${i}" index="${i}">
        <i class="fa-solid fa-trash-can"></i>
        Delete
    </button>
    </td>
</tr>`;
    }
    bookmarkTableContent.innerHTML = bBox;
    assignBtnsValue();
}

function assignBtnsValue() {
    for (var i = 0; i < bookmarkData.length; i++) {
        document.getElementById(`visitBtn-${i}`).addEventListener('click', function () {
            var index = this.getAttribute("index");
            // URL of the website you want to open
            var url = `https://${bookmarkData[index].bookmarkURL}`;

            // Open the URL in a new tab
            window.open(url, '_blank');
        })
        document.getElementById(`deleteBtn-${i}`).addEventListener('click', function () {
            var index = this.getAttribute("index");
            bookmarkData.splice(index, 1);
            sendDataLocalStorage();
            displayBookmark();
        })
    }
}

function clearForm() {
    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
}

function sendDataLocalStorage() {
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkData));
}

function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem("Bookmark"));
}


bookmarkNameInput.addEventListener("input", function () {
    validateInput(bookmarkNameInput);

})

bookmarkURLInput.addEventListener("input", function () {
    validateInput(bookmarkURLInput);
})

function validateInput(Input) {
    var RegexList = {
        bookmarkName: /^[a-z]{3}/i,
        bookmarkURL: /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

    if (Input == bookmarkNameInput) {
        var Regex = RegexList.bookmarkName;
    }
    else if (Input == bookmarkURLInput) {
        var Regex = RegexList.bookmarkURL;
    }

    var isValid = Regex.test(Input.value);
    if (isValid) {
        Input.classList.replace("is-invalid", "is-valid");
    }
    else {
        Input.classList.add("is-invalid");
    }
    return isValid;

}
