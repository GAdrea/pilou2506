import {
  AlertCircle,
  Bookmark,
  Box,
  Check,
  Clock,
  Info,
  MapPin,
  Package,
  Plus,
  Save,
  Shield,
  Snowflake,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const REGIONS_DATA = {
  Hokkaido: ["Hokkaido"],
  "Kita-tohoku": ["Aomori", "Iwate", "Akita"],
  "Minami-tohoku": ["Miyagi", "Yamagata", "Fukushima"],
  Kanto: [
    "Tokyo",
    "Kanagawa",
    "Saitama",
    "Chiba",
    "Ibaraki",
    "Tochigi",
    "Gunma",
  ],
  Shinetsu: ["Niigata", "Nagano", "Yamanashi"],
  Hokuriku: ["Toyama", "Ishikawa", "Fukui"],
  Chubu: ["Aichi", "Gifu", "Shizuoka", "Mie"],
  Kansai: ["Osaka", "Hyogo", "Kyoto", "Shiga", "Nara", "Wakayama"],
  Chugoku: ["Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi"],
  Shikoku: ["Tokushima", "Kagawa", "Ehime", "Kochi"],
  Kyushu: [
    "Fukuoka",
    "Saga",
    "Nagasaki",
    "Kumamoto",
    "Oita",
    "Miyazaki",
    "Kagoshima",
  ],
  Okinawa: ["Okinawa"],
};

// Reverse map to find region from city
const CITY_TO_REGION: Record<string, string> = {};
Object.entries(REGIONS_DATA).forEach(([region, cities]) => {
  cities.forEach((city) => {
    CITY_TO_REGION[city] = region;
  });
});

const ALL_CITIES = Object.values(REGIONS_DATA).flat().sort();

const DELIVERY_TIMES: Record<string, string> = {
  Kyushu: "Next Day (J+1)",
  Chugoku: "Next Day (J+1)",
  Shikoku: "Next Day (J+1)",
  Kansai: "Next Day (J+1)",
  Chubu: "2 Days (J+2)",
  Hokuriku: "2 Days (J+2)",
  Shinetsu: "2 Days (J+2)",
  Kanto: "2 Days (J+2)",
  "Minami-tohoku": "2 Days (J+2)",
  "Kita-tohoku": "2 Days (J+2)",
  Hokkaido: "2-3 Days (J+2/J+3)",
  Okinawa: "2+ Days (Maritime)",
};

const BASE_RATES: Record<number, Record<string, number>> = {
  60: {
    Hokkaido: 2340,
    "Kita-tohoku": 1760,
    "Minami-tohoku": 1760,
    Kanto: 1460,
    Shinetsu: 1460,
    Hokuriku: 1190,
    Chubu: 1190,
    Kansai: 1060,
    Chugoku: 940,
    Shikoku: 1060,
    Kyushu: 940,
    Okinawa: 1320,
  },
  80: {
    Hokkaido: 2620,
    "Kita-tohoku": 2050,
    "Minami-tohoku": 2050,
    Kanto: 1740,
    Shinetsu: 1740,
    Hokuriku: 1480,
    Chubu: 1480,
    Kansai: 1350,
    Chugoku: 1230,
    Shikoku: 1350,
    Kyushu: 1230,
    Okinawa: 1940,
  },
  100: {
    Hokkaido: 2930,
    "Kita-tohoku": 2360,
    "Minami-tohoku": 2360,
    Kanto: 2050,
    Shinetsu: 2050,
    Hokuriku: 1790,
    Chubu: 1790,
    Kansai: 1650,
    Chugoku: 1530,
    Shikoku: 1650,
    Kyushu: 1530,
    Okinawa: 2580,
  },
  120: {
    Hokkaido: 3250,
    "Kita-tohoku": 2680,
    "Minami-tohoku": 2680,
    Kanto: 2370,
    Shinetsu: 2370,
    Hokuriku: 2110,
    Chubu: 2110,
    Kansai: 1970,
    Chugoku: 1850,
    Shikoku: 1970,
    Kyushu: 1850,
    Okinawa: 3230,
  },
  140: {
    Hokkaido: 3590,
    "Kita-tohoku": 3020,
    "Minami-tohoku": 3020,
    Kanto: 2710,
    Shinetsu: 2710,
    Hokuriku: 2450,
    Chubu: 2450,
    Kansai: 2310,
    Chugoku: 2190,
    Shikoku: 2310,
    Kyushu: 2190,
    Okinawa: 3900,
  },
  160: {
    Hokkaido: 3910,
    "Kita-tohoku": 3340,
    "Minami-tohoku": 3340,
    Kanto: 3030,
    Shinetsu: 3030,
    Hokuriku: 2770,
    Chubu: 2770,
    Kansai: 2630,
    Chugoku: 2510,
    Shikoku: 2630,
    Kyushu: 2510,
    Okinawa: 4550,
  },
  180: {
    Hokkaido: 6550,
    "Kita-tohoku": 5540,
    "Minami-tohoku": 5540,
    Kanto: 4350,
    Shinetsu: 4350,
    Hokuriku: 4090,
    Chubu: 4090,
    Kansai: 3730,
    Chugoku: 3060,
    Shikoku: 3730,
    Kyushu: 3060,
    Okinawa: 6970,
  },
  200: {
    Hokkaido: 8140,
    "Kita-tohoku": 6860,
    "Minami-tohoku": 6860,
    Kanto: 5450,
    Shinetsu: 5450,
    Hokuriku: 5190,
    Chubu: 5190,
    Kansai: 4500,
    Chugoku: 3720,
    Shikoku: 4500,
    Kyushu: 3720,
    Okinawa: 8620,
  },
};

const HANDLING_RATES: Record<number, Record<string, number>> = {
  60: {
    Hokkaido: 386,
    "Kita-tohoku": 290,
    "Minami-tohoku": 290,
    Kanto: 241,
    Shinetsu: 241,
    Hokuriku: 196,
    Chubu: 196,
    Kansai: 175,
    Chugoku: 155,
    Shikoku: 175,
    Kyushu: 155,
    Okinawa: 218,
  },
  80: {
    Hokkaido: 432,
    "Kita-tohoku": 338,
    "Minami-tohoku": 338,
    Kanto: 287,
    Shinetsu: 287,
    Hokuriku: 244,
    Chubu: 244,
    Kansai: 223,
    Chugoku: 203,
    Shikoku: 223,
    Kyushu: 203,
    Okinawa: 320,
  },
  100: {
    Hokkaido: 483,
    "Kita-tohoku": 389,
    "Minami-tohoku": 389,
    Kanto: 338,
    Shinetsu: 338,
    Hokuriku: 295,
    Chubu: 295,
    Kansai: 272,
    Chugoku: 252,
    Shikoku: 272,
    Kyushu: 252,
    Okinawa: 426,
  },
  120: {
    Hokkaido: 536,
    "Kita-tohoku": 442,
    "Minami-tohoku": 442,
    Kanto: 391,
    Shinetsu: 391,
    Hokuriku: 348,
    Chubu: 348,
    Kansai: 325,
    Chugoku: 305,
    Shikoku: 325,
    Kyushu: 305,
    Okinawa: 533,
  },
  140: {
    Hokkaido: 592,
    "Kita-tohoku": 498,
    "Minami-tohoku": 498,
    Kanto: 447,
    Shinetsu: 447,
    Hokuriku: 404,
    Chubu: 404,
    Kansai: 381,
    Chugoku: 361,
    Shikoku: 381,
    Kyushu: 361,
    Okinawa: 644,
  },
  160: {
    Hokkaido: 645,
    "Kita-tohoku": 551,
    "Minami-tohoku": 551,
    Kanto: 500,
    Shinetsu: 500,
    Hokuriku: 457,
    Chubu: 457,
    Kansai: 434,
    Chugoku: 414,
    Shikoku: 434,
    Kyushu: 414,
    Okinawa: 751,
  },
  180: {
    Hokkaido: 1081,
    "Kita-tohoku": 914,
    "Minami-tohoku": 914,
    Kanto: 718,
    Shinetsu: 718,
    Hokuriku: 675,
    Chubu: 675,
    Kansai: 615,
    Chugoku: 505,
    Shikoku: 615,
    Kyushu: 505,
    Okinawa: 1150,
  },
  200: {
    Hokkaido: 1343,
    "Kita-tohoku": 1132,
    "Minami-tohoku": 1132,
    Kanto: 899,
    Shinetsu: 899,
    Hokuriku: 856,
    Chubu: 856,
    Kansai: 743,
    Chugoku: 614,
    Shikoku: 743,
    Kyushu: 614,
    Okinawa: 1422,
  },
};

const EXTRA_FEES: Record<string, Record<string | number, number>> = {
  cool: { 60: 275, 80: 330, 100: 440, 120: 715 },
  box: { small: 300, medium: 350, large: 400 },
  cover: { M: 200, L: 300, XL: 600 },
};

const SIZE_TIERS = [
  { t: 60, s: 60, w: 2 },
  { t: 80, s: 80, w: 5 },
  { t: 100, s: 100, w: 10 },
  { t: 120, s: 120, w: 15 },
  { t: 140, s: 140, w: 20 },
  { t: 160, s: 160, w: 25 },
  { t: 180, s: 180, w: 30 },
  { t: 200, s: 200, w: 30 },
];

interface PackageItem {
  id: number;
  sides: number | string;
  weight: string;
  box: string;
  cover: string;
  cool: boolean;
}

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState("Kyushu");
  const [selectedCity, setSelectedCity] = useState("");
  const [packages, setPackages] = useState<PackageItem[]>([
    {
      id: Date.now(),
      sides: 60,
      weight: "",
      box: "none",
      cover: "none",
      cool: false,
    },
  ]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [showSavedList, setShowSavedList] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState<any[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("luxury_quotes");
    if (saved) {
      try {
        setSavedQuotes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: Particle[] = [];
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;

      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.1;
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        )
          this.reset();
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    init();
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const addPackage = () => {
    if (packages.length >= 5) return setError("Shipment limited to 5 units.");
    setPackages([
      ...packages,
      {
        id: Date.now(),
        sides: 60,
        weight: "",
        box: "none",
        cover: "none",
        cool: false,
      },
    ]);
    setError(null);
  };

  const removePackage = (id: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter((p) => p.id !== id));
      setError(null);
    }
  };

  const updatePackage = (id: number, field: keyof PackageItem, value: any) => {
    setPackages(
      packages.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city && CITY_TO_REGION[city]) {
      setSelectedRegion(CITY_TO_REGION[city]);
    }
  };

  useEffect(() => {
    setError(null);
    if (!selectedRegion) return;

    let total = 0;
    const breakdown = [];
    let hasError = false;

    for (let i = 0; i < packages.length; i++) {
      const p = packages[i];
      const s =
        typeof p.sides === "string" ? parseFloat(p.sides) || 0 : p.sides;
      const w =
        typeof p.weight === "string" ? parseFloat(p.weight) || 0 : p.weight;

      if (s > 200) {
        setError(`Unit #0${i + 1}: Exceeds maximum size limit of 200cm.`);
        hasError = true;
        break;
      }
      if (w > 30) {
        setError(`Unit #0${i + 1}: Exceeds maximum weight limit of 30kg.`);
        hasError = true;
        break;
      }

      // Find the tier based on dimensions (selected button)
      let sIdx = SIZE_TIERS.findIndex((t) => s <= t.s);

      // Find the tier based on weight if provided
      let wIdx = w > 0 ? SIZE_TIERS.findIndex((t) => w <= t.w) : -1;
      if (wIdx === -1 && w > 0) wIdx = 7;

      // Final tier is the higher of the two
      const finalTierIdx = Math.max(sIdx, wIdx);
      const finalTier = SIZE_TIERS[finalTierIdx].t;

      const base = BASE_RATES[finalTier][selectedRegion];
      const hand = HANDLING_RATES[finalTier][selectedRegion];

      let coolFee = 0;
      if (p.cool) {
        if (finalTier > 120) {
          setError(
            `Unit #0${i + 1}: Cool service restricted to Size 120 (Calculated Tier: ${finalTier}).`,
          );
          hasError = true;
          break;
        }
        coolFee = EXTRA_FEES.cool[finalTier];
      }

      const boxFee = p.box !== "none" ? EXTRA_FEES.box[p.box] : 0;
      const coverFee = p.cover !== "none" ? EXTRA_FEES.cover[p.cover] : 0;
      const subtotal = base + hand + coolFee + boxFee + coverFee;

      total += subtotal;
      breakdown.push({
        tier: finalTier,
        base,
        hand,
        cool: coolFee,
        box: boxFee,
        cover: coverFee,
        subtotal,
      });
    }

    if (!hasError) {
      setResult({
        total,
        breakdown,
        region: selectedRegion,
        city: selectedCity,
        leadTime: DELIVERY_TIMES[selectedRegion],
      });
    } else {
      setResult(null);
    }
  }, [packages, selectedRegion, selectedCity]);

  const saveQuote = () => {
    if (!result)
      return setError("Please calculate a quote first before saving.");
    const newQuote = {
      id: Date.now(),
      date:
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      region: selectedRegion,
      city: selectedCity,
      packages: packages,
      total: result.total,
      breakdown: result.breakdown,
      leadTime: result.leadTime,
    };
    const updated = [newQuote, ...savedQuotes].slice(0, 5); // Keep last 5
    setSavedQuotes(updated);
    localStorage.setItem("luxury_quotes", JSON.stringify(updated));
    setError(null);
  };

  const loadQuote = (quote: any) => {
    setSelectedRegion(quote.region);
    setSelectedCity(quote.city);
    setPackages(quote.packages);
    setResult({
      total: quote.total,
      breakdown: quote.breakdown,
      region: quote.region,
      city: quote.city,
      leadTime: quote.leadTime,
    });
    setShowSavedList(false);
    setError(null);
  };

  const deleteQuote = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const updated = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(updated);
    localStorage.setItem("luxury_quotes", JSON.stringify(updated));
    if (updated.length === 0) {
      setShowSavedList(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] flex justify-center py-12 px-4 relative overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <div className="w-full max-w-3xl bg-white shadow-2xl border border-[#c5a059]/20 p-6 md:p-14 z-10 rounded-sm relative">
        {savedQuotes.length > 0 && (
          <button
            onClick={() => setShowSavedList(!showSavedList)}
            className="absolute top-6 right-6 flex items-center gap-2 text-[10px] text-[#c5a059] uppercase font-bold tracking-widest hover:text-[#001a30] transition-colors"
          >
            <Bookmark className="w-4 h-4" />{" "}
            {showSavedList ? "Close Saved" : "Load Quote"}
          </button>
        )}

        <header className="text-center mb-12">
          <div className="w-16 h-16 border border-[#c5a059] mx-auto flex items-center justify-center transform rotate-45 mb-8">
            <span className="text-[#c5a059] text-3xl font-light -rotate-45 tracking-tighter">
              LSA
            </span>
          </div>
          <h1 className="text-[#001a30] text-3xl md:text-4xl font-light tracking-[0.35em] uppercase mb-3">
            Luxury Shipping Assistant
          </h1>
          <p className="text-[#c5a059] italic text-xs md:text-sm tracking-[0.2em] opacity-80">
            Refined Logistics Solutions
          </p>
        </header>

        <AnimatePresence initial={false}>
          {showSavedList && savedQuotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 overflow-hidden"
            >
              <div className="p-6 border border-[#c5a059]/20 bg-[#fdfcf9] shadow-sm">
                <div className="flex items-center gap-3 mb-4 border-b border-[#c5a059]/10 pb-3">
                  <Bookmark className="text-[#c5a059] w-4 h-4" />
                  <h2 className="text-[11px] font-bold text-[#001a30] uppercase tracking-[0.25em]">
                    Saved Quotations
                  </h2>
                </div>
                <div className="space-y-4">
                  {savedQuotes.map((q, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      key={q.id}
                      className={`flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-5 border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                        index === 0
                          ? "bg-gradient-to-r from-[#c5a059]/10 to-white border-[#c5a059]/40 shadow-sm"
                          : "bg-white border-gray-100 hover:border-[#c5a059]/40 hover:shadow-sm"
                      }`}
                      onClick={() => loadQuote(q)}
                    >
                      {index === 0 && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]"></div>
                      )}
                      <div className="pl-2 w-full">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[13px] font-bold text-[#001a30] tracking-wider">
                            {q.total.toLocaleString()} ¥
                          </span>
                          {index === 0 && (
                            <span className="bg-[#001a30] text-[#c5a059] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-bold flex items-center gap-1 shadow-sm">
                              <Clock className="w-2.5 h-2.5" /> Most Recent
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 items-center text-[10px] text-[#757575] tracking-widest uppercase">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-[#c5a059]" />
                            <span className="font-medium text-[#001a30]">
                              {q.city || q.region}
                            </span>
                          </div>
                          <span className="text-gray-300 hidden sm:inline">
                            •
                          </span>
                          <span>{q.date}</span>
                        </div>

                        {/* Package Summary Mini-Badges */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {q.packages.map((pkg: any, pIdx: number) => (
                            <div
                              key={pIdx}
                              className="flex items-center gap-1 bg-white/60 border border-gray-200/60 px-2 py-1 rounded text-[9px] font-bold text-[#001a30]"
                            >
                              <Package className="w-3 h-3 text-gray-400" />
                              {pkg.sides}
                              {(pkg.cool ||
                                pkg.box !== "none" ||
                                pkg.cover !== "none") && (
                                <div className="flex items-center pl-1 ml-1 border-l border-gray-200/80 gap-1">
                                  {pkg.cool && (
                                    <Snowflake
                                      className="w-2.5 h-2.5 text-blue-500"
                                      title="Cool Service"
                                    />
                                  )}
                                  {pkg.box !== "none" && (
                                    <Box
                                      className="w-2.5 h-2.5 text-[#c5a059]"
                                      title={`Box: ${pkg.box}`}
                                    />
                                  )}
                                  {pkg.cover !== "none" && (
                                    <Shield
                                      className="w-2.5 h-2.5 text-[#c5a059]"
                                      title={`Cover: ${pkg.cover}`}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-full sm:w-auto justify-end mt-2 sm:mt-0 border-t sm:border-0 border-gray-100/50 pt-3 sm:pt-0">
                        <button className="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest hover:text-[#001a30] px-3 py-1.5 border border-[#c5a059]/20 bg-white hover:bg-[#c5a059]/10 transition-colors shadow-sm">
                          Restore
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteQuote(e, q.id);
                          }}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors bg-white shadow-sm"
                          title="Delete Quote"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
            <p className="text-red-800 text-xs md:text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-[#c5a059]/10 pb-3">
            <MapPin className="text-[#c5a059] w-4 h-4" />
            <h2 className="text-[11px] font-bold text-[#001a30] uppercase tracking-[0.25em]">
              Destination Logistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#fdfcf9] p-8 border border-gray-50">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#757575]">
                Select Prefecture
              </label>
              <select
                className="w-full p-4 border border-gray-200 focus:border-[#c5a059] outline-none text-[13px] bg-white transition-all rounded-none appearance-none cursor-pointer hover:border-gray-300"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
              >
                <option value="">-- City / Unknown --</option>
                {ALL_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#757575]">
                Region Basis
              </label>
              <select
                className={`w-full p-4 border-2 outline-none text-[13px] bg-white transition-all rounded-none cursor-pointer ${
                  selectedRegion
                    ? "border-[#c5a059]/50 hover:border-[#c5a059] text-[#001a30] font-medium"
                    : "border-gray-200 focus:border-[#c5a059]"
                }`}
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedCity("");
                  setError(null);
                }}
              >
                {Object.keys(REGIONS_DATA).map((r) => (
                  <option
                    key={r}
                    value={r}
                    className={
                      selectedRegion === r
                        ? "font-bold bg-[#f9f7f2] text-[#c5a059]"
                        : "text-gray-700 bg-white"
                    }
                  >
                    {r} {selectedRegion === r && "✓"}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-4 bg-[#001a30] text-white p-5 rounded-none">
              <div className="flex items-center gap-3">
                <Clock className="text-[#c5a059] w-5 h-5" />
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-light">
                  Lead Time:{" "}
                  <b className="text-[#c5a059] font-medium">
                    {DELIVERY_TIMES[selectedRegion]}
                  </b>
                </span>
              </div>
              <Info className="text-[#c5a059]/40 w-4 h-4 hidden sm:block" />
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-[#c5a059]/10 pb-3">
            <Package className="text-[#c5a059] w-4 h-4" />
            <h2 className="text-[11px] font-bold text-[#001a30] uppercase tracking-[0.25em]">
              Parcel Inventory
            </h2>
          </div>

          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  className="p-8 border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-500 group relative"
                >
                  <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-6">
                      <span className="text-[12px] font-bold tracking-[0.3em] text-[#001a30]">
                        CONSIGNMENT #0{idx + 1}
                      </span>

                      {/* Visual Package Graphic */}
                      <div className="hidden sm:flex items-center gap-4 border-l border-gray-100 pl-6 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div
                          className={`relative flex items-center justify-center shadow-sm transition-colors duration-300 ${
                            pkg.cool
                              ? "bg-blue-50/80 border-blue-300"
                              : pkg.box !== "none"
                                ? "bg-[#fdfbf6] border-[#c5a059]/50"
                                : "bg-[#f9f7f2] border-[#001a30]/20"
                          } border`}
                          style={{
                            width: `${Math.max(36, (Number(pkg.sides) / 200) * 64)}px`,
                            height: `${Math.max(36, (Number(pkg.sides) / 200) * 64)}px`,
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {/* Dynamic Core Icon */}
                          {pkg.box === "large" ? (
                            <Box
                              className="w-3/5 h-3/5 text-[#c5a059]"
                              strokeWidth={1.5}
                            />
                          ) : pkg.box === "medium" ? (
                            <Box
                              className="w-1/2 h-1/2 text-[#c5a059]"
                              strokeWidth={2.0}
                            />
                          ) : pkg.box === "small" ? (
                            <Box
                              className="w-[45%] h-[45%] text-[#c5a059]"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <Package
                              className={`w-1/2 h-1/2 ${pkg.cool ? "text-blue-400" : "text-[#001a30]/30"}`}
                            />
                          )}

                          {/* Status Badges */}
                          {pkg.cool && (
                            <div
                              className="absolute -top-2.5 -right-2.5 bg-white p-1 rounded-full border border-blue-200 shadow-md z-10 flex items-center justify-center"
                              title="Refrigerated"
                            >
                              <Snowflake className="w-3 h-3 text-blue-500" />
                            </div>
                          )}
                          {pkg.cover !== "none" && (
                            <div
                              className="absolute -bottom-2 -left-2 bg-white px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-[#c5a059]/40 shadow-sm z-10"
                              title={`Protective Cover: Size ${pkg.cover}`}
                            >
                              <Shield className="w-2.5 h-2.5 text-[#c5a059]" />
                              <span className="text-[8px] font-bold text-[#c5a059] leading-none mb-[1px]">
                                {pkg.cover}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 justify-center min-h-[32px]">
                          <span className="text-[10px] font-bold text-[#001a30] tracking-widest uppercase">
                            Size {pkg.sides}{" "}
                            {pkg.weight ? `• ${pkg.weight}kg` : ""}
                          </span>
                          <div className="flex gap-2 text-[8.5px] text-[#757575] tracking-wider uppercase font-medium">
                            {pkg.box !== "none" ? (
                              <span className="text-[#c5a059]">
                                Box: {pkg.box}
                              </span>
                            ) : (
                              <span>Std. Box</span>
                            )}
                            {pkg.cover !== "none" && (
                              <span className="text-[#c5a059]">
                                • Cover: {pkg.cover}
                              </span>
                            )}
                            {pkg.cool && (
                              <span className="text-blue-600/80">• Cool</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {packages.length > 1 && (
                      <button
                        onClick={() => removePackage(pkg.id)}
                        className="text-[#c53030] hover:text-red-800 transition-colors flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest group-hover:opacity-100 opacity-60 ml-4"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-[#757575] uppercase block mb-4">
                      Parcel Size Tier
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {SIZE_TIERS.map((tier) => (
                        <button
                          key={tier.t}
                          onClick={() => updatePackage(pkg.id, "sides", tier.t)}
                          className={`py-3 text-[11px] font-bold border transition-all duration-300 ${
                            pkg.sides === tier.t
                              ? "bg-[#001a30] border-[#001a30] text-[#c5a059] shadow-md hover:bg-[#002a4a]"
                              : "bg-white border-gray-200 text-gray-400 hover:border-[#c5a059] hover:text-[#c5a059] hover:bg-[#c5a059]/5 hover:-translate-y-0.5 hover:shadow-sm"
                          } active:scale-95 active:translate-y-0`}
                        >
                          {tier.t}
                        </button>
                      ))}
                    </div>
                    <p className="text-[9px] text-[#c5a059] italic mt-3 tracking-wider">
                      Select the size based on the sum of 3 sides (cm).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold tracking-wider text-[#757575] uppercase">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        className="p-3 border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-[#c5a059] outline-none text-[13px] transition-all"
                        placeholder="Optional"
                        value={pkg.weight}
                        onChange={(e) =>
                          updatePackage(pkg.id, "weight", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold tracking-wider text-[#757575] uppercase">
                        Box Type
                      </label>
                      <select
                        className="p-3 border border-gray-100 text-[13px] bg-white outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                        value={pkg.box}
                        onChange={(e) =>
                          updatePackage(pkg.id, "box", e.target.value)
                        }
                      >
                        <option value="none">Standard</option>
                        <option value="small">Box S (300¥)</option>
                        <option value="medium">Box M (350¥)</option>
                        <option value="large">Box L (400¥)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold tracking-wider text-[#757575] uppercase">
                        Cover
                      </label>
                      <select
                        className="p-3 border border-gray-100 text-[13px] bg-white outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                        value={pkg.cover}
                        onChange={(e) =>
                          updatePackage(pkg.id, "cover", e.target.value)
                        }
                      >
                        <option value="none">None</option>
                        <option value="M">M (200¥)</option>
                        <option value="L">L (300¥)</option>
                        <option value="XL">XL (600¥)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 p-4 bg-[#fdfcf9] border border-dashed border-[#c5a059]/20 group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`cool-${pkg.id}`}
                        className="peer h-5 w-5 cursor-pointer appearance-none border border-gray-300 rounded-none checked:bg-[#001a30] checked:border-[#001a30] transition-all"
                        checked={pkg.cool}
                        onChange={(e) =>
                          updatePackage(pkg.id, "cool", e.target.checked)
                        }
                      />
                      <Check className="absolute h-3.5 w-3.5 text-[#c5a059] opacity-0 peer-checked:opacity-100 pointer-events-none left-[3px]" />
                    </div>
                    <label
                      htmlFor={`cool-${pkg.id}`}
                      className="text-[11px] font-medium text-[#001a30] cursor-pointer tracking-wide select-none"
                    >
                      Cool Service (Refrigerated){" "}
                      <span className="opacity-40 text-[9px] ml-1">
                        - Limit Size 120
                      </span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={addPackage}
            className="w-full mt-8 py-5 border-2 border-dashed border-[#c5a059]/30 text-[#c5a059] hover:bg-[#c5a059]/5 hover:border-[#c5a059] transition-all duration-500 text-[11px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-3"
          >
            <Plus className="w-4 h-4" /> Add Item to Shipment
          </button>
        </section>

        <AnimatePresence>
          {result && (
            <motion.div
              key="result-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 bg-[#001a30] p-10 md:p-14 rounded-none shadow-inner border-t-2 border-[#c5a059] relative overflow-hidden"
            >
              <button
                onClick={saveQuote}
                className="absolute top-6 right-6 lg:top-8 lg:right-8 text-[#c5a059]/60 hover:text-[#c5a059] transition-colors flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest"
              >
                <Save className="w-4 h-4" /> Save
              </button>
              <div className="text-center border-b border-white/10 pb-10 mb-10 mt-4">
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#c5a059] font-bold">
                  Consolidated Estimation
                </span>
                <motion.h3
                  key={result.total}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  className="text-5xl md:text-6xl font-extralight text-[#c5a059] my-6 tracking-tighter"
                >
                  {result.total.toLocaleString()}{" "}
                  <span className="text-2xl ml-1 font-light opacity-50">¥</span>
                </motion.h3>
                <div className="inline-flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
                  <Package className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="text-[10px] text-[#c5a059] uppercase tracking-[0.25em] font-medium">
                    {result.breakdown.length} Parcel
                    {result.breakdown.length > 1 ? "s" : ""} •{" "}
                    {result.city || result.region}
                  </span>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                {result.breakdown.map((b: any, i: number) => (
                  <motion.div
                    key={`${result.total}-breakdown-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-sm border-b border-white/10 pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em]">
                        Consignment #0{i + 1} (Tier {b.tier})
                      </span>
                      <span className="text-[#c5a059] font-medium tracking-widest">
                        {b.subtotal.toLocaleString()} ¥
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-white/60 text-[12px] font-light tracking-wide">
                      <div className="flex justify-between">
                        <span>Base Logistics Fare</span>
                        <span className="text-white/90">
                          {b.base.toLocaleString()} ¥
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Handling Fee & Service Tax</span>
                        <span className="text-white/90">
                          {b.hand.toLocaleString()} ¥
                        </span>
                      </div>
                      {b.cool > 0 && (
                        <div className="flex justify-between text-[#c5a059]/80 font-normal">
                          <span>Refrigerated Option</span>
                          <span>{b.cool.toLocaleString()} ¥</span>
                        </div>
                      )}
                      {b.box > 0 && (
                        <div className="flex justify-between text-[#c5a059]/80 font-normal">
                          <span>Premium Packaging Box</span>
                          <span>{b.box.toLocaleString()} ¥</span>
                        </div>
                      )}
                      {b.cover > 0 && (
                        <div className="flex justify-between text-[#c5a059]/80 font-normal">
                          <span>Protective Cover</span>
                          <span>{b.cover.toLocaleString()} ¥</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
                <div>
                  <span className="text-[8px] uppercase text-[#c5a059]/60 font-bold block mb-2 tracking-[0.2em]">
                    Shipment Destination
                  </span>
                  <span className="text-white text-[14px] font-light tracking-widest uppercase">
                    {result.city || result.region}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] uppercase text-[#c5a059]/60 font-bold block mb-2 tracking-[0.2em]">
                    Delivery Lead Time
                  </span>
                  <span className="text-white text-[14px] font-light tracking-widest uppercase">
                    {result.leadTime}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
