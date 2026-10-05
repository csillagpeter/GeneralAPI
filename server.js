/**
 * 
 * modules : express , mysqul , cros, dotnev, nomemon , sha1
 * 
 * REST API  endponts:
 * ----------------------------
 * CRUD operations for a generic database table:
 * 
 * READ Operations:
 * ----------------------
 * 
 * GET /api/:table - Retrieve all records from the specified table.
 * GET /api/:table/:id - Retrieve a specific record by ID from the specified table.
 * 
 * CREATE Operations:
 * ----------------------
 * 
 * POST /api/:table - Create a new record in the specified table.
 * 
 * UPDATE Operations:
 * ----------------------
 * 
 * PATCH /api/:table/:id - Update a specific record by ID in the specified table.
 * 
 * DELETE Operations:
 * ----------------------
 * 
 * DELETE /api/:table/:id - Delete a specific record by ID from the specified table.
 * DELETE /api/:table - Delete all records from the specified table.
 * 
 * EMAIL Operations:
 * ----------------------
 * 
 * POST /api/email - Send an email using the specified parameters.
 * 
 * FILE Operations:
 * ----------------------
 * 
 * POST /api/upload - Upload a file to the server.
 * GET /api/download/:filename - Download a file from the server by filename. Possilbe POST method to download file with parameters.
 * 
 * Middleware:
 * -------------------
 * CORS Middleware: Allows cross-origin requests from any origin.
 * Express URL extneded Parser- Parses incoming request bodies with URL-encoded payloads.
 * Token Authentication - verifys the presence and validity of a token in the request headers for protected routes.
 * 
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const tableRoutes = require('./modules/table_ops');
const emailRoutes = require('./modules/email_ops');
const fileRoutes = require('./modules/file_ops');
const authRoutes = require('./modules/auth_ops');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the Generic API Server');
});

//Route handlers - incoming requests are routed to the appropriate module based on the URL path
app.use('/', tableRoutes);
app.use('/email', emailRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRoutes);




app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.APP_PORT}`);
});