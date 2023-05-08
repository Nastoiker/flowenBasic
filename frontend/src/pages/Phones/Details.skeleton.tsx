import Skeleton from "react-loading-skeleton";

export const DetailsSkeleton = () => {
  return (
    <div className={"hidden sm:flex items-center justify-between"}>
      <Skeleton width={150} height={600} borderRadius={"2rem"} />
      <Skeleton width={400} height={700} borderRadius={"2rem"} />
      <div className={"flex flex-col items-center self-start"}>
        <Skeleton width={300} height={50} borderRadius={"2rem"} />
        <Skeleton width={300} height={50} borderRadius={"2rem"} />
        <Skeleton width={300} height={50} borderRadius={"2rem"} />
      </div>
    </div>
  );
};
