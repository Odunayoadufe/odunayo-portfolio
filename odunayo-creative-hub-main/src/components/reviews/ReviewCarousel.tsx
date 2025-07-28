import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: string;
  client_name: string;
  profile_image_url?: string;
  star_rating: number;
  message: string;
  created_at: string;
}

export const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="text-lg">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Review Count */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Client Reviews</h3>
        <p className="text-muted-foreground">
          Review {currentIndex + 1} of {reviews.length} • Total Reviews: {reviews.length}
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative h-96 perspective-1000">
        <div className="relative w-full h-full preserve-3d">
          {reviews.map((review, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            
            return (
              <div
                key={review.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform-gpu ${
                  isActive
                    ? 'translate-z-0 scale-100 opacity-100'
                    : offset > 0
                    ? 'translate-z-[-200px] translate-x-[300px] scale-75 opacity-30'
                    : 'translate-z-[-200px] translate-x-[-300px] scale-75 opacity-30'
                }`}
                style={{
                  transform: `
                    translateX(${offset * 300}px) 
                    translateZ(${isActive ? 0 : -200}px) 
                    scale(${isActive ? 1 : 0.75})
                    rotateY(${offset * 20}deg)
                  `,
                }}
              >
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg h-full flex flex-col justify-center text-center">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage 
                        src={review.profile_image_url} 
                        alt={review.client_name}
                      />
                      <AvatarFallback className="text-2xl">
                        {review.client_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Client Name */}
                  <h4 className="text-xl font-semibold text-foreground mb-4">
                    {review.client_name}
                  </h4>

                  {/* Star Rating */}
                  <div className="flex justify-center mb-6">
                    {renderStars(review.star_rating)}
                  </div>

                  {/* Review Message */}
                  <blockquote className="text-muted-foreground italic text-lg leading-relaxed">
                    "{review.message}"
                  </blockquote>

                  {/* Date */}
                  <p className="text-sm text-muted-foreground mt-4">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {reviews.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
              onClick={prevReview}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
              onClick={nextReview}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {reviews.length > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};