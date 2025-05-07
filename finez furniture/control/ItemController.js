import {items_db} from "../db/DB.js";
import ItemModel from "../model/ItemModel.js";

let selectedItemIndex = -1;

$(document).ready(function() {
    $('#itemCode').val(generateItemCode());
    loadItems();
});

function generateItemCode() {
    if (items_db.length === 0) {
        return "I001";
    } else {
        let lastItem = items_db[items_db.length - 1];
        let lastCode = lastItem.itemCode; // e.g., "I007"
        let number = parseInt(lastCode.substring(1)) + 1;
        return "I" + number.toString().padStart(3, "0");
    }
}


// load items
function loadItems() {
    $('#item-tbody').empty();
    items_db.map((item, index) => {
        let itemCode = item.itemCode;
        let itemName = item.itemName;
        let itemPrice = item.itemPrice;
        let itemQuantity = item.itemQuantity;

        let data = `<tr>
                        <td>${itemCode}</td>
                        <td>${itemName}</td>
                        <td>$${itemPrice.toFixed(2)}</td>
                        <td>${itemQuantity}</td>
                    </tr>`

        $('#item-tbody').append(data);
    })
}

$('#saveItemBtn').on('click', function(){
    let itemCode = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let itemPrice = $('#itemPrice').val();
    let itemQuantity = $('#itemQuantity').val();

    if(itemCode === '' ||itemName === '' || itemPrice === '' || itemQuantity === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        let itemCode = generateItemCode();
        let item_data = new ItemModel(itemCode, itemName, parseFloat(itemPrice), parseInt(itemQuantity));
        items_db.push(item_data);
        console.log(item_data);

        loadItems();
        clearForm();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
});

// update
$('#updateItemBtn').on('click', function(){
    let itemName = $('#itemName').val();
    let itemPrice = $('#itemPrice').val();
    let itemQuantity = $('#itemQuantity').val();

    if(itemName === '' || itemPrice === '' || itemQuantity === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else if(selectedItemIndex === -1) {
        Swal.fire({
            title: 'Error!',
            text: 'No item selected',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {
        // Update the item object
        items_db[selectedItemIndex].itemName = itemName;
        items_db[selectedItemIndex].itemPrice = parseFloat(itemPrice);
        items_db[selectedItemIndex].itemQuantity = parseInt(itemQuantity);

        console.log("Updated item:", items_db[selectedItemIndex]);
        loadItems();
        clearForm();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });
    }
});
// Clear form function
function clearForm() {
    $("#itemCode").val(generateItemCode());
    $("#itemName").val('');
    $("#itemPrice").val('');
    $("#itemQuantity").val('');

    $('#saveItemBtn').show();
    $('#updateItemBtn').hide();
    $('#deleteItemBtn').hide();
}

$('#refreshItemBtn').on('click', function(){
    clearForm();
});