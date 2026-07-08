// Realistic Bangla mock data for BariLagbe (বাড়িলাগবে)
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

export const IMAGES = [p1, p2, p3];

export const DIVISIONS = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ"];
export const DISTRICTS: Record<string, string[]> = {
  "ঢাকা": ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "সাভার"],
  "চট্টগ্রাম": ["চট্টগ্রাম", "কক্সবাজার", "কুমিল্লা"],
  "সিলেট": ["সিলেট", "মৌলভীবাজার"],
  "রাজশাহী": ["রাজশাহী", "বগুড়া"],
  "খুলনা": ["খুলনা", "যশোর"],
  "বরিশাল": ["বরিশাল"],
  "রংপুর": ["রংপুর", "দিনাজপুর"],
  "ময়মনসিংহ": ["ময়মনসিংহ"],
};
export const THANAS = ["ধানমন্ডি", "উত্তরা", "গুলশান", "বনানী", "মিরপুর", "মোহাম্মদপুর", "বসুন্ধরা", "মহাখালী", "বাড্ডা", "রামপুরা"];
export const AREAS = ["রোড ১১", "রোড ২৭", "সেক্টর ৪", "সেক্টর ৭", "সাত মসজিদ রোড", "কলাবাগান", "ব্লক এ", "ব্লক বি"];
export const PROPERTY_TYPES = ["ফ্ল্যাট", "বাড়ি", "অফিস", "দোকান"] as const;

export type PropertyType = typeof PROPERTY_TYPES[number];

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  division: string;
  district: string;
  thana: string;
  area: string;
  address: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  parking: boolean;
  verified: boolean;
  available: boolean;
  featured: boolean;
  popularity: number;
  createdAt: string;
  availableFrom: string;
  ownerId: string;
  images: string[];
  amenities: string[];
  rules: string[];
  description: string;
  lat: number;
  lng: number;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  nid: string;
  bank: string;
  accountNo: string;
  joinedAt: string;
  propertyIds: string[];
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  nid: string;
  occupation: string;
  monthlyIncome: number;
  propertyId?: string;
  rentDueMonths: number;
  moveInDate?: string;
  status: "active" | "pending" | "past";
}

export interface Application {
  id: string;
  tenantId: string;
  propertyId: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected" | "in_review";
  monthlyIncome: number;
  employment: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  visitorName: string;
  phone: string;
  date: string;
  time: string;
  staffId?: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface RentPayment {
  id: string;
  tenantId: string;
  propertyId: string;
  month: string; // YYYY-MM
  amount: number;
  paidAt?: string;
  status: "paid" | "pending" | "overdue";
}

export interface Notification {
  id: string;
  type: "rent_due" | "visit_approved" | "application_submitted" | "application_approved" | "legal_notice" | "document_verified";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
}

export interface Advocate {
  id: string;
  name: string;
  phone: string;
  city: string;
  specialty: string;
  rating: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  from: string;
  status: "open" | "resolved" | "in_progress";
  createdAt: string;
}

// Deterministic PRNG so results are stable across renders
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
const range = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const bnDigit = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
export const bn = bnDigit;

const NAMES_M = ["মোঃ রফিকুল ইসলাম", "আরিফ হোসেন", "কামাল উদ্দিন", "সাইফুল ইসলাম", "নাসির আহমেদ", "তানভীর রহমান", "হাসান মাহমুদ", "জাহিদ হাসান", "মামুন অর রশিদ", "শাহরিয়ার কবির"];
const NAMES_F = ["ফাতেমা বেগম", "রেহানা আক্তার", "সালমা খাতুন", "নাজমা সুলতানা", "শারমিন আক্তার", "মৌসুমী রহমান"];
const OCCUPATIONS = ["সরকারি চাকরি", "বেসরকারি চাকরি", "ব্যবসা", "শিক্ষক", "ডাক্তার", "প্রকৌশলী", "ফ্রিল্যান্সার", "ব্যাংকার"];
const AMENITIES = ["লিফট", "জেনারেটর", "নিরাপত্তা", "সিসিটিভি", "পার্কিং", "গ্যাস", "লন্ড্রি", "বারান্দা", "গিজার", "ইন্টারনেট"];
const RULES = ["ধূমপান নিষেধ", "পোষা প্রাণী নিষেধ", "রাত ১০টার পর নীরবতা", "পরিবার শুধুমাত্র", "বিবাহিত পছন্দনীয়"];

function makePhone() {
  return "০১" + pick(["৭", "৮", "৯"]) + bnDigit(range(10000000, 99999999));
}

export const OWNERS: Owner[] = Array.from({ length: 20 }, (_, i) => ({
  id: `own-${i + 1}`,
  name: pick([...NAMES_M, ...NAMES_F]),
  phone: makePhone(),
  email: `owner${i + 1}@barilagbe.com.bd`,
  nid: bnDigit(String(1990000000000 + i)),
  bank: pick(["ডাচ-বাংলা ব্যাংক", "ব্র্যাক ব্যাংক", "ইসলামী ব্যাংক", "সিটি ব্যাংক", "প্রাইম ব্যাংক"]),
  accountNo: bnDigit(String(1000000000000 + i * 137)),
  joinedAt: new Date(2024, range(0, 11), range(1, 28)).toISOString(),
  propertyIds: [],
}));

export const PROPERTIES: Property[] = Array.from({ length: 50 }, (_, i) => {
  const division = pick(DIVISIONS);
  const district = pick(DISTRICTS[division] || [division]);
  const thana = pick(THANAS);
  const area = pick(AREAS);
  const type = pick(PROPERTY_TYPES);
  const bedrooms = type === "দোকান" ? 0 : range(1, 4);
  const bathrooms = type === "দোকান" ? 1 : Math.max(1, bedrooms - range(0, 1));
  const rent = range(8, 60) * 1000;
  const sqft = range(500, 2200);
  const ownerId = OWNERS[i % OWNERS.length].id;
  OWNERS[i % OWNERS.length].propertyIds.push(`prop-${i + 1}`);
  return {
    id: `prop-${i + 1}`,
    title: `${bnDigit(bedrooms)} বেডরুম ${type} — ${thana}`,
    type,
    division,
    district,
    thana,
    area,
    address: `${area}, ${thana}, ${district}`,
    rent,
    bedrooms,
    bathrooms,
    sqft,
    parking: rand() > 0.4,
    verified: rand() > 0.15,
    available: rand() > 0.25,
    featured: i < 8,
    popularity: range(10, 500),
    createdAt: new Date(2025, range(0, 11), range(1, 28)).toISOString(),
    availableFrom: new Date(2026, range(0, 6), range(1, 28)).toISOString(),
    ownerId,
    images: [IMAGES[i % 3], IMAGES[(i + 1) % 3], IMAGES[(i + 2) % 3]],
    amenities: AMENITIES.filter(() => rand() > 0.4).slice(0, 6),
    rules: RULES.filter(() => rand() > 0.5).slice(0, 3),
    description: `${area} এর প্রাণকেন্দ্রে অবস্থিত সুন্দর ও পরিপাটি ${type}। প্রশস্ত রুম, ভালো আলো-বাতাস, নিরাপদ পরিবেশ। স্কুল, বাজার ও হাসপাতাল কাছে।`,
    lat: 23.7 + rand() * 0.2,
    lng: 90.3 + rand() * 0.3,
  };
});

export const TENANTS: Tenant[] = Array.from({ length: 100 }, (_, i) => {
  const propertyId = i < 60 ? PROPERTIES[i % PROPERTIES.length].id : undefined;
  const rentDueMonths = i < 60 ? (i < 5 ? 3 : i < 15 ? range(1, 2) : 0) : 0;
  return {
    id: `ten-${i + 1}`,
    name: pick([...NAMES_M, ...NAMES_F]),
    phone: makePhone(),
    email: `tenant${i + 1}@mail.com`,
    nid: bnDigit(String(1995000000000 + i)),
    occupation: pick(OCCUPATIONS),
    monthlyIncome: range(25, 150) * 1000,
    propertyId,
    rentDueMonths,
    moveInDate: propertyId ? new Date(2025, range(0, 11), range(1, 28)).toISOString() : undefined,
    status: propertyId ? "active" : "pending",
  };
});

export const APPLICATIONS: Application[] = Array.from({ length: 30 }, (_, i) => ({
  id: `app-${i + 1}`,
  tenantId: TENANTS[i].id,
  propertyId: PROPERTIES[i % PROPERTIES.length].id,
  submittedAt: new Date(2026, range(0, 6), range(1, 28)).toISOString(),
  status: pick(["pending", "approved", "rejected", "in_review"] as const),
  monthlyIncome: TENANTS[i].monthlyIncome,
  employment: TENANTS[i].occupation,
}));

export const VISITS: Visit[] = Array.from({ length: 40 }, (_, i) => {
  const daysOffset = range(-15, 20);
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return {
    id: `vis-${i + 1}`,
    propertyId: PROPERTIES[i % PROPERTIES.length].id,
    visitorName: pick([...NAMES_M, ...NAMES_F]),
    phone: makePhone(),
    date: d.toISOString().slice(0, 10),
    time: pick(["১০:০০", "১১:৩০", "০২:০০", "০৩:৩০", "০৫:০০"]),
    staffId: `staff-${range(1, 5)}`,
    status: daysOffset < 0 ? "completed" : "upcoming",
  };
});

export const RENT_PAYMENTS: RentPayment[] = TENANTS.filter((t) => t.propertyId).flatMap((t) => {
  const months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07"];
  return months.map((m, idx) => {
    const property = PROPERTIES.find((p) => p.id === t.propertyId)!;
    const isDue = idx >= months.length - t.rentDueMonths;
    return {
      id: `pay-${t.id}-${m}`,
      tenantId: t.id,
      propertyId: t.propertyId!,
      month: m,
      amount: property.rent,
      paidAt: isDue ? undefined : new Date(m + "-05").toISOString(),
      status: isDue ? (t.rentDueMonths >= 3 ? "overdue" : "pending") : "paid",
    } as RentPayment;
  });
});

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "rent_due", title: "ভাড়া বাকি", message: "জুলাই মাসের ভাড়া এখনো পরিশোধ হয়নি।", createdAt: new Date(Date.now() - 3600e3).toISOString(), read: false, link: "/dashboard/tenant" },
  { id: "n2", type: "visit_approved", title: "ভিজিট অনুমোদিত", message: "আপনার বাসা ভিজিট নিশ্চিত করা হয়েছে।", createdAt: new Date(Date.now() - 2 * 3600e3).toISOString(), read: false, link: "/visits" },
  { id: "n3", type: "application_submitted", title: "আবেদন জমা", message: "আপনার ভাড়া আবেদন সফলভাবে জমা হয়েছে।", createdAt: new Date(Date.now() - 5 * 3600e3).toISOString(), read: true },
  { id: "n4", type: "application_approved", title: "আবেদন অনুমোদিত", message: "অভিনন্দন! আপনার আবেদন গৃহীত হয়েছে।", createdAt: new Date(Date.now() - 24 * 3600e3).toISOString(), read: true },
  { id: "n5", type: "legal_notice", title: "আইনি নোটিশ", message: "তিন মাসের বকেয়া ভাড়ার জন্য নোটিশ প্রস্তুত।", createdAt: new Date(Date.now() - 48 * 3600e3).toISOString(), read: false, link: "/dashboard/admin" },
  { id: "n6", type: "document_verified", title: "ডকুমেন্ট যাচাই", message: "আপনার এনআইডি সফলভাবে যাচাই হয়েছে।", createdAt: new Date(Date.now() - 72 * 3600e3).toISOString(), read: true },
];

export const ADVOCATES: Advocate[] = Array.from({ length: 8 }, (_, i) => ({
  id: `adv-${i + 1}`,
  name: `অ্যাডভোকেট ${pick(NAMES_M)}`,
  phone: makePhone(),
  city: pick(DIVISIONS),
  specialty: pick(["বাড়ি ভাড়া আইন", "সম্পত্তি আইন", "দেওয়ানী মামলা", "চুক্তি আইন"]),
  rating: 3 + rand() * 2,
}));

export const STAFF: Staff[] = Array.from({ length: 6 }, (_, i) => ({
  id: `staff-${i + 1}`,
  name: pick([...NAMES_M, ...NAMES_F]),
  role: pick(["ফিল্ড এজেন্ট", "ভিজিট কোঅর্ডিনেটর", "সাপোর্ট", "ম্যানেজার"]),
  phone: makePhone(),
}));

export const TICKETS: SupportTicket[] = Array.from({ length: 12 }, (_, i) => ({
  id: `tk-${i + 1}`,
  subject: pick(["পানি সমস্যা", "লিফট নষ্ট", "ভাড়ার হিসাব", "চুক্তির প্রশ্ন", "নিরাপত্তা"]),
  from: pick([...NAMES_M, ...NAMES_F]),
  status: pick(["open", "resolved", "in_progress"] as const),
  createdAt: new Date(Date.now() - i * 86400e3).toISOString(),
}));

// Helpers
export const getProperty = (id: string) => PROPERTIES.find((p) => p.id === id);
export const getOwner = (id: string) => OWNERS.find((o) => o.id === id);
export const getTenant = (id: string) => TENANTS.find((t) => t.id === id);
