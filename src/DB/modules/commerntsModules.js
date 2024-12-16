import { DataTypes, Model } from "sequelize";
import { sequelize } from "../conection.js";
import Posts from "./posts.module.js";

import userModule from "./Ueser.module.js";

class Comments extends Model {};
Comments.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        field:'c_id'
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
        field:'c_content'
   
    },userId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:userModule,
            key:'u_id'
        },



    },postId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Posts,
            key:'p_id'
        },



    }

    ,createdAt:{
        type:DataTypes.DATE,
        field:'c_createdAt'
    },
    updatedAt:{
        type:DataTypes.DATE,
      field:'c_updatedAt'
    }

},{
sequelize,
modelName:'Comments',
tableName:'Comments',
timestamps:true
});
Comments.belongsTo(userModule, {
    foreignKey: "userId", 
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
  Comments.belongsTo(Posts, {
    foreignKey: "postId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
  userModule.hasMany(Comments, { foreignKey: "userId" });
  Posts.hasMany(Comments, { foreignKey: "postId" });
  export default Comments;
