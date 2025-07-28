import foto from "@/assets/Verified.png";
import foto1 from "@/assets/Community.png";
import foto2 from "@/assets/update.png";
import Image from "next/image";


const features = [
  {
    title: "Verified Quality",
    description:
      "All resources are thoroughly reviewed and verified by our team.",
    icon: foto,
  },
  {
    title: "Community Rated",
    description: "Real ratings and reviews from our trusted community members.",
    icon: foto1,
  },
  {
    title: "Always Updated",
    description: "Fresh content and regular updates to keep resources current.",
    icon: foto2,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">
            Why Choose TrustHub?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every resource is carefully vetted and verified by our community of
            experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center border rounded-2xl border-[#f1eadb] shadow-md p-5 flex flex-col items-center"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={200}
                height={200}
                className="rounded-xl"
              />
              <h3 className="font-semibold text-xl mt-4 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 max-w-sm flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
