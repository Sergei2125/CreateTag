const inputText = document.querySelector(".input");
const addNewTagBtn = document.querySelector(".addNewTagBtn");
const addNewTagListBtn = document.querySelector(".addNewTagListBtn");
const cleatAllBtn = document.querySelector(".cleatAllBtn");
const resultList = document.querySelector(".resultTagList");
const readOnlyCheckbox = document.querySelector("#readOnly");

let tagList = [];

if (localStorage.tagListContent) {
  const tagListStringify = localStorage.getItem("tagListContent");
  tagList = JSON.parse(tagListStringify);
  displayTagList();
}

addNewTagBtn.addEventListener("click", () => {
  if (inputText.value === "") return;
  addOneTagOrListTag(inputText.value);
  displayTagList();
  updateLocalStorage();
  inputText.value = "";
});

addNewTagListBtn.addEventListener("click", () => {
  if (inputText.value === "") return;
  tagList.length = 0;
  addOneTagOrListTag(inputText.value);
  displayTagList();
  updateLocalStorage();
  inputText.value = "";
});

cleatAllBtn.addEventListener("click", () => {
  tagList.length = 0;
  displayTagList();
  updateLocalStorage();
});

function addOneTagOrListTag(str) {
  if (!str.includes(" ") && !str.includes(",")) {
    tagList.push(str);
  } else {
    let splitValue = "";
    str.includes(",") ? (splitValue = ",") : (splitValue = " ");

    str.split(splitValue).map((element) => {
      return element !== "" && tagList.push(element);
    });
  }
}

function displayTagList() {
  let tagContent = "";
  if (tagList.length === 0) resultList.innerHTML = "";
  tagList.forEach((element, index) => {
    tagContent += `
    <li class="tagContent">
    ${element}
    <button class="removeTagBtn" onclick = "deleteTag(${index})" ${
      readOnlyCheckbox.checked ? "disabled" : ""
    }>&#10006</button>
    </li>
    `;
    resultList.innerHTML = tagContent;
  });
}

function updateLocalStorage() {
  const tagListStringify = JSON.stringify(tagList);
  localStorage.setItem("tagListContent", tagListStringify);
}

function deleteTag(index) {
  tagList.splice(index, 1);
  displayTagList();
  updateLocalStorage();
}

readOnlyCheckbox.addEventListener("click", () => {
  if (readOnlyCheckbox.checked) {
    addNewTagBtn.setAttribute("disabled", "disabled");
    addNewTagListBtn.setAttribute("disabled", "disabled");
    cleatAllBtn.setAttribute("disabled", "disabled");
  } else {
    addNewTagBtn.removeAttribute("disabled", "disabled");
    addNewTagListBtn.removeAttribute("disabled", "disabled");
    cleatAllBtn.removeAttribute("disabled", "disabled");
  }
  displayTagList();
});
