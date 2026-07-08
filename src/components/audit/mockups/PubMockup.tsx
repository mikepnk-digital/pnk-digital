interface PubMockupProps {
  name: string;
  variant: 'gastropub' | 'classic' | 'village' | 'country' | 'golf';
}

const palettes = {
  gastropub: {
    primary: '#2d5016',
    secondary: '#d4a843',
    bg: '#faf6ef',
    headerBg: '#1a2e0d',
    accent: '#8b4513',
    text: '#2c2c2c',
    textLight: '#666',
    heroBg: 'linear-gradient(135deg, #2d5016 0%, #4a7c29 50%, #2d5016 100%)',
  },
  classic: {
    primary: '#5c1a1a',
    secondary: '#c9a961',
    bg: '#fdf8f0',
    headerBg: '#2e0d0d',
    accent: '#8b6914',
    text: '#2c2c2c',
    textLight: '#666',
    heroBg: 'linear-gradient(135deg, #5c1a1a 0%, #8b3a3a 50%, #5c1a1a 100%)',
  },
  village: {
    primary: '#3d6b35',
    secondary: '#c9a54e',
    bg: '#f5f0e6',
    headerBg: '#1e3517',
    accent: '#8b6e2f',
    text: '#2c2c2c',
    textLight: '#666',
    heroBg: 'linear-gradient(135deg, #3d6b35 0%, #5a9a4e 50%, #3d6b35 100%)',
  },
  country: {
    primary: '#4a3728',
    secondary: '#c4a35a',
    bg: '#faf5ee',
    headerBg: '#2a1f15',
    accent: '#6b8e23',
    text: '#2c2c2c',
    textLight: '#666',
    heroBg: 'linear-gradient(135deg, #4a3728 0%, #7a5f48 50%, #4a3728 100%)',
  },
  golf: {
    primary: '#1a5c3a',
    secondary: '#d4a843',
    bg: '#f0f7f2',
    headerBg: '#0d2e1d',
    accent: '#4a7c29',
    text: '#2c2c2c',
    textLight: '#666',
    heroBg: 'linear-gradient(135deg, #1a5c3a 0%, #2d8b5a 50%, #1a5c3a 100%)',
  },
};

const pubContent: Record<string, {
  tagline: string;
  description: string;
  nav: string[];
  menuItems: { name: string; desc: string; price: string }[];
  features: { title: string; desc: string }[];
  hours: { day: string; hours: string }[];
  address: string;
  phone: string;
}> = {
  'The Wheatsheaf Farnham': {
    tagline: 'Farnham\'s Favourite Gastropub',
    description: 'Exceptional food, fine ales, and a warm welcome in the heart of Farnham. Join us in our beautiful beer garden or cosy dining room.',
    nav: ['Home', 'Menu', 'Book a Table', 'Events', 'Beer Garden', 'Contact'],
    menuItems: [
      { name: 'Pan-Seared Sea Bass', desc: 'Crushed new potatoes, samphire, lemon butter sauce', price: '£18.50' },
      { name: 'Slow-Braised Beef Cheek', desc: 'Creamy mash, roasted root vegetables, red wine jus', price: '£17.95' },
      { name: 'Wild Mushroom Risotto', desc: 'Truffle oil, aged parmesan, rocket salad', price: '£14.50' },
      { name: 'Beer-Battered Fish & Chips', desc: 'Mushy peas, tartare sauce, lemon wedge', price: '£15.95' },
    ],
    features: [
      { title: 'Beer Garden', desc: 'Enjoy our beautiful sun-drenched garden with seating for 60 guests' },
      { title: 'Sunday Roasts', desc: 'Locally sourced joints with all the trimmings, served 12–4pm' },
      { title: 'Private Dining', desc: 'Our upstairs room seats up to 30 for special occasions' },
      { title: 'Live Music', desc: 'Acoustic sessions every Friday evening from 8pm' },
    ],
    hours: [
      { day: 'Monday – Thursday', hours: '11:00 – 23:00' },
      { day: 'Friday – Saturday', hours: '11:00 – 00:00' },
      { day: 'Sunday', hours: '12:00 – 22:30' },
    ],
    address: 'The Wheatsheaf, West Street, Farnham, Surrey GU9 7DR',
    phone: '01252 XXX XXX',
  },
  "The Queen's Head": {
    tagline: 'A Proper Farnham Pub',
    description: 'Real ales, honest food, and genuine hospitality. A traditional pub in the heart of Farnham, welcoming locals and visitors alike.',
    nav: ['Home', 'What\'s On', 'Food & Drink', 'Our Story', 'Find Us'],
    menuItems: [
      { name: 'Ploughman\'s Lunch', desc: 'Mature cheddar, ham, piccalilli, crusty bread', price: '£10.95' },
      { name: 'Steak & Ale Pie', desc: 'Shortcrust pastry, hand-cut chips, seasonal greens', price: '£14.50' },
      { name: 'Beer-Battered Cod', desc: 'Triple-cooked chips, mushy peas, tartare sauce', price: '£13.95' },
      { name: 'Scampi & Chips', desc: 'Wholetail scampi, garden peas, lemon mayo', price: '£12.95' },
    ],
    features: [
      { title: 'Daily Specials', desc: 'Fresh specials board changing daily with seasonal ingredients' },
      { title: 'Quiz Night', desc: 'Test your knowledge every Wednesday from 8pm. Teams welcome!' },
      { title: 'Sky Sports', desc: 'Catch all the big matches on our screens' },
      { title: 'Dog Friendly', desc: 'Well-behaved dogs welcome in the bar area' },
    ],
    hours: [
      { day: 'Monday – Thursday', hours: '11:00 – 23:00' },
      { day: 'Friday – Saturday', hours: '11:00 – 00:00' },
      { day: 'Sunday', hours: '12:00 – 22:30' },
    ],
    address: "The Queen's Head, The Borough, Farnham, Surrey GU9 7ND",
    phone: '01252 XXX XXX',
  },
  'Barley Mow': {
    tagline: 'On Tilford\'s Village Green Since 1765',
    description: 'A quintessential English village pub overlooking the iconic cricket green. Real ales, hearty food, and a warm welcome in beautiful surroundings.',
    nav: ['Home', 'Menu', 'Sunday Roasts', 'The Garden', 'Our Story', 'Contact'],
    menuItems: [
      { name: 'Roast Sirloin of Beef', desc: 'Yorkshire pudding, roast potatoes, seasonal vegetables, gravy', price: '£16.95' },
      { name: 'Pie of the Week', desc: 'Buttery mash, seasonal greens, rich gravy', price: '£14.50' },
      { name: 'Ploughman\'s Board', desc: 'Local cheeses, cured meats, chutney, sourdough', price: '£12.95' },
      { name: 'Pan-Fried Trout', desc: 'New potatoes, green beans, caper butter', price: '£16.50' },
    ],
    features: [
      { title: 'The Village Green', desc: 'Unrivalled views across Tilford\'s famous cricket green' },
      { title: 'Sunday Roasts', desc: 'Three roast options every Sunday, all locally sourced' },
      { title: 'The Pub Garden', desc: 'Spacious garden with children\'s play area and stunning views' },
      { title: 'Walking & Cycling', desc: 'Perfect stop on the Greensand Way and local cycle routes' },
    ],
    hours: [
      { day: 'Monday – Saturday', hours: '11:00 – 23:00' },
      { day: 'Sunday', hours: '12:00 – 22:00' },
      { day: 'Food Served', hours: '12:00 – 14:30, 18:00 – 21:00' },
    ],
    address: 'Barley Mow, Tilford, Farnham, Surrey GU10 2BU',
    phone: '01252 XXX XXX',
  },
  'The Woolpack': {
    tagline: 'Family-Run Country Pub in the Heart of Elstead',
    description: 'Home-cooked seasonal food, local ales, and a genuinely warm welcome. A proper country pub where families, dogs, and friends are always welcome.',
    nav: ['Home', 'Menu', 'Events', 'Families & Dogs', 'About Us', 'Find Us'],
    menuItems: [
      { name: 'Woolpack Burger', desc: 'Locally reared beef, smoked bacon, cheddar, brioche bun', price: '£15.50' },
      { name: 'Seasonal Fish Pie', desc: 'Salmon, smoked haddock, prawns, cheesy mash crust', price: '£15.95' },
      { name: 'Chicken & Leek Pie', desc: 'Puff pastry, buttered mash, seasonal greens', price: '£14.95' },
      { name: 'Beetroot & Goat\'s Cheese Salad', desc: 'Candied walnuts, rocket, honey dressing', price: '£12.50' },
    ],
    features: [
      { title: 'Dog Friendly', desc: 'Water bowls, treats, and a warm welcome for your four-legged friend' },
      { title: 'Family Friendly', desc: 'Children\'s menu, high chairs, and a relaxed atmosphere for families' },
      { title: 'Seasonal Menus', desc: 'Our menu changes with the seasons, using local Surrey produce' },
      { title: 'Events & Live Music', desc: 'Regular live music, quiz nights, and seasonal celebrations' },
    ],
    hours: [
      { day: 'Monday – Thursday', hours: '11:30 – 23:00' },
      { day: 'Friday – Saturday', hours: '11:30 – 00:00' },
      { day: 'Sunday', hours: '12:00 – 22:00' },
    ],
    address: 'The Woolpack, Milford Road, Elstead, Surrey GU8 6HD',
    phone: '01252 XXX XXX',
  },
  'Birdies Coffee House & Bar': {
    tagline: 'Coffee, Food & Drinks at Farnham Park',
    description: 'Whether you\'re teeing off, walking the dog, or simply looking for great coffee and food — Birdies is your perfect pit stop on the edge of Farnham Park golf course.',
    nav: ['Home', 'Menu', 'Opening Hours', 'Events', 'The Course', 'Contact'],
    menuItems: [
      { name: 'Birdies Brunch', desc: 'Eggs your way, sourdough, avocado, bacon, roasted tomato', price: '£11.95' },
      { name: 'Club Sandwich', desc: 'Chicken, bacon, lettuce, tomato, fries', price: '£10.95' },
      { name: 'Soup of the Day', desc: 'Freshly made with crusty bread and butter', price: '£6.50' },
      { name: 'Afternoon Tea', desc: 'Finger sandwiches, scones, cakes — booking required', price: '£18.50pp' },
    ],
    features: [
      { title: 'Morning Coffee', desc: 'Speciality coffee, freshly baked pastries & breakfast from 8am' },
      { title: 'Lunch Menu', desc: 'Sandwiches, salads, and hot dishes served daily 11:30–3pm' },
      { title: 'After-Golf Drinks', desc: 'Local ales, wines, and cocktails with stunning course views' },
      { title: 'Events & Functions', desc: 'Private hire available for golf days, parties, and celebrations' },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '08:00 – 18:00' },
      { day: 'Saturday', hours: '08:00 – 19:00' },
      { day: 'Sunday', hours: '09:00 – 17:00' },
    ],
    address: 'Birdies, Farnham Park Golf Course, Folly Hill, Farnham GU9 0AU',
    phone: '01252 XXX XXX',
  },
};

export function PubMockup({ name, variant }: PubMockupProps) {
  const p = palettes[variant];
  const content = pubContent[name] || pubContent['The Wheatsheaf Farnham'];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Navigation */}
      <nav style={{ background: p.headerBg, padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: p.secondary, fontSize: 24, fontWeight: 'bold', letterSpacing: 1 }}>
          {name}
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {content.nav.map((item) => (
            <span key={item} style={{ color: '#e8e0d0', fontSize: 14, cursor: 'pointer', letterSpacing: 0.5 }}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: p.heroBg, padding: '80px 40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 'bold', margin: 0, letterSpacing: 2 }}>
            {name}
          </h1>
          <p style={{ color: p.secondary, fontSize: 20, marginTop: 12, fontStyle: 'italic' }}>
            {content.tagline}
          </p>
          <p style={{ color: '#e0dcd4', fontSize: 16, marginTop: 16, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            {content.description}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: p.secondary, color: p.headerBg, padding: '14px 32px', borderRadius: 4, border: 'none', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', letterSpacing: 1 }}>
              Book a Table
            </button>
            <button style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 4, border: '2px solid rgba(255,255,255,0.5)', fontSize: 16, cursor: 'pointer', letterSpacing: 1 }}>
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Image placeholder strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
        {['Interior & Atmosphere', 'Our Food', 'The Garden'].map((label) => (
          <div key={label} style={{ background: `linear-gradient(135deg, ${p.primary}33, ${p.secondary}33)`, padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ border: `2px dashed ${p.primary}66`, borderRadius: 8, padding: '24px 16px' }}>
              <span style={{ color: p.textLight, fontSize: 14, fontStyle: 'italic' }}>📷 {label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Preview */}
      <div style={{ padding: '64px 40px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, color: p.primary, margin: 0 }}>From Our Kitchen</h2>
          <p style={{ color: p.textLight, marginTop: 8, fontStyle: 'italic' }}>A taste of what's on offer this season</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {content.menuItems.map((item) => (
            <div key={item.name} style={{ borderBottom: `1px solid ${p.primary}22`, paddingBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 18, margin: 0, color: p.text }}>{item.name}</h3>
                <span style={{ color: p.primary, fontWeight: 'bold', fontSize: 16 }}>{item.price}</span>
              </div>
              <p style={{ color: p.textLight, fontSize: 14, margin: '4px 0 0' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button style={{ background: p.primary, color: '#fff', padding: '12px 28px', borderRadius: 4, border: 'none', fontSize: 15, cursor: 'pointer' }}>
            View Full Menu
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: `${p.primary}0a`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {content.features.map((feat) => (
              <div key={feat.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: p.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 20 }}>✦</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, color: p.primary }}>{feat.title}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: p.textLight }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opening Hours & Location */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 20px' }}>Opening Hours</h2>
            {content.hours.map((h) => (
              <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: `1px solid ${p.primary}15`, marginBottom: 12 }}>
                <span style={{ fontSize: 15, color: p.text }}>{h.day}</span>
                <span style={{ fontSize: 15, color: p.primary, fontWeight: 'bold' }}>{h.hours}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 20px' }}>Find Us</h2>
            <div style={{ background: `linear-gradient(135deg, ${p.primary}15, ${p.secondary}15)`, borderRadius: 8, padding: 32, textAlign: 'center' }}>
              <div style={{ border: `2px dashed ${p.primary}44`, borderRadius: 8, padding: 24 }}>
                <span style={{ color: p.textLight, fontSize: 14 }}>📍 Map Embed</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: p.textLight, marginTop: 16 }}>{content.address}</p>
            <p style={{ fontSize: 14, color: p.primary, marginTop: 4, fontWeight: 'bold' }}>📞 {content.phone}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: p.headerBg, padding: '32px 40px', textAlign: 'center' }}>
        <p style={{ color: p.secondary, fontSize: 18, margin: 0, fontWeight: 'bold' }}>{name}</p>
        <p style={{ color: '#999', fontSize: 13, marginTop: 8 }}>{content.address}</p>
        <p style={{ color: '#777', fontSize: 12, marginTop: 16 }}>© 2026 {name}. All rights reserved.</p>
      </div>
    </div>
  );
}
