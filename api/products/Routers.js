const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, productByName, getProductByID, deleteProduct, updateProduct } = require('./Controller')

router.post('/createproduct', createProduct)
router.get('/getallproduct', getAllProducts)
router.get('/productbyname', productByName)
router.get('/getproductbyid', getProductByID);
router.delete('/deleteproduct', deleteProduct);
router.put('/updateproduct', updateProduct);


module.exports = router