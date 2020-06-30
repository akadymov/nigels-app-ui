module.exports = (req, res) => {
    const userEmail = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.repeatPassword;
    const lang = "en"
    if (req.body.preferredLang) {
      lang = req.body.preferredLang
    }

    const errors = [];
  
    if (userEmail === 'gsukhy@gmail.com') {
      errors.push({
        field:"email",
        message:"Email " + userEmail + " is unavailable!"
      });
    };
  
    if (username === 'gsukhy') {
      errors.push({
        field:"username",
        message:"User " + username + " already exists!"
      });
    };
  
    if (password !== password2) {
      errors.push({
        field:"repeatPassword",
        message:"Password confirmation does not match!",
        password: password,
        repeatPassword: password2
      });
    };

    if (password.length < 5) {
      errors.push({
        field:"password",
        message:"Password does not meet security requirements!"
      });
    };

    if (lang != "en" && lang != "ru") {
      errors.push({
        field:"preferredLang",
        message:"Language " + lang + " is not supported!"
      });
    };

    if(errors.length>0) {
      return res.status(400).json({errors})
    }
  
    return res.status(201).json({
      email: req.body.email,
      username: req.body.username,
      lastSeen: Date.now(),
      registered: Date.now(),
      preferredLang: lang,
      aboutMe: null
    });
  };