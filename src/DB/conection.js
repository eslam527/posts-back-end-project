import { Sequelize } from "sequelize";





export const  sequelize =new Sequelize(`posts`,'root','',{
    host:'127.0.0.1',
    port:'3306',
    dialect:'mysql'
});
export const syncDB= async ()=>{
    await sequelize.sync({force:false}).then(res=>{
      console.log(`Connection has been established successfully.`);
  
    }).catch(error=>{
      console.error('Unable to connect to the database:', error)
      
    })
  }
  