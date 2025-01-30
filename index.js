const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose
  .connect('mongodb+srv://lavanyakoppisetti:lavanya1402@cluster1.pp2m8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('signups', UserSchema);

// User Registration
app.post('/adduser', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post("/login", (req, res) => {
  const {email, password} = req.body;
  User.findOne({email: email})
  .then(user => {
     if(user) {
       if(user.password== password){
         res.json("the password is correct")
       } else {
        res.json("the password is incorrect")
        }
  }
  })
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
