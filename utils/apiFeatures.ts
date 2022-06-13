// Let's do some OOP! First though, what is this file? It contains classes that are used in 
// controllers files to handle various things such as pagination, filtering, and searching
// of data from models such as bookings, expertise posts, etc.

// So in terms of OOP, APIFeatures is the parent class that has the shared methods
// and the child classes are the specific ones for each different model. For example
// the BookingAPIFeatures class is for the Booking model and the ExpertiseAPIFeatures
// class is for the Expertise model. This is because they all need different 
// filters and searches queries. This can probably be refactored somehow sometime :)
class APIFeatures {
    query: any;
    queryStr: any;

    /**
     * The constructor function is a special function that is called when an object is created from a
     * class
     * @param {any} query - This is the query object that we get from the mongoose.
     * @param {any} queryStr - The query string that is passed in the URL.
     */
    constructor(query: any, queryStr: any) {
        this.query = query;
        this.queryStr = queryStr;
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
        const currentPage: number = Number(this.queryStr.page) || 1;
        const skip: number = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}


// Filtering the expertise posts based on the query string.
class ExpertisePostAPIFeatures extends APIFeatures {
    query: any;
    queryStr: any;
    /**
     * It takes the category query string from the URL and uses it to filter the query
     * @returns The query object
     */
    search() {
        const category = this.queryStr.category
            ? {
                  category: {
                      $regex: this.queryStr.category,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...category });
        return this;
    }

    /**
     * It takes the query string, removes the fields that don't correspond to the actual names of
     * fields on the model, and then uses the remaining fields to filter the query
     * @returns The query object.
     */
    filter() {
        const queryCopy = { ...this.queryStr };

        //Remove fields from query, as they aren't always corresponding
        //to the actual names of fields on the model. Update this as you
        //add any more search fields.
        const removeFields = ["category"];
        removeFields.forEach((el) => delete queryCopy[el]);

        this.query = this.query.find(queryCopy);
        return this;
    }
}


class BookingAPIFeatures extends APIFeatures {
    query: any;
    queryStr: any;
    /**
     * It takes the title query string from the URL and uses it to filter the query
     * @returns The query object
     */
    search() {
        const title = this.queryStr.title
            ? {
                  title: {
                      $regex: this.queryStr.title,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...title });
        return this;
    }

    /**
     * It takes the query string, removes the fields that don't correspond to the actual names of
     * fields on the model, and then uses the remaining fields to filter the query
     * @returns The query object.
     */
    filter() {
        const queryCopy = { ...this.queryStr };

        //Remove fields from query, as they aren't always corresponding
        //to the actual names of fields on the model. Update this as you
        //add any more search fields.
        const removeFields = ["title"];
        removeFields.forEach((el) => delete queryCopy[el]);

        this.query = this.query.find(queryCopy);
        return this;
    }
}
export {
    ExpertisePostAPIFeatures,
    BookingAPIFeatures,
}
