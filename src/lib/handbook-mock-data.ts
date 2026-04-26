import type { HandbookLevelStoryblok, ConfigurationStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';

export const mockHandbookConfiguration: ISbStoryData<ConfigurationStoryblok> = {
  name: 'Handbook Navigation',
  created_at: new Date().toISOString(),
  published_at: new Date().toISOString(),
  id: 0,
  uuid: 'mock-handbook-config',
  content: {
    primary_navigation: [],
    call_to_action: [],
    footer: [],
    footer_partners: [],
    _uid: 'mock-config',
    component: 'configuration'
  },
  slug: 'configuration/handbook-navigation',
  full_slug: 'configuration/handbook-navigation',
  default_full_slug: null,
  translations: [],
  translated_slugs: [],
  meta_data: null,
  is_startpage: false,
  parent_id: null,
  group_id: 'default',
  position: -1,
  tag_list: [],
  release_id: null,
  lang: 'default',
  path: null,
  alternates: [],
  sort_by_date: null
};

export const mockHandbookHierarchy: HandbookLevelStoryblok[] = [
  {
    name: '📚 Getting Started',
    highlight: false,
    _uid: 'getting-started',
    component: 'handbook-level',
    homepage: {
      name: 'Getting Started',
      full_slug: 'handbook/getting-started',
      content: {
        cover: 'https://via.placeholder.com/300x200?text=Getting+Started',
        last_updated: new Date().toISOString(),
        body: [
          {
            type: 'heading',
            content: 'Welcome to the team'
          }
        ]
      }
    },
    children: [
      {
        name: 'Welcome to Significa',
        highlight: true,
        _uid: 'welcome',
        component: 'handbook-level',
        homepage: {
          name: 'Welcome to Significa',
          full_slug: 'handbook/getting-started/welcome',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Welcome',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Welcome to our team! We are excited to have you on board.'
              }
            ]
          }
        }
      },
      {
        name: 'Onboarding Checklist',
        highlight: false,
        _uid: 'onboarding',
        component: 'handbook-level',
        homepage: {
          name: 'Onboarding Checklist',
          full_slug: 'handbook/getting-started/onboarding',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Onboarding',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'list',
                content: '1. Set up your development environment\n2. Meet the team\n3. Review key projects\n4. Complete training'
              }
            ]
          }
        }
      },
      {
        name: 'Tools & Access',
        highlight: false,
        _uid: 'tools',
        component: 'handbook-level',
        homepage: {
          name: 'Tools & Access',
          full_slug: 'handbook/getting-started/tools',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Tools',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Here are the tools you will need access to: GitHub, Slack, Figma, and more.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    name: '🎯 Our Culture',
    highlight: true,
    _uid: 'our-culture',
    component: 'handbook-level',
    homepage: {
      name: 'Our Culture',
      full_slug: 'handbook/culture',
      content: {
        cover: 'https://via.placeholder.com/300x200?text=Culture',
        last_updated: new Date().toISOString(),
        body: [
          {
            type: 'paragraph',
            content: 'Our culture is built on collaboration, innovation, and continuous learning.'
          }
        ]
      }
    },
    children: [
      {
        name: 'Core Values',
        highlight: true,
        _uid: 'values',
        component: 'handbook-level',
        homepage: {
          name: 'Core Values',
          full_slug: 'handbook/culture/values',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Values',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'list',
                content: '• Integrity\n• Innovation\n• Collaboration\n• Excellence\n• Transparency'
              }
            ]
          }
        }
      },
      {
        name: 'Work Principles',
        highlight: false,
        _uid: 'principles',
        component: 'handbook-level',
        homepage: {
          name: 'Work Principles',
          full_slug: 'handbook/culture/principles',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Principles',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'We believe in transparency, ownership, and continuous improvement.'
              }
            ]
          }
        }
      },
      {
        name: 'Team Communication',
        highlight: false,
        _uid: 'communication',
        component: 'handbook-level',
        homepage: {
          name: 'Team Communication',
          full_slug: 'handbook/culture/communication',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Communication',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Communication is key to our success. We encourage open and honest dialogue.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    name: '📋 Policies & Guidelines',
    highlight: false,
    _uid: 'policies',
    component: 'handbook-level',
    homepage: {
      name: 'Policies & Guidelines',
      full_slug: 'handbook/policies',
      content: {
        cover: 'https://via.placeholder.com/300x200?text=Policies',
        last_updated: new Date().toISOString(),
        body: [
          {
            type: 'paragraph',
            content: 'Review our company policies and guidelines.'
          }
        ]
      }
    },
    children: [
      {
        name: 'Code of Conduct',
        highlight: false,
        _uid: 'conduct',
        component: 'handbook-level',
        homepage: {
          name: 'Code of Conduct',
          full_slug: 'handbook/policies/conduct',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Code+of+Conduct',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Our code of conduct outlines our commitment to a respectful workplace.'
              }
            ]
          }
        }
      },
      {
        name: 'Time Off & Leave',
        highlight: false,
        _uid: 'time-off',
        component: 'handbook-level',
        homepage: {
          name: 'Time Off & Leave',
          full_slug: 'handbook/policies/time-off',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Time+Off',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Information about vacation, sick leave, and other time off policies.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    name: '💻 Engineering',
    highlight: false,
    _uid: 'engineering',
    component: 'handbook-level',
    homepage: {
      name: 'Engineering',
      full_slug: 'handbook/engineering',
      content: {
        cover: 'https://via.placeholder.com/300x200?text=Engineering',
        last_updated: new Date().toISOString(),
        body: [
          {
            type: 'paragraph',
            content: 'Engineering practices and guidelines.'
          }
        ]
      }
    },
    children: [
      {
        name: 'Development Setup',
        highlight: false,
        _uid: 'dev-setup',
        component: 'handbook-level',
        homepage: {
          name: 'Development Setup',
          full_slug: 'handbook/engineering/dev-setup',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Dev+Setup',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'paragraph',
                content: 'Instructions for setting up your development environment.'
              }
            ]
          }
        }
      },
      {
        name: 'Code Standards',
        highlight: false,
        _uid: 'standards',
        component: 'handbook-level',
        homepage: {
          name: 'Code Standards',
          full_slug: 'handbook/engineering/standards',
          content: {
            cover: 'https://via.placeholder.com/300x200?text=Code+Standards',
            last_updated: new Date().toISOString(),
            body: [
              {
                type: 'list',
                content: '• Use meaningful variable names\n• Follow project conventions\n• Write tests\n• Document complex logic\n• Review code before merge'
              }
            ]
          }
        }
      }
    ]
  }
];
