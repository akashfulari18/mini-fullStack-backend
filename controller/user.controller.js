const express = require('express')
require('dotenv').config()
const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {

    const { email } = req.body
    try {
        const isPresent = await UserModel.find({ email: email })
        // console.log(isPresent.length)
        if (isPresent.length > 0) {


            res.status(400).send({ msg: "User already exists!" })
        } else {

            const hashPass = await bcrypt.hash(req.body.password, 12)

            const user = new UserModel({ ...req.body, password: hashPass })

            const result = await user.save()
            res.status(200).send({ data: result })
        }

    } catch (err) {
        res.status(400).send({ err: err.message })
    }

}

const getusers = async(req,res)=>{
    
    try {
            
        const users = await UserModel.find()
        console.log(users)
        res.status(200).send({data:users})
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
}
const login = async (req, res) => {

    const { email, password } = req.body
// console.log(email)
    try {
        const isPresent = await UserModel.findOne({ email: email })
        if (isPresent) {
            const decoded = await bcrypt.compare(password, isPresent.password)
            
            
            if (!decoded) {
                res.status(400).send("invalid password")
            }
            
            let token = jwt.sign({ userID: isPresent._id,role:isPresent.role }, process.env.privateKey, { expiresIn: "10d" })
            
            //  console.log(token)
            res.status(200).send({
                "token":token,
                "data": isPresent
            })

        }
    } catch (err) {

        res.status(400).send({ err: err.message })
    }
}
module.exports = { register, login ,getusers}