const { CustomerModel, AddressModel } = require("../models");

class CustomerRepository {
    async CreateCustomer({ email, password, phone, salt }) {
        const customer = new CustomerModel();
        const customerResult = await customer.save();
        return customerResult;
    }
    async CreateAddress({ _id, street, postalCode, city, country }) {
        const profile = await CustomerModel.findById(_id);
        if (profile) {
            const newAddress = new AddressModel({
                street, postalCode, city, country
            });

            await newAddress.save();
            profile.address.push(newAddress);
        }
        return await profile.save();
    }
}

module.exports = CustomerRepository;