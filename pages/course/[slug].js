import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Context } from "../../context";
import { toast } from "react-toastify";

import CourseJumbotron from "../../components/cards/CourseJumbotron";
import PreviewModal from "../../components/modals/PreviewModal";
import CourseLessons from "../../components/cards/CourseLessons";

const SingleCourse = ({ course }) => {
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  //context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("Check enrollment => ", data);
    setEnrolled(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = async (e) => {
    console.log("handle paid course");
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
    } catch (err) {
      toast("Failed to enroll in this course.");
      setLoading(false);
    }
  };

  return (
    <>
      <CourseJumbotron
        course={course}
        modal={modal}
        setModal={setModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
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
