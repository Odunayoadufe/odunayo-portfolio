import { useState } from "react";
import { ReviewCarousel } from "./ReviewCarousel";
import { ReviewForm } from "./ReviewForm";

export const ReviewSection = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSubmitted = () => {
    // Force refresh the carousel by changing the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <section className="py-20 px-4 review-bg-container bg-gradient-to-br from-background via-background/50 to-accent/10">
      {/* 3D Background Elements */}
      <div className="review-3d-grid"></div>
      
      {/* Floating Review Orbs */}
      <div className="floating-review-orb"></div>
      <div className="floating-review-orb"></div>
      <div className="floating-review-orb"></div>
      <div className="floating-review-orb"></div>
      
      {/* Floating Particles */}
      <div className="review-particles">
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
        <div className="review-particle"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            What My Clients Say
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Real feedback from real clients who've worked with me
          </p>
          <div className="animate-scale-in">
            <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
          </div>
        </div>

        <div key={refreshKey} className="animate-fade-in">
          <ReviewCarousel />
        </div>
      </div>
    </section>
  );
};