const bcrypt=require('bcrypt')
const saltRounds=10
const hashing= async(password)=>{
    const salt=await bcrypt.genSalt(saltRounds)
    return bcrypt.hash(password,salt)
}
const comparePassword=(plain,hashed)=>{
    return bcrypt.compareSync(plain,hashed)
}
module.exports={hashing,comparePassword}