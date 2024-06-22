import mongoose from "mongoose";

const connectionDB=async()=>{
    return await mongoose.connect('mongodb://localhost:27017/library')
    .then(()=>{
         console.log('DB connected')
 
    }).catch((err)=>{
        console.log({msg:'Faild to connect to DB',err} )

    })
}
export default connectionDB