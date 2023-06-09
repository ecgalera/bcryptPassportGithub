import fs from "fs";

export default class ProductsManager {
  constructor() {
    this.path = "./products.json";
  }

  getProducts = async () => {
    try {
      const data = fs.existsSync(this.path);
      if (data) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(info);

        return products;
      } else {
        console.log("leyendo desde pmanager");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  getElementById = async (id) => {
    try {
      const products = await this.getProducts();

      const findProduct = products.find((p) => p.id == id);

      findProduct
        ? console.log(findProduct)
        : console.log("error product not found");
      null;
      return findProduct;
    } catch (error) {
      console.log(error);
    }
  };
  addProduct = async ({
    title,
    description,
    thumnails,
    code,
    price,
    status,
    category,
  }) => {
    try {
      const products = await this.getProducts();

      const product = {
        title,
        description,
        thumnails,
        code,
        price,
        status,
        category,
      };
      if (
        (!title, !description, !thumnails, !code, !price, !status, !category)
      ) {
        console.log("complete todos los campos");
        return null;
      }
      const repetCode = products.find((p) => p.code === code);

      if (repetCode) {
        console.log("invalid code");
        return null;
      }

      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product);

      fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (id, elem) => {
    console.log(id, elem);
    try {
      const products = await this.getProducts();

      const newProduct = products.map((p) =>
        p.id == id ? { ...p, ...elem } : p
      );

      fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (allProducts) => {
    const products = await this.getProducts();
    // const productIndex = products.findIndex((p) => p.id == id);
    // products.splice(productIndex, 1);

    fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, "\t"));
  };
}

