// Function to save data to local storage and display items
const saveTOLocalStorage = (event) => {
  event.preventDefault();
  const sellingprice = document.getElementById("sellingprice").value;
  const ProductType = document.getElementById("ProductType").value;
  const category = document.getElementById("choose a categeory").value;

  axios
    .post("https://crudcrud.com/api/f37063d9278c4efeb1f5aa7ca0ea1029/", {
      sellingprice,
      ProductType,
      category,
    })
    .then((response) => {
      console.log(response);
      axios
        .get("https://crudcrud.com/api/f37063d9278c4efeb1f5aa7ca0ea1029")
        .then((response) => {
          displayItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteItem = (id) => {
  axios
    .delete(`https://crudcrud.com/api/f37063d9278c4efeb1f5aa7ca0ea1029/${id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const displayItems = (items) => {
  const listOfItems = document.getElementById("ListOfitems");
  listOfItems.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `sellingprice: ${item.sellingprice} ProductType: ${item.ProductType} category: ${item.category}`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteItem(item.id);
      displayItems(items.filter((i) => i.id !== item.id));
    });

    li.appendChild(deleteButton);
    listOfItems.appendChild(li);
  });
};
