const { Product } = require("../models/Product");
const { auth, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

//CREATE//

router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, price, image } = req.body;
  // console.log("reqreqreq", req.body)
  try {
    if (image) {
      // console.log("reqreqreq", image)
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineShop",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: uploadedResponse,
        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//DELETE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).send("Product not found..");
    if(product.image.public_id)
    {
      const destroyResponse = await cloudinary.uploader.destroy(
      product.image.public_id );
      if(destroyResponse){
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send(deletedProduct);
      }
    }
    else{
      console.log("action terminated .Failed to delete product image..")
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS//

router.get("/", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({
        brand: qbrand,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE

router.put("/:id", isAdmin, async (req, res) => {
 
  if(req.body.productImg){
    console.log("IF excute");
    try{
    const destroyResponse = await cloudinary.uploader.destroy(
      req.body.product.image.public_id
    );
    // console.log("IF excute 1");
    if(destroyResponse){
      // console.log("IF excute 2");
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.productImg,
        {
          upload_preset:"onlineShop"
        }
      );
      // console.log("IF excute 3");
    if(uploadedResponse){
      // console.log("IF excute 4");
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set :{
            ...req.body.product,
            image:uploadedResponse
          },
        },
        {new:true}
      );
      // console.log("IF excute 5");
    }
  } 
} catch(err){
  res.status(500).send(err)
}
}
  else{
    console.log("else excute");
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  }
 
});

module.exports = router;