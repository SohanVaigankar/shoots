import "./ShimmerLoader.css";

type ShimmerLoaderProps = {
  height: string;
  width: string;
};

const ShimmerLoader = (props: ShimmerLoaderProps) => {
  const { height, width } = props;

  return (
    <div
      className={`shimmer-animate  rounded-sm bg-[#777]`}
      style={{
        height: height ? height : "10px",
        width: width ? width : "100%",
      }}
    ></div>
  );
};

export default ShimmerLoader;
