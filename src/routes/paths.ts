export const paths = {
  welcome: {
    main: '/welcome', // Homepage
  },
  signup: {
    main: '/signup', // Signup page
  },
  notifications: {
    main: '/notifications',
  },
  settings: {
    main: '/settings',
    bills: '/settings/bills',
    support: '/settings/support',
    questions: '/settings/support/questions',
    contactSupport: '/settings/support/contact-support',
    aboutUs: '/settings/support/about-us',
    guide: '/settings/guide',
    searchTypeGuide: '/settings/guide/search-type',
    communicationGuide: '/settings/guide/communication',
  },
  recommendedUsers: {
    main: '/recommended-user',
    profile: {
      main: '/recommended-user/:id',
      exactPath: (id: string) => `/recommended-user/${id}`,
    },
  },

  profile: {
    main: '/profile', // User profile page
    userProfile: {
      main: '/profile/user/:id',
      exactPath: (id: string) => `/profile/user/${id}`,
    },
    editProfile: '/profile/edit',
    record: '/profile/complete/record',
    avatar: '/profile/complete/avatar',
    completeProfile: '/profile/complete', // Complete profile page
    identityVerification: '/profile/complete/identify-verification', // Identity verification
    completePictures: '/profile/complete/pictures', // Complete pictures
    completeTravelInterests: '/profile/complete/general-interests', // General interests
    completePersonalInterests: '/profile/complete/personal-interests', // Personal interests
    completeProvinces: '/profile/complete/provinces', // Residence city
    completeSpecialty: '/profile/complete/specialty', // Specialty
    basicInformations: '/profile/complete/basic-informations', // Basic information
    basicInformationsAll: '/profile/complete/basic-informations/all', // Basic information
    languagesKnow: '/profile/complete/languages-know', // Language skills
  },
  favorite: {
    main: '/favorite',
  },
  chat: {
    main: '/chat',
    search: '/chat/search',
    contact: {
      main: '/chat/contact/:id',
      exactPath: (id: string) => `/chat/contact/${id}`,
    },
  },
  blocked: {
    main: '/blocked',
  },
  plans: {
    main: '/plans',
    freePlan: '/free-plan',
    confirm: {
      main: '/plans/confirm/:id',
      exactPath: (id: number) => `/plans/confirm/${id}`,
    },
  },
  explore: {
    main: '/explore', // Explore page
    filter: '/explore/filters', // Explore filters
  },
  main: {
    main: '/explore',
    explore: '/explore',
    profile: '/profile', // Complete profile within Explore
    chat: '/chat', // Chat page in Explore
    notifications: '/notifications',
  },
};
