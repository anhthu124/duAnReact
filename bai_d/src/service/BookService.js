import axios from "axios";

export const getAllBooks = async (title, publicationDate,endDate,category) => {
    try {
        let query = "http://localhost:8080/books?";
        if (title) {
            query += `title_like=${title}&`;
        }
        if (publicationDate) {
            query += `publicationDate_gte=${publicationDate}&`;
        }
        if (endDate){
            query += `publicationDate_lte=${endDate}&`;
        }
        if (category) {
            query += `category.id=${category.id}&`;
        }
        let result = await axios.get(query);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
// const formatDate = (date) => {
//     const d = new Date(date);
//     let month = '' + (d.getMonth() + 1);
//     let day = '' + d.getDate();
//     const year = d.getFullYear();
//
//     if (month.length < 2) {
//         month = '0' + month;
//     }
//     if (day.length < 2) {
//         day = '0' + day;
//     }
//
//     return [year, month, day].join('-');
// };
export const saveBook = async (book) => {
    try {
        await axios.post("http://localhost:8080/books", book)
        return true;
    } catch (err) {
        return false
    }
}
export const deleteBook = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/books/${id}`);
        return true;
    } catch (err) {
        return false;
    }
}
export const updateBook = async (id, updatedBook) => {
    try {
        await axios.patch(`http://localhost:8080/books/${id}`, updatedBook);
        return true;
    } catch (err) {
        return false;
    }
}
