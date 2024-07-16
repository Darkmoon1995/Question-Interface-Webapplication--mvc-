document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Save').addEventListener('click', function () {
        console.log('Save button clicked');
        saveData();
    });

    document.getElementById("AddQuestionInterface").addEventListener("click", function () {
        document.querySelector(".popupAddQuestion").style.display = "flex";
    });

    document.getElementById("cancel").addEventListener("click", function () {
        document.querySelector(".popupAddQuestion").style.display = "none";
    });
});

let QuestionCounter = 0;
let questions = [];

function addNewQuestion() {
    document.querySelector(".popupAddQuestion").style.display = "none";
    let number1 = document.getElementById("Number1").value;
    let number2 = document.getElementById("Number2").value;
    if (number1 == "" && number2 == "") {
        alert("Please provide valid inputs.");
        return;
    }
    QuestionCounter++;

    var selectedOperation = document.getElementById('QuestionInterfaceSelctorOperation').value;

    const mainDiv = document.createElement("div");
    mainDiv.className = "number-box";
    mainDiv.setAttribute("name", "4Dive");
    mainDiv.style.display = "flex";
    mainDiv.style.flexDirection = "row";

    const pElement1 = document.createElement("p");
    pElement1.className = "p1BoarderBlack";
    pElement1.id = "ThePQuestionCounter";
    pElement1.textContent = QuestionCounter;

    const pElement2 = document.createElement("p");
    pElement2.className = "p1BoarderBlack";
    pElement2.textContent = number1 + " " + selectedOperation + " " + number2;

    const imgElement = document.createElement("img");
    imgElement.src = "/gif/icons8-settings.gif";
    imgElement.id = "SmallerImage";
    imgElement.addEventListener("click", function () {
        const parts = pElement2.textContent.split(" ");
        const num1 = parts[0];
        const num2 = parts[2];

        document.getElementById("Number1").value = num1;
        document.getElementById("Number2").value = num2;
        document.querySelector(".popupAddQuestion").style.display = "flex";
    });

    const buttonElement = document.createElement("button");
    buttonElement.className = "QuestionInteface";
    buttonElement.id = "RedColor";
    buttonElement.textContent = "Remove";
    buttonElement.type = "button";
    buttonElement.onclick = () => {
        const currentQuestionNumber = parseInt(pElement1.textContent);

        document.querySelectorAll("#ThePQuestionCounter").forEach(p => {
            if (parseInt(p.textContent) > currentQuestionNumber) {
                p.textContent = parseInt(p.textContent) - 1;
            }
        });

        mainDiv.remove();
        QuestionCounter--;
        questions = questions.filter(q => q.order !== currentQuestionNumber);
    };

    questions.push({
        order: QuestionCounter,
        title: number1 + " " + selectedOperation + " " + number2,
        number1: parseInt(number1),
        number2: parseInt(number2),
        operation: selectedOperation,
        numberOfOptions: 4,
        sct: 5
    });

    function createSpacer() {
        const spacer = document.createElement("p");
        spacer.textContent = " ";
        spacer.style.marginRight = "10px";
        return spacer;
    }

    mainDiv.appendChild(pElement1);
    mainDiv.appendChild(createSpacer());
    mainDiv.appendChild(pElement2);
    mainDiv.appendChild(createSpacer());
    mainDiv.appendChild(imgElement);
    mainDiv.appendChild(createSpacer());
    mainDiv.appendChild(buttonElement);

    document.getElementById("MainQuestionDivName").appendChild(mainDiv);

    document.getElementById("Number1").value = "";
    document.getElementById("Number2").value = "";
}

function saveData() {
    const formData = {
        skillId: 100,
        number: 1,
        level: 1,
        title: {
            text: document.getElementById("Title").value,
            config: {
                style: "friendly",
                styledegree: "1"
            }
        },
        finalMessage: {
            text: document.getElementById("FinalMessge").value,
            config: {
                style: "excited",
                styledegree: "2"
            }
        },
        worksheetType: "MathOperation2NumRow",
        qus: questions
    };

    console.log('Data to be sent:', formData);

    $.ajax({
        type: 'POST',
        url: '/Questions/SaveData',
        data: JSON.stringify(formData),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log('Server response:', response);
            alert('Data saved successfully! Worksheet ID: ' + response.worksheetId);
        },
        error: function (response) {
            console.error('Error saving data:', response);
            alert('Error saving data.');
        }
    });
}
