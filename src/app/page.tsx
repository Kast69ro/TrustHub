import { Button } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FeaturesSection } from "@/components/home/features/features";
import { CategoriesSection } from "@/components/home/category/category";
import header from "@/assets/header.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-[#f1eadb] min-h-screen">
      <section className="py-5 px-4 sm:px-6 lg:px-8 border-b border-[#d7c4a3] max-w-7xl mx-auto flex flex-col md:flex-row  justify-center md:items-start gap-10">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:mt-35">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-black mb-6 leading-tight text-center md:text-left">
            Discover Trusted Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed text-center md:text-left">
            Your curated directory of verified tools, services, and platforms.
            Find exactly what you need with confidence and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
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
              Explore Catalog
            </Button>
          </div>
          {/* Картинка под текстом на мобилках */}
          <div className="mt-10 md:hidden w-full flex justify-center">
            <Image
              src={header}
              width={350}
              height={350}
              alt="Header illustration"
              className="rounded-md shadow-lg object-contain"
            />
          </div>
        </div>

        {/* Картинка справа только на десктопе */}
        <div className="hidden md:flex w-1/2 ">
          <Image
            src={header}
            width={550}
            height={300}
            alt="Header illustration"
          />
        </div>
      </section>

      <FeaturesSection />

      <CategoriesSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust TrustHub for their
            resource discovery.
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
            Start Exploring
          </Button>
        </div>
      </section>
    </div>
  );
}
