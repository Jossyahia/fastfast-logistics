"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  StarIcon,
  QuoteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl?: string;
}

const testimonialData: TestimonialProps[] = [
  {
    quote:
      "FastFast's POD service has been a game-changer for our online store. Our order completion rate increased by 60% and customer trust improved significantly.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "StyleHub Fashion",
    rating: 5,
  },
  {
    quote:
      "Their same-day delivery and secure cash handling have helped us expand our business across Lagos. Return customers increased by 45% since partnering with FastFast.",
    author: "Michael Adebayo",
    role: "Founder",
    company: "TechGadgets NG",
    rating: 5,
  },
  {
    quote:
      "The real-time tracking and professional riders have reduced our customer service inquiries by 70%. FastFast is truly a reliable logistics partner.",
    author: "Chioma Okonkwo",
    role: "Operations Manager",
    company: "BeautyBox Express",
    rating: 5,
  },
  {
    quote:
      "We've seen a 50% increase in orders since implementing FastFast's POD service. Our customers love the convenience and reliability.",
    author: "Amina Hassan",
    role: "Business Owner",
    company: "Modish Wears",
    rating: 5,
  },
  {
    quote:
      "The transparent tracking system and professional delivery service have helped us maintain a 98% customer satisfaction rate.",
    author: "David Okafor",
    role: "Director",
    company: "HomeGoods Express",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const slideRef = useRef<HTMLDivElement>(null);

  const TRANSITION_DURATION = 400;
  const AUTO_PLAY_DELAY = 5000;
  const TOUCH_THRESHOLD = 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = testimonialData.length;
  const maxSlideIndex = totalSlides - slidesToShow;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleSlideChange((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
      }, AUTO_PLAY_DELAY);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlideIndex]);

  const handleSlideChange = (getNextIndex: (prev: number) => number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(getNextIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    handleSlideChange(() => Math.min(index, maxSlideIndex));
    setIsAutoPlaying(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);

    if (slideRef.current) {
      const diff = touchEnd - touchStart;
      const slideWidth = slideRef.current.offsetWidth / slidesToShow;
      const currentOffset = currentSlide * slideWidth;
      const dragOffset = (diff / slideWidth) * 100;

      slideRef.current.style.transform = `translateX(calc(-${currentOffset}px + ${dragOffset}px))`;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;

    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${
        currentSlide * (100 / slidesToShow)
      }%)`;
    }

    if (Math.abs(diff) > TOUCH_THRESHOLD) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const getTransitionClass = (index: number) => {
    if (!isTransitioning) return "";

    const isNext = index === currentSlide;
    const isPrev = index === (currentSlide - 1 + totalSlides) % totalSlides;

    if (isNext) return "animate-slide-in";
    if (isPrev) return "animate-slide-out";
    return "";
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Success Stories
          </h2>
          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-4">
            See how our Pay on Delivery services have transformed businesses and
            delighted customers
          </p>
        </div>

        <div className="relative group">
          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-10">
            <button
              onClick={prevSlide}
              className="transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-auto p-2 sm:p-3 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-auto p-2 sm:p-3 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={slideRef}
              className="flex transition-transform duration-400 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2 sm:px-4 ${getTransitionClass(
                    index
                  )}`}
                >
                  <Card className="bg-white dark:bg-neutral-800 h-full transform transition-transform duration-300 hover:scale-102">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <QuoteIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 animate-fade-in" />
                        <div className="flex animate-fade-in">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 italic mb-4 animate-fade-in line-clamp-4">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center border-t border-neutral-200 dark:border-neutral-700 pt-3 sm:pt-4 animate-fade-in">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                          <span className="text-indigo-600 dark:text-indigo-400 text-sm sm:text-base font-semibold">
                            {testimonial.author[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-6 sm:mt-8">
            {[...Array(maxSlideIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-6 sm:w-8 bg-indigo-500"
                    : "w-1.5 sm:w-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-indigo-300 dark:hover:bg-indigo-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
