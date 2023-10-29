const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const manager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await manager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  const product = await manager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
