import mongoose ,{Schema} from 'mongoose'

// bcrypt is used to has the passwords (like encrpt and decrpt the passwords)

// jswt is also used for geneaarting paswords and its secrets are presnet for uniqueness

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema =new Schema (
    {
        videoFile:{
            type:String, // same url from cloud services
            required:true,
        },
        thumbnail:{
            type:String, // same url from cloud services
            required:true,

        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        time:{
            type:Number,
            required:true,
        },
        views:{
            type:Number,
            required:true,
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }



    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)




export const Videos =mongoose.model("Videos",videoSchema)