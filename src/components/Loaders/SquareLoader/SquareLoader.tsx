import "./SquareLoader.css";

const SquareLoader = (props: object) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#f5f5f5"
      {...props}
    >
      <rect
        className="spinner_9y7u"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
      <rect
        className="spinner_9y7u spinner_DF2s"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
      <rect
        className="spinner_9y7u spinner_q27e"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
    </svg>
  );
};

export default SquareLoader;
