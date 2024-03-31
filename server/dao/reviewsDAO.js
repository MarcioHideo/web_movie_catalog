// Interacting  with Database
import mongodb from "mongodb"
// receive text and integers from our backend to Database
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) { //if there is connection already, reject
            return
        }
        try{
            reviews = await conn.db("reviews").collection("reviews")
        } catch(e) {
            console.error(`Unable to estabilish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            // insert a document in Database
            return await reviews.insertOne(reviewDoc)
        } catch(e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e}
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: new ObjectId(reviewId)})
        } catch(e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e}
        }
    }

    static async updateReview(reviewId, user, review) {        
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review} } //$set a User data
            )

            return updateResponse
        } catch(e) {
            console.error(`Unable to update review ${e}`)
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            })

            return deleteResponse
        } catch(e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }

    static async getReviewsByMovieId(movieId) {
        try{
            const cursor = await reviews.find({ movieId: parseInt(movieId)})
            return cursor.toArray()
        } catch(e) {
            console.error(`Unable to ge review ${e}`)
            return { error: e}
        } 
    }
}