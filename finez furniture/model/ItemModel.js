// export default class ItemModel {
//     constructor(ItemCode, ItemName, QtyOnHand,PricePerUnit) {
//         this.ItemCode = ItemCode;
//         this.ItemName = ItemName;
//         this.QtyOnHand =QtyOnHand;
//         this.PricePerUnit = PricePerUnit;
//
//     }
// }


export  default class itemModel{
    constructor(itemCode,itemName,itemPrice,itemQuantity) {
        this.itemCode=itemCode;
        this.itemName=itemName;
        this.itemPrice=itemPrice;
        this.itemQuantity=itemQuantity;
    }
}