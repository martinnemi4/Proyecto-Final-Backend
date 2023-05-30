export default class userDTO{
    static getTokenDTO = (user) =>{
        return {
            id: user._id,
            cart: user.cart,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            avatar: user.avatar
        }
    }
}