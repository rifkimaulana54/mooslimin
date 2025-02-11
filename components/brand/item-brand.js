import Link from "next/link";
import styles from "./item-brand.module.css";


export default function ItemBrand({ brand }) {
    return (
        <Link href={"brands/" + brand.id} className={styles.brand}>
            <div className={styles.card}>
                <img className={styles.imageBrand} alt="" src="" />
                <div className={styles.header}>
                    <div className={styles.text}>
                        <div className={styles.brandName}>{brand.name}</div>
                        <div className={styles.info}>
                            <div className={styles.icon}>
                                <img className={styles.starIcon} alt="" src="/star.svg" />
                                <div className={styles.brandRating}>{brand.rating}</div>
                            </div>
                            <div className={styles.dot} />
                            <div className={styles.brandReview}>{brand.reviews.length}</div>
                        </div>
                    </div>
                    <div className={styles.headerChild} />
                </div>
                <div className={styles.badge}>
                    <div className={styles.mabrookidn}>NEW</div>
                </div>
            </div>
        </Link>
    )
}