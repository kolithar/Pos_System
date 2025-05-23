// export default class CustomerModel {
//     constructor(customerId,firstname, lastname, address,email,contact) {
//         this.customerId=customerId;
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.address = address;
//         this.email = email;
//         this.contact = contact;
//     }
// }

// model/CustomerModel.js
export default class CustomerModel {
    constructor(customerId, fullName, address, email, contactNumber) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.address = address;
        this.email = email;
        this.contactNumber = contactNumber;
    }
}
