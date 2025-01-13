import ProductItem from "../../product/product-item";
import Filter from "./filter/filter";
import { FormControl, MenuItem, Select, Pagination, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";

export default function ProductList() {
    const [sort, setSort] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        setSort(event.target.value);
    };
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await  fetch("/api/product/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: "electronics", // Ganti dengan nilai sesuai kebutuhan
                    }),
                });
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
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
                        {products.data.products.map((item) => (
                            <Grid item xs="6" md="4"><ProductItem product={item} /></Grid>
                        ))}
                    </Grid>
                    <Grid>
                        <Pagination className="pt-5 d-flex justify-content-center" count={10} />
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}