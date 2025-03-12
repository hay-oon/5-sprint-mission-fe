const LoadingSpinner = ({ size = 12 }: { size?: number }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-primary-blue`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
