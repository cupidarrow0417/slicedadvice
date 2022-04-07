class APIFeatures {
    query: any
    queryStr: any

    constructor(query: any, queryStr: any) {
        this.query = query
        this.queryStr = queryStr
    }

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

    pagination(resPerPage: number) {
        const currentPage: number = Number(this.queryStr.page) || 1
        const skip: number = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

export default APIFeatures