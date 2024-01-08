import {Input} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import {fetchProducts} from "../../store/reducers/productsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const {Search} = Input;


const NavBar = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const onSearch = (searchTerm) => {
        const query = `&name=${searchTerm}`;
        dispatch(fetchProducts(query));
    };

    const cartTotal = () => {
        let total = 0;
        cartItems?.map(item => {
            total += parseInt(item?.price) * item?.count;
        })

        return total;
    }

    return (
        <div className="menu">
            <div className="menu-logo">
                <a className="logo" href="/">Eteration</a>
            </div>
            <div className="menu-search">
                <Search size="large" placeholder="Search" onChange={(event) => onSearch(event?.target?.value)}
                        enterButton/>
            </div>
            <div className="menu-right">
                <div className="menu-right-cart">
                    <FontAwesomeIcon size="lg" icon={faWallet}/>
                    <span>{cartTotal()}</span>
                </div>
                <div className="menu-right-user">
                    <FontAwesomeIcon size="lg" icon={faUser}/>
                    <span>Simge</span>
                </div>
            </div>
        </div>
    );
}

export default NavBar;