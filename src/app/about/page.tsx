import { Card, CardContent } from "@mui/material"
import {
  ShieldCheckIcon,
  UsersIcon,
  StarIcon,
  BoltIcon,
} from "@heroicons/react/24/solid"

export default function AboutPage() {
  return (
    <div className="bg-[#f1eadb] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-trusthub-black mb-6">About TrustHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in the power of curated, trusted resources to accelerate learning, productivity, and innovation.
            TrustHub is your reliable companion in discovering the tools and services that truly matter.
          </p>
        </div>

        <Card className="bg-white border-[1px] border-[#d7c4a3] rounded-lg shadow-sm p-8 mb-12">
          <CardContent>
            <h2 className="font-serif text-3xl font-bold text-trusthub-black mb-6 text-center">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              In a world overflowing with digital tools and services, finding the right resources can be overwhelming.
              TrustHub cuts through the noise by providing a carefully curated directory of verified, high-quality
              resources that professionals and learners can trust.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white border-[1px] border-[#d7c4a3] shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#f1eadb] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-trusthub-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-trusthub-black mb-3">Trust & Verification</h3>
              <p className="text-gray-600 leading-relaxed">
                Every resource undergoes thorough review and verification. We ensure that what you find here is
                legitimate, functional, and valuable.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[1px] border-[#d7c4a3] shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#f1eadb] rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-trusthub-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-trusthub-black mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Our community of professionals, developers, and creators contribute resources and provide honest reviews
                to help others make informed decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[1px] border-[#d7c4a3]">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#f1eadb] rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-trusthub-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-trusthub-black mb-3">Quality Over Quantity</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize quality curation over comprehensive listings. Each resource is selected for its genuine
                value and reliability.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[1px] border-[#d7c4a3]">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#f1eadb] rounded-full flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="h-8 w-8 text-trusthub-black" />
              </div>
              <h3 className="font-serif text-xl font-bold text-trusthub-black mb-3">Always Current</h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously update our directory, removing outdated resources and adding new discoveries to keep our
                collection fresh and relevant.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-lg shadow-sm p-8 mb-12 border-[1px] border-[#d7c4a3]">
          <CardContent>
            <h2 className="font-serif text-3xl font-bold text-trusthub-black mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6 leading-relaxed">
                TrustHub was born from a simple frustration: spending countless hours researching tools and services, only
                to find outdated information, biased reviews, or broken links. As professionals ourselves, we understood
                the pain of decision paralysis when faced with endless options.
              </p>
              <p className="mb-6 leading-relaxed">
                We started by creating our own curated list of trusted resources for our team. Soon, colleagues and
                friends began asking for access to our collection. It became clear that there was a real need for a
                reliable, community-driven resource directory.
              </p>
              <p className="leading-relaxed">
                Today, TrustHub serves thousands of professionals, students, and creators who value quality over quantity.
                We're proud to be the trusted source for discovering the tools and services that truly make a difference.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-trusthub-black mb-2">500+</div>
            <div className="text-gray-600">Verified Resources</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-trusthub-black mb-2">10K+</div>
            <div className="text-gray-600">Community Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-trusthub-black mb-2">25+</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-trusthub-black mb-2">99%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  )
}
