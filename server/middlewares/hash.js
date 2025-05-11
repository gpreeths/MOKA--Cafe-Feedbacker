const bcrypt = require('bcrypt');

// password for testing
const password = 'admin123';

// Hash the password manually 
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hashedPassword);
  }
});
