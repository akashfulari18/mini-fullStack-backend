const express=require('express')
const mongoose =require('mongoose')
const ProductModel = require('../model/product.model')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const addproduct = async(req,res)=>{

    const token= req.headers.token

    const secret = process.env.privateKey
    let decoded = jwt.verify(token,secret)
    console.log("decoded",decoded)
    try {
        
        const product = new ProductModel(req.body)
        
        const result =await product.save()

        res.status(200).send({data:result})
    } catch (err) {
        res.status(400).send({err:err.message})
    }
    
}

const getproducts = async(req,res)=>{
    try {
        const products = await ProductModel.find()
        if(products.length>0){
            res.status(200).send({data:products})
        }else{
            res.status(400).send({err:"data is unavailable!"})
        }
    } catch (err) {
        
        res.status(400).send({err:err.message})
    }
}
const getsingleproduct = async(req,res)=>{
    const {id} = req.params
    try {
        const product = await ProductModel.findOne({_id:id})
        if(product){
            res.status(200).send({data:product})
        }else{
            res.status(400).send({err:"data is unavailable!"})
        }
    } catch (err) {
        
        res.status(400).send({err:err.message})
    }
}

const deleteproduct = async(req,res)=>{
    
    try {
       const product= await ProductModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({data:product,
        msg:"product has been deleted!"})
    } catch (err) {
        res.status(400).send({err:err.message})
        
    }
}


const updateproduct =async(req,res)=>{
    try {
        const product= await ProductModel.findByIdAndUpdate({_id:req.params.id},req.body)
         res.status(200).send({data:product,
         msg:"product has been updated!"})
     } catch (err) {
         res.status(400).send({err:err.message})
         
     }
 }
module.exports={addproduct,getproducts,deleteproduct,updateproduct,getsingleproduct}