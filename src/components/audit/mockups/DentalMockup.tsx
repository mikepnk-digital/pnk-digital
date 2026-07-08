export function DentalMockup() {
  const p = {
    primary: '#0d7377',
    secondary: '#14919b',
    accent: '#0ea5e9',
    bg: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b',
    headerBg: '#0d7377',
  };

  const treatments = [
    { name: 'General Dentistry', desc: 'Check-ups, fillings, and preventive care with a holistic approach', icon: '🦷' },
    { name: 'Cosmetic Dentistry', desc: 'Veneers, whitening, and smile makeovers for your best smile', icon: '✨' },
    { name: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacements', icon: '🔧' },
    { name: 'Orthodontics', desc: 'Invisalign and clear aligners for discreet teeth straightening', icon: '😁' },
    { name: 'Holistic Treatments', desc: 'Mercury-free fillings, biocompatible materials, whole-body approach', icon: '🌿' },
    { name: 'Emergency Care', desc: 'Same-day appointments for dental emergencies', icon: '🚑' },
  ];

  const reviews = [
    { name: 'Sarah M.', text: 'Wonderful practice. The team made me feel so at ease. Highly recommend!', stars: 5 },
    { name: 'James T.', text: 'Best dental experience I\'ve ever had. The holistic approach really works.', stars: 5 },
    { name: 'Emma R.', text: 'Professional, caring, and thorough. My whole family comes here now.', stars: 5 },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: p.text, background: p.bg, lineHeight: 1.6 }}>
      {/* Nav */}
      <nav style={{ background: '#fff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24, color: p.primary }}>🌿</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: p.primary, letterSpacing: -0.5 }}>The Holistic Dental Centre</div>
            <div style={{ fontSize: 11, color: p.textLight, letterSpacing: 1, textTransform: 'uppercase' }}>Private Dental Practice</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Treatments', 'Our Team', 'About', 'Patient Info', 'Contact'].map((item) => (
            <span key={item} style={{ color: p.text, fontSize: 14, cursor: 'pointer' }}>{item}</span>
          ))}
          <button style={{ background: p.primary, color: '#fff', padding: '10px 20px', borderRadius: 6, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d7377 0%, #14919b 50%, #0ea5e9 100%)', padding: '80px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
              Dental Care That Considers Your Whole Health
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, marginTop: 16 }}>
              We combine modern dentistry with a holistic philosophy — using biocompatible materials, mercury-free fillings, and a gentle approach that puts your wellbeing first.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button style={{ background: '#fff', color: p.primary, padding: '14px 28px', borderRadius: 8, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
                Book a Consultation
              </button>
              <button style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer' }}>
                Our Treatments
              </button>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
              {[{ num: '25+', label: 'Years Experience' }, { num: '5★', label: 'Patient Rating' }, { num: '5000+', label: 'Happy Patients' }].map((s) => (
                <div key={s.label}>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 48, textAlign: 'center', border: '2px dashed rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>📷 Welcoming Practice Photo</span>
          </div>
        </div>
      </div>

      {/* Treatments */}
      <div style={{ padding: '72px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, color: p.text, margin: 0, fontWeight: 700 }}>Our Treatments</h2>
          <p style={{ color: p.textLight, marginTop: 8, fontSize: 16 }}>Comprehensive dental care with a holistic approach</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {treatments.map((t) => (
            <div key={t.name} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, textAlign: 'center', transition: 'box-shadow 0.2s' }}>
              <span style={{ fontSize: 36 }}>{t.icon}</span>
              <h3 style={{ fontSize: 18, margin: '12px 0 8px', color: p.text, fontWeight: 600 }}>{t.name}</h3>
              <p style={{ fontSize: 14, color: p.textLight, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ background: '#f8fafc', padding: '72px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, color: p.text, margin: '0 0 8px', fontWeight: 700 }}>Meet Our Team</h2>
          <p style={{ color: p.textLight, marginBottom: 40 }}>Experienced, caring professionals dedicated to your dental health</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            {[
              { name: 'Dr. Smith', role: 'Principal Dentist, BDS MFDS', specialty: 'Holistic & Cosmetic' },
              { name: 'Dr. Patel', role: 'Associate Dentist, BDS', specialty: 'Implants & Orthodontics' },
              { name: 'Sarah Jones', role: 'Dental Hygienist, DipDH', specialty: 'Preventive Care' },
            ].map((m) => (
              <div key={m.name}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${p.primary}22, ${p.secondary}22)`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px dashed ${p.primary}44` }}>
                  <span style={{ fontSize: 12, color: p.textLight }}>Photo</span>
                </div>
                <h3 style={{ fontSize: 18, margin: '0 0 4px', color: p.text, fontWeight: 600 }}>{m.name}</h3>
                <p style={{ fontSize: 13, color: p.primary, margin: 0 }}>{m.role}</p>
                <p style={{ fontSize: 13, color: p.textLight, marginTop: 4 }}>{m.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: '72px 40px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, color: p.text, margin: '0 0 32px', fontWeight: 700, textAlign: 'center' }}>What Our Patients Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {reviews.map((r) => (
            <div key={r.name} style={{ background: '#f8fafc', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#fbbf24', fontSize: 18, marginBottom: 8 }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontSize: 14, color: p.text, fontStyle: 'italic', margin: '0 0 12px' }}>"{r.text}"</p>
              <p style={{ fontSize: 13, color: p.textLight, margin: 0, fontWeight: 600 }}>— {r.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`, padding: '56px 40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 28, margin: 0, fontWeight: 700 }}>Ready to Book Your Appointment?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>New patients welcome. Call us or book online.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24 }}>
          <button style={{ background: '#fff', color: p.primary, padding: '14px 32px', borderRadius: 8, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            Book Online
          </button>
          <button style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer' }}>
            📞 Call Us
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0f172a', padding: '40px', color: '#94a3b8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, fontSize: 14 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>The Holistic Dental Centre</div>
            <p style={{ margin: 0 }}>Providing holistic dental care in Surrey. Mercury-free, biocompatible, and focused on your overall wellbeing.</p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 12 }}>Opening Hours</div>
            <p style={{ margin: '0 0 4px' }}>Mon–Fri: 8:30–17:30</p>
            <p style={{ margin: '0 0 4px' }}>Saturday: 9:00–13:00</p>
            <p style={{ margin: 0 }}>Sunday: Closed</p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 12 }}>Contact</div>
            <p style={{ margin: '0 0 4px' }}>📞 01234 XXX XXX</p>
            <p style={{ margin: '0 0 4px' }}>✉️ info@holisticdental.co.uk</p>
            <p style={{ margin: 0 }}>📍 Surrey, UK</p>
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: '24px auto 0', borderTop: '1px solid #1e293b', paddingTop: 16, textAlign: 'center', fontSize: 12 }}>
          © 2026 The Holistic Dental Centre. All rights reserved.
        </div>
      </div>
    </div>
  );
}
