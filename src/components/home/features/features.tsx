import foto from "@/assets/Verified.png";
import foto1 from "@/assets/Community.png";
import foto2 from "@/assets/update.png";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function FeaturesSection() {
  const t = await getTranslations("HomePage");

  const features = [
    {
      title: t("cart-1-title"),
      description:
        t('cart-1-about'),
      icon: foto,
    },
    {
      title: t("cart-2-title"),
      description:
           t('cart-2-about'),
      icon: foto1,
    },
    {
      title:t("cart-3-title"),
      description:
          t('cart-3-about'),
      icon: foto2,
    },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">
            {t("section-2-title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("section-2-about")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center border rounded-2xl border-[#f1eadb] shadow-md p-5 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#e2d4c0]"
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
