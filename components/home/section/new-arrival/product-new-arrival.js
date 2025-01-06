import { Col, Container, Row } from "react-bootstrap";
import ProductItem from "../../../product/product-item";
import HomeSectionTitle from "../home-section-title";
import { useRouter } from 'next/router';

export default function ProductNewArrival() {
  const router = useRouter();
  const products = [
    {
      id: 1,
      title: 'Product 1',
      price: 100000,
      specialPrice: 80000,
      image: "/images/product/image@2x.png",
      image2: "/images/product/image3@2x.png",
      brand: {
        id: 1,
        name: "Brand 1"
      }
    },
    {
      id: 2,
      title: 'Product 2',
      price: 100000,
      specialPrice: 80000,
      image: "/images/product/image@2x.png",
      brand: {
        id: 1,
        name: "Brand 1"
      }
    },
    {
      id: 3,
      title: 'Product 3',
      price: 100000,
      specialPrice: 80000,
      image: "/images/product/image@2x.png",
      brand: {
        id: 1,
        name: "Brand 1"
      }
    },
    {
      id: 4,
      title: 'Product 4',
      price: 100000,
      specialPrice: 80000,
      image: "/images/product/image@2x.png",
      brand: {
        id: 1,
        name: "Brand 1"
      }
    },
  ];

  return (
    <div>
      <HomeSectionTitle title={'Produk Terbaru'} subtitle={'Temukan Koleksi Produk Terbaru.'} button={'Belanja produk baru'} onClick={() => router.push("new-arrivals")}/>
      <Container className="pb-5">
        <Row className="gy-5">
          {products.map((item) => (
            <Col xs="6" md="3"><ProductItem product={item} /></Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
