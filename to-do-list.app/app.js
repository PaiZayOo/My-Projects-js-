//SELECT ELEMENTS

const inputText = document.querySelector("#inputText");
const createBtn = document.querySelector("#createBtn");
const lists = document.querySelector("#lists");
const delBtn = document.querySelector("#delBtn");
const editBtn = document.querySelector("#editBtn");

// FUNCTIONS

const createEle = (text) => {
  let li = document.createElement("li");
  li.className =
    " list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="" onchange="done(event)">
    <label class="form-check-label oldList" for="">
        ${text}
    </label>
</div>
<div>
    <button class=" btn btn-danger btn-sm" id="delBtn" onclick="del(event)">Del</button>
    <button class=" btn btn-success btn-sm" id="editBtn" onclick="edit(event)">Edit</button>

</div>
    `;
  return li;
};

const addList = () => {
  if (createBtn.innerText === "update") {
    const oldListItem = document.querySelector(".editing");
    oldListItem.querySelector(".oldList").innerText = inputText.value;
    oldListItem.classList.remove("editing");
    createBtn.innerText = "create";
    inputText.value = null;
  } else {
    lists.append(createEle(inputText.value));
    inputText.value = null;
  }
};
const del = (event) => {
  event.target.parentElement.parentElement.remove();
};

const edit = (event) => {
  var oldList =
    event.target.parentElement.parentElement.querySelector(
      ".oldList"
    ).innerText;
  inputText.value = oldList;
  createBtn.innerText = "update";
  event.target.parentElement.parentElement.classList.add("editing");
};

const done = (event) => {
  event.target.nextElementSibling.classList.toggle(
    "text-decoration-line-through"
  );
};

// PROCESS

createBtn.addEventListener("click", addList);

inputText.addEventListener("keypress", (event) => {
  if (event.charCode === 13) {
    addList();
  }
});
