function goToPage() {
    const spanText = document.querySelector('.aboveText').textContent;
    localStorage.setItem('spanText', spanText);
    window.location.href = 'Subject'; 
}
document.addEventListener('DOMContentLoaded', function () {
    const spanText = localStorage.getItem('spanText');
    if (spanText) {
        document.getElementById('displaySpanText').textContent = spanText;
    }
});
function createButtonsFromJson(jsonData) {
    jsonData.forEach(data => {
        let worksheetId = data.worksheetId;
        let numberOfOptions = data.qus.length;

        let button = document.createElement('button');
        button.type = 'button';
        button.id = 'backgroundcolor1';
        button.innerHTML = `
            <span class="aboveText" style="font-size: 1.6rem;">${worksheetId}</span>
            <br>
            <span class="text-nowrap" style="font-size: 1rem;">${numberOfOptions}</span>
        `;

        document.body.appendChild(button);
    });
}

document.getElementById("AddQuestionInterface").addEventListener("click", function () {
    document.querySelector(".popupAddQuestion").style.display = "flex";
})
document.getElementById("cancel").addEventListener("click", function () {
    document.querySelector(".popupAddQuestion").style.display = "none";
})
function addNewQuestion() {
  // Create the main div:
  const mainDiv = document.createElement("div");
  mainDiv.className = "number-box";
  mainDiv.setAttribute("name", "4Dave");

  // Create the first p1 element:
  const p1Element1 = document.createElement("p1");
  p1Element1.className = "p1BoarderBlack";
  p1Element1.textContent = "2";
  
  // Create the second p1 element:
  const p1Element2 = document.createElement("p1");
  p1Element2.className = "p1BoarderBlack";
  p1Element2.textContent = "3 + 5";
  
  // Create the image element:
  const imgElement = document.createElement("img");
  imgElement.src = "~/gif/icons8-settings.gif";
  imgElement.id = "SmallerImage";
  
  // Create the button element:
  const buttonElement = document.createElement("button");
  buttonElement.className = "QuestionInteface";
  buttonElement.id = "RedColor";
  buttonElement.textContent = "Remove";

  // Append all child elements to the main div:
  mainDiv.appendChild(p1Element1);
  mainDiv.appendChild(p1Element2);
  mainDiv.appendChild(imgElement);
  mainDiv.appendChild(buttonElement);

  // Append the main div to the MainQuestionDivName:
  document.getElementById("MainQuestionDivName").appendChild(mainDiv);
}