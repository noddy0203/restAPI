const Product = require("../models/products")

const getAllProducts = async (req, res) => {

    const { company, name , featured , sort , select} = req.query;
    const queryObject = {}
    if (company) {
        queryObject.company = company
        // console.log(company)
    }

    if(featured){
        queryObject.featured = featured
    }

    if (name) {
        queryObject.name = { $regex : name , $options : "i" }   //using mongodb regex to get all prodcts name as iphone 
        // console.log(name)
    }

    const apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.replace("," , " ")
        apiData = apiData.sort(sortFix)
    }

    if(select){
        var selectFix = select.replace("," , " ")
        apiData = apiData.select(selectFix)
    }

    // to get the pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const skipPages = (page - 1) * limit
    apiData = apiData.skip(skipPages).limit(limit)
    console.log(queryObject)

    // getting all the data from the DB through model
    const myData = await apiData;
    res.status(200).json({ myData , nbHits: myData.length })
}

const getAllProductsTesting = async (req, res) => {
    // using req.query to get data from url filter
    const sortedData = await Product.find({})
    res.status(200).send(sortedData)
}

module.exports = { getAllProducts, getAllProductsTesting }
