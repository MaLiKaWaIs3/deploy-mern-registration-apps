const ensureAuthenticated = require('../Middlewares/Auth');


const router = require ('express').Router();

router.get('/', ensureAuthenticated,(req,res)=>{
    console.log('----logged in user detail----',req.user);
    res.status(200).json([
        {
        name: "vivo",
        price: 10000
        },
        {
        name: "nokia",
        price: 1000
        }
       
    ])
});

module.exports = router;
