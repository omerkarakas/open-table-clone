import React from "react";

import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { reviewRatingAverage } from "../../utilities/reviewRatingAverage";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const reviewRating = rating || Number(reviewRatingAverage(reviews));

  const renderStars = (): React.ReactNode => {
    const stars = [];
    let i = 1;
    while (i <= reviewRating) {
      stars.push(fullStar);
      i++;
    }

    while (i <= 5) {
      let decimalValue = i - reviewRating;
      if (decimalValue < 0.2) {
        stars.push(emptyStar);
      } else if (decimalValue >= 0.2 && decimalValue < 0.7) {
        stars.push(halfStar);
      } else if (decimalValue >= 0.7 && decimalValue < 1) {
        stars.push(fullStar);
      } else stars.push(emptyStar);
      i++;
    }
    // console.log("stars:", stars);
    return stars.map((star) => <Image src={star} alt="" className="w-4 h-4 mr-1" />);
  };

  console.log("rating:", rating, isNaN(reviewRating) ? "NaN" : rating);
  return (
    <div
      title={isNaN(reviewRating) ? "No reviews" : reviewRating.toFixed(1)}
      className="flex items-center"
    >
      {renderStars()}
    </div>
  );
};

export default Stars;
