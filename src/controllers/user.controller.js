const express = require('express');
const userModel = require('../models/user.model')

const router = express()
const turf =  require("@turf/turf")


router.post("/register", async ( req, res ) => {
    try{
      const User = await userModel.create(req.body);
      return res.json({status: "success",user:true})
    }catch(err){
       return await res.status(500).send(err.message) 
    }
})


router.post("/login", async (req, res)  =>{
  try{
     const User = await userModel.findOne( { email : req.body.email});
     if(User){
      const result = req.body.password === User.password;
       if(result){
        return res.status(200).send(User)
       }else{
        return res.status(401).send({error : "Wrong Password"})
       }
     }else{
      return res.status(404).send({error : "user doesn't exist"})
     }
  }
  catch(err){
     return  res.send(err.message)
  }
})




// update service provider data and find all customer in radius
router.put('/findcustomer/:id', async(req, res) => {

   try{
     const updateServiceProvider  = await userModel.findByIdAndUpdate(req.params.id,{coordinates:req.body.coordinates});
     const allLocations = await userModel.find({type:req.body.type, category:req.body.category});

     // Calculate the distance between the user's location and each location in the database
     const locationsWithinRadius = allLocations.filter(location => {
       if(location.coordinates.length == 2){
         const point1 = turf.point(req.body.coordinates);
         const point2 = turf.point(location.coordinates);
         const distance = turf.distance(point1, point2, { units: 'kilometers' });
         return distance <= req.body.radius;
       }
     
     });
      return res.status(200).json(locationsWithinRadius)
 
   }catch(err){
      return res.status(500).send(err.message)
   }
     
   });




module.exports = router;