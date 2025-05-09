const express = require('express');
const app = express();
const db=require('./config/connection')
const nodemailer = require('nodemailer')

const path = require('path')
const usermodel = require('./modules/usermodel');
const productmodel = require('./modules/uploadProduct');
const cartmodel = require('./modules/cartmodel');
const shopmodel = require('./modules/shopmodel');
const cookieParser = require('cookie-parser');
const expressSession=require("express-session")
const flash = require("connect-flash")
const bcrypt = require('bcrypt');
const ordermodel = require("./modules/ordersmodel")



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"dddddd"
})
)
app.use(flash())


// controllers
const transporter = nodemailer.createTransport({
    secure:true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user:"md.packme.official@gmail.com",
      pass:"kulhkhgmehltxoxz",
    }
  
  })
  



function loginMiddleware(req, res, next) {
    // Check if there's a JWT token in cookies
   // Bearer token format
  
    if (req.cookies.email=="") {
      // If no token, redirect to home ("/") route
      let suc= req.flash("error","Please Login For Further Auction")
        res.redirect("/in")
    }else{
        next()
    }

}









app.get("/forgetpassword",function(req,res){
    res.render("forget")
})
app.get('/in',function(req,res){

  
   
    let suc=req.flash("error")
    res.cookie("email","")
    res.render("index",{suc})
    
})
app.get("/",function(req,res){
    res.cookie("email","")
   res.render("base")
})

app.post("/forgetpassword",async function(req,res){
    let {forgetemail} = req.body
    console.log(forgetemail)
    let user =await usermodel.findOne({email:forgetemail})
    if(user==  null)
        {
            let suc= req.flash("error","No account found on your Email! please Create account")
            res.redirect("/in")
        }
   
    else{
        if(forgetemail==user.email){
            let user =await usermodel.findOne({email:forgetemail})
        async function main() {
        // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"Pack-Me.official" <md.packme.official@gmail.com>', // sender address
              to: forgetemail, // list of receivers
              subject: "Your Password", // Subject line
              text: "Dear\t"+user.fullname+"\n\n"+"Forgot your password? No worries! At Pack-Me Bag, we make it easy to regain access to your account. Simply use password in  login page, and get back to shopping for your perfect bag in no time. Your privacy and security are our top priority, and our password recovery process is fast and simple. If you need further assistance, our customer support team is always here to help. Reset your password today and continue your shopping journey with Pack-Me Bag!\n"+"\n \n PASSWORD:"+user.password+"."
            });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
      let suc= req.flash("error","Your Passwor has sent to your Email.use that and login")
        res.redirect("/in")
    }
    }
   


})

app.post("/register", async  function(req,res){
    let{fullname,email,phone,city,password,pin}=req.body

    const findOneEmail = await usermodel.findOne({ email:email, })
    if (findOneEmail) {
       
        let suc= req.flash("error","Email already in use")
        res.redirect("/in")
        
    }else if(fullname.length<4){
        let suc= req.flash("error","please use proper name")
        res.redirect("/in")
            
    }else  if(password.length<8){
        let suc= req.flash("error","password must containes more than 8 characters")
        res.redirect("/in")
    }else if(phone.length<10 || phone.length>10){
        let suc= req.flash("error","phone number is invalid!should be 10 digits")
        res.redirect("/")
    }else if(!pin.length==6){
        let suc= req.flash("error","invalid pin")
        res.redirect("/in")
    }else{
       
            
                let user = await usermodel.create({
                    fullname:fullname,
                    email:email,
                    phone:phone,
                    password:password,
                    pin:pin,
                    location:city,

                })
                let token =user.email
                res.cookie("email",token)
                let suc= req.flash("logined","Welcome to Pack me ")
                res.redirect("/home")
                async function main() {
                    // send mail with defined transport object
                        const info = await transporter.sendMail({
                          from: '"Pack-Me.official" <md.packme.official@gmail.com>', // sender address
                          to: user.email, // list of receivers
                          subject: "Welcome to Pack-Me", // Subject line
                          text: "Hi!"+" "+user.fullname+"\n\n"+"Welcome to Pack-Me Bag! We're thrilled to have you on board. Explore our wide range of stylish and durable bags, perfect for any occasion. Enjoy easy shopping, fast shipping, and excellent customer service. Let us help you find the perfect bag today!"+"\n \n "+"Happy shopping,"+"\n\n"+"The Pack-Me Team"
                        });
                  
                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
                  }
                  
                  main().catch(console.error);
            
        
    }
        
        
    
})
app.get("/collection",loginMiddleware, async function(req,res){
    let products=await productmodel.find({producttype:6,productprice: { $gte: 900 } })
    let products1=await productmodel.find({producttype:7,productprice: { $gte: 900 } })
    let products2=await productmodel.find({producttype:8,productprice: { $gte: 900 } })
    let products3=await productmodel.find({producttype:9,productprice: { $gte: 900 } })
    let suc=req.flash("cart")
    let suc1=req.flash("suc")
    res.render("collection",{products,products1,products2,products3,suc,suc1})
    
})
app.post("/login", async function(req,res){
    let{email,password}=req.body
    let checkmail=await usermodel.findOne({email: email,})
    if(checkmail){
        
            if(checkmail.password==password){
                
                res.cookie("email",checkmail.email)
                let suc= req.flash("logined","welcome back!")
                res.redirect("/home")
                
            }else{
                let suc= req.flash("error","Email or Password is Wrong")
                res.redirect("/in")
            }
        
       
    }else{
        let suc= req.flash("error","Email Not Found! Create a new account")
        res.redirect("/in")
    }
    
    
    
       
   

})

app.get("/logout",function(req,res){
    res.cookie("email","")
    res.redirect("/")
})

app.get("/home",  loginMiddleware,function(req,res){
    
    let suc=req.flash("logined")
    res.render("home",{suc})
})

app.post("/backpack", loginMiddleware,async function(req,res){
    let det={priceRange}=req.body
    console.log(priceRange)
    if(priceRange=="0-500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:1,productprice: { $lte: 500 } })
        res.render("Backpack",{products,suc})
        
    }
     else if(priceRange=="500-1000"){
        
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:1,productprice: { $gte:500,$lte: 1000 } })
        res.render("Backpack",{products,suc})
    }else if(priceRange=="1000-1500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:1,productprice: { $gte:1000,$lte: 1500 } })
        res.render("Backpack",{products,suc})
    }else if(priceRange=="1500-2000"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:1,productprice: { $gte:1500,$lte: 2000 } })
        res.render("Backpack",{products,suc})
    }else if(priceRange=="2000-2500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:1,productprice: { $gte:2000,$lte: 2500 } })
        res.render("Backpack",{products,suc})
    }
})
app.get("/backpack", loginMiddleware,async function(req,res){
    let suc=req.flash("cart")
    let products= await productmodel.find({producttype:1}).limit(15)
    res.render("Backpack",{products,suc})
    console.log(req.cookies)
})


// wheel  bags
app.get("/wheelbag",async function(req,res){
    let products= await productmodel.find({producttype:2})
    res.render("wheelbags",{products})
    console.log(req.cookies)
})
app.post("/wheelbag", loginMiddleware,async function(req,res){
    let det={priceRange}=req.body
    console.log(priceRange)
    if(priceRange=="0-500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:2,productprice: { $lte: 500 } })
        res.render("wheelbags",{products,suc})
        
    }
     else if(priceRange=="500-1000"){
        
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:2,productprice: { $gte:500,$lte: 1000 } })
        res.render("wheelbags",{products,suc})
    }else if(priceRange=="1000-1500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:2,productprice: { $gte:1000,$lte: 1500 } })
        res.render("wheelbags",{products,suc})
    }else if(priceRange=="1500-2000"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:2,productprice: { $gte:1500,$lte: 2000 } })
        res.render("wheelbags",{products,suc})
    }else if(priceRange=="2000-2500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:2,productprice: { $gte:2000,$lte: 2500 } })
        res.render("wheelbags",{products,suc})
    }
})
// tote bags
app.get("/totebag", loginMiddleware,async function(req,res){
    let products= await productmodel.find({producttype:3})
    res.render("tote",{products})
    console.log(req.cookies)
})
app.post("/totebag", loginMiddleware,async function(req,res){
    let det={priceRange}=req.body
    console.log(priceRange)
    if(priceRange=="0-500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:3,productprice: { $lte: 500 } })
        res.render("tote",{products,suc})
        
    }
     else if(priceRange=="500-1000"){
        
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:3,productprice: { $gte:500,$lte: 1000 } })
        res.render("tote",{products,suc})
    }else if(priceRange=="1000-1500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:3,productprice: { $gte:1000,$lte: 1500 } })
        res.render("tote",{products,suc})
    }else if(priceRange=="1500-2000"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:3,productprice: { $gte:1500,$lte: 2000 } })
        res.render("tote",{products,suc})
    }else if(priceRange=="2000-2500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:3,productprice: { $gte:2000,$lte: 2500 } })
        res.render("tote",{products,suc})
    }
})
// gym bags
app.get("/gymbags",async function(req,res){
    let products= await productmodel.find({producttype:4})
    res.render("gymbags",{products})
    console.log(req.cookies)
})
app.post("/gymbags", loginMiddleware,async function(req,res){
    let det={priceRange}=req.body
    console.log(priceRange)
    if(priceRange=="0-500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:4,productprice: { $lte: 500 } })
        res.render("gymbags",{products,suc})
        
    }
     else if(priceRange=="500-1000"){
        
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:4,productprice: { $gte:500,$lte: 1000 } })
        res.render("gymbags",{products,suc})
    }else if(priceRange=="1000-1500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:4,productprice: { $gte:1000,$lte: 1500 } })
        res.render("gymbags",{products,suc})
    }else if(priceRange=="1500-2000"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:4,productprice: { $gte:1500,$lte: 2000 } })
        res.render("gymbags",{products,suc})
    }else if(priceRange=="2000-2500"){
        let suc=req.flash("cart")
        let products=await productmodel.find({producttype:4,productprice: { $gte:2000,$lte: 2500 } })
        res.render("gymbags",{products,suc})
    }
})

// app.get("/admin", loginMiddleware,(req,res)=>{
//     let suc = req.flash("suc")
//     res.render("admin",{suc})
// })


app.get("/admin",loginMiddleware,(req,res)=>{
    let suc=req.flash("error")
    res.render("adminindex",{suc})
})
app.post("/addp", loginMiddleware,async (req,res)=>{
    let{pname,pdes,pimage,pprice,mode,rate}=req.body
    let product= await productmodel.create({
        productname: pname,
        producttype:mode,
        productdesc:pdes,
        productimage: pimage,
        productprice: pprice,
        productrate:rate,
    })
   if(product){
    req.flash("suc","your product is in our collection")
    res.redirect("/admin")
   }
})
app.post("/cart", loginMiddleware, async function(req,res){
    let{productimage,productname,productprice,productdesc}=req.body
    let cart= await cartmodel.create({
        email:req.cookies.email,
        productname:productname,
        productdesc:productdesc,
        productimage:productimage,
        productprice:productprice,

    })
    req.flash("cart","successfully added to cart")
   res.redirect("back")

  
      
   
})
app.post("/order", loginMiddleware,async function(req,res){
    let {productname,productimage,productdesc,productprice,phone,location,pin,mode}=req.body
    console.log(req.cookies.email)
    if(phone.length<10||phone.length>10){
        req.flash("suc","order not placed ,because your phone number is not valid")
        res.redirect("/collection")
    }
    else if(location.length<=3){
        req.flash("suc","order not placed ,because location is invalid")
        res.redirect("/collection")
    }else if(pin.length>6||pin.length<6){
        req.flash("suc","order not placed ,because your pin number is not valid")
        res.redirect("/collection")
    }
    else if(mode.length<=0){
        req.flash("suc","please select proper mode of payment")
        res.redirect("/collection")
    }
    else{
        const order = await ordermodel.create({
            email:req.cookies.email,
            productname:productname,
            productdesc:productdesc,
            productimage:productimage,
            productprice:Number(productprice)+40,
            phone:phone,
            location:location,
            pin:pin,
            mode:mode,
    
        })
        let tamount=Number(productprice)+40
        const user= await usermodel.findOne({ email:req.cookies.email, })
        async function main() {
            // send mail with defined transport object
                const info = await transporter.sendMail({
                  from: '"Pack-Me.official" <md.packme.official@gmail.com>', // sender address
                  to: req.cookies.email, // list of receivers
                  subject: "Order Confirmation - PACK-ME ", // Subject line
                  text: "Dear"+" "+user.fullname+"\n\n"+"Thank you for your order with PACK-ME! We are excited to confirm that we have successfully received your order for a bag. Below are the details of your order:"+"\n \n "+"Order Number:"+"\n\n"+"Item Purchased:\t"+productname+"\n\n"+"Quantity:"+"\n\n"+"Total Amount "+"<b>tamount</b>"+"\n\n"+"Shipping Address: "+location+"\n\n"+"Your order is currently being processed, and we will notify you once your item has been shipped. We aim to provide you with a seamless shopping experience, and your satisfaction is our priority."+"\n\n"+"If you have any questions or require further assistance, please feel free to contact our customer support team at [Customer Support Email/Phone Number]."+"\n\n"+"Thank you for choosing PACK-ME. We look forward to serving you again soon!"+"\n\n"+"Best regards"+"\n"+"PACK-ME"
                });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
          
          main().catch(console.error);
        res.redirect("/orderplaced")
    }
   
   
   
})
app.post("/buynow", loginMiddleware,async function(req, res){
    let deta = {productimage,productdesc,productname,productprice}=req.body
    res.render("view2",{deta})
   

   
   
})
app.get("/cartread", loginMiddleware,async function(req,res){
    let product = await cartmodel.find({
        email:req.cookies.email,
    })
    let suc=req.flash("cart")
    res.render("cart",{product,suc})
  
    
})
app.get("/myorders", loginMiddleware,async function(req,res){
    let product= await ordermodel.find({
        email:req.cookies.email,
    })
    
    res.render("myorders",{product})
  
    
})


app.post("/removecart", loginMiddleware, async function(req,res){
    let{productprice}=req.body
   let deleted = await cartmodel.findOneAndDelete({email:req.cookies.email},{productprice:productprice})
   if(deleted){
    req.flash("cart","product removed from cart")
    res.redirect("/cartread")  
   }
})

app.get("/new" , loginMiddleware,async function(req,res){
    let products=await productmodel.find({producttype:10,productprice: { $gte: 900 } })
    let products1=await productmodel.find({producttype:11,productprice: { $gte: 900 } })
    let products2=await productmodel.find({producttype:12,productprice: { $gte: 900 } })
    let products3=await productmodel.find({producttype:13,productprice: { $gte: 900 } })
    let suc=req.flash("cart")
    res.render("newlunches",{products,products1,products2,products3,suc})
})



app.get("/profile", loginMiddleware,async function(req,res){

   let user = await usermodel.findOne({email:req.cookies.email})
   let cart=await cartmodel.countDocuments({ email:req.cookies.email });
   let orders=await ordermodel.countDocuments({ email:req.cookies.email });
   
 
  res.render("profile",{user , cart,orders})
})
app.get("/contact", loginMiddleware,async function(req,res){
    res.send("page is under maintance")
})
app.post("/knowmore", loginMiddleware,function(req,res){
    let suc=req.flash("cart")
    let deta={productimage,productname,productprice,productdesc}=req.body
    res.render("viewproduct",{deta,suc})
})
app.get("/knowmore", loginMiddleware,function(req,res){
    let suc=req.flash("cart")
    let deta={productimage,productname,productprice,productdesc}=req.body
    res.render("viewproduct",{deta,suc})
})

app.get("/orderplaced", loginMiddleware,function(req,res){
    res.render("orderplaced")
 
})

app.post("/shopregister",loginMiddleware,async function(req,res){
    let user = {shop_name,shop_address,shop_phone1,shop_phone2,state,shop_city,pin,shop_email,password,owner}=req.body
    
    const findOneEmail = await shopmodel.findOne({shopemail:shop_email, })
    if(findOneEmail){
        let suc= req.flash("error","Email already in use")
        res.redirect("/admin")
    }
    else if(shop_name.length<=4){
        let suc= req.flash("error","please Use proper Name of your Shop")
        res.redirect("/admin")
    }
    else if(shop_address==null||shop_address.length<=4){
        let suc= req.flash("error","Invalid Address")
        res.redirect("/admin")
    }
    else if(shop_phone1.length>10||shop_phone1.length<10)
    {
        let suc= req.flash("error","please use proper Phone number")
        res.redirect("/admin")
    }
    else if(shop_phone2.length>10||shop_phone2.length<10)
    {
        let suc= req.flash("error","please use proper Phone number")
        res.redirect("/admin")   
    }
    else if(state==null||state.length==0)
    {
        let suc= req.flash("error","invalid State")
        res.redirect("/admin")
    }
    else if(shop_city==null||shop_city.length==0)
    {
        let suc= req.flash("error","Invalid City")
        res.redirect("/admin")
    }
    else if(pin.length<6||pin.length<6)
    {
        let suc= req.flash("error","Invalid Pin")
        res.redirect("/admin")
    }
    else if(password.length<=8){
        let suc= req.flash("error","password should be more than 8 characters")
        res.redirect("/admin")
    }
    else if(shop_email==null)
    {
        let suc= req.flash("error","Invalid Email")
        res.redirect("/admin")
    }
    else if(owner.length<=4){
        let suc= req.flash("error","Please Provide Proper Name")
        res.redirect("/admin")
    }
    else
    {
        console.log(shop_name)
        let shopupper=shop_name.toUpperCase()
        let ShopId=shopupper.substring(0,5)
        console.log(ShopId)
        finalId = ShopId+"PKM24"
        finalId2=finalId.split(" ").join("");
        console.log(finalId2)
        shopmodel.create({
                shopID:finalId2,
                shopname:shop_name,
                shopemail:shop_email,
                shopaddress:shop_address,
                Shopphone1:shop_phone1,
                Shopphone2:shop_phone2,
                state:state,
                shopcity:shop_city,
                pin:pin,
                companyowner:owner,
                password:password,
            })
            let token = shop_email
            let token2 = finalId
            res.cookie("shopemail",token)
            res.cookie("shopId",token2)
            async function main() {
            const info = transporter.sendMail({
                from: '"Pack-Me.official" <md.packme.official@gmail.com>', // sender address
                to:shop_email , // list of receivers
                subject: "🎉 Welcome to Pack-Me Bag! Your Shop is Now Live! 🎉", // Subject line
                text: "Dear"+""+owner+"\n\n"+"Congratulations and welcome to Pack-Me Bag! We are thrilled to inform you that your shop has been successfully created and is now live on our platform. 🎉"+"Your journey to showcase and sell your amazing products to a wider audience starts right here, and we are excited to have you on board."
              });
              console.log("Message sent: %s", info.messageId);
            }main()
            // .catch(function(req,res){
            //     let suc= req.flash("error","Please Provide Your Exisiting Email")
            //     res.redirect("/admin")
            // });
            

    }
})

app.post("/shoplogin", async function(req,res){
    let{shopemail,password}=req.body
    let checkmail=await shopmodel.findOne({shopemail: shopemail,})
    if(checkmail){
        
            if(checkmail.password==password){
                
                res.cookie("email",checkmail.email)
                let suc= req.flash("logined","welcome back!")
                res.redirect("/myshop")
                
            }else{
                let suc= req.flash("error","Email or Password is Wrong")
                res.redirect("/admin")
            }
        
       
    }else{
        let suc= req.flash("error","Email Not Found! Create a new account")
        res.redirect("/admin")
    }
    
    
    
       
   

})

app.get("/myshop",(req,res)=>{
    res.send("logined")
})

// app.post()
 
let port=3000
app.listen(port, () => {console.log("this is listening on",port)})
