import { Router } from "express";
import ProductsManager from "../../dao/fs/manager/ProductManager.js"

const router = Router();

export default router;

const productsManager = new ProductsManager();

const products = productsManager.getProducts();

router.get(`/`, async (req, res) => {
  const allProducts = await products;
  const cantidadDeProductos = req.query.limit;
  if (cantidadDeProductos) {
    const reduced = allProducts.slice(0, cantidadDeProductos);
    res.send(reduced);
  } else {
    res.send(allProducts);
  }
});

router.get(`/:pId`, async (req, res) => {
  try {
    const idProduct = req.params.pId;
    const allProducts = await products;
    const selected = allProducts.find((p) => p.id == idProduct);
    productsManager.getElementById(idProduct);
    res.send({ status: "succes", message: "product get" });
  } catch (error) {
    res.status(404).send({ status: "error", error: "not found" });
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newContent = req.body;
    productsManager.addProduct(newContent);
    res.send({ status: "succes", message: "product posted" });
  } catch (error) {
    res.status(404).send({ status: "error", error: "not found" });
    console.log(error);
  }
});

router.put(`/:pId`, async (req, res) => {
  const allProducts = await products;
  const id = req.params.pId;
  const newContent = req.body;
  const productIndex = allProducts.findIndex((p) => p.id == id);
  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "not found" });
  }
  allProducts[productIndex] = newContent;
  productsManager.updateProduct(id, newContent);
  res.send({ status: "succes", message: "product updated" });
});
router.delete("/:pId", async (req, res) => {
  const allProducts = await products;
  const id = req.params.pId;
  const productIndex = allProducts.findIndex((p) => p.id == id);
  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "not found" });
  }
  allProducts.splice(productIndex, 1);
  productsManager.deleteProduct(allProducts);
  res.send({ status: "succes", message: "product deleted" });
});