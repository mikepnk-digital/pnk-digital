export function CoffeeMockup() {
  const p = {
    primary: '#6b3a2a',
    secondary: '#c4803c',
    bg: '#faf5ef',
    cream: '#f5ede0',
    text: '#2c2420',
    textLight: '#8a7568',
    headerBg: '#2c2420',
  };

  const menu = {
    coffee: [
      { name: 'Flat White', price: '£3.40' },
      { name: 'Cappuccino', price: '£3.40' },
      { name: 'Oat Latte', price: '£3.80' },
      { name: 'Espresso', price: '£2.40' },
      { name: 'Pour Over', price: '£4.00' },
      { name: 'Matcha Latte', price: '£3.80' },
    ],
    food: [
      { name: 'Avocado on Sourdough', desc: 'Poached eggs, chilli flakes, seeds', price: '£9.50' },
      { name: 'Full English', desc: 'Local sausage, bacon, eggs, beans, toast', price: '£11.50' },
      { name: 'Croissant & Jam', desc: 'Freshly baked, seasonal preserves', price: '£3.95' },
      { name: 'Soup of the Day', desc: 'Freshly made, served with sourdough', price: '£6.50' },
    ],
    wine: [
      { name: 'House Red — Malbec', price: '£6 / £22' },
      { name: 'House White — Picpoul', price: '£6 / £22' },
      { name: 'Prosecco', price: '£7 / £28' },
      { name: 'Craft Beer Selection', price: 'from £5.50' },
    ],
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Nav */}
      <nav style={{ background: p.headerBg, padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: p.secondary, fontSize: 24, fontWeight: 700 }}>Oliver's</div>
          <div style={{ color: '#8a7568', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Coffee · Wine · Food</div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Menu', 'Wine Bar', 'Events', 'About', 'Find Us'].map((item) => (
            <span key={item} style={{ color: '#ccc', fontSize: 14, cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #6b3a2a 0%, #8b5a3a 40%, #6b3a2a 100%)', padding: '80px 40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: p.secondary, fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
            Haslemere's Independent Favourite
          </div>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 700, margin: 0 }}>
            Oliver's Coffee
          </h1>
          <p style={{ color: '#e0d4c6', fontSize: 18, marginTop: 12, fontStyle: 'italic' }}>
            Speciality coffee by day. Wine bar by night.
          </p>
          <p style={{ color: '#c0b0a0', fontSize: 15, marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            An independent coffee shop and wine bar in the heart of Haslemere. Great coffee, delicious food, and a carefully curated wine list.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: p.secondary, color: '#fff', padding: '14px 28px', borderRadius: 6, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              View Our Menu
            </button>
            <button style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 6, border: '2px solid rgba(255,255,255,0.4)', fontSize: 15, cursor: 'pointer' }}>
              What's On
            </button>
          </div>
        </div>
      </div>

      {/* Day/Night split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ background: p.cream, padding: '48px 32px', textAlign: 'center' }}>
          <span style={{ fontSize: 36 }}>☕</span>
          <h3 style={{ fontSize: 20, margin: '12px 0 4px', color: p.primary }}>Coffee House</h3>
          <p style={{ fontSize: 14, color: p.textLight }}>8am – 4pm · Speciality coffee, brunch & light lunches</p>
        </div>
        <div style={{ background: p.headerBg, padding: '48px 32px', textAlign: 'center' }}>
          <span style={{ fontSize: 36 }}>🍷</span>
          <h3 style={{ fontSize: 20, margin: '12px 0 4px', color: p.secondary }}>Wine Bar</h3>
          <p style={{ fontSize: 14, color: '#8a7568' }}>5pm – 10pm · Wines, craft beers, tapas & charcuterie</p>
        </div>
      </div>

      {/* Coffee Menu */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, color: p.primary, margin: '0 0 32px' }}>Our Menu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            <div>
              <h3 style={{ fontSize: 18, color: p.primary, borderBottom: `2px solid ${p.secondary}`, paddingBottom: 8, marginBottom: 16 }}>Coffee</h3>
              {menu.coffee.map((item) => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                  <span>{item.name}</span>
                  <span style={{ color: p.primary, fontWeight: 600 }}>{item.price}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 18, color: p.primary, borderBottom: `2px solid ${p.secondary}`, paddingBottom: 8, marginBottom: 16 }}>Food</h3>
              {menu.food.map((item) => (
                <div key={item.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: p.primary, fontWeight: 600 }}>{item.price}</span>
                  </div>
                  <div style={{ fontSize: 12, color: p.textLight }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 18, color: p.primary, borderBottom: `2px solid ${p.secondary}`, paddingBottom: 8, marginBottom: 16 }}>Wine & Beer</h3>
              {menu.wine.map((item) => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                  <span>{item.name}</span>
                  <span style={{ color: p.primary, fontWeight: 600 }}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events */}
      <div style={{ background: p.cream, padding: '64px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 32px' }}>What's On</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { date: 'Every Friday', title: 'Live Acoustic Music', time: '7pm – 9pm' },
              { date: 'First Saturday', title: 'Wine Tasting Evening', time: '6pm – 8pm' },
              { date: 'Wednesdays', title: 'Coffee & Cake Book Club', time: '10am – 12pm' },
              { date: 'Last Thursday', title: 'Quiz Night', time: '7:30pm' },
            ].map((e) => (
              <div key={e.title} style={{ background: '#fff', borderRadius: 8, padding: 20, textAlign: 'left', border: '1px solid #e8ddd0' }}>
                <div style={{ color: p.secondary, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Inter', sans-serif" }}>{e.date}</div>
                <h3 style={{ fontSize: 17, margin: '4px 0 2px', color: p.text }}>{e.title}</h3>
                <span style={{ fontSize: 13, color: p.textLight }}>{e.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <h2 style={{ fontSize: 24, color: p.primary, margin: '0 0 16px' }}>Find Us</h2>
            <p style={{ fontSize: 14, color: p.textLight, margin: '0 0 8px' }}>High Street, Haslemere<br />Surrey GU27 2XX</p>
            <p style={{ fontSize: 14, color: p.primary, fontWeight: 600 }}>01428 XXX XXX</p>
            <div style={{ marginTop: 16, fontSize: 14 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Coffee Hours:</strong> Mon–Sat 8am–4pm, Sun 9am–3pm</p>
              <p style={{ margin: 0 }}><strong>Wine Bar:</strong> Thu–Sat 5pm–10pm</p>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${p.primary}15, ${p.secondary}15)`, borderRadius: 8, padding: 32, textAlign: 'center', border: `2px dashed ${p.primary}33` }}>
            <span style={{ color: p.textLight, fontSize: 14 }}>📍 Map Embed</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: p.headerBg, padding: '32px 40px', textAlign: 'center' }}>
        <div style={{ color: p.secondary, fontSize: 20, fontWeight: 700 }}>Oliver's Coffee</div>
        <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Coffee · Wine · Food · Haslemere</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
          {['Instagram', 'Facebook', 'TripAdvisor'].map((s) => (
            <span key={s} style={{ color: '#888', fontSize: 12, cursor: 'pointer' }}>{s}</span>
          ))}
        </div>
        <div style={{ color: '#555', fontSize: 11, marginTop: 16 }}>© 2026 Oliver's Coffee. All rights reserved.</div>
      </div>
    </div>
  );
}
