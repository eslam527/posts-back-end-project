
import { DataTypes, HasMany, Model } from "sequelize";
import { sequelize } from "../conection.js";
import userModule from "./Ueser.module.js";


class Posts extends Model {};
Posts.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        field:'p_id'
    },
    title:{
     type:DataTypes.STRING,
     allowNull:false,
     field:'B_title'
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
        field:'B_content'
   
    },userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:userModule,
            key:'u_id'
        }
        // ,
        // field:'u_id'

    },

    createdAt:{
        type:DataTypes.DATE,
        field:'B_createdAt'
    },
    updatedAt:{
        type:DataTypes.DATE,
      field:'B_updatedAt'
    }

},{
    sequelize,
modelName:'Posts',
tableName:'Posts',
timestamps:true
});

Posts.belongsTo(userModule, {
    foreignKey: "userId", 
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
userModule.hasMany(Posts, { foreignKey: "userId" });
  
export default Posts;
