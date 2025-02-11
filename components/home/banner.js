import Image from 'next/image';
import styles from './banner.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import {
	Col,
	Row,
	Container,
	Carousel
} from "react-bootstrap";
import { useState, useEffect } from 'react';

export default function Banner() {
	const [index, setIndex] = useState(0);
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			const fetchBanner = async () => {
				try {
					const response = await fetch("/api/promotion/banner", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							filter: '{"promotion_type":["main_banner"]}'
						}),
					}); 
					const data = await response.json();
					setBanners(data);
				} catch (error) {
					console.error("Failed to fetch banner:", error);
				}
			};
	
			fetchBanner();
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
    }, []); 

	return (
		<Carousel className='pb-5' activeIndex={index} onSelect={handleSelect}>
			{isLoading ? (
				null
				) : banners.data?.promotions?.length > 0 ? (
				// Render data jika tersedia
				banners.data.promotions.map((item, index) => (
					<Carousel.Item key={index}>
					<img
						className="d-block w-100"
						src={JSON.parse(
						item.metas.find((meta) => meta.meta_key === "image").meta_value
						).media_path}
						onError={(e) => {
						e.target.src = "/images/img_placeholder.png"; // Gambar default jika terjadi error
						}}
						alt={`Slide ${index + 1}`}
						style={{ height: "700px" }}
					/>
					</Carousel.Item>
				))
				) : (
				<Carousel.Item>
					<div
					style={{
						height: "700px",
						// backgroundColor: "#f8d7da",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#721c24",
						fontWeight: "bold",
					}}
					>
					{/* <span>No banners available</span> */}
					</div>
				</Carousel.Item>
				)}
		</Carousel>
	);
}