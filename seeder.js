import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './users.js'
import products from './products.js'
import User from './models/UserModel.js'
import Products from './models/ProductModel.js'
import Order from './models/OrderModel.js'
import connectToDatabase from './config/database.js'

dotenv.config()

connectToDatabase()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Products.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Products.insertMany(sampleProducts)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.bold)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Products.deleteMany()
    await User.deleteMany()
    console.log('Data Destoyed'.red.bold)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.bold)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
