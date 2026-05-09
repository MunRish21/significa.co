import { ImageResponse } from '@vercel/og';
import { error } from '@sveltejs/kit';
import { getHireRole } from '$lib/data/hire-roles';

export const config = {
  runtime: 'nodejs20.x'
};

/**
 * Dynamic OG image for /hire/<role> pages.
 * Generated via Satori (no headless browser) and cached aggressively
 * since the design depends only on the role's static data.
 */
export const GET = async ({ params }) => {
  const role = getHireRole(params.role);
  if (!role) throw error(404, 'Role not found');

  const tree = {
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
        // ── Header row: brand + availability pill ─────────────────────
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
                  style: {
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  },
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
        // ── Title block ───────────────────────────────────────────────
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
                  children: `${role.h1}.`
                }
              },
              {
                type: 'div',
                key: 'sub',
                props: {
                  style: {
                    fontSize: 30,
                    lineHeight: 1.3,
                    color: '#9ca3af',
                    maxWidth: '900px'
                  },
                  children: role.subhead
                }
              }
            ]
          }
        },
        // ── Footer row: tech stack + URL ──────────────────────────────
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
                key: 'stack',
                props: {
                  style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    maxWidth: '780px'
                  },
                  children: role.techStack.slice(0, 5).map((tech, i) => ({
                    type: 'div',
                    key: `t-${i}`,
                    props: {
                      style: {
                        padding: '6px 14px',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        fontSize: 18,
                        color: '#d1d5db'
                      },
                      children: tech
                    }
                  }))
                }
              },
              {
                type: 'div',
                key: 'url',
                props: {
                  style: {
                    fontSize: 20,
                    color: '#6b7280'
                  },
                  children: `techyor.com/hire/${role.slug}`
                }
              }
            ]
          }
        }
      ]
    }
  };

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
    }
  });
};
