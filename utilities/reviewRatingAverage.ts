import { Review } from "@prisma/client";

export const reviewRatingAverage = (reviews: Review[]) => {
  if (reviews?.length === 0) return "N/A";
  return (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
};
