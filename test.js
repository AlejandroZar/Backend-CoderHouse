const ProductManager = require('./ProductManager');
const fs = require('fs');
const assert = require('assert');

// Ruta para el archivo de prueba (asegúrate de que no exista previamente)
const testFilePath = 'test_products.json';

// Crear una instancia de ProductManager para las pruebas
const manager = new ProductManager(testFilePath);

// Prueba 1: Verificar que getProducts devuelva un arreglo vacío
assert.deepStrictEqual(manager.getProducts(), []);

// Prueba 2: Agregar un producto y verificar que se genere un ID único
const addedProduct = manager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});
assert.strictEqual(typeof addedProduct.id, 'number');
assert.strictEqual(manager.getProducts().length, 1);

// Prueba 3: Intentar obtener un producto inexistente y verificar que arroje un error
assert.throws(() => {
    manager.getProductById(999); // ID inexistente
  }, /Producto no encontrado/); // Asegura que se lanza un error con el mensaje adecuado  

// Prueba 4: Intentar obtener un producto inexistente y verificar que arroje un error
assert.throws(() => {
  manager.getProductById(999); // ID inexistente
}, /Producto no encontrado/); // Asegura que se lanza un error con el mensaje adecuado

// Prueba 5: Actualizar un producto sin cambiar el ID
const updatedProduct = manager.updateProduct(addedProduct.id, {
  title: 'Producto Actualizado',
  description: 'Nueva descripción',
  price: 250,
});
assert.strictEqual(updatedProduct.id, addedProduct.id);
assert.strictEqual(updatedProduct.title, 'Producto Actualizado');
assert.strictEqual(updatedProduct.description, 'Nueva descripción');
assert.strictEqual(updatedProduct.price, 250);

// Prueba 6: Intentar actualizar un producto inexistente y verificar que arroje un error
assert.throws(() => {
  manager.updateProduct(999, { title: 'Intento de Actualización' }); // ID inexistente
}, /Producto no encontrado/);

// Prueba 7: Eliminar el producto agregado y verificar que se elimine correctamente
const deleteResult = manager.deleteProduct(addedProduct.id);
assert.strictEqual(deleteResult, true); // Se eliminó con éxito

// Prueba 8: Intentar eliminar un producto inexistente y verificar que arroje un error
assert.throws(() => {
  manager.deleteProduct(999); // ID inexistente
}, /Producto no encontrado/);

// Limpia el archivo de prueba al finalizar
fs.unlinkSync(testFilePath);

console.log('Todas las pruebas pasaron con éxito.');
