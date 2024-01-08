import Card from "./Cards.jsx";
import Filter from "./Filter.jsx";
import Paging from "./Paging.jsx";
import {useState} from "react";
import {Modal} from 'antd';

const Home = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleFilterModal = () => {
        setIsFiltersOpen(false)
    };

    return (
        <div className="homePage">
            <div className="homePage-filter">
                {/*filter simüle edildi,filter yaparken pagination göz ardı edilmeli.*/}
                <Filter/>
            </div>
            <div className="homePage-content">
                <button className="homePage-content-showFilters" onClick={() => setIsFiltersOpen(true)}>
                    Show Filters
                </button>
                <Card/>
                <Paging/>
            </div>

            <Modal title="Filters" open={isFiltersOpen} onOk={handleFilterModal}
                   onCancel={handleFilterModal}>
                {/*filter simüle edildi,filter yaparken pagination göz ardı edilmeli.*/}
                <Filter/>
            </Modal>
        </div>
    );
}

export default Home;
