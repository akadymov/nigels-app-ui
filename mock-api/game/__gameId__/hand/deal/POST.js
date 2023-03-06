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
        message:"Only host can deal cards!"
      })
    }
  
    if (![1,2,3].includes(gameId)) {
      errors.push({
        field:"roomId",
        message:"Game " & gameId & " has open hand 5! You should finish it before dealing new hand!"
      });
    }
  
    if (![4,5,6].includes(gameId)) {
      errors.push({
        field:"roomId",
        message:"All hands in game " & gameId & " are already dealt!"
      });
    }

    return res.status(201).json({
        "dealtCardsPerPlayer": 10,
        "gameId": 26,
        "handId": 22,
        "startingPlayer": "koshasa",
        "trump": "d"
    });
};