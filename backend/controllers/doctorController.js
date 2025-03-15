

const changeAvailablity=async (req ,res)=>{

    try {


        
    } catch (error) {
        
      console.log(error)
      res.json({success:false,message:error.message})

    }
}

export {changeAvailablity}