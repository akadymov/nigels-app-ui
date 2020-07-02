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
  
    if (roomId === "10") {
      errors={
        field:"roomId",
        message:"Room with specified id does not exist!"
      }
    }
  
    if (roomId === "2") {
      errors={
        field:"roomId",
        message:"You are not connected to specified room!"
      }
    }
  
    if (roomId === "4") {
      errors={
        field:"roomId",
        message:"You cannot disconnect from hosted room!"
      }
    }

    if(errors.length>0) {
      return res.status(403).json({errors})
    }
  
    return res.status(200).json({});
  };