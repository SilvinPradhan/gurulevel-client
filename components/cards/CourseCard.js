import { Card, Badge, Row, Col, Rate } from "antd";
import React from "react";
import Link from "next/link";
import { currenyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
          }
          // bordered={false}
        >
          <h2 className="font-weight-bold">{name}</h2>
          <Rate disabled defaultValue={3} />
          <hr />
          <p>
            <span>Instructor:</span> {instructor.name}
          </p>
          <Badge
            count={category}
            style={{ backgroundColor: "#9543de" }}
            className="pb-2 mr-2"
          />
          {/* <Meta title={} */}
          <h4 className="pt-2">
            {paid
              ? currenyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
