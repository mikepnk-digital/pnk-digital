export function MenswearMockup() {
  const p = {
    primary: '#1a1a1a',
    gold: '#b8860b',
    goldLight: '#d4a843',
    bg: '#faf8f5',
    text: '#1a1a1a',
    textLight: '#6b6b6b',
  };

  const brands = ['Barbour', 'Ralph Lauren', 'Gant', 'Hackett', 'R.M. Williams', 'Schöffel', 'Dubarry', 'Alan Paine'];

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Nav */}
      <nav style={{ background: p.primary, padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: p.goldLight, fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            John Goodridge
          </div>
          <div style={{ color: '#999', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginTop: 2 }}>
            Menswear · Est. 1927
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Collections', 'Brands', 'Our Story', 'Services', 'Visit Us'].map((item) => (
            <span key={item} style={{ color: '#ccc', fontSize: 13, cursor: 'pointer', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${p.primary} 0%, #2a2a2a 50%, ${p.primary} 100%)`, padding: '100px 48px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: p.goldLight, fontSize: 14, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
            Nearly a Century of Excellence
          </div>
          <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 700, margin: 0, letterSpacing: 2, lineHeight: 1.1 }}>
            Farnham's Finest<br />Menswear Since 1927
          </h1>
          <div style={{ width: 60, height: 2, background: p.goldLight, margin: '24px auto' }} />
          <p style={{ color: '#bbb', fontSize: 18, maxWidth: 600, margin: '0 auto', fontStyle: 'italic' }}>
            Premium clothing and accessories from the world's finest brands, with personalised service and expert fitting.
          </p>
          <button style={{ marginTop: 36, background: p.gold, color: '#fff', padding: '16px 40px', borderRadius: 0, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Explore Collections
          </button>
        </div>
      </div>

      {/* Heritage Banner */}
      <div style={{ background: p.gold, padding: '20px 48px', display: 'flex', justifyContent: 'center', gap: 48 }}>
        {[
          { num: '98', label: 'Years Trading' },
          { num: '20+', label: 'Premium Brands' },
          { num: '3', label: 'Generations' },
          { num: '1927', label: 'Established' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <span style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>{s.num}</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, display: 'block', fontFamily: "'Inter', sans-serif", letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div style={{ padding: '72px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, margin: '0 0 8px', color: p.text }}>Our Brands</h2>
        <p style={{ color: p.textLight, marginBottom: 40, fontFamily: "'Inter', sans-serif", fontSize: 15 }}>
          Carefully selected collections from the world's finest menswear brands
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 800, margin: '0 auto' }}>
          {brands.map((brand) => (
            <div key={brand} style={{ border: '1px solid #e5e0d8', borderRadius: 4, padding: '24px 16px', background: '#fff' }}>
              <span style={{ color: p.text, fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 48px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          {[
            { title: 'Suits & Tailoring', desc: 'Expert fitting and alterations' },
            { title: 'Country & Outdoor', desc: 'Premium country clothing' },
            { title: 'Casual & Smart Casual', desc: 'Everyday luxury for modern men' },
          ].map((cat) => (
            <div key={cat.title} style={{ position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
              <div style={{ background: `linear-gradient(135deg, ${p.primary}ee, #333)`, padding: '80px 28px 28px', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', border: `1px dashed rgba(255,255,255,0.2)`, borderRadius: 4, padding: '8px 16px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: "'Inter', sans-serif" }}>📷 Category Image</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: 20, margin: '0 0 4px' }}>{cat.title}</h3>
                <p style={{ color: '#999', fontSize: 13, margin: '0 0 16px', fontFamily: "'Inter', sans-serif" }}>{cat.desc}</p>
                <span style={{ color: p.goldLight, fontSize: 13, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}>
                  Shop Now →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Experience */}
      <div style={{ background: '#f3efe8', padding: '72px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 32, margin: '0 0 16px', color: p.text }}>The Goodridge Experience</h2>
            <p style={{ color: p.textLight, fontSize: 15, fontFamily: "'Inter', sans-serif" }}>
              Step into our Farnham store and experience nearly a century of menswear expertise. Our knowledgeable team offers personalised styling advice, expert fitting, and a level of service that's increasingly rare in modern retail.
            </p>
            <div style={{ marginTop: 24 }}>
              {['Personal styling consultations', 'Expert garment fitting', 'Alteration service', 'Gift wrapping & vouchers'].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: p.text }}>
                  <span style={{ color: p.gold }}>✓</span> {s}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${p.primary}11, ${p.gold}22)`, borderRadius: 8, padding: 60, textAlign: 'center', border: '2px dashed #d4a84344' }}>
            <span style={{ color: p.textLight, fontSize: 14 }}>📷 Store Interior</span>
          </div>
        </div>
      </div>

      {/* Visit */}
      <div style={{ padding: '72px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, margin: '0 0 24px' }}>Visit Our Store</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, fontFamily: "'Inter', sans-serif", fontSize: 14, color: p.textLight }}>
          <div>
            <strong style={{ color: p.text, display: 'block', marginBottom: 8 }}>Address</strong>
            <p style={{ margin: 0 }}>High Street<br />Farnham, Surrey<br />GU9 7XX</p>
          </div>
          <div>
            <strong style={{ color: p.text, display: 'block', marginBottom: 8 }}>Opening Hours</strong>
            <p style={{ margin: 0 }}>Mon–Sat: 9:30–17:30<br />Sunday: Closed</p>
          </div>
          <div>
            <strong style={{ color: p.text, display: 'block', marginBottom: 8 }}>Contact</strong>
            <p style={{ margin: 0 }}>01252 XXX XXX<br />info@johngoodridge.co.uk</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: p.primary, padding: '32px 48px', textAlign: 'center' }}>
        <div style={{ color: p.goldLight, fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>JOHN GOODRIDGE</div>
        <div style={{ color: '#666', fontSize: 12, marginTop: 4, letterSpacing: 2, fontFamily: "'Inter', sans-serif" }}>MENSWEAR · EST. 1927</div>
        <div style={{ color: '#555', fontSize: 11, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>
          © 2026 John Goodridge Menswear. All rights reserved.
        </div>
      </div>
    </div>
  );
}
