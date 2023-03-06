module.exports = (req, res) => {
    const gameId = req.params.gameId;
    const token = req.body.token;

    const errors = [];
  
    if (token === 'badToken' || !token) {
      return res.status(401).json({
        field:"token",
        message:"Unauthorized!"
      })
    }
  
    if (token === 'nonHostToken') {
      return res.status(401).json({
        field:"token",
        message:"Only host can shuffle positions!"
      })
    }
  
    if (![1,2,3].includes(gameId)) {
      errors.push({
        field:"roomId",
        message:"Game #" & gameId & " is not started yet!"
      });
    }

    return res.status(201).json({
        "gameId": gameId,
        "players": [
            {
                "position": 1,
                "username": "koshasa"
            },
            {
                "position": 2,
                "username": "ryabina"
            }
        ]
    });
};