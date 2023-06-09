import { Router } from "express";
import CartsManager from "../../dao/fs/manager/CartManager.js";
import ProductsManager from "../../dao/fs/manager/ProductManager.js";

const router = Router();

export default router;

const cartsManager = new CartsManager();
const productsManager = new ProductsManager();

const carts = cartsManager.getCarts();
const products = productsManager.getProducts();

router.get(`/:cId`, async (req, res) => {
  try {
    const idCart = req.params.cId;
    const allCarts = await carts;
    const selected = allCarts.find((c) => c.id == idCart);
    res.send(selected);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "not found" });
  }
});

router.post(`/`, async (req, res) => {
  try {
    cartsManager.createCart();
    res.send("cart created");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
});

router.post(`/:cId/product/:pId`, async (req, res) => {
  const allCarts = await carts;
  const idCart = req.params.cId;
  const CartExist = allCarts.find((c) => c.id == idCart);
  if (!CartExist) {
    return res.status(404).send({ status: "error", error: "cart not found" });
  }
  const idProduct = req.params.pId;
  let quantity = req.body.quantity;
  quantity ? (quantity = quantity) : (quantity = 1);
  const allProducts = await products;
  const productSelected = allProducts.find((p) => p.id == idProduct);
  productSelected
    ? res.send({ status: "succes ", code: "Product and Cart found" })
    : res.send("product not found");
  const productSelectedId = productSelected.id;
  const cartToSend = {
    product: productSelectedId,
    quantity: quantity,
  };
  cartsManager.addProductToCart(idCart, cartToSend);
});




router.put(`/:cId`, async (req, res) => { });

router.delete("/:cId", async (req, res) => { });