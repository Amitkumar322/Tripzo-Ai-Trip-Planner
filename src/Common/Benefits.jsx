import './Style/Benefits.css'
import { Luggage, Route, MousePointerClick, Megaphone, Flag, Umbrella } from 'lucide-react'
import gallery7 from "../assets/Images/gallery7.jpg";
const benefits = [
  {
    icon: <Luggage size={40} strokeWidth={1.5} />,
    title: "Expert Travel Guide",
    text: "Travel professionals who help destinations, accommodations, and activities tailored.",
  },
  // { image: gallery7 },
  {
    icon: <Route size={40} strokeWidth={1.5} />,
    title: "Custom Tour Plan",
    text: "Enjoy trips designed around your preferences, whether you want a relaxing beach holiday.",
  },
  {
    icon: <MousePointerClick size={40} strokeWidth={1.5} />,
    title: "Hassle-Free Booking",
    text: "Save time and effort with a smooth, guided booking process from start to finish.",
  },
  {
    icon: <Megaphone size={40} strokeWidth={1.5} />,
    title: "Deals & Discounts",
    text: "Save time and effort with exclusive deals curated for every kind of traveler.",
  },
  {
    icon: <Flag size={40} strokeWidth={1.5} />,
    title: "Local Guides Authentic",
    text: "Immerse yourself in local culture with guides who know the destination best.",
  },
  {
    icon: <Umbrella size={40} strokeWidth={1.5} />,
    title: "Travel Insurance",
    text: "Stay protected with insurance coverage for the unexpected, wherever you go.",
  },
]

export const Benefits = () => {
  return (
    <div className="container-fluid bg-img section-padding position-relative bg-black">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50"></div>
      <div className="container position-relative h-100">
        <div className="row text-center h-100 align-items-center">
          <div className="col-md-12 text-white banner-text">
            <h2 className="text-white text-bold">How to Benefit Our Tours</h2>
            <p>
              Make the most of your travel experience with our carefully curated tours
              designed to offer convenience
            </p>

            <div className="row cards g-4 mt-2">
              {benefits.map((b, i) =>
                b.image ? (
                  <div className="col-12 col-sm-6 col-lg-4" key={i}>
                    <div className="benefit-card benefit-card--image">
                      <img
                        src="/images/cabin.jpg"
                        alt="Glamping cabin"
                        className="benefit-card-img"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="col-12 col-sm-6 col-lg-4" key={i}>
                    <div className="benefit-card text-start">
                      <div className="benefit-icon">{b.icon}</div>
                      <h4 className="benefit-title">{b.title}</h4>
                      <p className="benefit-text">{b.text}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}