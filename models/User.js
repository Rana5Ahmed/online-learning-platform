class User {
  // Constructor is a  function to initialize a new User instance with the required data (id/username/password)
    constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password;
    }
  }
  //availability of using in other modules
  module.exports = User;
  