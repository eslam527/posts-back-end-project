
import { Sequelize, where } from 'sequelize';
import Comments from '../../DB/modules/commerntsModules.js';
import userModule from '../../DB/modules/Ueser.module.js';
import { errorHandel } from '../../utila/errorHandling.js';


const createComments = async(req,res,next)=>{
try{
    const {p_id:postId,content} = req.body;
    if (!req.params.uid) {
        return res.status(400).json({ message: "User ID is missing in request parameters" });
    }

    const userId = req.params.uid;

    const user = await userModule.findByPk(userId)
    if(user){
        const comment = await Comments.create({
            content,
            postId,
            userId
        });
        return res.status(200).json({messagge:'done',comment})
    
    }else{
        return res.status(400).json({ message: "in-valid user id" });

    }

}catch(err){
 errorHandel(err,res)
 console.log(err);
 
}


};

const createManyComments = async (req, res, next) => {
    try {
        const { userId, content, postId } = req.body;
        
        console.log({ userId, content, postId });

        const data = { userId, content, postId };
        const bulkComments = await Comments.bulkCreate(data)
    
        return res.status(201).json({ message: 'done' });
    
    } catch (err) {
        await errorHandel(err, res);
        console.log(err);
    }
};

const updateComment = async (req,res,next)=>{
    try{
 ///في مشكله خنا
    const commentId = req.params.cid;
  const userId = req.params.uid
    const { content, postId } = req.body;
    const comment = await Comments.findByPk(commentId);
    const user = await userModule.findByPk(userId)

    if(!comment){
        return res.status(400).json({messagge:'comment is not found'})
    }
    else if(!user){
        return res.status(400).json({messagge:'user is not found'})

    }else{
        const comment = await Comments.update({
            content,   
            postId,    
            userId,    
        });
    return res.status(201).json({messagge:'done',comment})
    
    }
    
}catch(err){
 errorHandel(err,res)
 console.log(err);
 
}


} 
const findOrCreate = async(req,res,next)=>{
try{
const {postId,userId,content} = req.body;
if (!content || !postId) {
    return res.status(400).json({ message: "Content and Post ID are required" });
}


const user = await userModule.findByPk(userId)
if(user){
    const [comment, created] = await Comments.findOrCreate({
        where: {
            postId,
            userId
        },
        defaults: {
            content,
            postId,
            userId
        }
        
    });
    if (created) {
        return res.status(201).json({ message: 'Comment created successfully', comment });
    } else {
        return res.status(200).json({ message: 'Comment already exists', comment });
    }

}else{
    return res.status(400).json({ message: "in-valid user id" });

}


}catch(err){
    errorHandel(err,res)
    console.log('====================================');
    console.log();
    console.log('====================================');
}

}

const findCommentsByKeyword = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ message: "Keyword is required" });
        }

        const { count, rows } = await Comments.findAndCountAll({
            where: {
                content: {
                    [Sequelize.Op.like]: `%${keyword}%` 
                }
            }
        });

        return res.status(200).json({
            message: "Comments retrieved successfully",
            count, 
            comments: rows 
        });
        
    } catch (err) {
        errorHandel(err, res);
        console.log(err);
    }
};
const getRecentCommentsForPost = async (req, res, next) => {
    try {
        const postId = req.params.id; 

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const recentComments = await Comments.findAll({
            where: {
                postId: postId
            },
            order: [
                ['createdAt', 'DESC'] 
            ],
            limit:3
        });

        if (recentComments.length === 0) {
            return res.status(404).json({ message: "No comments found for this post" });
        }

        return res.status(200).json({
            message: "Recent comments retrieved successfully",
            comments: recentComments
        });

    } catch (err) {
        errorHandel(err, res);
        console.log(err);
    }
};
const getCommentByPK = async (req, res, next) => {
    try {
        const commentId  = req.params.id; 

        
        const comment = await Comments.findByPk(commentId, {
            include: [
                {
                    model: userModule,  
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Posts,
                    attributes: ['p_id', 'B_title', 'B_content'] 
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.status(200).json({
            message: "Comment retrieved successfully",
            comment
        });

    } catch (err) {
        errorHandel(err, res);
        console.log(err);
    }
};


export {createComments,createManyComments,updateComment,findOrCreate,findCommentsByKeyword,getRecentCommentsForPost}