module.exports = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const errors = [];
  
    if (username !== 'akadymov' || password.length < 5) {
      errors.push({
        field:"username",
        message:"Invalid username or password"
      });
      errors.push({
        field:"password",
        message:"Invalid username or password"
      });
    };

    if(errors.length>0) {
      return res.status(401).json({errors})
    }
  
    return res.status(201).json({
      expiresIn: 86400,
      token: "fakeToken"
    });
  };