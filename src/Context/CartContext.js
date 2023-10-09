import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    const [cartItems, setCartItems] = useState(null);
    const [cartId, setCartId] = useState(null);

    let header = {
        token: localStorage.getItem('userToken'),
    }

    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id,
        },
            {
                headers: header
            }).then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: header,
        }).then((response) => response)
            .catch((error) => error)
    }

    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: header
            }).then((response) => response)
            .catch((error) => error)
    }

    function ubdateProductQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers: header
            }).then((response) => response)
            .catch((error) => error)
    }

    function onlinePayment(cartId, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                shippingAddress: values
            },
            {
                headers: header
            }).then((response) => response)
            .catch((error) => error)
    }

    function clearCartProducts() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: header
            }).then((response) => response)
            .catch((error) => error)
    }

    async function getCart() {
        let { data } = await getLoggedUserCart();
        // console.log(data);
        // localStorage.setItem('numberOfCartItems', data?.numOfCartItems);
        // setCartItems(data?.numOfCartItems);
        localStorage.setItem('cartId', data?.data._id);
        setCartId(data?.data._id);
    }

    useEffect(() => {
        getCart();
    }, [])


    return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, ubdateProductQuantity, clearCartProducts, setCartItems, cartItems, onlinePayment, cartId, setCartId, getCart }}>
        {props.children}
    </CartContext.Provider>
}
