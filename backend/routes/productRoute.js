import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const validateProductInput = require('../../Validation/Product')
const validateReviewInput = require('../../Validation/Review')
const router = express.Router();

// TODO
// .............
// add image
// updateReview


// ################################

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const { name, price, image, brand, category, countInStock, description, rating, numReviews } = req.body
        const { errors, isValid } = validateProductInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const product = new Product({
            name, price,
            brand, category,
            countInStock, description,
            rating, numReviews,
            image,
            createdBy: req.user._id
        })

        const newProduct = await product.save()
        if (newProduct) {
            res.status(201).send({ newProduct })
        } else {
            return res.status(400).send({ error: "Error in creating Product" })
        }
    } catch (error) {
        res.status(500).send(error)
    }

})

// ##########################

router.get('/', async (req, res) => {
    try {
        const category = req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword
            ? {
                name: {
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                },
            }
            : {};
        const sortOrder = req.query.sortOrder
            ? req.query.sortOrder === 'lowest'
                ? { price: 1 }
                : { price: -1 }
            : { _id: -1 };
        const products = await Product.find({ ...category, ...searchKeyword }).sort(
            sortOrder
        )
        if (!products) {
            res.status(400).send({ error: "something went wrong" })
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error)
    }

});

// ################

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product)
        }
        else {
            res.status(404).send({ error: "Product not found" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// #####################


router.post('/:id/reviews', isAuth, async (req, res) => {
    try {
        const { errors, isValid } = validateReviewInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
                commentedBy: req.user._id
            };
            product.reviews.push(review);
            product.numReview = product.reviews.length;
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

// #############################

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        // const { errors, isValid } = validateProductInput(req.body)
        const { name, price, image, brand, category, countInStock, description, rating, numReviews } = req.body
        //    some validation error
        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }
        let productFields = {}

        if (name) productFields.name = name;
        if (description) productFields.description = description;
        if (price) productFields.price = price;
        if (image) productFields.image = image;
        if (brand) productFields.brand = brand;
        if (category) productFields.category = category;
        if (countInStock) productFields.countInStock = countInStock;

        const product = await Product.findById(req.body._id);
        if (product) {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
                { $set: productFields })
            if (!updatedProduct) {
                res.status(400).send({ error: "Updation Failed" })
            }
            return res.status(200).send(updatedProduct)
        } else {
            res.status(400).send({ error: "Product Not Found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

});

// ################################


router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            if (product.createdBy !== req.user._id) {
                await product.remove()
                res.send({ message: 'Product Deleted' })
            }
            else {
                res.send({ error: 'Error in Deletion.' })
            }
        } else {
            res.send({ error: 'Product Not Found' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;
