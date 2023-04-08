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

//function

//create table data

const createData = (selectedService, servicePrice) => {
  const tr = document.createElement("tr");
  tr.classList.add("lists");
  const totalPrice = servicePrice * quantity.valueAsNumber;
  tr.innerHTML = `
 
  <td >${selectedService}</td>
  <td class =" text-end">${quantity.valueAsNumber}</td>
  <td class =" text-end">${servicePrice}</td>
  <td class =" text-end totalPrice" > ${totalPrice}</td>
  `;
  return tr;
};

//calculate Total
const calcTax = (amount, percent = 5) => {
  return (amout * percent) / 100;
};

const calcTotal = () => {
  const tPrice = document.querySelectorAll(".totalPrice");
  const subTotalPrice = [...tPrice].reduce((pv, cv) => {
    return pv + parseFloat(cv.innerText);
  }, 0);
  calcTax(subTotalPrice, percent);
};

//process (tax)

//service option loop
services.forEach((service) => {
  selectService.append(new Option(service.title, service.id));
});

//data collect from form
invoiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedService = services.find(
    (el) => el.id == selectService.value
  ).title;
  const servicePrice = services.find(
    (el) => el.id == selectService.value
  ).price;

  lists.append(createData(selectedService, servicePrice));
  calcTotal();
  // console.log(selectedService,quantity.valueAsNumber,servicePrice);
  //  console.log(selectService.value,quantity.valueAsNumber,selectedService);
  invoiceForm.reset();
});
