const Product = require('../models/product.js');
const formidable = require('formidable');
const fs = require('fs');
exports.getAllProd = async (req, res) => {
    try {
        const list = await Product.find({},{photo:0});
        console.log(list)
        return res.status(200).json({
            data: list
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            err: "Internal Server Error"
        })
    }
}


exports.productById = async (req, res, next, id) => {
    try {
        let prod = await Product.findById(id);
        req.prod = prod;
        next();
    }
    catch (err) {
        console.log(e);
        return res.status(404).json({
            err: "product doesn't exist"
        })
    }
}

exports.getProd = async (req, res) => {
    return res.status(200).json({
        data: req.prod
    })
}

exports.addProd = async(req,res) => {
    let prod = await Product.findOne({name:req.body.name});
    if( prod && prod!={}){
        return res.status(400).json({
            err:"Product already exists"
        })
    }
    
    let form=new formidable.IncomingForm() //works with x www encoded as front end enters info in form not raw data
	form.keepExtensions=true;
	form.parse(req,(err,fields,files)=>{  //extract fields and files from req
 		console.log(err,fields,files)
        if(err){
			return res.status(400).json({
				error:"Image could not be uploaded"
			})
		}
		let product=new Product(fields) //pass fields to Post from request
		if(files.photo){
			console.log("files photo working")
            product.photo.data=fs.readFileSync(files.photo.filepath)
			product.photo.contentType=files.photo.type
		}

		else{
            console.log("files photo not working",files)
			if(!product.name || !product.category){
				return res.status(400).json({
					error:"No data sent"
				})
			}
		}
        product.save((err,result)=>{
			if(err){
				return res.status(400).json({
					err:err
				})
			}
			return res.status(200).json({result})
		})
   
  	});
   
   
   
   
    
}