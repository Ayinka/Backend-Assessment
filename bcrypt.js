const bcrypt = require('bcrypt');

const comparePassword = function (plainTextPassword,  hashedPasswordFromDatabase) {
bcrypt.compare(plainTextPassword, hashedPasswordFromDatabase, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else if (result) {
    console.log('Passwords match'); // Authentication is successful
  } else {
    console.log('Passwords do not match'); // Authentication failed
  }
});
}
module.exports = comparePassword;