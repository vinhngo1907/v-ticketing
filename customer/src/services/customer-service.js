const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }
    async Login(userInputs) {
        const { email, password } = userInputs;
        const customer = await this.repository.FindCustomer({ email });
        if (customer) {
            const isValid = await ValidatePassword(password, customer.password, customer.salt);
            if (isValid) {
                const token = GenerateSignature({ _id: customer._id, email: customer.email, role: customer.role });
                return FormateData({ token, id: customer._id })
            }
        }
    }

    async Register(userInputs) {
        const { email, fullname, password, phone } = userInputs;
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);
        console.log({userPassword})
        const existingCustomer = await this.repository.CreateCustomer({ email, fullname, password: userPassword, phone, salt });
        const token = await GenerateSignature({
            email: existingCustomer.email, _id: existingCustomer._id, role: existingCustomer.role
        });
        return FormateData({ id: existingCustomer._id, token })
    }
}

module.exports = CustomerService;