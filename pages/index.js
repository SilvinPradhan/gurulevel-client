import Link from "next/link";
const Index = () => {
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
    </>
  );
};

export default Index;
