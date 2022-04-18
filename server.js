const express = require('express');
const connectDB = require('./config/database');
const path = require('path');

const app = express();

// Connect to Mongo DB
connectDB();

// Init Middleware
// Parse JSON bodies for this app. Make sure you put
// app.use(express.json()) before your route handlers!
app.use(express.json({ extends: false }));

// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to the contact keeper api' })
// );

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/dist'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
}

// search first for env variable called PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
