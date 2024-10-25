import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, QuoteIcon } from "lucide-react";

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  rating,
  imageUrl,
}) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Header with Quote Icon and Rating */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
          <QuoteIcon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 italic leading-relaxed">
            "{quote}"
          </p>
        </div>

        {/* Author Information */}
        <div className="flex flex-col sm:flex-row sm:items-center pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-700 gap-3 sm:gap-0">
          {imageUrl ? (
            <div className="sm:mr-4">
              <img
                src={imageUrl}
                alt={author}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center sm:mr-4">
              <span className="text-indigo-600 dark:text-indigo-400 text-base sm:text-lg font-semibold">
                {author.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
              {author}
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {role}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
