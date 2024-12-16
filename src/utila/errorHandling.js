//في مشكله هنا لما يكون(2 errors at same time)
export async function errorHandel(err,res){
    if(err?.name === 'SequelizeUniqueConstraintError'){
        const errorDeteles =err.errors.map(error=>{
            return {path:error.path,message:error.message}
        })
        return res.status(400).json({message:'Validation error',errorDeteles})

    }
    if(err?.name === 'SequelizeValidationError'){
        const errorDeteles =err.errors.map(error=>{
            return {path:error.path,message:error.message}
        })
        return res.status(400).json({message:'Validation error',errorDeteles})

    }
}