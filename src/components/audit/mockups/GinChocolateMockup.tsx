export function GinChocolateMockup() {
  const p = {
    primary: '#2d1b4e',
    gold: '#c9a54e',
    burgundy: '#7a1c3a',
    bg: '#f9f6f2',
    text: '#1a1a2e',
    textLight: '#6b6980',
    headerBg: '#1a0f30',
  };

  const categories = [
    { name: 'London Dry', count: '80+', icon: '🍸' },
    { name: 'Flavoured Gins', count: '120+', icon: '🫐' },
    { name: 'Craft & Small Batch', count: '100+', icon: '✨' },
    { name: 'Artisan Chocolate', count: '50+', icon: '🍫' },
    { name: 'Whisky & Rum', count: '60+', icon: '🥃' },
    { name: 'Gift Boxes', count: '30+', icon: '🎁' },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Nav */}
      <nav style={{ background: p.headerBg, padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: p.gold, fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>Gin & Chocolate</div>
          <div style={{ color: '#8878a8', fontSize: 11, letterSpacing: 2 }}>SPECIALIST SPIRITS & CHOCOLATE · FARNHAM</div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Shop', 'Tastings', 'Gift Boxes', 'About', 'Contact'].map((item) => (
            <span key={item} style={{ color: '#ccc', fontSize: 14, cursor: 'pointer' }}>{item}</span>
          ))}
          <button style={{ background: p.gold, color: p.headerBg, padding: '8px 20px', borderRadius: 4, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Shop Online
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${p.primary} 0%, ${p.burgundy} 50%, ${p.primary} 100%)`, padding: '80px 40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: p.gold, fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
            Farnham's Specialist Spirits Destination
          </div>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
            Over 400 Gins.<br />Handpicked Chocolates.<br />One Extraordinary Shop.
          </h1>
          <p style={{ color: '#d4c4e0', fontSize: 17, marginTop: 16, maxWidth: 550, margin: '16px auto 0' }}>
            Discover Surrey's most extensive gin collection, paired with artisan chocolates from the world's finest chocolatiers.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button style={{ background: p.gold, color: p.headerBg, padding: '14px 32px', borderRadius: 4, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Shop Our Collection
            </button>
            <button style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 4, border: '2px solid rgba(255,255,255,0.3)', fontSize: 15, cursor: 'pointer' }}>
              Book a Tasting
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ background: p.gold, padding: '16px 40px', display: 'flex', justifyContent: 'center', gap: 48 }}>
        {[
          { num: '400+', label: 'Gins' },
          { num: '50+', label: 'Chocolatiers' },
          { num: '12', label: 'Tastings/Year' },
          { num: '★★★★★', label: 'Rated' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <span style={{ color: p.headerBg, fontSize: 20, fontWeight: 700 }}>{s.num}</span>
            <span style={{ color: 'rgba(26,15,48,0.7)', fontSize: 11, display: 'block', fontFamily: "'Inter', sans-serif", letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 32px' }}>Explore Our Range</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {categories.map((cat) => (
              <div key={cat.name} style={{ background: '#fff', border: '1px solid #e8e0f0', borderRadius: 12, padding: 28, textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 36 }}>{cat.icon}</span>
                <h3 style={{ fontSize: 17, margin: '8px 0 4px', color: p.primary }}>{cat.name}</h3>
                <span style={{ color: p.gold, fontSize: 14, fontWeight: 600 }}>{cat.count} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ background: `${p.primary}08`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, color: p.primary, margin: '0 0 32px' }}>Featured This Month</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Tarquin\'s Cornish Gin', type: 'London Dry', price: '£35.00' },
              { name: 'Sipsmith V.J.O.P.', type: 'Navy Strength', price: '£42.00' },
              { name: 'Prestat Truffles', type: 'Artisan Chocolate', price: '£24.00' },
              { name: 'Silent Pool Gin', type: 'Surrey Craft', price: '£38.00' },
            ].map((prod) => (
              <div key={prod.name} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e8e0f0' }}>
                <div style={{ background: `linear-gradient(135deg, ${p.primary}11, ${p.burgundy}11)`, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e8e0f0' }}>
                  <span style={{ color: '#aaa', fontSize: 12 }}>📷 Product</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, color: p.gold, textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Inter', sans-serif" }}>{prod.type}</div>
                  <h3 style={{ fontSize: 15, margin: '4px 0 8px', color: p.text }}>{prod.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: p.primary, fontWeight: 700, fontSize: 16 }}>{prod.price}</span>
                    <button style={{ background: p.primary, color: '#fff', padding: '6px 14px', borderRadius: 4, border: 'none', fontSize: 12, cursor: 'pointer' }}>
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tastings */}
      <div style={{ padding: '64px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, color: p.primary, margin: '0 0 8px' }}>Gin Tasting Experiences</h2>
          <p style={{ color: p.textLight, fontSize: 15 }}>
            Join us for an evening of discovery. Our expert-led tastings explore different gin styles, perfect pairings, and the stories behind the spirits.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
            {[
              { title: 'Gin Discovery Evening', price: '£35pp', desc: 'Taste 6 gins with expert guidance and nibbles' },
              { title: 'Gin & Chocolate Pairing', price: '£45pp', desc: 'The perfect match — 5 gins paired with artisan chocolates' },
            ].map((t) => (
              <div key={t.title} style={{ background: '#fff', border: `2px solid ${p.primary}22`, borderRadius: 8, padding: 24 }}>
                <h3 style={{ fontSize: 18, margin: '0 0 4px', color: p.primary }}>{t.title}</h3>
                <span style={{ color: p.gold, fontSize: 16, fontWeight: 700 }}>{t.price}</span>
                <p style={{ fontSize: 13, color: p.textLight, marginTop: 8 }}>{t.desc}</p>
                <button style={{ marginTop: 12, background: p.primary, color: '#fff', padding: '10px 24px', borderRadius: 4, border: 'none', fontSize: 13, cursor: 'pointer' }}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: p.headerBg, padding: '40px', textAlign: 'center' }}>
        <div style={{ color: p.gold, fontSize: 20, fontWeight: 700 }}>Gin & Chocolate</div>
        <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Specialist Spirits & Chocolate · Farnham, Surrey</div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16, fontSize: 13, color: '#888' }}>
          <span>📍 Farnham, Surrey</span>
          <span>📞 01252 XXX XXX</span>
          <span>✉️ hello@ginandchocolate.co.uk</span>
        </div>
        <div style={{ color: '#555', fontSize: 11, marginTop: 16 }}>© 2026 Gin & Chocolate Shop. All rights reserved.</div>
      </div>
    </div>
  );
}
