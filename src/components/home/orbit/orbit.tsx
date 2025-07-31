"use client";

import {
  DocumentCheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
  StarIcon,
  CheckBadgeIcon,
  PlusIcon,
  BriefcaseIcon,
  PresentationChartBarIcon,
  CommandLineIcon,
  CloudIcon,
  CpuChipIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Orbit() {
  const t = useTranslations("HomePage");

  const trustedResources = [
    { icon: DocumentCheckIcon, color: "bg-rose-100 text-rose-400", orbit: 1, position: 0 },
    { icon: ShieldCheckIcon, color: "bg-blue-100 text-blue-400", orbit: 2, position: 45 },
    { icon: UserGroupIcon, color: "bg-green-100 text-green-400", orbit: 3, position: 90 },
    { icon: GlobeAltIcon, color: "bg-purple-100 text-purple-400", orbit: 1, position: 135 },
    { icon: StarIcon, color: "bg-amber-100 text-amber-400", orbit: 2, position: 180 },
    { icon: CheckBadgeIcon, color: "bg-teal-100 text-teal-400", orbit: 3, position: 225 },
    { icon: BriefcaseIcon, color: "bg-indigo-100 text-indigo-400", orbit: 1, position: 270 },
    { icon: PresentationChartBarIcon, color: "bg-pink-100 text-pink-400", orbit: 2, position: 315 },
    { icon: CommandLineIcon, color: "bg-orange-100 text-orange-400", orbit: 3, position: 60 },
    { icon: CloudIcon, color: "bg-cyan-100 text-cyan-400", orbit: 1, position: 120 },
    { icon: CpuChipIcon, color: "bg-lime-100 text-lime-400", orbit: 2, position: 200 },
    { icon: RocketLaunchIcon, color: "bg-yellow-100 text-yellow-500", orbit: 3, position: 300 },
  ];

  return (
    <section className="bg-[#f1eadb]" aria-labelledby="trusted-network-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="text-center lg:text-left space-y-8">
            <h2
              id="trusted-network-heading"
              className="font-serif text-gray-800 text-4xl lg:text-5xl font-bold leading-tight"
            >
              {t("ad-title")}
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
              {t("ad-about")}
            </p>
            <div className="pt-2">
              <Link href='add-form'>
              <button
              className="group inline-flex items-center gap-3 bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-800/20 shadow-md"
              aria-label="Add your site to our trusted network"
              >
                <PlusIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t("ad-button")}
              </button>
                </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[32rem] h-[32rem] lg:w-[42rem] lg:h-[42rem]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-lg border border-gray-200/50 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={logo}
                    alt="Website Logo"
                    width={80}
                    height={80}
                    className="object-cover rounded-full opacity-80"
                    priority={true}
                  />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-64 h-64 lg:w-80 lg:h-80 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-96 h-96 lg:w-[28rem] lg:h-[28rem] transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/15 rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] lg:w-[36rem] lg:h-[36rem] transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/10 rounded-full" />

              {trustedResources.map((resource, index) => {
                const Icon = resource.icon;
                const orbitSizes = {
                  1: "w-64 h-64 lg:w-80 lg:h-80",
                  2: "w-96 h-96 lg:w-[26rem] lg:h-[26rem]",
                  3: "w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem]",
                };
                const orbitSpeeds = {
                  1: "animate-gentle-orbit-1",
                  2: "animate-gentle-orbit-2",
                  3: "animate-gentle-orbit-3",
                };

                return (
                  <div
                    key={index}
                    className={`absolute top-1/2 left-1/2 ${
                      orbitSizes[resource.orbit as keyof typeof orbitSizes]
                    } transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    <div
                      className={`relative w-full h-full ${
                        orbitSpeeds[resource.orbit as keyof typeof orbitSpeeds]
                      }`}
                      style={{
                        animationDelay: `${resource.position * 0.05}s`,
                        transform: `rotate(${resource.position}deg)`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translateX(-50%) translateY(-50%) rotate(-${resource.position}deg)`,
                        }}
                      >
                        <div
                          className={`${resource.color} rounded-full p-4 lg:p-5 shadow-md border border-white/60 transition-all duration-300 hover:shadow-lg`}
                        >
                          <Icon className="w-7 h-7 lg:w-8 lg:h-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-orbit-1 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gentle-orbit-2 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gentle-orbit-3 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gentle-orbit-1 {
          animation: gentle-orbit-1 14s linear infinite;
        }
        .animate-gentle-orbit-2 {
          animation: gentle-orbit-2 18s linear infinite;
        }
        .animate-gentle-orbit-3 {
          animation: gentle-orbit-3 22s linear infinite;
        }
      `}</style>
    </section>
  );
}
