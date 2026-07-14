export type Condition = {
  name: string;
  nameMl: string;
  icon: string;
  highlight?: boolean;
};

export const conditions: Condition[] = [
  { name: "Snakebite & Envenomation", nameMl: "പാമ്പുകടി", icon: "Shield", highlight: true },
  { name: "Scorpion Sting", nameMl: "തേൾ കുത്ത്", icon: "Bug", highlight: true },
  { name: "Spider & Insect Bites", nameMl: "ചിലന്തി / പ്രാണി കടി", icon: "Bug" },
  { name: "Arthritis & Joint Pain", nameMl: "സന്ധിവാതം", icon: "Bone" },
  { name: "Paralysis", nameMl: "പക്ഷാഘാതം", icon: "Brain" },
  { name: "Back & Spine Disorders", nameMl: "നടുവേദന", icon: "PersonStanding" },
  { name: "Skin Diseases", nameMl: "ത്വക് രോഗങ്ങൾ", icon: "Flower2" },
  { name: "Digestive Disorders", nameMl: "ദഹന പ്രശ്നങ്ങൾ", icon: "Leaf" },
  { name: "Respiratory Ailments", nameMl: "ശ്വാസകോശ രോഗങ്ങൾ", icon: "Wind" },
  { name: "Stress & Insomnia", nameMl: "മാനസിക സമ്മർദ്ദം", icon: "Moon" },
  { name: "Diabetes Management", nameMl: "പ്രമേഹം", icon: "Droplet" },
  { name: "Lifestyle Disorders", nameMl: "ജീവിതശൈലീ രോഗങ്ങൾ", icon: "Scale" },
  { name: "Women's Health", nameMl: "സ്ത്രീ ആരോഗ്യം", icon: "Flower" },
  { name: "General Rejuvenation", nameMl: "പുനരുജ്ജീവനം", icon: "Leaf" },
];
