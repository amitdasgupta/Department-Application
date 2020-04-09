class Auth {
  login(token, name) {
    localStorage.setItem("name", name);
    localStorage.setItem("token", JSON.stringify(token));
  }

  logout(cb) {
    localStorage.removeItem("token");
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else return false;
  }
}

export default new Auth();
