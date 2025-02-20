'use client'

"use client"
import { Accordion, Col, Form, Row } from "react-bootstrap";
import styles from "../filter/filter.module.css"
import { useState } from "react";

export default function SectionFilterColor() {
    const datas = [{ id: 1, color: "#A6A6A6" }, { id: 2, color: "#FFD700" }, { id: 3, color: "#B24848" }, { id: 4, color: "#EEB0B0" }, { id: 5, color: "#846848" }, { id: 6, color: "#15C7B8" }, { id: 7, color: "#757171" }];

    // const [isChecked, setIsChecked] = useState([])
    // const toggle = ({ target: { item } }) =>
    //     setIsChecked({ ...isChecked, [item]: !isChecked[item] })

    // const shouldShow = Object.values(isChecked).some(val => val)

    const [checkedIds, setChekedIds] = useState([{ id: 3, color: "#B24848" }]);

    const handleChange = (e) => {
        console.log("CEK ONCHANGE " + e)
        const clickedId = +e.target.value;
        if (checkedIds.includes(clickedId)) {
            setChekedIds(checkedIds.filter((id) => id !== clickedId));
        } else {
            setChekedIds([...checkedIds, clickedId]);
        }
    };

    const isCheked = (id) => {
        // console.log("CEK ID " + id)
        checkedIds.includes(id);
    };

    return (
        <Accordion alwaysOpen>
            <Accordion.Item>
                <Accordion.Header>WARNA</Accordion.Header>
                <Accordion.Body className="p-0">
                    <Row>
                        {datas?.map((item, index) =>
                            <Col md="3" lg="2" className="my-2">
                                <div className={styles.round} style={{ border: isCheked(item.id) ? "1px solid #000" : "" }}>
                                    <label for="checkbox" style={{ backgroundColor: item.color }}></label>
                                    <input type="checkbox"
                                        checked={isCheked(item.id)}
                                        id={item.id}
                                        onChange={handleChange} />
                                </div>
                            </Col>
                        )}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}