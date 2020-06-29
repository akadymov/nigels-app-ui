module.exports = (req, res) =>
  res.status(200).json({
    email: "some@email.com",
    username: req.params.username,
    last_seen: Date.now(),
    registered: Date.now(),
    preferred_lang: "en",
    about_me: null
  });