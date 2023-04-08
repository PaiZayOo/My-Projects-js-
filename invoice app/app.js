//variables

const services = [
  {
    id: 1,
    title: "Hosting Service",
    price: 20,
  },
  {
    id: 2,
    title: "Domain Service",
    price: 25,
  },
  {
    id: 3,
    title: "Web Design Service",
    price: 30,
  },
  {
    id: 4,
    title: "Web Developement Service",
    price: 45,
  },
  {
    id: 5,
    title: "Boosting Service",
    price: 50,
  },
];

//seclect elements

const invoiceForm = document.querySelector("#invoiceForm");
const selectService = document.querySelector("#selectService");
const quantity = document.querySelector("#quantity");
const lists = document.querySelector("#lists");
const subTotal = document.querySelector("#subTotal");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");
const tbody = document.querySelector("tbody");
const app = document.querySelector("#app");
const table = document.querySelector('table');

//function

//create table data

const createData = (service, quantity) => {
  const tr = document.createElement("tr");
  tr.setAttribute("service-id", service.id);
  tr.classList.add("lists");
  const totalPrice = service.price * quantity;
  tr.innerHTML = `
 
  <td >
  <div class=" d-flex justify-content-between align-items-center">
  ${service.title}
  <i class=" bi bi-trash text-warning del-btn"></i>
  </div>
  </td>
  <td class =" text-end list-quantity">${quantity}</td>
  <td class =" text-end">${service.price}</td>
  <td class =" text-end totalPrice" > ${totalPrice}</td>
  `;
  return tr;
};

//calculate Total
const calcTax = (amount, percent = 5) => {
  return (amount * percent) / 100;
};

const calcTotal = () => {
  const tPrice = document.querySelectorAll(".totalPrice");
  const subTotalPrice = [...tPrice].reduce((pv, cv) => {
    return pv + parseFloat(cv.innerText);
  }, 0);

  tax.innerText = calcTax(subTotalPrice);
  subTotal.innerText = subTotalPrice;
  total.innerText = subTotalPrice + calcTax(subTotalPrice);
};

const showTable =  () => {
  if(lists.children.length){
    table.classList.remove('d-none');
  }else{
    table.classList.add('d-none');
  }
}

//process (tax)

//service option loop
services.forEach((service) => {
  selectService.append(new Option(service.title, service.id));
});

//data collect from form
invoiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedService = services.find((el) => el.id == selectService.value);

  const isExsitedService = [...lists.children].find(
    (el) => el.getAttribute("service-id") == selectService.value
  );

  if (isExsitedService) {
    const exsitedQuantity = isExsitedService.querySelector(".list-quantity");
    const exsitedTotal = isExsitedService.querySelector(".totalPrice");
    exsitedQuantity.innerText =
      parseFloat(exsitedQuantity.innerText) + quantity.valueAsNumber;
    exsitedTotal.innerText = parseFloat(exsitedQuantity.innerText) * selectedService.price;
  } else {
    lists.append(createData(selectedService, quantity.valueAsNumber));
  }

  calcTotal();
  // console.log(selectedService,quantity.valueAsNumber,servicePrice);
  //  console.log(selectService.value,quantity.valueAsNumber,selectedService);
  invoiceForm.reset();
  showTable();
});

app.addEventListener("click", (event) => {
  const currentTarget = event.target;
  if (currentTarget.classList.contains("del-btn")) {
    currentTarget.closest("tr").remove();
  }
  calcTotal();
  showTable();
});
