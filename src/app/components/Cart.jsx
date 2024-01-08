import {Card, Button} from 'antd';
import {useSelector} from 'react-redux';
import CartItem from "./CartItem.jsx";
import {useEffect} from "react";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const isInitialCart = useSelector((state) => state.cart.isInitialCart);

    useEffect(() => {
        if (!isInitialCart) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);
    const cartTotal = () => {
        let total = 0;
        cartItems?.map(item => {
            total += parseInt(item?.price) * item?.count;
        })

        return total;
    }

    return (
        <div className="cart">
            <div className="cart-cartHeader">Cart</div>
            <Card className="cart-cartBody">
                {cartItems?.length === 0 && "Your cart is empty."}
                {cartItems?.length > 0 && cartItems.map((item, index) => (
                    <CartItem key={index} item={item}/>
                ))}
            </Card>
            <div className="cart-checkoutHeader">Checkout</div>
            <Card className="cart-checkoutBody">
                <span>Total Price: <span className="cart-checkoutBody-cartTotal">{cartTotal()}</span></span>
                <Button type="primary">Checkout</Button>
            </Card>
        </div>
    );
}

export default Cart;