module.exports = (req, res) => {
    const token = req.body.token;
    const roomId = req.params.roomId;

    const errors = [];
  
    if (token === 'badToken') {
      return res.status(401).json({
        field:"token",
        message:"Unauthorized!"
      })
    }
  
    if (roomId === 'room') {
      errors.push({
        field:"roomId",
        message:"Room with specified id does not exist!"
      });
    }
  
    if (roomId === 'myroom') {
      errors.push({
        field:"roomId",
        message:"You are already connected to specified room!"
      });
    }
  
    if (roomId === '') {
      errors.push({
        field:"roomId",
        message:"Room with specified id is full!"
      });
    }

    if(errors.length>0) {
      return res.status(403).json({errors})
    }
  
    return res.status(200).json({});
  };