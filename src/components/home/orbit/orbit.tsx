"use client";

import {
  DocumentCheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
  StarIcon,
  CheckBadgeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";

export default function Orbit() {
  const t = useTranslations("HomePage");

  const trustedResources = [
    {
      icon: DocumentCheckIcon,
      color: "bg-rose-100 text-rose-400",
      orbit: 1,
      position: 0,
    },
    {
      icon: ShieldCheckIcon,
      color: "bg-blue-100 text-blue-400",
      orbit: 2,
      position: 60,
    },
    {
      icon: UserGroupIcon,
      color: "bg-green-100 text-green-400",
      orbit: 3,
      position: 120,
    },
    {
      icon: GlobeAltIcon,
      color: "bg-purple-100 text-purple-400",
      orbit: 1,
      position: 180,
    },
    {
      icon: StarIcon,
      color: "bg-amber-100 text-amber-400",
      orbit: 2,
      position: 240,
    },
    {
      icon: CheckBadgeIcon,
      color: "bg-teal-100 text-teal-400",
      orbit: 3,
      position: 300,
    },
  ];

  return (
    <section
      className="bg-[#f1eadb] py-20 lg:py-28"
      aria-labelledby="trusted-network-heading"
    >
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
             {t('ad-about')}
            </p>
            <div className="pt-2">
              <button
                className="group inline-flex items-center gap-3 bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-800/20 shadow-md"
                aria-label="Add your site to our trusted network"
              >
                <PlusIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t('ad-button')}
              </button>
            </div>
          </div>

          {/* Orbiting Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-85 h-80 lg:w-100 lg:h-100">
              {/* Central Avatar/Logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white shadow-lg border border-gray-200/50 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={logo}
                    alt="Website Logo"
                    width={70}
                    height={70}
                    className="object-cover rounded-full opacity-80"
                    priority={true}
                  />
                </div>
              </div>

              {/* Subtle Orbit Paths */}
              <div className="absolute top-1/2 left-1/2 w-48 h-48 lg:w-60 lg:h-60 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-72 h-72 lg:w-90 lg:h-90 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/15 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 lg:w-120 lg:h-120 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300/10 rounded-full"></div>

              {/* Orbiting Trusted Resources */}
              {trustedResources.map((resource, index) => {
                const Icon = resource.icon;
                const orbitSizes = {
                  1: "w-32 h-32 lg:w-40 lg:h-40",
                  2: "w-48 h-48 lg:w-60 lg:h-60",
                  3: "w-64 h-64 lg:w-80 lg:h-80",
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
                          className={`${resource.color} rounded-full p-2.5 lg:p-3 shadow-sm border border-white/60 transition-all duration-300 hover:shadow-md`}
                        >
                          <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
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
          animation: gentle-orbit-1 10s linear infinite; /* было 25s */
        }
        .animate-gentle-orbit-2 {
          animation: gentle-orbit-2 15s linear infinite; /* было 35s */
        }
        .animate-gentle-orbit-3 {
          animation: gentle-orbit-3 20s linear infinite; /* было 45s */
        }
      `}</style>
    </section>
  );
}
