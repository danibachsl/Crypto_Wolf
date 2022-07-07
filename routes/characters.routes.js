const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Crypto = require("../models/Crypto.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const CryptosAPI = new Api()

router.get('/cryptos', (req, res)=>{
    
    CryptosAPI
    .getAllCryptos()
    .then((allCryptos) => {
        // res.render(`cryptos/list`, {cryptos: allCryptos.data.results} )
        res.render(`cryptos/list`, {cryptos: allCryptos.data, user: req.session.user})
    })
    .catch(err => console.log(err));
    
})

router.get('/community', (req, res)=>{

    res.render(`community`, {user: req.session.user})

    .catch(err => console.log(err));

})

router.get('/news', (req, res)=>{

    res.render(`news`, {user: req.session.user})

    .catch(err => console.log(err));

})

router.get('/crypto_chart', (req, res)=>{

    // res.render(`cryptos/crypto_chart`, {user: req.session.user})
    res.render("./chart_index.html")
    .catch(err => console.log(err));

})



router.post("/add-favorite", (req, res) =>{
const query = { name, status, species, gender, image, apiId } = req.body
const idToCheck = req.body.apiId;
    Crypto.find({apiId: idToCheck})
	.then (charArray => {
		//comprobar si ese apiId ya esta en db cryptos
		if (charArray.length === 0) {
            Crypto
                .create(query)
                .then(result => {
                  User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : result._id}})
                    .then(()=>{
                        res.redirect("/cryptos")
                    })
                })
                .catch(err => console.log(err))
        } else {
			User
            .findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(charArray[0]._id)){
                    User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : charArray[0]._id}})
                    .then(()=>{
                        res.redirect("/cryptos")
                    })
                }else{res.redirect("/cryptos")}
            })
            .catch((err)=>{
            console.log(err)
            })
            
            
            
		}
	}) 
})


router.post("/delete-favorite", (req,res)=>{
    const {id} = req.body
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;