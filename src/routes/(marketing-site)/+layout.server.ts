import {
  fetchAwards,
  fetchAwardsTypes,
  fetchCareers,
  fetchHomeBlogPosts,
  fetchTeamMembers
} from '$lib/content';
import { fetchClients } from '$lib/data/clients.server';
import { fetchTeamMembersFromDb } from '$lib/data/team.server';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
  const tenant = locals.tenant;
  const [clients, dbTeamMembers] = tenant
    ? await Promise.all([fetchClients(tenant.id), fetchTeamMembersFromDb(tenant.id)])
    : [[], []];

  return {
    tenant,
    clients,
    dbTeamMembers,
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
