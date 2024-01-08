import {Radio, Checkbox, Card, Input} from 'antd';

const {Search} = Input;
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchProducts,
    orderProducts,
    search
} from "../../store/reducers/productsSlice.js";

const Filter = () => {

    const dispatch = useDispatch();
    const brands = useSelector((state) => state?.products?.brands);
    const models = useSelector((state) => state?.products?.models);

    const filterBy = (values, filterType) => {
        let filterValue = "";
        values?.forEach((value) => filterValue = filterValue.concat(`|${value}`))
        const query = `&${filterType}=${filterValue.substring(1)}`;
        dispatch(fetchProducts(query));
    }

    const orderBy = (event) => {
        const sortType = event?.target?.value;
        const query = `&page=1`;
        dispatch(orderProducts({query: query, sortBy: sortType}));
    }
    const onSearch = (searchTerm, searchType) => {
        dispatch(search({searchTerm, searchType}));
    };

    return (
        <div className="filters">
            <div className="filters-sort">
                <span className="title">Sort By</span>
                <Card className="antdCard">
                    <Radio.Group className="antdRadio" onChange={(event) => orderBy(event)}>
                        <Radio value="OldToNew">Old to new</Radio>
                        <Radio value="NewToOld">New to old</Radio>
                        <Radio value="PriceHighToLow">Price high to low</Radio>
                        <Radio value="PriceLowToHigh">Price low to high</Radio>
                    </Radio.Group>
                </Card>
            </div>

            <div className="filters-brands">
                <span className="title">Brands</span>
                <Card className="antdCard">
                    <Search size="small" placeholder="Search"
                            onChange={(event) => onSearch(event?.target?.value, 'brands')} enterButton/>
                    <Checkbox.Group className="filters-brands-items" onChange={(values) => filterBy(values, 'brand')}>
                        {brands.map((brand, index) => (
                            <Checkbox key={index} value={brand}>{brand}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </Card>
            </div>

            <div className="filters-models">
                <span className="title">Model</span>
                <Card className="antdCard">
                    <Search size="small" placeholder="Search"
                            onChange={(event) => onSearch(event?.target?.value, 'models')} enterButton/>
                    <Checkbox.Group className="filters-models-items" onChange={(values) => filterBy(values, 'model')}>
                        {models.map((model, index) => (
                            <Checkbox key={index} value={model}>{model}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </Card>
            </div>
        </div>
    );
}

export default Filter;
