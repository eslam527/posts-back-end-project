import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../conection.js";

const userModule =sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        field:'u_id'
    },
    name:{
        type:DataTypes.STRING(250),
        allowNull:false,
        field:'u_userName',
        validate:{
            notNull:false
            ,
            chechName() {
                if(this.name.length < 2  ){
               throw new Error ('User name must be greater 2 char ')
                }else if (this.name == 'null' ){
                    throw new Error('user name cant be null') 
                }else if(this.name == 'admin'){
                    throw new Error('user name cant be admin') 

                }
            }

        }
    },
    email:{
        type:DataTypes.STRING(250),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }

    },
    role:{
        type:DataTypes.ENUM(['user','admin']),
        allowNull:false,
        defaultValue:'user',
        field:'u_role'
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:false,
        field:'u_password',
        validate:{
            chechUserBassword() {
                if(this.password.length <6){
               throw new Error ('password musnt greater than 6')
                }
            }

        }
    },
    createdAt:{
        type:DataTypes.DATE,
        field:'u_createdAt'
    },
    updatedAt:{
        type:DataTypes.DATE,
      field:'u_updatedAt'
    }

});

export default userModule;