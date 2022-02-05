const mongoose = require('mongoose');
const schema = mongoose.Schema



const ArticleSchema = schema({
    title: {

    },
    text: {

    },
    photo: {

    },
    data: {

    },
    countView: {

    },
    userPhoto: {

    },
    phoneNumber : {

    },
    _userId :
     {
        type : schema.Types.ObjectId,
        ref : 'User'
    }
})


const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article