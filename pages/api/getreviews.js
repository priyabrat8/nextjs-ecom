import Review from '../../models/Review'
import connectDB from '../../middleware/mongoose'

const handler = async (req,res) => {
    if(req.method == 'POST'){
        let reviewObj = await Review.findOne({name:req.body.name})
        if (reviewObj) {
            let reviews = reviewObj.comments
        res.status(200).json({ reviews, reviewObj })
        }
        else {
            res.status(200).json({ reviews: [], reviewObj: {rating:0, numrating:0} })
        }
        
    }
    
}

export default connectDB(handler)