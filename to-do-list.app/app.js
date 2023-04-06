//SELECT ELEMENTS

const inputText = document.querySelector("#inputText");
const createBtn = document.querySelector("#createBtn");
const lists = document.querySelector("#lists");
const delBtn = document.querySelector("#delBtn");
const editBtn = document.querySelector("#editBtn");
const total = document.querySelector("#tLists");
const doneTotal = document.querySelector("#dLists");

const datas = [
  "go shopping",
  "go sleeping",
  "hello world",
  "good night",
  "good morning",
];

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
    <button class=" btn btn-danger btn-sm del-btn" id="delBtn" >
    <i class="bi bi-trash pe-none"></i>  </button>
    <button class=" btn btn-success btn-sm" id="editBtn" onclick="edit(event)">
    <i class="bi bi-pencil pe-none"></i> 
    </button>

</div>
    `;
  return li;
};

const addList = () => {
  if (inputText.value.trim()) {
    if (createBtn.innerText === "update") {
      const oldListItem = document.querySelector(".editing");
      oldListItem.querySelector(".oldList").innerText = inputText.value;
      oldListItem.classList.remove("editing");
      createBtn.innerText = "create";
      inputText.value = null;
    } else {
      lists.append(createEle(inputText.value));
      inputText.value = null;
      counter();
    }
  } else {
    alert("Please fill your lists");
  }
};

datas.forEach((data) => lists.append(createEle(data)));

const del = (event) => {
  if (confirm("Are u sure wanna delete?")) {
    event.target.closest(".list-group-item").remove();
    counter();
  }
};


  lists.addEventListener('click', event => {
    if(event.target.classList.contains('del-btn')){
      del(event);
    };
  })

const edit = (event) => {
  const oldList =
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
  counter();
};

const counter = () => {
  const totalCount = lists.children.length;
  const doneTotalCount = [...lists.children].filter(
    (el) => el.querySelector(".form-check-input").checked === true
  ).length;
  total.innerText = totalCount;
  doneTotal.innerText = doneTotalCount;
};

// PROCESS

createBtn.addEventListener("click", addList);

inputText.addEventListener("keypress", (event) => {
  if (event.charCode === 13) {
    addList();
  }
});

counter();
