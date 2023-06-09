console.log("Desde el Cart")
import CartManager from "../../dao/fs/mongodb/manager/cartManager.js"

const cm = new CartManager()

newCart = async()=>{
    const cart = await cm.createCart();
    const cartId = cart._id;
    console.log(cartId)
    res.send(200)
}

newCart()