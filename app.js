const ProductManager = require('./ProductManager');
const manager = new ProductManager('products.json');

// Agregar un producto
const newProduct = manager.addProduct({
  title: 'Nuevo Producto',
  description: 'Descripción del nuevo producto',
  price: 29.99,
  thumbnail: 'imagen3.jpg',
  code: 'P3',
  stock: 10
});
console.log('Nuevo producto:', newProduct);

// Consultar todos los productos
const allProducts = manager.getProducts();
console.log('Lista de productos:', allProducts);

// Consultar un producto por ID
const productById = manager.getProductById(2);
console.log('Producto con ID 2:', productById);

// Actualizar un producto
const updatedProduct = manager.updateProduct(1, {
  title: 'Producto Actualizado',
  price: 39.99,
  stock: 5
});
console.log('Producto actualizado:', updatedProduct);

// Eliminar un producto
const deleted = manager.deleteProduct(3);
console.log('Producto eliminado:', deleted);
