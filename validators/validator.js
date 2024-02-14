
const userSchema={
    username:{
        isLength:{
            options:{
                max:14,
                min:5
            },
            errorMessage:"Username characters should be in a range of 5 to 14"
        },
        notEmpty:{
            errorMessage:"Please insert your username"
        }
    },
    
    password:{
        isLength:{
            options:{
                max:14,
                min:5
            },
            errorMessage:" Password length should be between 5 and 14"
        },
        notEmpty:{
            errorMessage:"Please insert your password"
        }
    }
}
module.exports=userSchema