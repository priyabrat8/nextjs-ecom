import connectDB from '../../middleware/mongoose'
import Review from '../../models/Review'
import jsonwebtoken from "jsonwebtoken";


const handler = async (req,res) => {
    if (req.method == 'POST') {
       const review = await Review.findOne({name:req.body.name})
       const token = req.body.token
       const data = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)

       if (!review) {
        let nid =  Math.floor(Math.random() * Date.now())
        let r = new Review({
            name: req.body.name,
            rating: req.body.star,
            numrating: 1,
            comments: [
                {email: data.email, id: nid , name: data.name, comment: req.body.comment, rating: req.body.star}
            ]
        })
        await r.save()
        res.status(200).json({success: true, msg: 'Review Added'})     
       }
    else if (review){
        let n2id =  Math.floor(Math.random() * Date.now())
        let reviews = review.comments
        reviews.push({email: data.email, name: data.name, comment: req.body.comment, id: n2id , rating: req.body.star})
        console.log(review._id,review.rating , req.body.star, review.numrating + 1 ,  reviews );
        let pr = await Review.findByIdAndUpdate(review._id,{rating: review.rating + req.body.star, numrating: review.numrating + 1 , comments: reviews })
        res.status(200).json({success: true, msg: 'Review Added'})     
    }

    else {
        res.status(200).json({success: false, msg: 'Unable to add review!'})     

    }
          
    }

}

export default connectDB(handler)
    
