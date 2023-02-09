import { userModel } from "../models/users.js"
import bcrypt from 'bcrypt'
class UserController {
    //without hash
    // static createUserDoc = async (req,res) => {
    //     try {
    //         //creating new document using new model
    //         const doc = new userModel({
    //             name:req.body.name,
    //             email:req.body.email,
    //             password:req.body.password
    //         })
    //         await doc.save()
    //         res.redirect('/login')
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    //with hash
    static createUserDoc = async (req,res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10 , )
        try {
            //creating new document using new model
            const doc = new userModel({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            })
            await doc.save()
            res.redirect('/login')
            
        } catch (error) {
            console.log(error)
        }
    }
    static home = (req,res) => {
        res.render('index.ejs')
    }
    static registration = (req,res) => {
        res.render('registration.ejs')
    }
    static login = (req,res) => {
        res.render('login.ejs')
    }
    //widthout hash
    // static verifyLogin = async (req,res) => {
    //     try {
    //     const {email, password} = req.body
    //     const result = await userModel.findOne({email:email})
    //     if(result != null){

    //         if(result.email === email && result.password === password){
    
    //             res.send(`<h1>... Dashboard Page ... ${result}</h1>`)
    //         }
    //         else{
    //             res.send("<h1>Your either email or password are not valid....</h1>")
    //         }
    //     }
    //     else{
    //         res.send('<h1>You are not registerd user, please register...</h1>')
    //     }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //with hash
    static verifyLogin = async (req,res) => {
        try {
        const {email, password} = req.body
        const result = await userModel.findOne({email:email})
        if(result != null){
            const isMatch = await bcrypt.compare(password,result.password)

            if(result.email === email && isMatch){
    
                res.send(`<h1>... Dashboard Page ... ${result}</h1>`)
            }
            else{
                res.send("<h1>Your either email or password are not valid....</h1>")
            }
        }
        else{
            res.send('<h1>You are not registerd user, please register...</h1>')
        }
        } catch (error) {
            console.log(error)
        }
    }
}
export {UserController}