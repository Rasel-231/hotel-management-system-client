import FeaturedDestinations from "../feature/components/hotels/landing-pages/Featureddestinations";

import CuratedRetreatsSlider from "../feature/components/hotels/landing-pages/CuratedRetreatsSlider";
import OurCommitments from "../feature/components/hotels/landing-pages/Ourcommitments";
import PropertyCardsGrid from "../feature/components/hotels/landing-pages/PropertyCardsGrid";
import SpecialOffersSlider from "../feature/components/hotels/landing-pages/Specialoffersslider";
import WhyChooseStayEase from "../feature/components/hotels/landing-pages/Whychoosestayease";
import Testimonials from "../feature/components/hotels/landing-pages/Testimonials";
import DiscoverVideoBanner from "../feature/components/hotels/landing-pages/Discovervideobanner";
import ResortHero from "../feature/components/hotels/landing-pages/ResortHero";
import HotelServiceWeb from "../feature/components/hotels/ui/HotelService";
import { Reveal } from "../../components/ui/reveal";

const userPage = () => {
  return (
    <div>
      <ResortHero />
      <FeaturedDestinations />
      <CuratedRetreatsSlider />
      <div className="divider-gold" />
      <Reveal>
        <PropertyCardsGrid />
      </Reveal>
      <SpecialOffersSlider />
      <Reveal>
        <WhyChooseStayEase />
      </Reveal>
      <Reveal>
        <OurCommitments />
      </Reveal>
      <div className="divider-gold" />
      <HotelServiceWeb />
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <DiscoverVideoBanner />
      </Reveal>
    </div>
  );
};

export default userPage;
