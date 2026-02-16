import { getBio, getFeaturedProjects } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStack from "@/components/home/TechStack";

export default async function Home() {
  const bio = await getBio();
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <HeroSection name={bio.name} tagline={bio.tagline} socials={bio.socials} />
      <AboutSection about={bio.about} />
      <FeaturedProjects projects={featuredProjects} />
      <TechStack items={bio.techStack} />
    </>
  );
}
