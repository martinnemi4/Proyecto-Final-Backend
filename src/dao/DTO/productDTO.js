export default class productDTO{
    static getInsertDTO = (product) => {
        return {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            category: product.category,
            thumbnail: product.thumbnail
        }
    }
}