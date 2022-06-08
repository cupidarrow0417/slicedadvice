class APIFeatures {
    query: any
    queryStr: any

    /**
     * The constructor function is a special function that is called when an object is created from a
     * class
     * @param {any} query - This is the query object that we get from the mongoose.
     * @param {any} queryStr - The query string that is passed in the URL.
     */
    constructor(query: any, queryStr: any) {
        this.query = query
        this.queryStr = queryStr
    }

    /**
     * It takes the category query string from the URL and uses it to filter the query
     * @returns The query object
     */
    search() {
        const category = this.queryStr.category ? {
            category: {
                $regex: this.queryStr.category,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...category })
        return this
    }

    /**
     * It takes the query string, removes the fields that don't correspond to the actual names of
     * fields on the model, and then uses the remaining fields to filter the query
     * @returns The query object.
     */
    filter() {
        const queryCopy = { ...this.queryStr }

        //Remove fields from query, as they aren't always corresponding
        //to the actual names of fields on the model. Update this as you 
        //add any more search fields.
        const removeFields = ['category']
        removeFields.forEach(el => delete queryCopy[el])

        this.query = this.query.find(queryCopy)
        return this
    }

    /**
     * It takes the number of results per page as an argument, and then it sets the current page to the
     * page number in the query string, or to 1 if there is no page number in the query string. Then it
     * calculates the number of results to skip, and then it sets the limit and skip values on the
     * query
     * @param {number} resPerPage - number - The number of results per page
     * @returns The query object is being returned.
     */
    pagination(resPerPage: number) {
        const currentPage: number = Number(this.queryStr.page) || 1
        const skip: number = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

export default APIFeatures