import { Button } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FeaturesSection } from "@/components/home/features/features";
import { CategoriesSection } from "@/components/home/category/category";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam";
import { getTranslations } from "next-intl/server";
import Orbit from "@/components/home/orbit/orbit";

const slugs = [
  "freecodecamp",
  "theodinproject",
  "frontendmentor",
  "figma",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsKSu72K8l9K5TlK7U3B5bYsrsg0xYw-9g8g&s",
  "https://play-lh.googleusercontent.com/GguSSKNcZdGw624xa9VqH71Sy6B12bHdlINY0RN_CltpzE51NgdFWkxesZuI4joVDrM",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ffvle8jxcJgU4Wd0Uj1rsdVy6bWG3hcx6A&s",
  "YouTube",
  "interactiondesignfoundation",
  "/tasty.jpg",
  "https://play-lh.googleusercontent.com/iWVlhTceVZosZNyVRYRwJb4JKw7j_ifg3zJDLkhFoLt3yudFo1nwAFSUtKRvJDIu7w",
  "/omuz.png",
  "tryhackme",
  "hackthebox",
  "codewars",
  "exercism",
  "linuxfoundation",
  "dribbble",
  "soundcloud",
  "tailwindcss",
  "w3schools",
];

export default async function HomePage() {
  const images = slugs.map((slug) =>
    slug.startsWith("http") || slug.startsWith("/") ? slug : `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  const t = await getTranslations("HomePage");

  return (
    <div className="bg-[#f1eadb] min-h-screen w-full overflow-x-hidden">
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-[#d7c4a3] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left space-y-7">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[65px] font-semibold text-black leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
            {t("about")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-white mr-2" />
              {t("button_1")}
            </Button>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center items-center max-w-full overflow-hidden">
          <IconCloud images={images} />
        </div>
      </section>

      <FeaturesSection />

      <CategoriesSection />

      <section className="bg-white">
        <AnimatedBeamDemo />
      </section>

      <section className="relative w-full overflow-hidden">
        <div className="max-w-full mx-auto">
          <Orbit />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black">
            {t("get-start-section-title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            {t("get-start-section-about")}
          </p>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#1a1a1a",
              },
            }}
          >
            {t("get-start-section-button")}
          </Button>
        </div>
      </section>
    </div>
  );
}
