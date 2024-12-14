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
  profile: {
    main: '/profile', // User profile page
    editProfile: '/profile/edit_profile',
    completeProfile: '/profile/complete_profile', // Complete profile page
    identityVerification: '/profile/complete_profile/identify_verification', // Identity verification
    completePictures: '/profile/complete_profile/complete_pictures', // Complete pictures
    completeTravelInterests:
      '/profile/complete_profile/complete_generalinterests', // General interests
    completePersonalInterests:
      '/profile/complete_profile/complete_personalInterests', // Personal interests
    completeProvinces: '/profile/complete_profile/complete_provinces', // Residence city
    completeSpecialty: '/profile/complete_profile/complete_specialty', // Specialty
    basicInformations: '/profile/complete_profile/complete_basicinformations', // Basic information
    languagesKnow: '/profile/complete_profile/complete_languagesknow', // Language skills
  },
  favorite: {
    main: '/favorite',
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
    main: '/', // Explore page
    filter: '/explore/filters', // Explore filters
  },
  main: {
    main: '/',
    explore: '/',
    profile: '/profile', // Complete profile within Explore
    chat: '/chat', // Chat page in Explore
    notifications: '/notifications',
  },
};
