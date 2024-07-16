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
    let sct = document.getElementById("Sct").value;
    if (number1 === "" || number2 === "" || sct === "") {
        alert("Please provide valid inputs.");
        return;
    }
    QuestionCounter++;

    const selectedOperation = document.getElementById('QuestionInterfaceSelctorOperation').value;

    const mainDiv = document.createElement("div");
    mainDiv.className = "number-box";
    mainDiv.style.display = "flex";
    mainDiv.style.flexDirection = "row";

    const pElement1 = document.createElement("p");
    pElement1.className = "p1BoarderBlack";
    pElement1.id = "ThePQuestionCounter";
    pElement1.textContent = QuestionCounter;

    const pElement2 = document.createElement("p");
    pElement2.className = "p1BoarderBlack";
    pElement2.textContent = number1 + " " + selectedOperation + " " + number2;

    const pElement3 = document.createElement("p");
    pElement3.className = "p1BoarderBlack";
    pElement3.textContent = "In " +sct +" Seconds" ;

    const imgElement = document.createElement("img");
    imgElement.src = "/gif/icons8-settings.gif";
    imgElement.id = "SmallerImage";
    imgElement.addEventListener("click", function () {
        const parts = pElement2.textContent.split(" ");
        const num1 = parts[0];
        const num2 = parts[2];

        document.getElementById("Number1").value = num1;
        document.getElementById("Number2").value = num2;
        document.getElementById('QuestionInterfaceSelctorOperation').value = sct;

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
        title: {
            text: number1 + " " + selectedOperation + " " + number2,
            config: {
                style: "cheerful", 
                styledegree: "1"  // Default value
            }
        },
        settings: {
            number1: parseInt(number1),
            number2: parseInt(number2),
            operation: selectedOperation
        },
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
    mainDiv.appendChild(pElement3);
    mainDiv.appendChild(createSpacer());
    mainDiv.appendChild(imgElement);
    mainDiv.appendChild(createSpacer());
    mainDiv.appendChild(buttonElement);


    document.getElementById("MainQuestionDivName").appendChild(mainDiv);

    document.getElementById("Number1").value = "";
    document.getElementById("Number2").value = "";
    document.getElementById("Sct").value = "" ; 
}

function saveData() {
    const formData = {
        skillId: 100,         // Example static value
        number: 1,            // Example static value
        level: 1,             // Example static value
        title: {
            text: document.getElementById("Title").value,
            config: {
                style: "friendly",     // Example static value
                styledegree: "1"       // Example static value
            }
        },
        finalMessage: {
            text: document.getElementById("FinalMessge").value,
            config: {
                style: "excited",      // Example static value
                styledegree: "2"       // Example static value
            }
        },
        worksheetType: "MathOperation2NumRow",  // Example static value
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
