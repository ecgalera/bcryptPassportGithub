import {Router} from "express";
import productModel from "../../dao/fs/mongodb/models/productModel.js";
import CartsManager from "../../dao/fs/mongodb/manager/cartManager.js";
import { privacy } from "../../middleware/auth.js";



const router = Router();

// const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
  const { page = 1 } = req.query;
  let { limit = 5, sort = 1 } = req.query;
  if (req.query.limit) {
    req.session.limit = req.query.limit;
  } else if (req.session.limit) {
    limit = req.session.limit;
  }
  if (req.query.sort) {
    req.session.sort = req.query.sort;
  } else if (req.session.sort) {
    sort = req.session.sort;
  }

  const options = {
    page,
    limit: parseInt(limit),
    lean: true,
    sort: { price: sort },
  };

  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productModel.paginate({}, options);

  // const result = await productModel.paginate({}, { limit: 3, lean: true });
  // console.log(result);
  const products = docs;

  res.render("home", {
    // user: req.session.user,
    products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    css: "products",
  });
});


router.get("/cart", async (req, res) => {
  const carts = await cartsManager.getCarts();
  res.render("cart", { carts, css: "cart" });
});

router.get("/cart/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carts = await cartsManager.getCarts();
  const cartSelected = carts.find((cart) => cart._id == cid);
  res.render("oneCart", { cartSelected, css: "cart" });
});

// router.get("/chat", async (req, res) => {
//   res.render("chat", { css: "chat" });
// });
// NO_AUTHENTICATED: puedo entrar si no estoy autenticado: 
router.get("/register",privacy("NO_AUTHENTICATED"),async (req, res) => {
  res.render("register");
});

router.get("/login",privacy("NO_AUTHENTICATED"), async (req, res) => {
  res.render("login");
});
// Solamente puedo ingresar si estoy autenticado:
router.get("/profile", privacy("PRIVATE") ,(req, res)=>{
  res.render("profile",{
    user: req.session.user
  })
})

export default router;