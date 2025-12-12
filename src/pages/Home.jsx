import FeaturedLessons from "../assets/components/FeaturedLessons";
import HeroSlider from "../assets/components/HeroSlider";
import MostSavedLessons from "../assets/components/MostSavedLessons";
import TopContributors from "../assets/components/TopContributors";
import WhyLearningMatters from "../assets/components/WhyLearningMatters";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedLessons />
      <WhyLearningMatters />
      <TopContributors />
      <MostSavedLessons />
    </div>
  );
}
