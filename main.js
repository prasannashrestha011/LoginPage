const express = require('express');

const exphbs = require('express-handlebars');

const app = express();
app.use(express.static('./default'))
app.use(express.json())
const PORT = 3000;
//validators
const {checkSchema,validationResult}=require('express-validator')
const userValidation=require('./validators/validator.js')
const hbs = exphbs.create({}); // Create an instance of exphbs
const Routes=require('./routes/front.js')
app.engine('handlebars', hbs.engine); // Use the engine from the instance
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:false}))
const session=require('express-session')
app.use(session({
    secret:'apple123',
    resave:false,
    saveUninitialized:false
}))
const passport=require('passport')
const strategy=require('passport-local')
    require('./routes/auth.js')
app.use(passport.initialize())
app.use(passport.session())
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/UserData').then(()=>{
    console.log("Connected to the database")
}).catch((err)=>{
    console.log(err)
})
const userSchema=require('./mongodb/schema.js')
app.use(Routes)
app.get('/',(req,res)=>{
    res.render('default')
})
app.get('/create',(req,res)=>{
    console.log('register page')
    res.render('auth')
})
app.post('/create', checkSchema(userValidation), async (req, res) => {
    const DetectErr = validationResult(req)
    try {
        if (!DetectErr.isEmpty()) throw DetectErr.array()
        const { body } = req
        const newUser = new userSchema(body)
        const savedUser = await newUser.save()
        console.log("User saved")
        res.render('message')
    } catch (err) {
     
        res.send(err)
    }
})


app.get('/auth',(req,res)=>{
    console.log('authentication page')
    res.render('authentication')
})
app.post('/auth',passport.authenticate('local'),(req,res)=>{
            console.log('user')
       res.render('index')
})
app.listen(PORT, () => {
    console.log('Server has been executed');
});