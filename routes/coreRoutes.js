import express from 'express'
import { sayHello } from '../controller/coreController.js'

const router = express.Router()
router.get('/cores', (req, res) => {
  return res.send('<h1>👋🏼 Hello Developers 👨🏻‍💻 !</h1>')
})

export default router
