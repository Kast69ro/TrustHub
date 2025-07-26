import { Button } from "@mui/material"
import { Metadata } from "next"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FeaturesSection } from "@/components/home/features/features"
import { CategoriesSection } from "@/components/home/category/category"





export default function HomePage() {
  return (
    <div className="bg-[#f1eadb] min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#d7c4a3]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Discover Trusted Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your curated directory of verified tools, services, and platforms. Find exactly what you need with
            confidence and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        </div>
      </section>

      <FeaturesSection />

      <CategoriesSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust TrustHub for their resource discovery.
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
  )
}
