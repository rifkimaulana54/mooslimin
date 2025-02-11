import styles from './footer.module.css';
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <div className={styles.infoBar}>
        <Container>
          <Row className="align-items-center">
            <Col md="4">
              <div className={styles.info}>
                <img
                  className={styles.checkCircleIcon}
                  alt=""
                  src="/images/component/footer/image/check-circle.svg"
                />
                <div className={styles.text}>
                  InsyaAllah Sesuai Syariat
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className={styles.info}>
                <img
                  className={styles.checkCircleIcon}
                  alt=""
                  src="/images/component/footer/image/local-shipping.svg"
                />
                <div className={styles.text}>
                  <div className={styles.islamicWayGuaranteeGaransi}>
                    Pengiriman Cepat
                  </div>

                </div>
              </div>
            </Col>
            <Col md="4">
              <div className={styles.info}>
                <img
                  className={styles.checkCircleIcon}
                  alt=""
                  src="/images/component/footer/image/credit-score.svg"
                />
                <div className={styles.text}>
                  <div className={styles.islamicWayGuaranteeGaransi}>
                    Metode Pembayaran Syariah
                  </div>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.footer1}>
        <Container className="mb-5">
          <div className={styles.content}>
            <Row className="g-5">
              <Col md="9">
                <Row>
                  <Col md="3">
                    <div className={styles.list}>
                      <div className={styles.outfitfesyen}>Outfit/Fesyen</div>
                      <div className={styles.text3}>
                        <div className={styles.dailyWearBaju}>
                          Daily wear Baju Sehari-Hari
                        </div>
                        <div className={styles.dailyWearBaju}>Work wear Baju Kerja</div>
                        <div className={styles.dailyWearBaju}>Kajian Baju Kajian</div>
                        <div className={styles.dailyWearBaju}>
                          Sports wear Baju Olah Raga
                        </div>
                        <div className={styles.dailyWearBaju}>
                          Collaboration Kolaborasi
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.list}>
                      <div className={styles.outfitfesyen}>Category Kategori</div>
                      <div className={styles.text3}>
                        <div className={styles.dailyWearBaju}>T-shirt</div>
                        <div className={styles.dailyWearBaju}>Shirt Kemerja</div>
                        <div className={styles.dailyWearBaju}>Outwear Luaran</div>
                        <div className={styles.dailyWearBaju}>Shorts Celana pendek</div>
                        <div className={styles.dailyWearBaju}>Pants Celana panjang</div>
                        <div className={styles.dailyWearBaju}>Footwear Alas kaki</div>
                        <div className={styles.dailyWearBaju}>Others Lainnya</div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.list}>
                      <div className={styles.outfitfesyen}>
                        Our brand partners Brand kepercayaan kami
                      </div>
                      <div className={styles.text3}>
                        <div className={styles.dailyWearBaju}>MAJEED</div>
                        <div className={styles.dailyWearBaju}>MABROOK.IDN</div>
                        <div className={styles.dailyWearBaju}>SAMASE</div>
                        <div className={styles.dailyWearBaju}>BRAND NAME</div>
                        <div className={styles.dailyWearBaju}>BRAND NAME</div>
                        <div className={styles.dailyWearBaju}>BRAND NAME</div>
                        <div className={styles.dailyWearBaju}>BRAND NAME</div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.lists}>
                      <div className={styles.list3}>
                        <div className={styles.outfitfesyen}>
                          About us Tentang Mooslimin
                        </div>
                        <div className={styles.text3}>
                          <div className={styles.dailyWearBaju}>
                            Our story Di Balik Mooslimin
                          </div>
                          <div className={styles.dailyWearBaju}>
                            Islamic-fashion Busana Islami
                          </div>
                          <div className={styles.dailyWearBaju}>Eco footprint</div>
                        </div>
                      </div>
                      <div className={styles.list3}>
                        <div className={styles.outfitfesyen}>
                          Customer care Layanan Sahabat
                        </div>
                        <div className={styles.text3}>
                          <div className={styles.dailyWearBaju}>Contact Kontak</div>
                          <div className={styles.dailyWearBaju}>FAQs Tanya Jawab</div>
                          <div className={styles.dailyWearBaju}>
                            Track an order Lacak pemesanan
                          </div>
                          <div className={styles.dailyWearBaju}>
                            Payment confirmation Konfirmasi pembayaran
                          </div>
                          <div
                            className={styles.dailyWearBaju}
                          >{`Shipping & returns Pengiriman & pengembalian`}</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md="3">
                <div className={styles.lists1}>
                  <div className={styles.text8}>
                    <div className={styles.outfitfesyen}>Follow us Temukan kami</div>
                    <div className={styles.placeholder}>
                      <a href="#"><img className={styles.iconSocmed} alt="Instagram" src="/images/component/footer/icon/instagram.svg" /></a>
                      <a href="#"><img className={styles.iconSocmed} alt="Tiktok" src="/images/component/footer/icon/tiktok.svg" /></a>
                      <a href="#"><img className={styles.iconSocmed} alt="Facebook" src="/images/component/footer/icon/facebook.svg" /></a>
                      <a href="#"><img className={styles.iconSocmed} alt="Youtube" src="/images/component/footer/icon/youtube.svg" /></a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <div className={styles.mark}>
            <Row>
              <Col md="4">
                <div className={styles.tnc}>
                  <div className={styles.tncText}> <a href="#">Privacy Policy</a> </div>
                  <div className={styles.tncText}><a href="#">{`Terms & Conditions`}</a></div>
                </div>
              </Col>
              <Col md="4">
                <Row className="gy-3 align-items-center justify-content-center">
                  <Col md="3">
                    <div className={styles.logopayment}>
                      <div className={styles.mandiri}>
                        <img className={styles.logoIcon} alt="" src="/images/component/footer/image/logo1.svg" />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.logopayment}>
                      <div className={styles.logos1}>
                        <img className={styles.logoIcon1} alt="" src="/images/component/footer/image/logo2.svg" />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.logopayment}>
                      <div className={styles.textnewgopay}>
                        <img className={styles.gopayIcon} alt="" src="/images/component/footer/image/gopay.svg" />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className={styles.logopayment}>
                      <div className={styles.mandiri}>
                        <img className={styles.logoIcon} alt="" src="/images/component/footer/image/logo1.svg" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <div className={styles.copyright}>
                  Copyright © - All Rights Reserved - Mooslimin 2022
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};
