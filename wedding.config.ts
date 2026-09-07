export interface WeddingConfig {
  couple: {
    partner1: string;
    partner2: string;
    ampersand: string;
    fullName: string;
  };
  event: {
    date: string;
    time: string;
    targetIsoDate: string; // ISO format with timezone for countdown
    tagline: string;
    saveTheDateBadge: string;
  };
  location: {
    venueNameAr: string;
    hallNameAr?: string;
    areaAr: string;
    areaEn: string;
    arrivalNote: string;
    mapUrl: string;
    venueImage: string;
  };
  splash: {
    type: "curtain" | "envelope";
    inviteIntroText: string;
  };
  music: {
    src: string;
    title?: string;
  };
  gallery: Array<{
    src: string;
    label: string;
    className: string;
    objectPosition?: string;
  }>;
  schedule: Array<{
    time: string;
    title: string;
    detail: string;
    flower: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  metadata: {
    title: string;
    description: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    partner1: "SALMA",
    partner2: "SOLIMAN",
    ampersand: "&",
    fullName: "Salma & Soliman",
  },
  event: {
    date: "4 October 2026",
    time: "7:00 PM",
    targetIsoDate: "2026-10-04T19:00:00+03:00",
    tagline: "ARE GETTING MARRIED!",
    saveTheDateBadge: "SAVE THE DATE",
  },
  location: {
    venueNameAr: "منتجع عين الحياة",
    hallNameAr: "حديقة سي جاردن (Sea Garden)",
    areaAr: "الفسطاط، القاهرة",
    areaEn: "Old Cairo, Cairo",
    arrivalNote: "Please arrive by 7:00 PM to celebrate with us.",
    mapUrl: "https://maps.app.goo.gl/Ee7Ma56UQczQacxb8?g_st=ic",
    venueImage: "/life_eye_resort_see_garden.jpg",
  },
  splash: {
    type: "curtain", // Curtain opening requested for Salma & Soliman
    inviteIntroText: "You are joyfully invited to the wedding of",
  },
  music: {
    src: "/Kadeyet Am Ahmed.mp3",
    title: "Wedding Song",
  },
  gallery: [], // No photo gallery for this invitation
  schedule: [
    {
      time: "7:00 PM",
      title: "Entrance",
      detail: "Welcoming guests as everyone arrives and takes their seats.",
      flower: "#fce7ea",
    },
    {
      time: "7:30 PM",
      title: "Starting Wedding",
      detail: "The celebration and first dance begin under the night sky.",
      flower: "#f7d6dc",
    },
    {
      time: "9:30 PM",
      title: "Buffet",
      detail: "Open-air dinner buffet and celebrating with family and friends.",
      flower: "#ffffff",
    },
  ],
  faqs: [
    {
      question: "Is there parking at the venue?",
      answer: "Yes! Spacious and convenient parking is available at Life Eye Resort for all guests.",
    },
    {
      question: "Are children welcome at the celebration?",
      answer: "We love your little ones! Children are warmly welcomed to celebrate with us.",
    },
    {
      question: "When should I arrive?",
      answer: "Please arrive by 7:00 PM so we can start the celebration together on time.",
    },
  ],
  metadata: {
    title: "Salma & Soliman — Wedding Invitation",
    description: "You are joyfully invited to the wedding celebration of Salma & Soliman on 4 October 2026 at Life Eye Resort (Sea Garden).",
  },
};

export default weddingConfig;
