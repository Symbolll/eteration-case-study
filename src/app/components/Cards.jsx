import {Button, Card} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from "../../store/reducers/productsSlice.js";
import {useEffect} from "react";
import {Link} from 'react-router-dom';
import {addToCart} from "../../store/reducers/CartSlice.js";
import CartItem from "./CartItem.jsx";

const Cards = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const cartItems = useSelector((state) => state.cart.items);


    useEffect(() => {
        const query = `&page=1`;
        dispatch(fetchProducts(query));
    }, [dispatch]);

    const addToCartHandler = (e, product) => {
        e.preventDefault();
        dispatch(addToCart(product));
    }


    return (
        <div className="card-container">
            {products.map((product, key) => (
                <Link key={key} to="/detailPage" state={{product}}>
                    <Card
                        key={key}
                        hoverable
                        className="card-container-card"
                    >
                        <img className="card-container-card-img" alt="img" src="https://placehold.co/600x400/orange/white"/>
                        <p className="card-container-card-price"> {product?.price + "₺"} </p>
                        <p className="card-container-card-name"> {product?.name} </p>
                        <div className="cartButtonContainer">
                            {cartItems.find(item => item?.id === product?.id) ?
                                <CartItem item={cartItems.find(item => item?.id === product?.id)} isInline={true}/> :
                                <Button className="card-container-card-cartButton"
                                        onClick={(e) => addToCartHandler(e, product)}>Add
                                    to Cart</Button>}
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );

}

export default Cards;
