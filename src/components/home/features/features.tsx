import { StarIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline"

const features = [
  {
    title: "Verified Quality",
    description: "All resources are thoroughly reviewed and verified by our team.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Community Rated",
    description: "Real ratings and reviews from our trusted community members.",
    icon: StarIcon,
  },
  {
    title: "Always Updated",
    description: "Fresh content and regular updates to keep resources current.",
    icon: BoltIcon,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">Why Choose TrustHub?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every resource is carefully vetted and verified by our community of experts.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#f1eadb]">
                <feature.icon className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
