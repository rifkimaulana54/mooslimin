import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductItem from "../../../product/product-item";
import HomeSectionTitle from "../home-section-title";
import { useRouter } from 'next/router';

export default function ProductNewArrival() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      {isLoading ? (
        <Container className="pb-5">
          <div className="placeholder-title"></div>
        </Container>
      ) : (
        <HomeSectionTitle
          title={'Produk Terbaru'}
          subtitle={'Temukan Koleksi Produk Terbaru.'}
          button={'Belanja produk baru'}
          onClick={() => router.push("new-arrivals")}
        />
      )}
      <Container className="pb-5">
        <Row className="gy-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Col xs="6" md="3" key={index}>
                  <div className="placeholder-card">
                    <div className="placeholder-image" />
                    <div className="placeholder-text" />
                    <div className="placeholder-text short" />
                  </div>
                </Col>
              ))
            : 
              products.data?.products.map((item) => (
                <Col xs="6" md="3" key={item.id}>
                  <ProductItem product={item} />
                </Col>
              ))
          }
        </Row>
      </Container>

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
    </div>
  );
};
