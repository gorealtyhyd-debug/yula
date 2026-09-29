export type Facing = 'E' | 'W';

export const RATES: Record<Facing, { otp: number; eoi: number }> = {
  E: { otp: 8999, eoi: 10999 },
  W: { otp: 8499, eoi: 10499 },
};

export const inr = (n: number) => n.toLocaleString('en-IN');
export const crore = (bua: number, rate: number) => `₹${((bua * rate) / 1e7).toFixed(2)} Cr`;

export interface Plan { label: string; src: string }
export interface Variant { plot: string; bua: number; render: string; plans: Plan[] }
export interface VillaType { size: number; E?: Variant; W?: Variant }

const plan = (size: number, f: 'east' | 'west', floor: 'ground' | 'first' | 'second'): Plan => ({
  label: `${floor[0].toUpperCase()}${floor.slice(1)} Floor`,
  src: `/assets/images/plans/${size}-${f}-${floor}.jpg`,
});
const render = (size: number, f: 'east' | 'west') => `/assets/images/villas/villa-${size}-${f}.jpg`;

export const VILLAS: VillaType[] = [
  {
    size: 267,
    E: { plot: '18.3 × 12.2 m', bua: 4120.6, render: render(267, 'east'), plans: [plan(267, 'east', 'ground'), plan(267, 'east', 'first'), plan(267, 'east', 'second')] },
    W: { plot: '18.3 × 12.3 m', bua: 4052.6, render: render(267, 'west'), plans: [plan(267, 'west', 'ground'), plan(267, 'west', 'first'), plan(267, 'west', 'second')] },
  },
  {
    size: 300,
    E: { plot: '20.63 × 12.2 m', bua: 4817.4, render: render(300, 'east'), plans: [plan(300, 'east', 'first'), plan(300, 'east', 'second')] },
    W: { plot: '20.63 × 12.3 m', bua: 4659.2, render: render(300, 'west'), plans: [plan(300, 'west', 'second')] },
  },
  {
    size: 325,
    E: { plot: '20.63 × 13.17 m', bua: 5321.5, render: render(325, 'east'), plans: [plan(325, 'east', 'ground'), plan(325, 'east', 'first'), plan(325, 'east', 'second')] },
    W: { plot: '20.63 × 13.17 m', bua: 5109.5, render: render(325, 'west'), plans: [plan(325, 'west', 'ground'), plan(325, 'west', 'second')] },
  },
  {
    size: 450,
    E: { plot: '23.17 × 16.23 m', bua: 6662.4, render: render(450, 'east'), plans: [plan(450, 'east', 'ground')] },
    W: { plot: '23.17 × 16.24 m', bua: 6400.0, render: render(450, 'west'), plans: [plan(450, 'west', 'ground')] },
  },
  { size: 500, E: { plot: '23.17 × 18.04 m', bua: 7322.3, render: render(500, 'east'), plans: [plan(500, 'east', 'ground'), plan(500, 'east', 'first'), plan(500, 'east', 'second')] } },
  { size: 597, E: { plot: '27.28 × 18.3 m', bua: 7854.8, render: render(597, 'east'), plans: [plan(597, 'east', 'ground')] } },
];

export const MATRIX: { facing: Facing; label: string; plot: string; sqyd: number; bua: number }[] = [
  { facing: 'E', label: 'East', plot: '18.3 × 12.2', sqyd: 267, bua: 4120.6 },
  { facing: 'W', label: 'West', plot: '18.3 × 12.3', sqyd: 267, bua: 4052.6 },
  { facing: 'E', label: 'East', plot: '20.63 × 12.2', sqyd: 300, bua: 4817.4 },
  { facing: 'W', label: 'West', plot: '20.63 × 12.3', sqyd: 300, bua: 4659.2 },
  { facing: 'E', label: 'East', plot: '20.63 × 13.17', sqyd: 325, bua: 5321.5 },
  { facing: 'W', label: 'West', plot: '20.63 × 13.17', sqyd: 325, bua: 5109.5 },
  { facing: 'E', label: 'East', plot: '23.17 × 16.23', sqyd: 450, bua: 6662.4 },
  { facing: 'W', label: 'West', plot: '23.17 × 16.24', sqyd: 450, bua: 6400.0 },
  { facing: 'E', label: 'East', plot: '23.17 × 18.04', sqyd: 500, bua: 7322.3 },
  { facing: 'E', label: 'East', plot: '27.28 × 18.3', sqyd: 597, bua: 7854.8 },
  { facing: 'E', label: 'East (odd)', plot: '18.74 × 13.42', sqyd: 300, bua: 4814.2 },
  { facing: 'W', label: 'West (odd)', plot: '21.33 × 11.8', sqyd: 300, bua: 4814.2 },
];

export const minPrice = (size: number) => {
  const v = VILLAS.find((t) => t.size === size)!;
  return Math.min(...(['E', 'W'] as Facing[]).filter((f) => v[f]).map((f) => (v[f]!.bua * RATES[f].otp) / 1e7));
};

export const AMENITIES = [
  'Parking', 'Banquet Halls (2)', 'Grocery Store', 'Reception & Pre-function', 'Banquet Dining',
  'Café & Juice Bar', 'Kids’ Pool', 'Swimming Pool', 'Yoga Room', 'Activity Room', 'Gym', 'Indoor Games',
  'Badminton', 'Pilates & Fitness Studio', 'Gentlemen’s Room', 'Treatment Room', 'Salon', 'Store', 'Lounge', 'Guest Rooms',
];

const C = (n: string) => `/assets/images/clubhouse/${n}.jpg`;
export const CLUB_SLIDES = [
  { t: 'The Clubhouse', src: C('clubhouse-exterior'), tag: 'Basement + Ground + 3', d: 'A five-level private clubhouse set within its own landscaped green, reserved for Yula residents.' },
  { t: 'Swimming & kids’ pool', src: C('swimming-pool'), tag: 'Ground floor', d: 'A resort-style lap pool with a dedicated kids’ pool and sun deck.' },
  { t: 'Banquet halls', src: C('banquet-hall'), tag: 'Ground floor', d: 'Two banquet halls with banquet dining and a pre-function lounge for celebrations at home.' },
  { t: 'Reception & lounge', src: C('reception-lounge'), tag: 'Ground floor', d: 'A warm, hotel-style arrival with concierge reception and lounge seating.' },
  { t: 'Café & juice bar', src: C('cafe-juice-bar'), tag: 'Ground floor', d: 'An all-day café and juice bar for slow mornings and easy evenings.' },
  { t: 'Grocery store', src: C('grocery-store'), tag: 'Ground floor', d: 'Daily essentials a short walk from your door.' },
  { t: 'Gym', src: C('gym'), tag: 'First floor', d: 'A fully equipped fitness floor for strength and cardio training.' },
  { t: 'Yoga room', src: C('yoga-room'), tag: 'First floor', d: 'A calm, light-filled studio for yoga, meditation and activity sessions.' },
  { t: 'Indoor games', src: C('indoor-games'), tag: 'Second floor', d: 'Billiards, foosball and table games in a relaxed social lounge.' },
  { t: 'Indoor badminton', src: C('indoor-badminton'), tag: 'Second floor', d: 'A professional-grade indoor badminton court.' },
  { t: 'Pilates & fitness studio', src: C('pilates-studio'), tag: 'Second floor', d: 'Reformer pilates and group fitness in a dedicated studio.' },
  { t: 'Gentlemen’s room', src: C('gentlemens-room'), tag: 'Second floor', d: 'A private retreat for conversation, cards and quiet evenings.' },
  { t: 'Salon & spa', src: C('salon'), tag: 'Third floor', d: 'Salon and treatment rooms for grooming and wellness.' },
  { t: 'Guest rooms', src: C('guest-rooms'), tag: 'Third floor', d: 'Well-appointed suites for visiting family and friends.' },
  { t: 'Lounge', src: C('lounge'), tag: 'Third floor', d: 'An elegant lounge for residents to unwind and entertain.' },
  { t: 'Parking', src: C('basement-parking'), tag: 'Basement', d: 'Dedicated basement parking for clubhouse visitors.' },
];

export const GALLERY = [
  { t: 'Villa Elevation', src: render(597, 'east'), col: 2, row: 2 },
  { t: 'The Clubhouse', src: C('clubhouse-view'), col: 1, row: 1 },
  { t: 'Streetscape', src: render(450, 'east'), col: 1, row: 1 },
  { t: 'Swimming Pool', src: C('swimming-pool'), col: 1, row: 2 },
  { t: 'Banquet Hall', src: C('banquet-hall'), col: 1, row: 1 },
  { t: 'Reception', src: C('reception-lounge'), col: 1, row: 1 },
  { t: 'Clubhouse at Dusk', src: C('clubhouse-dusk'), col: 2, row: 1 },
  { t: 'Gym', src: C('gym'), col: 1, row: 1 },
  { t: 'Lounge', src: C('lounge'), col: 1, row: 1 },
  { t: 'Villa Row', src: render(300, 'east'), col: 2, row: 1 },
];

export const FAQS = [
  { q: 'Where is Hallmark Yula located?', a: 'Hallmark Yula is located at Patighanpur, Hyderabad, Telangana.' },
  { q: 'How many villas are there in Hallmark Yula?', a: 'Hallmark Yula has 183 independent villas planned across 22.26 acres, with an 18 m central boulevard, 12 m internal roads and landscaped open spaces.' },
  { q: 'What villa sizes are available?', a: 'Plots of 267, 300, 325, 450, 500 and 597 sq. yds in east and west facing options, with built-up areas from 4,052 sft to 7,855 sft. Every villa is G+2 with a private lift and terrace.' },
  { q: 'What is the price of villas at Hallmark Yula?', a: 'One-time payment (OTP) pricing is ₹8,999 per sft for east facing and ₹8,499 per sft for west facing villas. EOI pricing is ₹10,999 per sft (east) and ₹10,499 per sft (west). Villas start from approximately ₹3.44 Cr on built-up area; taxes and charges extra.' },
  { q: 'What amenities does the clubhouse offer?', a: 'A five-level (Basement + Ground + 3) clubhouse with 20 amenities including a swimming pool and kids’ pool, two banquet halls, café and juice bar, grocery store, gym, yoga room, indoor badminton, pilates studio, indoor games, salon, spa, lounge and guest rooms.' },
];
