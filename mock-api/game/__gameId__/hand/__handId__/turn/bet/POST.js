module.exports = (req, res) => {
    const gameId = req.params.gameId;
    const handId = req.params.handId;
    const token = req.body.token;
    const betSize = req.body.betSize;

    const errors = [];

    const playerGamePairs = [
        {
            'gameId': 4,
            'playerToken': 'ryabina'
        },
        {
            'gameId': 4,
            'playerToken': 'koshasa'
        },
        {
            'gameId': 5,
            'playerToken': 'akadymov'
        },
        {
            'gameId': 5,
            'playerToken': 'gsukhy'
        },
        {
            'gameId': 5,
            'playerToken': 'gigaloff'
        },
    ]

    const openHands = [
        1,2,3,4,5,6
    ]

    const participatingUserTokens = [
        'ryabinaToken',
        'koshasaToken'
    ]
  
    if (token === 'badToken' || !token) {
      return res.status(401).json({
        field:"token",
        message:"Unauthorized!"
      })
    }
  
    if (!betSize) {
      return res.status(401).json({
        field:"token",
        message:"No bet size in request!"
      })
    }
  
    if (!participatingUserTokens.includes(token)){
        'gameId': gameId,
        'playerToken': token
    })) {
      errors.push({
        field:"roomId",
        message:"User {username} is not participating in game " & gameId & "!"
      });
    }
  
    if (!openHands.includes(handId)) {
      errors.push({
        field:"roomId",
        message:"Hand " & handId & " is closed or does not exist!"
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