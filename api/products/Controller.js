const Product = require('./model')
const { connect } = require('mongoose')

//Create Product
const createProduct = async (req, res) => {
    const { name, price, category, brand, thumbnail, images, description } = req.body

    if (!name || !price || !category || !brand || !thumbnail || !images || !description) {
        res.json({
            message: "Missing Required Field"
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            console.log("DB Connected")

            const checkExist = await Product.findOne({ name })

            if (checkExist) {
                res.json({
                    message: "Product already Exist"
                })
            }
            else {
                await Product.create({ name, price, category, brand, thumbnail, images, description })
                console.log("Success")

                res.status(201).json({
                    message: "Product Created Successfully"
                })
            }
        } catch (error) {
            console.error("Error during Product creation:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

//Get All Products
const getAllProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const product = await Product.find();
        res.json({ product });
    }
    catch (error) {
        console.error("Error fetching all Products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//Get Product By Name
const productByName = async (req, res) => {
    const { name } = req.body;

    try {
        await connect(process.env.MONGO_URL)

        const checkExistProduct = await Product.findOne({ name })

        if (!checkExistProduct) {
            res.status(404).json({
                message: "Product not Exists"
            })
        }
        else {
            res.json({
                checkExistProduct
            })
        }
    }
    catch (error) {
        console.error("Error fetching Product by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Get Product By ID
const getProductByID = async (req, res) => {
    const login = { _id } = req.query;

    try {
        await connect(process.env.MONGO_URL)
        const checkProductID = await Product.findOne({ _id })

        if (!checkProductID) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        else {
            res.json({
                product: checkProductID
            })
        }
    }
    catch (error) {
        console.error("Error fetching Product By ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//Delete Product
const deleteProduct = async (req, res) => {
    const { _id } = req.body
    try {
        await connect(process.env.MONGO_URL)
        await Product.deleteOne({ _id });
        const product = await Product.find()
        res.json({
            message: "Product Deleted Successfully",
            product
        });
    }
    catch (error) {
        console.error("Error Deleting Product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//Update Product
const updateProduct = async (req, res) => {
    const { _id, name, price, category, brand, thumbnail, images, description } = req.body

    const filter = { _id };
    const update = { name, price, category, brand, thumbnail, images, description };

    try {
        await connect(process.env.MONGO_URL)
        await Product.findOneAndUpdate(filter, update, {
            new: true
        });

        const product = await Product.find();
        res.json({
            message: "Product Updated Successfully",
            product
        });
    }
    catch (error) {
        console.error("Error Updating Product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createProduct, getAllProducts, productByName, getProductByID, deleteProduct, updateProduct }