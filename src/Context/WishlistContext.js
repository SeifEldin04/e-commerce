import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {

    // const [wishItems, setWishItems] = useState(null);

    let header = {
        token: localStorage.getItem('userToken'),
    }

    function addToWish(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId: id
            },
            {
                headers: header
            }).then((resp) => resp)
            .catch((err) => err)
    }

    function getLoggedUserWish() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: header
            }).then((resp) => resp)
            .catch((err) => err)
    }

    function removeWishItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers: header
            }).then((resp) => resp)
            .catch((err) => err)
    }

    return <>
        <WishlistContext.Provider value={{ addToWish, getLoggedUserWish, removeWishItem }}>
            {props.children}
        </WishlistContext.Provider>
    </>
}