module.exports = (req, res) =>
  res.status(200).json({
    email: "some@email.com",
    username: req.params.username,
    lastSeen: Date.now(),
    registered: Date.now(),
    preferredLang: "en",
    aboutMe: null
  });