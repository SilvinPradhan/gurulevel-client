import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import CourseJumbotron from "../../components/cards/CourseJumbotron";
import PreviewModal from "../../components/modals/PreviewModal";
import CourseLessons from "../../components/cards/CourseLessons";

const SingleCourse = ({ course }) => {
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState("");
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <CourseJumbotron
        course={course}
        modal={modal}
        setModal={setModal}
        preview={preview}
        setPreview={setPreview}
      />
      <PreviewModal modal={modal} setModal={setModal} preview={preview} />
      {course.lessons && (
        <CourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          modal={modal}
          setModal={setModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
