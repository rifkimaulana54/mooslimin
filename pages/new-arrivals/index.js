import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import BannerContent from "../../components/content/banner-content";
import { Breadcrumb, Container } from "react-bootstrap";
import ProductList from "../../components/content/product-list/product-list";

export default function NewArrivals({ allPostsData }) {
    return (
        <Layout newarrivals>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Container>
                <Breadcrumb className="py-4">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Produk Terbaru</Breadcrumb.Item>
                </Breadcrumb>
                <BannerContent title={"Produk Terbaru"} subtitle={"Temukan brand dan produk terbaru yang telah kami kurasi."} />
                <ProductList />
            </Container>

        </Layout>
    );
}