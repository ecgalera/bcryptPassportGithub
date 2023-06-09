import { Router } from "express";
import ProductManagers from "../../dao/fs/mongodb/manager/productsManagers.js"


const pm = new ProductManagers();

const router = Router();

router.get("/", async (req, res) => {

    try {
        const products = await pm.getProduct().lean();
        if (products.length == 0) {
            res.send({ message: "no hay productos cargados" })
        } else {
            res.send({ status: "success", payload: products })
        }
    } catch (error) {
        console.log("Producto no encontrado")
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, price, category, code, status, stock } = req.body;
        if (!title || !description || !price || !category || !code || !status || !stock) return res.send({ status: "error", error: "datos incompletos" });
        const product = {
            title,
            description,
            price,
            category,
            code,
            status,
            stock
        };
        const createProduct = await pm.createProduct(product);
        res.send({ status: "success", payload: createProduct });

    } catch (error) {
        console.log("El producto no se creo ")
    }
});

router.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;
        const producById = await pm.getProductById(pid);
        res.send({ status: "success", payload: producById });
    } catch (error) {
        console.log("error en el id")
    }
});
router.put("/:pid", async (req, res) => {
    try {

        const { pid } = req.params;
        const product = req.body;
        const productUpdate = await pm.updateProduct(pid, product);
        res.send({ status: "success", payload: productUpdate });

    } catch (error) {
        console.log("Product no actualizado")
    }
});

router.delete("/:pid", async (req, res) => {
    try {

        const { pid } = req.params;
        const productDelete = await pm.deleteProduct(pid)
        res.send({ status: "success", payload: productDelete })

    } catch (error) {
        console.log("Producto no eliminado")
    }
})


export default router;



