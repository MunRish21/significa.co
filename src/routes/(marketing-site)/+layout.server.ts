import {
  fetchAwards,
  fetchAwardsTypes,
  fetchCareers,
  fetchHomeBlogPosts,
  fetchTeamMembers
} from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
  const tenant = locals.tenant;

  return {
    tenant,
    configuration: {
      content: {
        primary_navigation: [
          { full_slug: 'projects', name: 'Projects' },
          { full_slug: 'services', name: 'Services' },
          { full_slug: 'about', name: 'About' }
        ],
        call_to_action: [
          {
            label: 'Get a quote',
            link: {
              linktype: 'url',
              url: '/get-a-quote'
            }
          }
        ],
        secondary_navigation: [],
        footer_columns: []
      }
    },
    careers: await fetchCareers({ version, fetch }),
    awards: await fetchAwards({ version, fetch }),
    awardsTypes: await fetchAwardsTypes({ version, fetch }),
    teamMembers: await fetchTeamMembers({ version, fetch }),
    homePosts: await fetchHomeBlogPosts({ version, fetch }),
    version
  };
};
