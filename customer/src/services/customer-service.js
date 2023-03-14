const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');


class CustomerService {
    constructor() {
        this.respository = new CustomerRepository();
    }
    async Login(userInputs) {
        const { email, password } = userInputs;
    }

    async Register(userInputs) {
        const { email, password, phone } = userInputs;
        let salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);
        const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt });
        const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
        return FormateData({ id: existingCustomer._id, token })
    }
}

module.exports = CustomerService;