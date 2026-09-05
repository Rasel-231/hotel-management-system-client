import FeaturedDestinations from "../feature/components/hotels/landing-pages/Featureddestinations";
import HotelCarouselBanner from "../feature/components/hotels/landing-pages/HotelCarouselBanner";
import CuratedRetreatsSlider from "../feature/components/hotels/landing-pages/CuratedRetreatsSlider";
import OurCommitments from "../feature/components/hotels/landing-pages/Ourcommitments";
import PropertyCardsGrid from "../feature/components/hotels/landing-pages/PropertyCardsGrid";
import SpecialOffersSlider from "../feature/components/hotels/landing-pages/Specialoffersslider";
import WhyChooseStayEase from "../feature/components/hotels/landing-pages/Whychoosestayease";
import Testimonials from "../feature/components/hotels/landing-pages/Testimonials";
import DiscoverVideoBanner from "../feature/components/hotels/landing-pages/Discovervideobanner";

const userPage = () => {
  return (
    <div>
      <HotelCarouselBanner />
      <WhyChooseStayEase />
      <CuratedRetreatsSlider />
      <FeaturedDestinations />
      <PropertyCardsGrid />
      <SpecialOffersSlider />
      <OurCommitments />
      <Testimonials />
      <DiscoverVideoBanner />
    </div>
  );
};

export default userPage;