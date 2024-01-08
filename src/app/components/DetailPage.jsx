import {Button} from 'antd';
import {useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import CartItem from "./CartItem.jsx";
import {addToCart} from "../../store/reducers/CartSlice.js";

const DetailPage = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const addToCartHandler = (e, product) => {
        e.preventDefault();
        dispatch(addToCart(product));
    }

    return (
        <div className="detail">
            <div className="detail-img">
                <img className="detail-img-img"
                     src={state?.product?.image}
                     alt="image"
                />
            </div>
            <div className="detail-properties">
                <div className="detail-properties-namePrice">
                    <p className="detail-properties-namePrice-name">{state?.product?.name}</p>
                    <p className="detail-properties-namePrice-price">{state?.product?.price + "₺"}</p>
                </div>
                {cartItems.find(item => item?.id === state.product?.id) ?
                    <CartItem item={cartItems.find(item => item?.id === state.product?.id)} isInline={true}/> :
                    <Button className="detail-properties-cartButton"
                            onClick={(e) => addToCartHandler(e, state.product)}>Add
                        to Cart</Button>}
                <p>{state?.product?.description}</p>
            </div>
        </div>
    );
};

export default DetailPage;
