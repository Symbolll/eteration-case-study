import {useDispatch} from 'react-redux';
import {increaseCount, decreaseCount} from "../../store/reducers/CartSlice.js";


// eslint-disable-next-line react/prop-types
const CartItem = ({item, isInline}) => {
    const dispatch = useDispatch();
    const increase = (e, itemId) => {
        e.preventDefault();
        dispatch(increaseCount(itemId))
    };
    const decrease = (e, itemId) => {
        e.preventDefault();
        dispatch(decreaseCount(itemId))
    };

    return (
        <div className="cartItem">
            {!isInline && <div className="cartItem-left">
                <div className="cartItem-left-name" title={item?.name}>{item?.name}</div>
                <div className="cartItem-left-price">{item?.price * item?.count}</div>
            </div>}
            <div className="cartItem-right">
                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={(e) => decrease(e, item?.id)}>-</button>
                {/* eslint-disable-next-line react/prop-types */}
                <span>{item?.count || 0}</span>
                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={(e) => increase(e, item?.id)}>+</button>
            </div>
        </div>
    )
}

export default CartItem;