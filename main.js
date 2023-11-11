var create_chat = document.getElementById("new-chat");

var container = document.getElementById("chat-history");

var chatInput = document.getElementById("chat-input");

var idCount = 1;

const chatContainer = document.querySelector(".history-container");

function generateId() {
    var char = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789"

    let id = ""

    for (let i = 0 ; i < 5 ; i++) {
        const randomIndex = Math.floor(Math.random() * char.length);
        id += char[randomIndex];
    }

    return id;
}

const createChatElement = (content,className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat",className);
    chatDiv.innerHTML = content;
    return chatDiv;
}

const outgoingChat = () => {
    var userText = chatInput.value.trim();
    if (!userText) return;
    chatInput.value = "";

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <p>${userText}</p>
                    </div>
                </div>`;
    
                const outgoingChatDiv = createChatElement(html, "outgoing");

                //if the div class with this class name exists then remove it or replace it with the placeholder
                chatContainer.querySelector(".default-text")?.remove();
      
                chatContainer.appendChild(outgoingChatDiv);
                chatContainer.scrollTo(0,chatContainer.scrollHeight);
}

function createNewDiv(title) {
  var sessionId = generateId();
  sessionStorage.setItem(sessionId, sessionId);

  sessionStorage.setItem("present_session", sessionId);

  var new_div = document.createElement("div");

  new_div.id = sessionId;

  //create a new map object
  var dict = new Map();

  //set a key-value pair for session id
  dict.set("sessionId", sessionId);

  //assign the dict(map object) to the property(dataMap) of the element(new_div)
  new_div.dataMap = dict;

  //adding css
  new_div.classList.add("chat-history");

  //For edit icon
  const editIcon = document.createElement("div");
  editIcon.classList.add("edit");
  editIcon.style.left = "180px";
  // Add the SVG content for the "editIcon"
  editIcon.innerHTML = '<svg id="edit" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8274 0.549432C12.1759 0.202561 12.6486 0.00769043 13.1415 0.00769043C13.3856 0.00769043 13.6272 0.0555324 13.8527 0.148485C14.0782 0.241437 14.2831 0.377679 14.4557 0.549432C14.6282 0.721186 14.7651 0.925087 14.8585 1.14949C14.9519 1.3739 15 1.61442 15 1.85731C15 2.10021 14.9519 2.34073 14.8585 2.56513C14.7651 2.78954 14.6282 2.99344 14.4557 3.1652L8.98003 8.6147L3.5044 14.0642L0 14.9361L0.876101 11.4484L6.35173 5.99894L11.8274 0.549432Z" stroke="#FBEDED" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  //For delete icon
  const deleteIcon = document.createElement("div");
  deleteIcon.classList.add("delete");
  deleteIcon.style.left = "190px";
  // Add the SVG content for the "deleteIcon"
  deleteIcon.innerHTML = '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.25H3.33333H14" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6667 4.24996V14.1666C12.6667 14.5424 12.5262 14.9027 12.2762 15.1684C12.0261 15.434 11.687 15.5833 11.3334 15.5833H4.66671C4.31309 15.5833 3.97395 15.434 3.7239 15.1684C3.47385 14.9027 3.33337 14.5424 3.33337 14.1666V4.24996M5.33337 4.24996V2.83329C5.33337 2.45757 5.47385 2.09723 5.7239 1.83156C5.97395 1.56588 6.31309 1.41663 6.66671 1.41663H9.33337C9.687 1.41663 10.0261 1.56588 10.2762 1.83156C10.5262 2.09723 10.6667 2.45757 10.6667 2.83329V4.24996" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66663 7.79163V12.0416" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.33337 7.79163V12.0416" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></svg>';


  deleteIcon.addEventListener("click", function (event) {
      //stop triggering other event triggers
      event.stopPropagation();

      //function to delete the div
      deleteDiv(new_div);

      //clear the content of div
      chatContainer.innerHTML = "";

      //to end the session
      sessionStorage.removeItem("present_session");
  });

  editIcon.addEventListener("click", function(event) {
    editDiv(new_div);
  })

  //append the edit icon to the new div
  new_div.appendChild(editIcon);

  //append the delete icon to the new div
  new_div.appendChild(deleteIcon);

  //create a new div
  var titleDiv = document.createElement("div");

  //set the inner html
  titleDiv.innerHTML = title;

  //add css
  titleDiv.style.fontWeight = "bold";

  //set id
  titleDiv.id = "title " + sessionStorage.getItem("present_session");

  //add title to the new div
  new_div.appendChild(titleDiv);

  //add new div to the container
  container.appendChild(new_div);

}

  function deleteDiv(div) {
    var sessionId = div.dataMap.get("sessionId");
    sessionStorage.removeItem(sessionId);
    div.remove();

    if(container.querySelectorAll("div").length === 0) {
      sessionStorage.removeItem("start");
    }
  }

  function editDiv(div) {
    var sessionId = div.dataMap.get("sessionId");
    var titleElement = div.querySelector('[id="title ' + sessionId + '"]');

    var inputField = document.createElement("input");
    inputField.value = titleElement.innerText;

    div.replaceChild(inputField, titleElement);

    inputField.focus();

    inputField.addEventListener("blur", function () {
        titleElement.innerText = inputField.value;
        div.replaceChild(titleElement, inputField);
    });
  }

  create_chat.addEventListener("click", function () {
  // Remove the "present_session" from sessionStorage
  sessionStorage.removeItem("present_session");

  // Retrieve the input value
  var inputText = chatInput.value.trim();

  if (inputText.length > 0) {
      var inputWords = inputText.split(" ");
      var title = inputWords.slice(0, 3).join(" ");
      createNewDiv(title);
      chatInput.value = "";
      sessionStorage.setItem("start", true);
  } else {
      createNewDiv("New Chat");
      sessionStorage.setItem("start", true);
  }

  chatContainer.innerHTML = "";
});

if (container.querySelectorAll("div").length === 0) {
  // If no elements in the container, remove "start" from the sessionStorage
  sessionStorage.removeItem("start");
}

function sendChat() {
  var inputText = chatInput.value.trim();

  if (inputText.length > 0) {
      var inputWords = inputText.split(" ");
      var title = inputWords.slice(0, 3).join(" ");
      if (!sessionStorage.getItem("start")) {
          createNewDiv(title);
      }
      chatInput.value = inputText;
      outgoingChat();
      sessionStorage.setItem("start", true);
  }
}

if (container.querySelectorAll("div").length === 0) {
  sessionStorage.removeItem("start");
}


// Attach the sendChat function to the create-chat button
create_chat.addEventListener("click", sendChat);

//for time stamp
function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


//send
var sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", function () {
    var inputText = chatInput.value.trim();

    if (inputText.length > 0) {
        var inputWords = inputText.split(" ");
        
        var title = inputWords.slice(0, 3).join(" ");

        var titleDiv = document.getElementById("title "+sessionStorage.getItem("present_session"));
        if (titleDiv){
            if (titleDiv.innerText == "New Chat"){
                titleDiv.innerText = title;
            }
        }


        if (!sessionStorage.getItem("start")){
            createNewDiv(title);
        }
        chatInput.value = inputText;
        outgoingChat()
        sessionStorage.setItem("start", true);
    }
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            session_id: sessionStorage.getItem("present_session"),
            userText: inputText,
            title:titleDiv.innerText, 
            html: chatContainer.innerHTML,
            timestamp: formatTimestamp(new Date())
        })
    }
    fetch("/chat",requestOptions);
    
});
sendButton.addEventListener("click", sendChat);
