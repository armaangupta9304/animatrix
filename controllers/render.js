exports.getIndex = (req, res, next) => {
  res.render("index", {
    title: "Home",
  });
};

exports.getSignup = (req, res, next) => {
  res.render("signup", { title: "signup" });
};

exports.getSignin = (req, res, next) => {
  res.render("signin", { title: "Signin" });
};
