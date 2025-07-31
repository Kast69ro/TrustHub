import {
  CodeBracketIcon,
  PaintBrushIcon,
  AcademicCapIcon,
  BoltIcon,
  UsersIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getTranslations } from "next-intl/server";

export async function CategoriesSection() {
  const t = await getTranslations("HomePage");

  const categories = [
    {
      name: t("category-1"),
      icon: CodeBracketIcon,
      count: 124,
      color: "bg-blue-300",
    },
    {
      name: t("category-2"),
      icon: PaintBrushIcon,
      count: 89,
      color: "bg-purple-300",
    },
    {
      name: t("category-3"),
      icon: AcademicCapIcon,
      count: 156,
      color: "bg-green-300",
    },
    {
      name: t("category-4"),
      icon: BoltIcon,
      count: 203,
      color: "bg-yellow-300",
    },
    { name: t("category-5"), icon: UsersIcon, count: 67, color: "bg-pink-300" },
    {
      name: t("category-6"),
      icon: ShieldCheckIcon,
      count: 45,
      color: "bg-red-300",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f1eadb]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">
            {t("category-section-title")}
          </h2>
          <p className="text-gray-600">
            {t("category-section-about")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href="/catalog" className="block">
              <Card className="hover:shadow-xl transition-shadow cursor-pointer scale-[1.02] hover:scale-[1.03] duration-200 h-full">
                <CardContent className="p-7 h-full flex flex-col justify-between min-h-[50px]">
                  <div className="flex items-center space-x-5">
                    <div
                      className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center`}
                    >
                      <category.icon className="h-7 w-7 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-black">
                        {category.name}
                      </h3>
                      <p className="text-base text-gray-500">
                        {category.count} {t('resource')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
