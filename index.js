const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes/routes");
//cargo modulo handlebars
const handlebars = require("express-handlebars");
const PORT = 8080;
//instancio produtctos
const Products = require("./products");

//middleware
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// HANDLEBARS

// Settear el engine que voy a usar y la extensión (hbs):
app.set("view engine", "hbs");

// Configurar el layout que voy a usar:
app.engine(
  "hbs",

  handlebars({
    layoutsDir: __dirname + "/views",
    extname: "hbs",

    defaultLayout: "layoutFrame",
  })
);

// Formulario en la ruta raíz:
app.get("/", (req, res) => {
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'.
  res.render("bodyForm", { layout: "layoutFrame" });
});

//Post
app.post("/productos", Products.createNew);

// Vista de productos:

app.get("/productos", (req, res) => {
  const productos = Products.traerTodos();
  // Renderiza el archivo 'bodyProducts.hbs' dentro del layout, junto con la información incluída en el objeto 'productos':
  res.render("bodyProducts", {
    layout: "layoutFrame",
    productos,
  });
});

app.listen(PORT, () => {
  console.log("Server on localhost:" + PORT);
});
