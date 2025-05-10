// DOM Elements
const form = document.getElementById("itemForm");
const imgInput = document.querySelector(".img");
const fileInput = document.getElementById("imgInput");

const itemCode = document.getElementById("itemCode");
const itemName = document.getElementById("itemName");
const itemBread = document.getElementById("itemBread");
const itemDate = document.getElementById("itemDate");
const woodMaterial = document.getElementById("woodMaterial");
const otherMaterial = document.getElementById("otherMaterial");
const itemPrice = document.getElementById("itemPrice");
const materialColor = document.getElementById("materialColor");
const itemNote = document.getElementById("itemNote");
const dataTable = document.getElementById("data");

// Image Preview Handling
fileInput.onchange = function () {
    const file = fileInput.files[0];
    if (file && file.size < 1000000) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgInput.src = e.target.result;
            imgInput.setAttribute("data-img", e.target.result); // Store for later saving
        };
        reader.readAsDataURL(file);
    } else {
        alert("Image is too large (max 1MB).");
    }
};

// Retrieve from localStorage
let itemData = localStorage.getItem("itemProfile")
    ? JSON.parse(localStorage.getItem("itemProfile"))
    : [];

// Submit Handler
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const item = {
        code: itemCode.value,
        image: imgInput.getAttribute("data-img") || imgInput.src,
        name: itemName.value,
        bread: itemBread.value,
        date: itemDate.value,
        woodMaterial: woodMaterial.value,
        otherMaterial: otherMaterial.value,
        price: itemPrice.value,
        color: materialColor.value,
        note: itemNote.value
    };

    itemData.push(item);
    localStorage.setItem("itemProfile", JSON.stringify(itemData));
    renderTable();
    form.reset();
    imgInput.src = ""; // reset preview
    bootstrap.Modal.getInstance(document.getElementById('itemFormModal')).hide();
});

// Render Table Rows
function renderTable() {
    dataTable.innerHTML = "";
    itemData.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.code}</td>
                <td><img src="${item.image}" width="50" height="50"></td>
                <td>${item.name}</td>
                <td>${item.bread}</td>
                <td>${item.date}</td>
                <td>${item.price}</td>
                <td>${item.woodMaterial}</td>
                <td>${item.otherMaterial}</td>
                <td><div style="width:25px; height:25px; background:${item.color}; margin:auto; border:1px solid #000;"></div></td>
                <td>${item.note}</td>
                <td>
                    <button class="btn btn-success" onclick="viewItem(${index})"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-danger" onclick="deleteItem(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        dataTable.innerHTML += row;
    });
}

// View Item (Fill the read modal)
function viewItem(index) {
    const item = itemData[index];
    document.getElementById("readItemCode").value = item.code;
    document.getElementById("readItemName").value = item.name;
    document.getElementById("readItemBread").value = item.bread;
    document.getElementById("readItemDate").value = item.date;
    document.getElementById("readWoodMaterial").value = item.woodMaterial;
    document.getElementById("readOtherMaterial").value = item.otherMaterial;
    document.getElementById("readItemPrice").value = item.price;
    document.getElementById("readMaterialColor").value = item.color;
    document.getElementById("readItemNote").value = item.note;

    const readImg = document.querySelector("#readItemModal img");
    readImg.src = item.image;

    const modal = new bootstrap.Modal(document.getElementById("readItemModal"));
    modal.show();
}

// Delete Item
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        itemData.splice(index, 1);
        localStorage.setItem("itemProfile", JSON.stringify(itemData));
        renderTable();
    }
}

// On Load
renderTable();
