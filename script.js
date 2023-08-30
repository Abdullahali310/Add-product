const itemList = document.getElementById("itemList");
const addItemForm = document.getElementById("addItemForm");

let items = [];

addItemForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemPrice = document.getElementById("itemPrice").value;

  const newItem = {
    id: new Date().getTime(),
    name: itemName,
    description: itemDescription,
    price: itemPrice,
  };

  items.push(newItem);

  updateItemList();
  addItemForm.reset();
});

function updateItemList() {
  itemList.innerHTML = "";

  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("card", "mb-2");
    itemCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">الاسم:${item.name}</h5>
        <p class="card-text">الوصف:${item.description}</p>
        <p class="card-text">السعر: ${item.price} جنيه</p>
        <button class="btn btn-primary mr-2" onclick="editItem(${item.id})">تعديل</button>
        <button class="btn btn-danger" onclick="deleteItem(${item.id})">حذف</button>
      </div>
    `;
    itemList.appendChild(itemCard);
  });
}

function editItem(itemId) {
  const item = items.find((item) => item.id === itemId);

  if (item) {
    const editItemNameInput = document.createElement("input");
    editItemNameInput.classList.add("form-control", "mb-2");
    editItemNameInput.value = item.name;

    const editItemDescriptionInput = document.createElement("textarea");
    editItemDescriptionInput.classList.add("form-control", "mb-2");
    editItemDescriptionInput.rows = 3;
    editItemDescriptionInput.value = item.description;

    const editItemPriceInput = document.createElement("input");
    editItemPriceInput.classList.add("form-control", "mb-2");
    editItemPriceInput.value = item.price;

    const saveChangesButton = document.createElement("button");
    saveChangesButton.classList.add("btn", "btn-primary", "mr-2");
    saveChangesButton.textContent = "حفظ التعديلات";
    saveChangesButton.onclick = function () {
      item.name = editItemNameInput.value;
      item.description = editItemDescriptionInput.value;
      item.price = editItemPriceInput.value;
      updateItemList();
    };

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-secondary");
    cancelButton.textContent = "إلغاء";
    cancelButton.onclick = function () {
      updateItemList();
    };

    itemList.innerHTML = "";
    itemList.appendChild(editItemNameInput);
    itemList.appendChild(editItemDescriptionInput);
    itemList.appendChild(editItemPriceInput);
    itemList.appendChild(saveChangesButton);
    itemList.appendChild(cancelButton);
  }
}

function deleteItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  updateItemList();
}

updateItemList();
