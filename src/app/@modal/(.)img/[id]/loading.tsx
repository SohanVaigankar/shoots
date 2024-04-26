import { ShimmerLoader } from "~/components/Loaders";

const Loading = () => {
  return (
    <div className=" set-flex-direction flex h-full   w-full min-w-0  gap-2 overflow-y-auto  p-2 md:gap-3 lg:overflow-y-hidden">
      <div className="flex w-full  items-center justify-center rounded-md bg-card shadow-sm ">
        <ShimmerLoader height="100%" width="100%" />
      </div>
      <div className="md:text-md rounded-md bg-card p-2 text-center text-sm shadow-sm lg:hidden">
        <ShimmerLoader height="20px" width="100%" />
      </div>
      <div className="flex w-full flex-shrink-0 flex-col gap-2 rounded-md text-primary  lg:w-56 lg:gap-3 lg:p-2 lg:shadow-sm ">
        <div className="md:text-md hidden rounded-md bg-card p-2 text-center text-sm lg:block">
          <ShimmerLoader height="20px" width="100%" />
        </div>
        <section className="flex justify-evenly gap-2 rounded-md bg-card p-2 text-sm shadow-sm md:text-[0.9rem] lg:flex-col">
          <div className="border-card-foreground/1 flex w-full flex-col rounded-md border p-2  text-center md:p-2">
            <ShimmerLoader height="50px" width="100%" />
          </div>
          <div className="flex w-full flex-col rounded-md border border-card-foreground/10 p-2 text-center">
            <ShimmerLoader height="50px" width="100%" />
          </div>
        </section>
        <div className="mx-auto md:p-2">
          <ShimmerLoader height="50px" width="100px" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
