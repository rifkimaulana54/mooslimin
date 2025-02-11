import ProductItem from "../../product/product-item";
import Filter from "./filter/filter";
import { FormControl, MenuItem, Select, Pagination, Grid, Container, } from "@mui/material";
import { Col} from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ProductList() {
    const [sort, setSort] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (event) => {
        setSort(event.target.value);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchProducts = async () => {
                try {
                    const response = await  fetch("/api/product/list", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        page: "1",
                        per_page: "4",
                        sort: "desc",
                        sort_by: "id",
                        }),
                    });
                    const data = await response.json();
                    setProducts(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to fetch products:", error);
                    setIsLoading(false);
                }
            };
    
        fetchProducts();
            setIsLoading(false);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);
    // const products = [
    //     {
    //         id: 1,
    //         title: 'Product 1 ksjfldsjlk jdsfjdslkfjdlks fdslkfjdslkjfsdl fkldsjfkljds sdfdsfds dsfjldskfjl dsflsdjl',
    //         price: 100000,
    //         specialPrice: 80000,
    //         image: "/images/product/image@2x.png",
    //         brand: {
    //             id: 1,
    //             name: "Brand 1"
    //         }
    //     },
    //     {
    //         id: 2,
    //         title: 'Product 2',
    //         price: 100000,
    //         specialPrice: 80000,
    //         image: "/images/product/image@2x.png",
    //         brand: {
    //             id: 1,
    //             name: "Brand 1"
    //         }
    //     },
    //     {
    //         id: 3,
    //         title: 'Product 3',
    //         price: 100000,
    //         specialPrice: 80000,
    //         image: "/images/product/image@2x.png",
    //         brand: {
    //             id: 1,
    //             name: "Brand 1"
    //         }
    //     },
    //     {
    //         id: 4,
    //         title: 'Product 4',
    //         price: 100000,
    //         specialPrice: 80000,
    //         image: "/images/product/image@2x.png",
    //         brand: {
    //             id: 1,
    //             name: "Brand 1"
    //         }
    //     },
    //     {
    //         id: 5,
    //         title: 'Product 5',
    //         price: 100000,
    //         specialPrice: 80000,
    //         image: "/images/product/image@2x.png",
    //         brand: {
    //             id: 1,
    //             name: "Brand 1"
    //         }
    //     }
    // ];

    return (
        <Grid container spacing={5} className="py-5">
            <Grid item md={3}>
                <Filter />
            </Grid>
            <Grid item md={9}>
                <div>
                    <div className="pb-3 d-flex align-items-center justify-content-end">
                        <div>Urutkan {"10"} produk berdasarkan:</div>
                        <FormControl sx={{ m: 1, minWidth: 40 }} variant="standard" size="small" style={{ margin: 0 }} >
                            <Select
                                autoWidth
                                disableUnderline
                                id="select-sort"
                                value={sort}
                                onChange={handleChange}
                                className="px-2"
                            >
                                <MenuItem value="1">Rekomendasi</MenuItem>
                                <MenuItem value="2">Terbaru</MenuItem>
                                <MenuItem value="3">Terlaris</MenuItem>
                                <MenuItem value="4">Harga Rendah ke Tinggi</MenuItem>
                                <MenuItem value="5">Harga Tinggi ke Rendah</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Grid container spacing={3} className="gy-5">
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                <Col xs="6" md="4" key={index}>
                                    <div className="placeholder-card">
                                        <div className="placeholder-image" />
                                        <div className="placeholder-text" />
                                        <div className="placeholder-text short" />
                                    </div>
                                </Col>
                            ))
                            : 
                            products.data?.products.map((item) => (
                                <Grid item xs="6" md="4"><ProductItem product={item} /></Grid>
                            ))
                        }
                        <style jsx>{`
                            .placeholder-title {
                                border: 1px solid #e0e0e0;
                                border-radius: 20px;
                                width: 35%;
                                padding: 9px;
                                background: #f5f5f5;
                                align-items: center;
                            }
                            .placeholder-card {
                                border: 1px solid #e0e0e0;
                                border-radius: 8px;
                                padding: 16px;
                                background: #f5f5f5;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                margin: 20px 10px;
                            }

                            .placeholder-image {
                                width: 100%;
                                height: 300px;
                                border-radius: 8px;
                                background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
                                background-size: 200% 100%;
                                animation: shimmer 1.5s infinite;
                            }

                            .placeholder-text {
                                width: 80%;
                                height: 16px;
                                margin: 12px 0;
                                background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
                                background-size: 200% 100%;
                                animation: shimmer 1.5s infinite;
                            }

                            .placeholder-text.short {
                                width: 50%;
                            }

                            @keyframes shimmer {
                                0% {
                                    background-position: -200% 0;
                                }
                                100% {
                                    background-position: 200% 0;
                                }
                            }
                        `}</style>
                        
                    </Grid>
                    <Grid>
                        <Pagination className="pt-5 d-flex justify-content-center" count={10} />
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}