import { Router } from "express";
import CartManger from "../../dao/fs/mongodb/manager/cartManager.js";
// import cartModel from "../../dao/fs/mongodb/models/cartsModels.js";
// import mongoose from "mongoose";


const cm = new CartManger()

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cm.getCarts();
  res.send(carts);
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cm.getCartById({ _id: cid });
    if (!carts)
      res.status(404).send({ status: "error", error: "product not found" });
    res.send({ status: "succes", payload: carts });
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  try {
    cm.createCart();
    res.send("cart created");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
});
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const addProductCart = await cm.addProductToCart(cid, pid);
    res.send({ status: "succes", payload: addProductCart });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProductCart = await cm.deleteProductToCart(cid, pid);
    res.send({ status: "succes", payload: deletedProductCart });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cm.deleteCart(cid);
    res.send({ status: "success", payload: deletedCart });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const newQuantity = req.body;
    const updatedCart = await cm.updateProductInCart(
      cid,
      pid,
      newQuantity
    );

    res.send({ status: "success", payload: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  const carts = await cm.getCarts();
  console.log(carts)
  res.render("cart", { carts });
});

export default router;



