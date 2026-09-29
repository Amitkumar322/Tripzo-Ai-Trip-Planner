import './Style/Skeleton.css'
export const SkeletonLoader = () => {
  return (
    <div className="website-skeleton">

      {/* Header */}
      <div className="skeleton skeleton-header"></div>
      {/* Hero */}
      <div className="skeleton skeleton-hero"></div>

      {/* Content */}
      <div className="container py-5">

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>

        <div className="row g-4 mt-4">

          {[1, 2, 3, 4].map((item) => (
            <div className="col-lg-3 col-md-6" key={item}>
              <div className="skeleton skeleton-card"></div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};