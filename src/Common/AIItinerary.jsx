
export const AIItinerary = ({ result }) => {
  if (!result) return null;

  const { itinerary, budgetBreakdown, matchedTours, whyThisPlan } = result;

  return (
    <div className="ai-itinerary-result mt-4">
      <div className="text-center mb-4">
        <h4>Your AI-Generated Plan</h4>
        <p className="text-muted">{whyThisPlan}</p>
      </div>

      {/* Day-wise itinerary */}
      <div className="mb-4">
        <h5>Itinerary</h5>
        {itinerary?.map((day) => (
          <div key={day.day} className="mb-2">
            <strong>Day {day.day}: {day.title}</strong>
            <ul>
              {day.activities?.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Budget breakdown */}
      <div className="mb-4">
        <h5>Estimated Budget</h5>
        <ul className="list-unstyled">
          <li>Stay: {budgetBreakdown?.stay}</li>
          <li>Food: {budgetBreakdown?.food}</li>
          <li>Activities: {budgetBreakdown?.activities}</li>
          <li>Transport: {budgetBreakdown?.transport}</li>
          <li><strong>Total: {budgetBreakdown?.total}</strong></li>
        </ul>
      </div>

      {/* Matched Tripzo tours */}
      <div className="mb-4">
        <h5>Recommended Tours from Tripzo</h5>
        <div className="row g-3">
          {matchedTours?.map((tour) => (
            <div className="col-md-6" key={tour.id}>
              <div className="tour-card h-100 p-3">
                <h6>{tour.destination}</h6>
                <p className="text-muted small mb-1">{tour.duration}</p>
                <p className="small">{tour.description}</p>
                <span className="tour-price">{tour.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};