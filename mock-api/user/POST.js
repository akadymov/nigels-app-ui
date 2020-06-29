module.exports = (req, res) => {
    const userEmail = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body["repeat-password"];
    const lang = "en"
    if (req.body.preferred-lang) {
      lang = req.body.preferred-lang
    }
  
    if (userEmail === 'gsukhy@gmail.com') {
      return res.status(400).json({
        error: "User with email " + userEmail + " already exists!",
        incorrect_fields: [
            "email"
        ]
      });
    };
  
    if (username === 'gsukhy') {
      return res.status(400).json({
        error: "User with username " + username + " already exists!",
        incorrect_fields: [
            "username"
        ]
      });
    };
  
    if (password !== password2) {
      return res.status(400).json({
        error: "Password confirmation is invalid!",
        incorrect_fields: [
            "repeat-password"
        ]
      });
    };

    if (password.length < 5) {
        return res.status(400).json({
            error: "Password does not satisfy security requirements!",
            incorrect_fields: [
                "password"
            ]
        })
    };

    if (lang != "en" && lang != "ru") {
        return res.status(400).json({
            error: "Language sdf is not supported!",
            incorrect_fields: [
                "preferred-lang"
            ]
        })
    };
  
    return res.status(201).json({
      email: req.body.email,
      username: req.body.username,
      last_seen: Date.now(),
      registered: Date.now(),
      preferred_lang: lang,
      about_me: null
    });
  };