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
  profile: {
    main: '/profile', // User profile page
    completeProfile: '/profile/complete_profile', // Complete profile page
    identityVerification: '/profile/complete_profile/identify_verification', // Identity verification
    completePictures: '/profile/complete_profile/complete_pictures', // Complete pictures
    completeGeneralInterests:
      '/profile/complete_profile/complete_generalinterests', // General interests
    completePersonalInterests:
      '/profile/complete_profile/complete_personalInterests', // Personal interests
    completeResidenceCity: '/profile/complete_profile/complete_residencecity', // Residence city
    completeSpecialty: '/profile/complete_profile/complete_specialty', // Specialty
    basicInformations: '/profile/complete_profile/complete_basicinformations', // Basic information
    languagesKnow: '/profile/complete_profile/complete_languagesknow', // Language skills
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
