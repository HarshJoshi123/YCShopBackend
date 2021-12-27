const Cart = require('../models/cart');
const product = require('../models/product');

exports.getCart = async (req, res) => {
    try {
        return res.status(200).json({
            data: req.cart
        })
    }
    catch (err) {
        return res.status(500).json({
            err: "error in fetching the cart"
        })
    }

}

exports.addToCart = async (req, res) => {
    try {
        let cart = req.cart;
        //body-> [{prod id , qty}] for now keep it as {prodid,qty} for better error handling
        //fetch product , cost,name,
        //multiple product ids
        //req.cart empty [] , push
        // if filled , items , bill push
        //let prods = await Product.find({_id:{$in:req.body.items.map(item=>item.id)}});
        let prod = await product.findOne({ _id: req.body.id });
        if (!prod) {
            return res.status(404).json({
                err: "item not found"
            })
        }
        let cost = prod.cost;
        let name = prod.name;
        if (!cart) {
            let itemIndex = cart.items.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ productId, name, quantity, cost });
            }

            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
            const newCart = await Cart.create({
                userId: req.userId,
                items: [{ name, cost, quantity: req.body.quantity }],
                bill: req.body.quantity * cost
            });
            return res.status(201).send(newCart);

        }
    }
    catch (err) {
        console.log("addToCart : ", err);
        return res.status(200).json({
            err: "error in adding to cart"
        })
    }
}

exports.findCartById = async (req, res, id, next) => {
    //finding cart by userId ;
    try {
        //let id = req.params['userId'];
        let cart = await Cart.find({ userId: id });
        // return res.status(200).json({
        //     data: cart
        // })
        req.userId = userId;
        req.cart = cart;
        next();
    }
    catch (err) {
        return res.status(500).json({
            err: "error in fetching cart"
        })
    }


}
