import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar.jsx";
import Cart from "../components/Cart.jsx";
import {setCartItems} from "../../store/reducers/CartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {Modal} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";


const Layout = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const initApp = useCallback(() => {
        const cartItems = localStorage.getItem("cartItems");
        const cart = JSON.parse(cartItems);

        if (cart?.length > 0) {
            dispatch(setCartItems(cart))
        }
    }, [dispatch]);

    useEffect(() => {
        initApp();
    }, [initApp])

    const handleCartModal = () => {
        setIsCartOpen(false)
    };

    return (
        <div className="layout">
            <div className="layout-navbar"><NavBar/></div>
            <main className="layout-main">
                <div className="layout-main-content">
                    <Outlet/>
                </div>
                <div className="layout-main-cart"><Cart/></div>
            </main>
            <button className="layout-mobileCart" onClick={() => setIsCartOpen(true)}>
                <FontAwesomeIcon icon={faCartShopping}/>
                <span>{cartItems?.length}</span>
            </button>
            <Modal title="" open={isCartOpen} onOk={handleCartModal}
                   onCancel={handleCartModal}>
                <Cart/>
            </Modal>
        </div>
    );
};

export default Layout;