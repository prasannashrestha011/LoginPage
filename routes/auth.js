const passport=require('passport')
const strategy=require('passport-local')
const database=require('../mongodb/schema.js')
const {comparePassword}=require('../mongodb/hashing.js')

passport.use(new strategy( async (username,password,done)=>{
    try{

     
        const findUser=await database.findOne({username})
        if(!findUser) throw new Error('User Not FOUND')
        if(!comparePassword(password,findUser.password)) throw new Error('Invalid password')
            console.log('User authenticated')
        done(null,findUser)
     }catch(err){
        console.log(err)
        done(err,null)
     }

}))
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    const findUser=database.findById('id')
    if(!findUser) return console.log("user not found")
    console.log(findUser)
    done(null,findUser)
})

module.exports=passport