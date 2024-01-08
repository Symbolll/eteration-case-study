import {Pagination} from 'antd';
import {useDispatch} from 'react-redux';
import {fetchProducts} from "../../store/reducers/productsSlice.js";

const Paging = () => {
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        const query = `&page=${page}`;
        dispatch(fetchProducts(query));
    };

    return (
        <div className="paging">
            <Pagination
                defaultCurrent={1}
                pageSize={12}
                total={70} // normal şartlarda api totalItems.length dönmeli.
                onChange={handlePageChange}
                showSizeChanger={false}
            />
        </div>
    );
}

export default Paging;
