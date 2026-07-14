export type SeasonCampaign = {
  message: string;
  cta: string;
};

export function getSeasonCampaign(month = new Date().getMonth() + 1): SeasonCampaign {
  if (month >= 6 && month <= 8)
    return {
      message: "Karkidaka Chikitsa Season — Monsoon Detox & Rejuvenation",
      cta: "Book Now",
    };
  if (month >= 9 && month <= 11)
    return {
      message: "Sharad Ritucharya — Seasonal Rejuvenation Packages",
      cta: "Enquire",
    };
  if (month === 12 || month <= 2)
    return {
      message: "Winter Wellness with Classical Ayurvedic Medicines",
      cta: "Book Now",
    };
  return {
    message: "Summer Cooling Therapies — Beat the Heat the Ayurvedic Way",
    cta: "Enquire",
  };
}
