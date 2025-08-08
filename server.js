const express = require(('express'));
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
require('dotenv').config();

const app = express();
app.use(express.json());




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.post('/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 3, name });
});


const API_KEY = 'mysecretkey';
app.use((req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key && key === API_KEY) return next();
  res.status(401).json({ message: 'Unauthorized' });
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  const user = users.find(u => u.id === parseInt(id));
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})