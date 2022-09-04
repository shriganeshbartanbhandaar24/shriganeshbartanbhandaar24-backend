import mongoose from 'mongoose'

const ShippingAddressSchema = mongoose.Schema(
  {
    address: {
      type: String,
      require: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
  },
  { timeStamps: true }
)
const shippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema)
export default shippingAddress
