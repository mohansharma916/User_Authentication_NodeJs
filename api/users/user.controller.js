const {create,getUserById,getUsers,updateUser,deleteUser,getUserByEmail }=require("./user.service");

const {genSaltSync,hashSync,compareSync }=require("bcrypt");

const {sign }=require('jsonwebtoken')

module.exports={
    createUser:(req,res)=>{
        const body=req.body; 
        const salt =genSaltSync(10);
        body.password=hashSync(body.password,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json ({
                    success:0,
                    message:"Database Connection Error"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUserById:(req,res)=>{
        const id=req.params.id;
        getUserById(id,(err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record Not Found"
                })
            }
            return res.json({
                success:1,
                data:results
            })
        });
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },
    updateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Failed to Update user"
                })
            }
            return res.json({
                success:1,
                message:"update Successfully"
            })
        })
    },
    deleteUser:(req,res)=>{
       const data=req.body;
       deleteUser(data,(err,results)=>{
        if (err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message:"Record Not Found"
            })
        }
        return res.json({
            success:1,
            message:"user Deleted Successfully"
        })
       })
    },
    login:(req,res)=>{
        const body=req.body;
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data:"invalid Email or Password"

                })
            }
            const result=compareSync(body.password,results.password);
            if(result){
                results.password=undefined;
            const jsontoken=sign({result:results}, "qwe1234",{
                expiresIn:"1h"
            });
            return res.json({
                success:1,
                message:"login Succsfully",
                token:jsontoken
            })
                    }else{
                        return res.json({
                            success:0,
                            data:"Invalid email or Password"
                        })
                    }
        });
    }

}