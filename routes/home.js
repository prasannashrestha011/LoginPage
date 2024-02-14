const Router=require('express')
const router=Router()

router.get('/home',(req,res)=>{
    res.render('index')
})
router.get('/about', (req, res) => {
    res.render('about');
});
module.exports=router