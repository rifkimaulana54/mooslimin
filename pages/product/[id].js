import Layout from '../../components/layout';
import Head from 'next/head';
import { Breadcrumb, Container, Row, Col, Image, Button, Form, Accordion } from "react-bootstrap";
import styles from './product-detail.module.css';
import ProductItem from '../../components/product/product-item';
import { Share } from '@mui/icons-material';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

// const products = [
//   {
//     id: 1,
//     title: 'Product 1',
//     price: 100000,
//     specialPrice: 80000,
//     image: "/images/product/image@2x.png",
//     brand: {
//       id: 1,
//       name: "Brand 1"
//     }
//   },
//   {
//     id: 2,
//     title: 'Product 2',
//     price: 100000,
//     specialPrice: 80000,
//     image: "/images/product/image@2x.png",
//     brand: {
//       id: 1,
//       name: "Brand 1"
//     }
//   },
//   {
//     id: 3,
//     title: 'Product 3',
//     price: 100000,
//     specialPrice: 80000,
//     image: "/images/product/image@2x.png",
//     brand: {
//       id: 1,
//       name: "Brand 1"
//     }
//   },
//   {
//     id: 4,
//     title: 'Product 4',
//     price: 100000,
//     specialPrice: 80000,
//     image: "/images/product/image@2x.png",
//     brand: {
//       id: 1,
//       name: "Brand 1"
//     }
//   }
// ];

export default function ProductDetail() {
  const router = useRouter();
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const [mainImage, setMainImage] = useState("/images/img_placeholder.png");
  const [products, setProducts] = useState([]);
  const [product_recomends, setProductRecomends] = useState([]);

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setProductId(router.query.id);
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!productId) return;
		const timer = setTimeout(() => {
			const fetchProductDetail = async () => {
				try {
					const response = await fetch("/api/product/detail", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id: productId
						}),
					}); 
					const data = await response.json();
					setProductDetail(data);

          const metaImageGallery = data?.data?.product?.metas.find(
            (meta) => meta.meta_key === "image_gallery"
          )?.meta_value;
          const imageGallery = metaImageGallery ? JSON.parse(metaImageGallery) : [];
          if (imageGallery.length > 0) {
            setMainImage(imageGallery[0].media_path);
          }
				} catch (error) {
					console.error("Failed to fetch banner:", error);
				}
			};
	
			fetchProductDetail();
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
  }, [productId]); 

  let imageGallery = [];
  try {
    const metaImageGallery = productDetail?.data?.product?.metas.find(
      (meta) => meta.meta_key === "image_gallery"
    )?.meta_value;
    imageGallery = metaImageGallery ? JSON.parse(metaImageGallery) : [];
  } catch (error) {
    console.error("Error parsing images meta:", error);
  }

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
                  filter: {'category_id': productDetail?.data?.product?.category?.map(cat => cat.id) || []},
                  filterNot: {'id': productId},
                  sort_by: "rand",
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProductRecomends = async () => {
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
                  filter: {'is_recommended': '1'},
                  filterNot: {'id': productId},
                  sort_by: "rand",
                }),
            });
            const data = await response.json();
            setProductRecomends(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setIsLoading(false);
        }
      };

    fetchProductRecomends();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head>
        {/* <title>{postData.title}</title> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
      {isLoading ? (
        <div className="skeleton-container">
          <div className="skeleton-thumbnails">
            <div className="skeleton-box small"></div>
            <div className="skeleton-box small"></div>
            <div className="skeleton-box small"></div>
            <div className="skeleton-box small"></div>
            <div className="skeleton-box small"></div>
          </div>

          <div className="skeleton-content">
            <div className="skeleton-box large"></div>
          </div>
          <div className="skeleton-content2">
            <div className="skeleton-text">
              <div className="skeleton-line small"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line small"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>

            <div className="skeleton-buttons">
              <div className="skeleton-box button"></div>
              <div className="skeleton-box button"></div>
              <div className="skeleton-box button"></div>
              <div className="skeleton-box button"></div>
            </div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      ) : (
        <div>
          <Breadcrumb className="py-4">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Produk Detail</Breadcrumb.Item>
          </Breadcrumb>

          <Row className="pb-5 g-5">
            <Col lg="6" sm="8">
              <div className="d-flex align-items-center">
                <div>
                  {imageGallery.map((image, index) => (
                    <div className="py-1" key={index}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setMainImage(image.media_path);
                        }}
                      >
                        <Image alt="" width={64} height={96} src={image.media_path} onError={(e) => {
                          e.target.src = "/images/img_placeholder.png";
                        }} />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="px-3">
                  <Image
                    alt=""
                    width={400}
                    height={550}
                    src={mainImage}
                    onError={(e) => {
                      e.target.src = "/images/img_placeholder.png";
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg="6" sm="4">
              <div>
                <div className="pb-2">Brand Name</div>
                <h2 className={styles.productName}>{productDetail?.data?.product?.item_name}</h2>
                <h3 className={styles.price}>IDR {productDetail?.data?.product?.item_normal_price}</h3>
                <div className={styles.description} 
                  dangerouslySetInnerHTML={{ __html: productDetail?.data?.product?.details[0].item_detail_content || '' }} 
                />
                
                {/* Pilih Ukuran */}
                <div className="mb-2">
                  <div className="mb-2">Pilih Ukuran: </div>
                  <Container>
                    <div className="inline row gap-3">
                    {productDetail?.data?.product?.variations.map((variation, index) =>
                      variation.type_id === 2 && variation?.taxonomy?.map((item, subIndex) => (
                        <label
                          key={`${index}-${subIndex}`}
                          className="text-center py-2"
                          style={{
                            cursor: "pointer",
                            border: "1px solid var(--typography-color-active)",
                            borderRadius: "50px",
                            width: "120px",
                            color: "var(--typography-color-body)",
                          }}
                        >
                          <input type="radio" name="s" value={item.name} hidden />
                          {item.name}
                        </label>
                      ))
                    )}
                      {/* <label className="text-center py-2" style={{ cursor: "pointer", border: "1px solid var(--typography-color-active)", borderRadius: "50px", width: "100px", color: "var(--typography-color-body)" }}>
                        <input type="radio" name="s" value="s" hidden />
                        S
                      </label>
                      <label className="text-center py-2" style={{ cursor: "pointer", border: "1px solid var(--typography-color-mute)", borderRadius: "50px", width: "100px", color: "var(--typography-color-body)" }}>
                        <input type="radio" name="m" value="m" hidden />
                        M
                      </label> */}
                    </div>
                  </Container>
                </div>
                <hr />

                {/* Pilih Warna */}
                <div className="mb-2">
                  <div className="mb-2">Pilih Warna: </div>
                  <Container>
                    <div className="inline row gap-3">
                      <div className={styles.round} style={{ border: "1px solid #000" }}>
                        <label htmlFor="radio" style={{ backgroundColor: "red" }}></label>
                        <input type="radio" />
                      </div>
                      <div className={styles.round} style={{ border: "" }}>
                        <label htmlFor="radio" style={{ backgroundColor: "blue" }}></label>
                        <input type="radio" />
                      </div>
                    </div>
                  </Container>
                </div>
                <hr />

                {/* Pilih Kuantitas */}
                <div>
                  <Row>
                    <Col md="8">
                      <div>Pilih kuantitas:</div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex align-items-center">
                        <div className="pe-3" style={{ width: "100px" }}>Stock: {"0"}</div>
                        <div className={styles.containerQty}>
                          <Button className={styles.btnQty}>-</Button>
                          <Form.Control type="text" placeholder="0" className={styles.formControl} style={{ width: "50px" }} />
                          <Button className={styles.btnQty}>+</Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <hr />

                <Button className="btn-primary w-100 my-2" size="lg">
                  MASUKKAN KERANJANG +
                </Button>

                <div className="text-center mb-5">
                  <a type="button">
                    <div style={{ padding: "16px" }}>
                      <Share />
                    </div>
                    <span>Sebarkan</span>
                  </a>
                </div>

                {/* Detail Produk */}
                <Accordion defaultActiveKey="detail">
                  <Accordion.Item>
                    <Accordion.Header>Detail</Accordion.Header>
                    <Accordion.Body className="p-0 align-items-center">
                      <div className="my-3">
                        <div className="mb-3">Material</div>
                        <div className="mb-2">- Nama Bahan</div>
                        <div className="mb-2">- Jenis Bahan</div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
          </Row>

          <div className='py-5'>
            <h2 className='pb-3 text-center'>Pasangkan dengan</h2>
            <Row>
              {products.data?.products.map((item) => (
                <Col xs="6" md="3"><ProductItem product={item} /></Col>
              ))}
            </Row>
          </div>
          <div className='py-5'>
            <h2 className='pb-3 text-center'>Sahabat mungkin tertarik</h2>
            <Row>
              {product_recomends.data?.products.map((item) => (
                <Col xs="6" md="3"><ProductItem product={item} /></Col>
              ))}
            </Row>
          </div>
        </div>
      )}

      </Container>
      <style jsx>
        {`
          /* Kontainer utama */
          .skeleton-container {
            display: flex;
            gap: 20px;
            margin-top: 150px;
          }
          
          /* Sidebar Thumbnail */
          .skeleton-thumbnails {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          /* Elemen Skeleton */
          .skeleton-box {
            background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            border-radius: 8px;
          }
          
          /* Thumbnail kecil */
          .skeleton-box.small {
            width: 64px;
            height: 96px;
          }
          /* Gambar utama */
          .skeleton-box.large {
            width: 400px;
            height: 550px;
          }
          
          /* Skeleton text */
          .skeleton-text {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .skeleton-line {
            width: 100%;
            height: 26px;
            border-radius: 4px;
            background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            margin-bottom: 10px;
          }
          
          .skeleton-line.small {
            width: 20%;
          }

          .skeleton-content {
            display: flex;
            margin-right: 150px;
            flex-direction: column; /* Agar elemen di dalamnya tersusun ke bawah */
            gap: 16px;
          }

          .skeleton-content2 {
            width: 100%;
          }
          
          /* Tombol Skeleton */
          .skeleton-buttons {
            display: flex; 
            gap: 10px; /* Memberi jarak antar tombol */
            justify-content: flex-start; /* Default, bisa diubah ke center atau space-between */
          }
          
          .skeleton-box.button {
            width: 100px; /* Sesuaikan ukuran */
            height: 40px; /* Sesuaikan ukuran */
            background: #ddd; /* Warna placeholder */
            border-radius: 5px;
            margin-right: auto;
            margin-left: auto;
            margin-top: 50px;
            margin-bottom: 50px;
          }
          
          /* Animasi shimmer */
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </Layout>
  );
}