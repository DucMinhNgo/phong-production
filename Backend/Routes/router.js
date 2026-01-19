const express = require('express');
const router = express.Router();
const products = require('../Models/Products');

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductBarcode })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const { sortBy, order } = req.query;

        // Default sort: newest first
        let sortOptions = { ProductCreatedDate: -1 };

        // If sortBy is provided, use it
        if (sortBy) {
            const sortOrder = order === 'asc' ? 1 : -1;
            sortOptions = { [sortBy]: sortOrder };
        }

        const getProducts = await products.find({}).sort(sortOptions);
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductBarcode, ProductDeliveryDate, ProductReceivedDate } = req.body;

    try {
        const updateData = {
            ProductName,
            ProductBarcode,
            ProductUpdatedDate: new Date()
        };

        // Chỉ thêm các trường ngày nếu chúng được cung cấp
        if (ProductDeliveryDate) {
            updateData.ProductDeliveryDate = new Date(ProductDeliveryDate);
        }
        if (ProductReceivedDate) {
            updateData.ProductReceivedDate = new Date(ProductReceivedDate);
        }

        const updateProducts = await products.findByIdAndUpdate(req.params.id, updateData, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})

// Update delivery date via QR scan
router.put('/update-delivery/:id', async (req, res) => {
    try {
        const updateProducts = await products.findByIdAndUpdate(
            req.params.id,
            {
                ProductDeliveryDate: new Date(),
                ProductUpdatedDate: new Date()
            },
            { new: true }
        );
        console.log("Delivery date updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update delivery date" });
    }
})

// Update received date via QR scan
router.put('/update-received/:id', async (req, res) => {
    try {
        const updateProducts = await products.findByIdAndUpdate(
            req.params.id,
            {
                ProductReceivedDate: new Date(),
                ProductUpdatedDate: new Date()
            },
            { new: true }
        );
        console.log("Received date updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update received date" });
    }
})

router.get('/', async (req, res) => {
    res.status(201).json({
        name: "Phong Cho"
    });
})


module.exports = router;