import { syncDB } from "./DB/conection.js";
import userModule from "./DB/modules/Ueser.module.js";
import authRoutes from "./moduels/auth/auth.controller.js"; 
import postsRouters from './moduels/posts/posts.controller.js'
import commentRouters from './moduels/comments/comments.controller.js'



const bootstrap =async (app,express)=>{
 app.use(express.json());
    app.get  ('/',(req,res,next)=>{

        return res.status(200).json({meassge:'welcom'})
    });
    app.use('/users',authRoutes);
    app.use('/posts',postsRouters);
    app.use('/comment',commentRouters)
}

export default bootstrap