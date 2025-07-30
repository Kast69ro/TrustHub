import { Button } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FeaturesSection } from "@/components/home/features/features";
import { CategoriesSection } from "@/components/home/category/category";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam";
import {getTranslations} from 'next-intl/server'
import Orbit from "@/components/home/orbit/orbit";
const slugs = [
  "typescript",
  "javascript",
  "react",
  "Next.js",
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsKSu72K8l9K5TlK7U3B5bYsrsg0xYw-9g8g&s',
  'https://play-lh.googleusercontent.com/GguSSKNcZdGw624xa9VqH71Sy6B12bHdlINY0RN_CltpzE51NgdFWkxesZuI4joVDrM',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ffvle8jxcJgU4Wd0Uj1rsdVy6bWG3hcx6A&s',
  'YouTube',
  'visa',
  'paypal',
  'mastercard',
  "/omuz.png",
  'NestJS',
  'Redux',
  'reactrouter',
  'firebase',
  'republicofgamers'
];
export default async function HomePage() {
  const images = slugs.map((slug) => {
  if (slug.startsWith("http") || slug.startsWith("/")) return slug;
  return `https://cdn.simpleicons.org/${slug}/${slug}`;
});

const t = await getTranslations('HomePage');
  return (
    <div className="bg-[#f1eadb] min-h-screen">
      <section className="py-5 px-4 sm:px-6 lg:px-8 border-b border-[#d7c4a3] max-w-7xl mx-auto flex flex-col md:flex-row  justify-center md:items-center ">
        <div className="w-full  flex flex-col items-center md:items-start py-10">
          <h1 className="font-serif text-5xl md:text-[60px] font-[600] text-black leading-normal   text-center md:text-left">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed text-center md:text-left">
           {t('about')}
          </p>
          <div className="flex flex-col sm:flex-row  justify-center md:justify-start items-center">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                px: 4,
                py: 1.5,
                gap: 1,
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              {t('button_1')}
            </Button>
          </div>
        </div>
          <div className="flex items-center justify-center">
            <IconCloud images={images} />
          </div>

      
      </section>

      <FeaturesSection />

      <CategoriesSection />

      <section className="bg-white">
      <AnimatedBeamDemo/>
      </section>

      <section>
        <Orbit/>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">
            {t('get-start-section-title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('get-start-section-about')}
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
             {t('get-start-section-button')}
          </Button>
        </div>
      </section>

      
    </div>
  );
}
