import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CourseCard from "../components/cards/CourseCard";
const Index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const getCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   getCourses();
  // }, []);
  return (
    <>
      <div className="jumbotron navBorder">
        <h1 className="display-4 navTitle">GuruLevel, eLearning!</h1>
        <p className="lead">
          "Online learning is not the next big thing, it is the now big thing."
          - <span className="author">Donna J. Abernathy</span>
        </p>
        <hr className="my-4" />
        <p className="subTitle">Eliminate the boundaries of the classroom.</p>

        <Link href="/">
          <a className="btn btn-success btn-lg" role="button">
            GuruLevel
          </a>
        </Link>
      </div>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => {
            return (
              <div key={course._id} className="col-md-4">
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
