import { where } from "sequelize";
import userModule from "../../DB/modules/Ueser.module.js";
import { errorHandel } from "../../utila/errorHandling.js";




 const  signUp = async(req,res,next)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = await userModule.findOrCreate({
            where:{email},
            defaults:{
                name,
                email,
                password,
                role
            }
        })
        return user[1]? res.status(201).json({message:'user added sucsessfully',user:user[0]}):
         res.status(409).json({message:'email already exist'})
    } catch(err){
   await errorHandel(err,res)
        return res.status(500).json({message:'error',err})

    }
};
const  logIn = async(req,res,next)=>{
    try{
     const {email,password}= req.body;
     const user = await userModule.findOne({
        where:{
            email,
            password
        }
     });
     if(user){
        return res.status(200).json({message:'logedIn' ,user})

     }else{
        return res.status(500).json({message:'in-valid email or password'})

     }
    }catch(err){
      errorHandel(err,res);

    }
}

 const createOrUpdate = async(req,res,next)=>{
    try{
        const {id} = req.params
        const {name,email,password,role} = req.body;
    const  user = await userModule.findByPk(id) 
if(user){
    await user.update({          
        name,
        email,
        password,
        role
})
    return  res.status(201).json({message:'user Updated',user})

}else{
    await userModule.create({
        name,
        email,
        password,
        role
});
return res.status(201).json({message:'user created'})
// when show user output be null

}





    }catch(err){
        errorHandel(err,res)
    }
};
const getUserByEmail = async(req,res,nsxt)=>{
    try{
        const {email} = req.params 
        const user = await userModule.findOne({where:{email}})
        if(user){
             return  res.status(201).json({user})
        }else{
            return  res.status(401).json({message:'user is not found'})

        }
        
        }
    catch(err){
    //  errorHandel(err,res)
    res.status(500).json({message:'ok',err})

    }
 
 };
 const getUserById = async(req,res,nsxt)=>{
    try{
        const {id} = req.params 
        const user = await userModule.findOne({where:{id}})
        if(user){
             return  res.status(201).json({user})
        }else{
            return  res.status(401).json({message:'user is not found or in-valid id'})

        }
        
        }
    catch(err){
    //  errorHandel(err,res)
    res.status(500).json({message:'ok',err})

    }
 
 }
export  {signUp,createOrUpdate,getUserByEmail,getUserById,logIn}