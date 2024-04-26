import { ShimmerLoader } from "~/components/Loaders";

const Loading = () => {
  return (
    <div className="scrollbar-hide grid h-full  border-separate gap-8 overflow-y-auto rounded-md bg-card p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex flex-col gap-2">
        <ShimmerLoader height="300px" width="100%" />
        <ShimmerLoader height="20px" width="100%" />
      </div>
    </div>
  );
};

export default Loading;
