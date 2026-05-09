/**
 * Shared Satori element-tree builder for OG images.
 *
 * Returns a JSX-shaped plain-object tree that @vercel/og can render
 * without requiring React. The branding (Techyor wordmark, gradient
 * background, dark theme, footer pills) is consistent across pages
 * so each page-specific endpoint only supplies its hero copy and pill list.
 */

export type OgImageInput = {
  /** Big H1-style line. */
  title: string;
  /** Optional accent line above the title (e.g. eyebrow). */
  eyebrow?: string;
  /** Subtitle paragraph rendered under the title. */
  subtitle?: string;
  /** Up to ~6 short tags rendered as outlined pills in the footer. */
  pills?: string[];
  /** Footer URL line, e.g. "techyor.com/services". */
  url: string;
};

export function buildOgTree(input: OgImageInput) {
  return {
    type: 'div',
    key: null,
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
        color: '#ffffff'
      },
      children: [
        // Header: brand + availability pill
        {
          type: 'div',
          key: 'header',
          props: {
            style: {
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            },
            children: [
              {
                type: 'div',
                key: 'brand',
                props: {
                  style: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' },
                  children: 'Techyor'
                }
              },
              {
                type: 'div',
                key: 'pill',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 18px',
                    border: '1px solid #333',
                    borderRadius: '999px',
                    fontSize: 16,
                    color: '#a0a0a0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  },
                  children: [
                    {
                      type: 'div',
                      key: 'dot',
                      props: {
                        style: {
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#22c55e'
                        }
                      }
                    },
                    'Available — replies in 24h'
                  ]
                }
              }
            ]
          }
        },
        // Title block
        {
          type: 'div',
          key: 'title',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '1040px'
            },
            children: [
              input.eyebrow
                ? {
                    type: 'div',
                    key: 'eyebrow',
                    props: {
                      style: {
                        fontSize: 22,
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      },
                      children: input.eyebrow
                    }
                  }
                : null,
              {
                type: 'div',
                key: 'h1',
                props: {
                  style: {
                    fontSize: 88,
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em'
                  },
                  children: input.title
                }
              },
              input.subtitle
                ? {
                    type: 'div',
                    key: 'sub',
                    props: {
                      style: {
                        fontSize: 30,
                        lineHeight: 1.3,
                        color: '#9ca3af',
                        maxWidth: '900px'
                      },
                      children: input.subtitle
                    }
                  }
                : null
            ].filter(Boolean)
          }
        },
        // Footer: pills + URL
        {
          type: 'div',
          key: 'footer',
          props: {
            style: {
              display: 'flex',
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingTop: '28px',
              borderTop: '1px solid #1f1f1f'
            },
            children: [
              {
                type: 'div',
                key: 'pills',
                props: {
                  style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    maxWidth: '780px'
                  },
                  children: (input.pills || []).slice(0, 6).map((p, i) => ({
                    type: 'div',
                    key: `p-${i}`,
                    props: {
                      style: {
                        padding: '6px 14px',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        fontSize: 18,
                        color: '#d1d5db'
                      },
                      children: p
                    }
                  }))
                }
              },
              {
                type: 'div',
                key: 'url',
                props: {
                  style: { fontSize: 20, color: '#6b7280' },
                  children: input.url
                }
              }
            ]
          }
        }
      ]
    }
  };
}

export const OG_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
};
