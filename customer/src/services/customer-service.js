const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, ValidatePassword, Signature } = require('../utils');

class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
        this.signature = new Signature();
    }
    async Login(userInputs) {
        const { email, password } = userInputs;
        const customer = await this.repository.FindCustomer({ email });
        if (customer) {
            const isValid = await ValidatePassword(password, customer.password, customer.salt);
            if (isValid) {
                const token = await this.signature.GenerateSignature({
                    _id: customer._id, email: customer.email, role: customer.role
                });
                return FormateData({ id: customer._id, token })
            }
        }
    }

    async Register(userInputs) {
        const { email, fullname, password, phone } = userInputs;
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);
        const newCustomer = await this.repository.CreateCustomer({ email, fullname, password: userPassword, phone, salt });
        const token = await this.signature.GenerateSignature({
            email: newCustomer.email, _id: newCustomer._id, role: newCustomer.role
        });
        return FormateData({ id: newCustomer._id, token })
    }

    async RefreshToken(req) {
        const rf_token = req.cookies['v-token'];
        if (rf_token) {

        }
    }

    async GetCustomer(user) {
        const { _id } = user;
        const customer = await this.repository.FindCustomerById({ id: _id });
        return FormateData(customer);
    }

    async LogoutCustomer(req, res) {
        res.clearCookie("v-token", { path: AUTH_PATH });
        return FormateData("Loggged out successfully");
    }
}

module.exports = CustomerService;