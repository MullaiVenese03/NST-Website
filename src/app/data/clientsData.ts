import type { MediaSlug } from "../utils/media";

export type ClientCategory = "All Clients" | "Academic" | "Enterprises";

export type ClientProgram = {
  id: number;
  mediaSlug: MediaSlug;
  institution: string;
  category: ClientCategory;
  label: string;
  desc: string;
  participants: string;
};

export const CLIENT_PROGRAMS: ClientProgram[] = [
  {
    id: 1,
    mediaSlug: "testimonial-st-joseph-1",
    institution: "St. Joseph College for Women",
    category: "Academic",
    label: "Cybersecurity Awareness Program",
    desc: "Happy to conduct a cybersecurity awareness session for students, where we discussed common cyber threats, online safety habits, and simple steps everyone can follow to stay secure in their daily digital life.",
    participants: "500+ Students",
  },
  {
    id: 2,
    mediaSlug: "testimonial-cppm-college",
    institution: "CPPM College, Hosur",
    category: "Academic",
    label: "Cybersecurity Awareness Program",
    desc: "Delivered an awareness program focused on digital safety, cyber hygiene, and common mistakes people make online. The session helped students understand how small actions can prevent bigger cyber problems.",
    participants: "300+ Students",
  },
  {
    id: 3,
    mediaSlug: "testimonial-st-joseph-2",
    institution: "St. Joseph College for Women",
    category: "Academic",
    label: "Cybersecurity Seminar",
    desc: "Presented a seminar covering the basics of cybersecurity, real-world cyber attack examples, and career paths in the field. The goal was to make cybersecurity easy to understand and relatable for students.",
    participants: "500+ Students",
  },
  {
    id: 4,
    mediaSlug: "testimonial-st-joseph-mou",
    institution: "St. Joseph College for Women",
    category: "Academic",
    label: "MoU Signing",
    desc: "Proud to sign a Memorandum of Understanding to support cybersecurity training, hands-on learning, and collaboration between industry and students for future skill development.",
    participants: "MoU Partnership",
  },
  {
    id: 5,
    mediaSlug: "testimonial-tn-police",
    institution: "Tamil Nadu Police, Hosur",
    category: "Enterprises",
    label: "Law Enforcement Training",
    desc: "Conducted a cybersecurity training session for law enforcement personnel, focusing on cybercrime awareness, basic digital investigation concepts, and understanding online threats more effectively.",
    participants: "20+ Officers",
  },
  {
    id: 6,
    mediaSlug: "testimonial-dhanalakshmi-mou",
    institution: "Dhanalakshmi Srinivasan College",
    category: "Academic",
    label: "MoU & Academic Collaboration",
    desc: "Happy to sign an MoU with Dhanalakshmi Srinivasan College, Perambalur, to promote cybersecurity awareness, practical learning, and industry-focused skill development for students.",
    participants: "MoU Partnership",
  },
  {
    id: 7,
    mediaSlug: "testimonial-solamalai-bos",
    institution: "Solamalai College of Engineering",
    category: "Academic",
    label: "Internship Training & Board of Studies",
    desc: "Internship training at Solamalai College of Engineering under the IBM SkillsBuild program, implemented by ICT Academy. Proud to serve as a member of the Board of Studies (BoS), supporting advanced IT skills and industry-aligned learning for students.",
    participants: "Board of Studies (BoS)",
  },
  {
    id: 8,
    mediaSlug: "testimonial-st-joseph-bos",
    institution: "St. Joseph College for Women",
    category: "Academic",
    label: "Board of Studies (BoS)",
    desc: "Serving on the Board of Studies at St. Joseph College for Women, where we help shape curriculum, introduce new cybersecurity topics, and ensure students get the best, most updated security knowledge for their future careers.",
    participants: "Board of Studies (BoS)",
  },
  {
    id: 9,
    mediaSlug: "testimonial-akshaya-workshop",
    institution: "Akshaya College of Engineering",
    category: "Academic",
    label: "Cybersecurity Workshop",
    desc: "Conducted a cybersecurity workshop at Akshaya College of Engineering for students in the computer lab, covering practical threats, safe online habits, and how to build stronger security awareness in everyday digital work.",
    participants: "500+ Students",
  },
  {
    id: 10,
    mediaSlug: "testimonial-st-joseph-collage",
    institution: "St. Joseph College for Women",
    category: "Academic",
    label: "Keynote Speaker – 2026 Digital Conference",
    desc: "St. Joseph College invited us as a keynote speaker for the 2026 Digital Conference, where we shared insights on emerging cyber threats, digital resilience strategies, and the future of cybersecurity in an increasingly connected world.",
    participants: "50+ Students",
  },
];

const PARTNER_INSTITUTION_COUNT = new Set(
  CLIENT_PROGRAMS.map((p) => p.institution)
).size;

export const LEARNERS_REACHED_LABEL = "1,800+";

export const CLIENT_IMPACT_STATS = [
  { value: `${PARTNER_INSTITUTION_COUNT}+`, label: "Partner Institutions" },
  { value: LEARNERS_REACHED_LABEL, label: "Learners Reached" },
  { value: `${CLIENT_PROGRAMS.length}+`, label: "Programs Delivered" },
  { value: "3", label: "Sectors Served" },
] as const;

export const EDTECH_IMPACT_STATS = [
  { val: LEARNERS_REACHED_LABEL, label: "Students Trained" },
  { val: `${PARTNER_INSTITUTION_COUNT}+`, label: "Partner Institutions" },
  { val: "100+", label: "Live Projects" },
] as const;
