import Image from "next/image";
import Badge from "../badge/badge";
import styles from "./product-item.module.css";
import { NumericFormat } from "react-number-format";
import React, { useState, useEffect } from 'react';

export default function ProductItem({ product }) {
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const defaultImage = '/images/img_placeholder.png';

  useEffect(() => {
    if (product.metas) {
      const imageMeta = product.metas.find(meta => meta.meta_key === 'image_gallery');
      if (imageMeta && imageMeta.meta_value) {
        try {
          const imageArray = JSON.parse(imageMeta.meta_value);
          if (imageArray && imageArray.length > 0) {
            setImage(imageArray[0].media_path);
          }
        } catch (error) {
          console.error("Error parsing images meta:", error);
        }
      }
    }
  }, [product.metas]);

  function handleMouseEnter(image) {
    return () => {
      if (image) {
        setHoverImage(image);
      }
    };
  }

  function handleMouseOut() {
    setHoverImage("");
  }

  const handleImageError = () => {
    setImage(defaultImage);
  };

  const displayImage = hoverImage || image || defaultImage;

  return (
    <a href={"product/" + product.id}>
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <Image 
            layout="fill" 
            objectFit="cover" 
            alt={product.title} 
            src={displayImage}
            onMouseEnter={handleMouseEnter(product.image2)}
            onMouseOut={handleMouseOut}
            onError={handleImageError}
          />
        </div>
        <div className={styles.containerProduct}>
          <text className={styles.productTitle}>{product.item_name}</text>
          <div className={styles.labelSpecialPrice}>
            <text>
              <NumericFormat value={product.item_special_price} 
                allowLeadingZeros 
                thousandSeparator="." 
                decimalSeparator="," 
                prefix={'IDR '} 
                displayType="text"/>
            </text>
          </div>
          <div className={styles.labelPrice}>
            <text className={styles.price}>
              <NumericFormat value={product.item_normal_price} 
                allowLeadingZeros 
                thousandSeparator="." 
                decimalSeparator="," 
                prefix={'IDR '} 
                displayType="text"/>
            </text>
            <div className={styles.strike} />
          </div>
          <small className={styles.sold}>Terjual 10</small>
        </div>
        <Badge />
      </div>
    </a>
  );
};
