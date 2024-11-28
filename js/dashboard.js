// Inicializar variáveis
let user = null;
let tbProducts = null;
let idProduct = null;

const main = () => {
  user = localStorage.getItem("username");
  tbProducts = localStorage.getItem("tbProducts");

  tbProducts = JSON.parse(tbProducts);
  if (tbProducts == null) {
    tbProducts = [];
  }
};

const filterProduct = (e) => {
  cleanListProduct();

  if (e.value) {
    const filtered = tbProducts.filter((product) => product.includes(e.value));

    for (i in filtered) {
      const product = JSON.parse(filtered[i]);

      buildProduct(product, i);
    }
  } else {
    listProduct();
  }
};

const hasUser = () => {
  if (!user) {
    redirectUser();
    return;
  }

  const wellcomeUser = document.getElementById("hello-user");

  wellcomeUser.innerHTML = `Olá, ${user}`;
};

const redirectUser = () => {
  window.location.href = `/index.html`;
};

document.addEventListener("DOMContentLoaded", () => {
  main();
  hasUser();
  listProduct();
});

// Modal
const openModalAdd = () => {
  const modal = document.querySelector(".modal-add");

  modal.style.display = "flex";
};

const closeModalAdd = () => {
  const modal = document.querySelector(".modal-add");

  modal.style.display = "none";
};
const openModalEdit = () => {
  const modal = document.querySelector(".modal-edit");

  modal.style.display = "flex";

  var product = JSON.parse(tbProducts[idProduct]);

  document.querySelector("#name-edit").value = product.name;
  document.querySelector("#qtd-edit").value = product.qtd;
  document.querySelector("#value-edit").value = product.value;
  document.querySelector(".image-edit img").src = product.image;
  document.querySelector("#file-edit").value = product.image;
};

const closeModalEdit = () => {
  const modal = document.querySelector(".modal-edit");

  modal.style.display = "none";
};

const listProduct = () => {
  cleanListProduct();

  for (i in tbProducts) {
    const product = JSON.parse(tbProducts[i]);

    buildProduct(product, i);
  }
};

const buildProduct = (product, i) => {
  const container = document.querySelector(".products");

  const divProduct = document.createElement("div");
  divProduct.classList.add("product");
  divProduct.setAttribute("id", `product-${i}`);
  divProduct.onclick = function () {
    idProduct = i;
    openModalEdit(i);
  };
  const imgProduct = document.createElement("img");

  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");

  const spanValue = document.createElement("span");
  const spanQtd = document.createElement("span");

  imgProduct.src = product.image;

  h3.innerHTML = `${product.name}`;
  span.innerHTML = product.qtd > 0 ? "Disponível" : "Esgotado";
  span.classList.add(product.qtd > 0 ? "on" : "off");

  div.appendChild(h3);
  div.appendChild(span);

  spanValue.innerHTML = `Valor: R$${product.value}`;
  spanQtd.innerHTML = `Quantidade: ${product.qtd}`;

  divProduct.appendChild(imgProduct);
  divProduct.appendChild(div);
  divProduct.appendChild(spanValue);
  divProduct.appendChild(spanQtd);

  container.appendChild(divProduct);
};

const cleanListProduct = () => {
  const container = document.querySelector(".products");
  container.innerHTML = "";
};

const handleImage = () => {
  const file = document.querySelector("#file").files[0];

  if (file) {
    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      const base64Url = fileLoadedEvent.target.result; // <--- data: base64
      document.querySelector(".image img").src = base64Url;
    };
    fileReader.readAsDataURL(file);
  }
};

const addProduct = async () => {
  const img = document.querySelector(".image img");

  const field = {
    name: document.querySelector("#name").value,
    qtd: document.querySelector("#qtd").value,
    value: document.querySelector("#value").value,
    image: img.src.includes("base64") ? img.src : "/img/sem-produto.png",
  };

  if (!field.name || field.qtd < 0 || field.value < 0) {
    return appendAlert("Todos os campos são obrigatório.", "warning");
  }

  const product = JSON.stringify(field);
  tbProducts.push(product);

  localStorage.setItem("tbProducts", JSON.stringify(tbProducts));

  appendAlert("Produto adicionado com sucesso", "success");
  closeModalAdd();
  listProduct();
};

const editProduct = (index) => {
  console.log(idProduct);
  const img = document.querySelector(".image-edit img");

  const field = {
    name: document.querySelector("#name-edit").value,
    qtd: document.querySelector("#qtd-edit").value,
    value: document.querySelector("#value-edit").value,
    image: img.src.includes("base64") ? img.src : "/img/sem-produto.png",
  };

  if (!field.name || field.qtd < 0 || field.value < 0) {
    return appendAlert("Todos os campos são obrigatório.", "warning");
  }

  tbProducts[idProduct] = JSON.stringify(field);

  localStorage.setItem("tbProducts", JSON.stringify(tbProducts));

  appendAlert("Produto editado com sucesso", "success");
  closeModalEdit();
  listProduct();
};

function deleteProduct() {
  tbProducts.splice(idProduct, 1);
  console.log(idProduct);
  console.log(tbProducts);
  localStorage.setItem("tbProducts", JSON.stringify(tbProducts));

  appendAlert("Produto excluído com sucesso", "success");
  closeModalEdit();
  listProduct();
}

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  document.querySelector(".container").append(wrapper);
};
