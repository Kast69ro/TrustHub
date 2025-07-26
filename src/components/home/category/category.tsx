import { CodeBracketIcon, PaintBrushIcon, AcademicCapIcon, BoltIcon, UsersIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

const categories = [
  { name: "Development Tools", icon: CodeBracketIcon, count: 124, color: "bg-blue-300" },
  { name: "Design Resources", icon: PaintBrushIcon, count: 89, color: "bg-purple-300" },
  { name: "Learning Platforms", icon: AcademicCapIcon, count: 156, color: "bg-green-300" },
  { name: "Productivity Apps", icon: BoltIcon, count: 203, color: "bg-yellow-300" },
  { name: "Community Tools", icon: UsersIcon, count: 67, color: "bg-pink-300" },
  { name: "Security Services", icon: ShieldCheckIcon, count: 45, color: "bg-red-300" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f1eadb]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-black mb-4">Browse by Category</h2>
          <p className="text-gray-600">Explore our carefully organized collection of resources.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href="/catalog">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-black">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count} resources</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
