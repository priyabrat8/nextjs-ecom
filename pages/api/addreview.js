import connectDB from '../../middleware/mongoose'
import Review from '../../models/Review'
import jsonwebtoken from "jsonwebtoken";


const handler = async (req,res) => {
    if (req.method == 'POST') {
       const review = await Review.findOne({name:req.body.name})
       const token = req.body.token
       const data = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)

       const removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
    
               arr.splice(i,1);
    
           }
        }
        return arr;
    }


       if (!req.body.update) {
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
            let pr = await Review.findByIdAndUpdate(review._id,{rating: review.rating + req.body.star, numrating: review.numrating + 1 , comments: reviews })
            res.status(200).json({success: true, msg: 'Review Added'})     
        }
       }

       else if(req.body.update) {
        let n2id =  Math.floor(Math.random() * Date.now())
        let reviews = review.comments
        for (const comment of reviews) {
            if (comment.email == data.email) {
                let oldStar = comment.rating
                let newComments = removeByAttr(reviews, 'email', data.email);  
                newComments.push({email: data.email, name: data.name, comment: req.body.comment, id: n2id , rating: req.body.star})
                let pr = await Review.findByIdAndUpdate(review._id,{rating: (review.rating - oldStar) + req.body.star, numrating: review.numrating , comments: newComments })
                res.status(200).json({success: true, msg: 'Review Updated'})    
            }
            else {
            res.status(200).json({success: false, msg: 'Unable to update review!'})     
        }
        }
        
       }
       

    else {
        res.status(200).json({success: false, msg: 'Unable to add review!'})     
    }
          
    }

}

export default connectDB(handler)
    
