let inputsValue = document.querySelectorAll("#form-info input");
let buttonContinue = document.querySelector("#btn-continue");

let data = {};

inputsValue.forEach((fieldsData) => {
  fieldsData.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let value = event.target.value;
    console.log(value);
    data[property] = value;
  });
});

const submitForm = () => {
  let { email, password } = data;
  email && password
    ? (localStorage.setItem("token", "userLogin"),
      window.open("../../views/home.html", "_self"))
    : alert("Llene todos los campos");
};

const resetForm = () => {
  document.querySelectorAll("#form-info input").forEach((element) => {
    element.value = "";
    data = {};
  });
};

buttonContinue.addEventListener("click", () => {
  submitForm();
  resetForm();

});
