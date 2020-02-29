import * as categoriesAPI from "./fakeCategoryService";
import * as genresAPI from "./fakeGenreService";

const products = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    category: { _id: "5b21ca3eeb7f6fbccd471824", name: "Movies" },
    numberInStock: 6,
    price: 2000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    //genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    category: { _id: "5b21ca3eeb7f6fbccd471824", name: "Movies" },
    numberInStock: 5,
    price: 2000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Avengers",
    //genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    category: { _id: "5b21ca3eeb7f6fbccd471824", name: "Movies" },
    numberInStock: 8,
    price: 3000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Ipad",
    //genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    category: { _id: "5b21ca3eeb7f6fbccd471828", name: "Electronics" },
    numberInStock: 7,
    price: 30000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Instant Pot",
    // genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    category: { _id: "5b21ca3eeb7f6fbccd471828", name: "Electronics" },
    numberInStock: 7,
    price: 10000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Harry Potter",
    //genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    category: { _id: "5b21ca3eeb7f6fbccd471836", name: "Books" },
    numberInStock: 7,
    price: 2000,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Sherlock Holmes",
    // genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    category: { _id: "5b21ca3eeb7f6fbccd471836", name: "Books" },
    numberInStock: 7,
    price: 2200,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Strawberries",
    //genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    category: { _id: "5b21ca3eeb7f6fbccd471832", name: "Groceries" },
    numberInStock: 4,
    price: 3500,
    quantity: 0,
    inCart: false,
    total: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Potatoes",
    //genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    category: { _id: "5b21ca3eeb7f6fbccd471832", name: "Groceries" },
    numberInStock: 7,
    price: 450,
    quantity: 0,
    inCart: false,
    total: 0
  }
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(p => p._id === id);
}

export function saveProduct(product) {
  let productInDb = products.find(p => p._id === product._id) || {};
  productInDb.name = product.name;
  productInDb.genre = genresAPI.genres.find(g => g._id === product.genreId);
  productInDb.numberInStock = product.numberInStock;
  productInDb.dailyRentalRate = product.dailyRentalRate;
  productInDb.price = product.price;
  productInDb.category = categoriesAPI.categories.find(
    c => c._id === product.categoryId
  );

  if (!productInDb._id) {
    productInDb._id = Date.now();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m._id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
