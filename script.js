const container = document.querySelector('.container');
let isDragging = false;
let initialX;
let initialY;
let currentX;
let currentY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener('mousedown', dragStart);
container.addEventListener('mousemove', drag);
container.addEventListener('mouseup', dragEnd);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === container) {
    isDragging = true;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, container);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

const centralNode = document.querySelector('.central-node');
const surroundingNodes = document.querySelectorAll('.surrounding-node');
const surroundingexpandNode = document.querySelectorAll(".surrounding-nodeexpand");

function centerContainer() {
  const container = document.querySelector('.container');
  container.style.transition = 'transform 0.5s ease';
  container.style.transform = 'translate(0, 0)';
}
var chooseEXPAND = 0;
centralNode.addEventListener('click', () => {
  centerContainer();
});
surroundingNodes.forEach(node => {
  node.addEventListener('click', () => {
    

    const nodePosition = node.getBoundingClientRect();
    const nodeX = nodePosition.x + nodePosition.width / 2;
    const nodeY = nodePosition.y + nodePosition.height / 2;

    const centralNodePosition = centralNode.getBoundingClientRect();
    const centralNodeX = centralNodePosition.x + centralNodePosition.width / 2;
    const centralNodeY = centralNodePosition.y + centralNodePosition.height / 2;

    
    const distanceX = centralNodeX - nodeX;
    const distanceY = centralNodeY - nodeY;

    if(node.classList.contains("node-1")) {
      chooseEXPAND = 0;
    } else if(node.classList.contains("node-2")) {
      chooseEXPAND = 1;
    }
    else if(node.classList.contains("node-3")){
      chooseEXPAND = 2;
    }
    else if(node.classList.contains("node-4")){
      chooseEXPAND = 3;
    }
    else if(node.classList.contains("node-5")){
      chooseEXPAND = 4;
    }
    else if(node.classList.contains("node-6")){
      chooseEXPAND = 5;
    }
    
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    const prompt = "a paragraph about" + node.textContent + " that gives concise and useful information taking into account" + surroundingexpandNode[chooseEXPAND].textContent + "and the main topic being" + centralNode.textContent
    
    const url = "https://api.openai.com/v1/completions"
    const apiKey = "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"


    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
    

    const requestBody = JSON.stringify({
      
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 120,
      n: 1,
      temperature: 0.5 // Change this value to adjust the temperature
    })

    console.log("Sending request to OpenAI API...")
    fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody
    })
    .then(response => response.json())
    .then(data => {
      console.log("Received response from OpenAI API:", data)
      const result = data.choices[0].text
      console.log(result) 
      
      const dataArray = result.split("\n"); // split the string into an array of substrings

      while (dataArray.length > 0 && dataArray[0].trim() === "") {
        dataArray.shift();
      }

      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = dataArray[i].replace(/^\d+\./, "").trim();
      }
      surroundingexpandNode[chooseEXPAND].textContent = dataArray;  

      
    })
    .catch(error => {
      console.error("Error from OpenAI API:", error)
    })

      }
  );





const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTime, 1000);
const inputField = document.getElementById('input-field');

inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    
    centralNode.textContent = inputField.value
    
    const prompt = "subtopics about" + inputField.value + "that appear in a list one after another with six elements in the list"
    
    const url = "https://api.openai.com/v1/completions"
    const apiKey = "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"


    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }


    const requestBody = JSON.stringify({
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 120,
      n: 1,
      temperature: 0.5 // Change this value to adjust the temperature
    })

    console.log("Sending request to OpenAI API...")
    fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody
    })

    .then(response => response.json())
    .then(data => {
      console.log("Received response from OpenAI API:", data)
      const result = data.choices[0].text
      console.log(result) 
      
      const dataArray = result.split("\n"); // split the string into an array of substrings

      while (dataArray.length > 0 && dataArray[0].trim() === "") {
        dataArray.shift();
      }

      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = dataArray[i].replace(/^\d+\./, "").trim();
      }

      console.log(dataArray);
      surroundingNodes.forEach((node, index) => {
        node.textContent = dataArray[index];
      });

      
    })
    .catch(error => {
      console.error("Error from OpenAI API:", error)
    })

      }
      
});})