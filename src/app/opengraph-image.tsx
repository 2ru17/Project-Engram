import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Project Engram // 銘印 - Computer Science & Systems Architecture Knowledge Archive';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0b0f17',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #162438 0%, #0b0f17 75%)',
          padding: '60px 80px',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          color: '#e2e8f0',
          position: 'relative',
        }}
      >
        {/* Subtle cyber-zen grid border */}
        <div
          style={{
            position: 'absolute',
            inset: 20,
            border: '1px solid #1e293b',
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        />

        {/* Cyan Corner Accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 40,
            height: 40,
            borderTop: '3px solid #00E5FF',
            borderLeft: '3px solid #00E5FF',
            borderTopLeftRadius: '16px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            borderTop: '3px solid #00E5FF',
            borderRight: '3px solid #00E5FF',
            borderTopRightRadius: '16px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            width: 40,
            height: 40,
            borderBottom: '3px solid #00E5FF',
            borderLeft: '3px solid #00E5FF',
            borderBottomLeftRadius: '16px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            borderBottom: '3px solid #00E5FF',
            borderRight: '3px solid #00E5FF',
            borderBottomRightRadius: '16px',
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '10px',
                border: '1.5px solid #00E5FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0d1522',
                color: '#00E5FF',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              印
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, letterSpacing: '0.35em', color: '#00E5FF', fontWeight: 700 }}>
                ARCHIVAL KNOWLEDGE SYSTEM
              </span>
              <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#94a3b8' }}>
                PROJECT ENGRAM // 銘印
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid #1e293b',
              backgroundColor: '#0d1017',
              color: '#00E5FF',
              fontSize: 13,
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
            }}
          >
            539+ CLASSIFIED MONOGRAPHS
          </div>
        </div>

        {/* Center Hero */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: '0.02em',
              lineHeight: 1.15,
              color: '#f8fafc',
              margin: 0,
            }}
          >
            Computer Science & Systems Architecture
          </h1>
          <p
            style={{
              fontSize: 21,
              color: '#94a3b8',
              lineHeight: 1.45,
              maxWidth: 960,
              margin: 0,
            }}
          >
            A high-performance topological knowledge vault synthesizing 4 academic years, 38 curricular modules, interactive force graphs, and verified monographs.
          </p>
        </div>

        {/* Bottom Bar: Tags & Category Seals */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Systems [統]', 'Security [防]', 'Theory [論]', 'Software [創]'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  backgroundColor: '#0f172a',
                  color: '#cbd5e1',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 14,
              color: '#64748b',
              letterSpacing: '0.2em',
              fontFamily: 'monospace',
            }}
          >
            2ru17-project-engram.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
