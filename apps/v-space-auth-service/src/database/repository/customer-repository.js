const { CustomerModel, AddressModel } = require("../models");

class CustomerRepository {
    async CreateCustomer({ email, password, phone, salt }) {
        const customer = new CustomerModel({ email, password, phone, salt });
        // customer.cart = [];
        // customer.orders = [];
        // customer.wishlist = [];
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

    async FindCustomer({ email }) {
        const customer = await CustomerModel.findOne({
            email
        }).select("-createdAt -updatedAt");
        return customer;
    }

    async FindCustomerById({ id }) {
        const customer = await CustomerModel.findById(id).select("-password");
        return customer;
    }
}

module.exports = CustomerRepository;