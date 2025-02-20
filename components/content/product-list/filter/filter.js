import { Row } from "react-bootstrap";
import SectionFilterSale from "./section-filter-sale";
import SectionFilterBrand from "./section-filter-brand";
import SectionFilterCategory from "./section-filter-category";
import SectionFilterType from "./section-filter-type";
import SectionFilterSize from "./section-filter-size";
import SectionFilterColor from "./section-filter-color";
import SectionFilterPrice from "./section-filter-price";
import { FilterList } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function Filter() {
    const [filter, setFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchFilter = async () => {
                try {
                    const response = await  fetch("/api/product/filter", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        // page: "1",
                        // per_page: "4",
                        // sort: "desc",
                        // sort_by: "id",
                        }),
                    });
                    const data = await response.json();
                    setFilter(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to fetch Filter:", error);
                    setIsLoading(false);
                }
            };
    
        fetchFilter();
            setIsLoading(false);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);

    // console.log(filter?.data?.product_filters);

    var brands = filter?.data?.product_filters?.brands;
    var categories = [{ id: 1, name: "Category 1", total: 10 }];
    var sizes = [{ id: 1, name: "22" }, { id: 2, name: "23" }, { id: 3, name: "24" }, { id: 4, name: "25" }];
    return (
        <div>
            <div className="d-flex align-items-center">
                <FilterList className="me-2" />
                <span>Filter</span>
            </div>
            <SectionFilterSale />
            <SectionFilterCategory datas={categories} />
            <SectionFilterBrand datas={brands} />
            <SectionFilterType datas={[]} />
            <SectionFilterSize datas={sizes} />
            <SectionFilterColor datas={[]} />
            <SectionFilterPrice />
        </div>
    );
}