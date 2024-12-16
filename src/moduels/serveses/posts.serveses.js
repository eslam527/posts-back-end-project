import { Sequelize } from "sequelize";
import { sequelize } from "../../DB/conection.js";
import Comments from "../../DB/modules/commerntsModules.js";
import Posts from "../../DB/modules/posts.module.js";
import userModule from "../../DB/modules/Ueser.module.js";
import { errorHandel } from "../../utila/errorHandling.js";

const  createPost = async(req,res,next)=>{
    const userId =req.params.uid
    try{
        const {title,content} = req.body

  const user = await userModule.findByPk(userId)  
  if(user){
    const post =await Posts.create({
        title,
        content,
        userId
    })
    return  res.status(201).json({message:'post created successfully',post})

  }    
else{
    return res.status(400).json({ message: "In-valid User ID " });

}

        }
    catch(err){
   errorHandel(err,res)
    }
};
const deletePost = async(req,res,next)=>{
    try{
        const userId = req.body.userId; 
        const postId = req.params.id;  
        console.log(postId);
        if(!userId){
            return res.status(400).json({message:'in-valid userId'})
         }
    
     const post = await Posts.destroy({where:{
      id:postId,
      userId
     }});
     
     if(post){return res.status(200).json({message:'post deleted successfully'})
    }else{
        res.status(401).json({message:'you are not uthorizd or in-valid post id'})

}

    }catch(err){
     errorHandel(err,res)
    console.log(err);
    
    }
}
const postDeteles = async (req,res,next)=>{
    try{
const posts = await Posts.findAll({
    attributes:['id','title'],
    include:[
        {
            model:userModule,
            attributes:['id','name']
        },
        {
            model:Comments,
            attributes:['id','content']
        }
    ]
});
return res.status(200).json({message:'done',posts})
    }
catch(err){
await errorHandel(err,res)

}
};
const postCount = async (req,res,next)=>{
    try{
     const count = await Posts.findAll({
        attributes:[
            'id',
            'title',
            [sequelize.fn('COUNT', Sequelize.col('c_id')), 'commentCount'] 

        ],
        include:[
            {model:Comments,
                attributes:[]
             }],
             group:['p_id'],
             raw:true
     });
     return res.status(200).json(({message:`done`,count}))
    }catch(err){
   errorHandel(err.res);
   console.log(err);
   
    }
}



export {createPost,deletePost,postDeteles,postCount}