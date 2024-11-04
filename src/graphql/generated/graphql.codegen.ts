import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AuthPayload = {
  accessToken?: Maybe<Scalars["String"]["output"]>;
  guest?: Maybe<Guest>;
  user?: Maybe<User>;
};

export type Blacklist = {
  blockedId: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type Chat = {
  Message?: Maybe<Array<Maybe<Message>>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  participants?: Maybe<Array<Maybe<User>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CompanionRequest = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  receiver?: Maybe<User>;
  receiverId: Scalars["String"]["output"];
  requester?: Maybe<User>;
  status: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type FavoriteList = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  favoriteUserId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export enum Gender {
  Female = "female",
  Male = "male",
}

export type Guest = {
  birthday?: Maybe<Scalars["DateTime"]["output"]>;
  city?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  gender?: Maybe<Gender>;
  id: Scalars["String"]["output"];
  images?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  mySpecialty?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  personalInterests?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  province?: Maybe<Scalars["String"]["output"]>;
  travelInterests?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HostingInvitation = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  guest?: Maybe<User>;
  guestId: Scalars["String"]["output"];
  host?: Maybe<User>;
  hostId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type Includes = {
  blacklists?: Scalars["Boolean"]["input"];
  chats?: Scalars["Boolean"]["input"];
  companionRequests?: Scalars["Boolean"]["input"];
  favoriteLists?: Scalars["Boolean"]["input"];
  guestInvitations?: Scalars["Boolean"]["input"];
  hostingInvitations?: Scalars["Boolean"]["input"];
  messages?: Scalars["Boolean"]["input"];
  plans?: Scalars["Boolean"]["input"];
  receivedRequests?: Scalars["Boolean"]["input"];
  reportsMade?: Scalars["Boolean"]["input"];
};

export enum Language {
  Abkhaz = "Abkhaz",
  Afrikaans = "Afrikaans",
  Albanian = "Albanian",
  Altai = "Altai",
  Amharic = "Amharic",
  Armenian = "Armenian",
  Avar = "Avar",
  Aymara = "Aymara",
  Azerbaijani = "Azerbaijani",
  Bashkir = "Bashkir",
  Basque = "Basque",
  Bengali = "Bengali",
  Bosnian = "Bosnian",
  Breton = "Breton",
  Buryat = "Buryat",
  Cantonese = "Cantonese",
  Catalan = "Catalan",
  Cebuano = "Cebuano",
  Chechen = "Chechen",
  Chuvash = "Chuvash",
  Corsican = "Corsican",
  Dutch = "Dutch",
  English = "English",
  Frisian = "Frisian",
  Galician = "Galician",
  Georgian = "Georgian",
  German = "German",
  Greek = "Greek",
  Guarani = "Guarani",
  Gujarati = "Gujarati",
  HaitianCreole = "HaitianCreole",
  Hebrew = "Hebrew",
  Hindi = "Hindi",
  Huichol = "Huichol",
  Hungarian = "Hungarian",
  Icelandic = "Icelandic",
  Igbo = "Igbo",
  Indonesian = "Indonesian",
  Ingush = "Ingush",
  Irish = "Irish",
  Italian = "Italian",
  Japanese = "Japanese",
  Javanese = "Javanese",
  Kabardian = "Kabardian",
  Kalmyk = "Kalmyk",
  KarachayBalkar = "KarachayBalkar",
  Kazakh = "Kazakh",
  Khmer = "Khmer",
  Korean = "Korean",
  Kurdish = "Kurdish",
  Kyrgyz = "Kyrgyz",
  Lao = "Lao",
  Laz = "Laz",
  Lezgin = "Lezgin",
  Luxembourgish = "Luxembourgish",
  Malagasy = "Malagasy",
  Maltese = "Maltese",
  Manx = "Manx",
  Maori = "Maori",
  Marathi = "Marathi",
  Mari = "Mari",
  Mazahua = "Mazahua",
  Mingrelian = "Mingrelian",
  Mixtec = "Mixtec",
  Mongolian = "Mongolian",
  Mordvin = "Mordvin",
  Nahuatl = "Nahuatl",
  Nepali = "Nepali",
  Ossetian = "Ossetian",
  Otomi = "Otomi",
  Pashto = "Pashto",
  Persian = "Persian",
  Polish = "Polish",
  Portuguese = "Portuguese",
  Purepecha = "Purepecha",
  Quechua = "Quechua",
  Romanian = "Romanian",
  Russian = "Russian",
  Sami = "Sami",
  ScottishGaelic = "ScottishGaelic",
  SerboCroatian = "SerboCroatian",
  Sinhala = "Sinhala",
  Somali = "Somali",
  Spanish = "Spanish",
  Svan = "Svan",
  Swahili = "Swahili",
  Tajik = "Tajik",
  Tatar = "Tatar",
  Telugu = "Telugu",
  Thai = "Thai",
  Tibetan = "Tibetan",
  Turkish = "Turkish",
  Turkmen = "Turkmen",
  Tuvan = "Tuvan",
  Ukrainian = "Ukrainian",
  Urdu = "Urdu",
  Uyghur = "Uyghur",
  Uzbek = "Uzbek",
  Vietnamese = "Vietnamese",
  Welsh = "Welsh",
  Xhosa = "Xhosa",
  Yakut = "Yakut",
  Yiddish = "Yiddish",
  Yoruba = "Yoruba",
  Zulu = "Zulu",
}

export type Message = {
  chat?: Maybe<Chat>;
  content: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  sender?: Maybe<User>;
};

export type Mutation = {
  Signin?: Maybe<Scalars["String"]["output"]>;
  Signup?: Maybe<Scalars["String"]["output"]>;
  addToBlackList?: Maybe<Blacklist>;
  addToFavorite?: Maybe<FavoriteList>;
  createCompanionRequest?: Maybe<CompanionRequest>;
  createHostingInvitation?: Maybe<HostingInvitation>;
  createPayment?: Maybe<Scalars["String"]["output"]>;
  createReport?: Maybe<ViolationReport>;
  logInAsGuest?: Maybe<AuthPayload>;
  refreshAccessToken?: Maybe<AuthPayload>;
  removeCompanionRequest?: Maybe<CompanionRequest>;
  removeFromBlacklist?: Maybe<Blacklist>;
  removeFromFavorite?: Maybe<FavoriteList>;
  removeHostingInvitation?: Maybe<HostingInvitation>;
  removeReport?: Maybe<ViolationReport>;
  updateUser?: Maybe<User>;
  verifyOtp?: Maybe<AuthPayload>;
  verifyPayment?: Maybe<Plan>;
};

export type MutationSigninArgs = {
  phoneNumber: Scalars["String"]["input"];
};

export type MutationSignupArgs = {
  phoneNumber: Scalars["String"]["input"];
};

export type MutationAddToBlackListArgs = {
  blockedId: Scalars["String"]["input"];
};

export type MutationAddToFavoriteArgs = {
  favoriteId: Scalars["String"]["input"];
};

export type MutationCreateCompanionRequestArgs = {
  receiverId: Scalars["String"]["input"];
  status: Scalars["String"]["input"];
};

export type MutationCreateHostingInvitationArgs = {
  guestId: Scalars["String"]["input"];
  status: Scalars["String"]["input"];
};

export type MutationCreatePaymentArgs = {
  type: PlanType;
};

export type MutationCreateReportArgs = {
  reason: Scalars["String"]["input"];
  reportedId: Scalars["String"]["input"];
};

export type MutationLogInAsGuestArgs = {
  birthday: Scalars["DateTime"]["input"];
  city: Scalars["String"]["input"];
  gender: Gender;
  images: Array<Scalars["String"]["input"]>;
  mySpecialty: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  personalInterests: Array<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
  travelInterests: Array<Scalars["String"]["input"]>;
};

export type MutationRemoveCompanionRequestArgs = {
  requestId: Scalars["String"]["input"];
};

export type MutationRemoveFromBlacklistArgs = {
  blockedId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationRemoveFromFavoriteArgs = {
  favoriteId: Scalars["String"]["input"];
};

export type MutationRemoveHostingInvitationArgs = {
  invitationId: Scalars["String"]["input"];
};

export type MutationRemoveReportArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  AmountOfEarlyRising?: InputMaybe<Scalars["String"]["input"]>;
  avatar?: InputMaybe<Scalars["String"]["input"]>;
  bio?: InputMaybe<Scalars["String"]["input"]>;
  birthday?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Gender>;
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  languages?: InputMaybe<Array<Language>>;
  livedInPlaces?: InputMaybe<Array<Scalars["String"]["input"]>>;
  maritalStatus?: InputMaybe<Scalars["String"]["input"]>;
  mySpecialty?: InputMaybe<Array<Scalars["String"]["input"]>>;
  personalInterests?: InputMaybe<Array<PersonalInterests>>;
  province?: InputMaybe<Scalars["String"]["input"]>;
  smokeStatus?: InputMaybe<Scalars["String"]["input"]>;
  sportsStatus?: InputMaybe<Scalars["String"]["input"]>;
  travelInterests?: InputMaybe<Array<TravelInterests>>;
  traveledToPlaces?: InputMaybe<Array<Scalars["String"]["input"]>>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationVerifyOtpArgs = {
  otp: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
};

export type MutationVerifyPaymentArgs = {
  refId: Scalars["String"]["input"];
  type: PlanType;
};

export type Notification = {
  actionId: Scalars["String"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  read: Scalars["Boolean"]["output"];
  type: NotificationType;
  user: User;
};

export enum NotificationType {
  Alert = "ALERT",
  FriendRequest = "FRIEND_REQUEST",
  Invitation = "INVITATION",
  Message = "MESSAGE",
}

export enum PersonalInterests {
  Acting = "Acting",
  ActionMovies = "ActionMovies",
  Adventure = "Adventure",
  Ballad = "Ballad",
  Basketball = "Basketball",
  Billiards = "Billiards",
  BoardGames = "BoardGames",
  Bowling = "Bowling",
  Camping = "Camping",
  ClassicalMusic = "ClassicalMusic",
  CoffeeAndDrinks = "CoffeeAndDrinks",
  ComedyMovies = "ComedyMovies",
  DanceMusic = "DanceMusic",
  FastFood = "FastFood",
  FilmDirecting = "FilmDirecting",
  Fitness = "Fitness",
  InternationalCuisine = "InternationalCuisine",
  JazzMusic = "JazzMusic",
  MountainClimbing = "MountainClimbing",
  MoviesAndSeries = "MoviesAndSeries",
  PetsBird = "Pets_Bird",
  PetsCat = "Pets_Cat",
  PetsDog = "Pets_Dog",
  PetsFish = "Pets_Fish",
  PetsHamster = "Pets_Hamster",
  PingPong = "PingPong",
  PopMusic = "PopMusic",
  RapMusic = "RapMusic",
  RomanticMovies = "RomanticMovies",
  ScienceFictionMovies = "ScienceFictionMovies",
  Singing = "Singing",
  SportsMatches = "SportsMatches",
  Sweets = "Sweets",
  ThrillerMovies = "ThrillerMovies",
  Traveling = "Traveling",
  Volleyball = "Volleyball",
}

export type Plan = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  expireAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<PlanType>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  user?: Maybe<User>;
};

export enum PlanType {
  Free = "free",
  Premium = "premium",
}

export type Query = {
  getCompanionRequests: Array<CompanionRequest>;
  getHostingInvitations: Array<HostingInvitation>;
  getRandomUser?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
};

export type QueryGetRandomUserArgs = {
  AmountOfEarlyRising?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Gender>;
  languages?: InputMaybe<Array<Language>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  livedInPlaces?: InputMaybe<Array<Scalars["String"]["input"]>>;
  maritalStatus?: InputMaybe<Scalars["String"]["input"]>;
  mySpecialty?: InputMaybe<Array<Scalars["String"]["input"]>>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  personalInterests?: InputMaybe<Array<Scalars["String"]["input"]>>;
  province?: InputMaybe<Scalars["String"]["input"]>;
  smokeStatus?: InputMaybe<Scalars["String"]["input"]>;
  sportsStatus?: InputMaybe<Scalars["String"]["input"]>;
  travelInterests?: InputMaybe<Array<Scalars["String"]["input"]>>;
  traveledToPlaces?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryGetUserArgs = {
  include?: InputMaybe<Includes>;
};

export type QueryGetUsersArgs = {
  count: Scalars["Int"]["input"];
};

export enum Role {
  Admin = "admin",
  Guest = "guest",
  User = "user",
}

export enum TravelInterests {
  Adventure = "Adventure",
  Anthropology = "Anthropology",
  Beach = "Beach",
  Boating = "Boating",
  Camping = "Camping",
  CliffDiving = "CliffDiving",
  Cultural = "Cultural",
  Fishing = "Fishing",
  FoodAndCooking = "FoodAndCooking",
  Hiking = "Hiking",
  HistoricalSites = "HistoricalSites",
  Kayaking = "Kayaking",
  MountainClimbing = "MountainClimbing",
  Nature = "Nature",
  OffroadRiding = "OffroadRiding",
  RuralTourism = "RuralTourism",
  ScubaDiving = "ScubaDiving",
  Shopping = "Shopping",
  Skiing = "Skiing",
  Swimming = "Swimming",
  TrainTravel = "TrainTravel",
  Walking = "Walking",
  WildLife = "WildLife",
}

export type User = {
  AmountOfEarlyRising?: Maybe<Scalars["String"]["output"]>;
  LivedInPlaces?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  avatar?: Maybe<Scalars["String"]["output"]>;
  bio?: Maybe<Scalars["String"]["output"]>;
  birthday?: Maybe<Scalars["DateTime"]["output"]>;
  blacklists?: Maybe<Array<Maybe<Blacklist>>>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  city?: Maybe<Scalars["String"]["output"]>;
  companionRequests?: Maybe<Array<Maybe<CompanionRequest>>>;
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  favoriteList?: Maybe<Array<Maybe<FavoriteList>>>;
  gender?: Maybe<Gender>;
  guestInvitations?: Maybe<Array<Maybe<HostingInvitation>>>;
  hostingInvitations?: Maybe<Array<Maybe<HostingInvitation>>>;
  id: Scalars["String"]["output"];
  images?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  languages?: Maybe<Array<Maybe<Language>>>;
  maritalStatus?: Maybe<Scalars["String"]["output"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  mySpecialty?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  otp?: Maybe<Scalars["String"]["output"]>;
  otpExpiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  personalInterests?: Maybe<Array<Maybe<PersonalInterests>>>;
  phoneNumber: Scalars["String"]["output"];
  plans?: Maybe<Array<Maybe<Plan>>>;
  province?: Maybe<Scalars["String"]["output"]>;
  receivedRequests?: Maybe<Array<Maybe<CompanionRequest>>>;
  reportsMade?: Maybe<Array<Maybe<ViolationReport>>>;
  role: Role;
  score?: Maybe<Scalars["Int"]["output"]>;
  smokeStatus?: Maybe<Scalars["String"]["output"]>;
  sportsStatus?: Maybe<Scalars["String"]["output"]>;
  travelInterests?: Maybe<Array<Maybe<TravelInterests>>>;
  traveledToPlaces?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  updatedAt: Scalars["DateTime"]["output"];
  username?: Maybe<Scalars["String"]["output"]>;
  verified: Scalars["Boolean"]["output"];
};

export type ViolationReport = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  reason: Scalars["String"]["output"];
  reportedId: Scalars["String"]["output"];
  reporter?: Maybe<User>;
  reporterId: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type SignupMutationVariables = Exact<{
  phoneNumber: Scalars["String"]["input"];
}>;

export type SignupMutation = { Signin?: string | null };

export type SignupVerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars["String"]["input"];
  otp: Scalars["String"]["input"];
}>;

export type SignupVerifyOtpMutation = {
  verifyOtp?: { accessToken?: string | null } | null;
};

export const SignupDocument = gql`
  mutation Signup($phoneNumber: String!) {
    Signin(phoneNumber: $phoneNumber)
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options,
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const SignupVerifyOtpDocument = gql`
  mutation SignupVerifyOtp($phoneNumber: String!, $otp: String!) {
    verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
      accessToken
    }
  }
`;
export type SignupVerifyOtpMutationFn = Apollo.MutationFunction<
  SignupVerifyOtpMutation,
  SignupVerifyOtpMutationVariables
>;

/**
 * __useSignupVerifyOtpMutation__
 *
 * To run a mutation, you first call `useSignupVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupVerifyOtpMutation, { data, loading, error }] = useSignupVerifyOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useSignupVerifyOtpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupVerifyOtpMutation,
    SignupVerifyOtpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignupVerifyOtpMutation,
    SignupVerifyOtpMutationVariables
  >(SignupVerifyOtpDocument, options);
}
export type SignupVerifyOtpMutationHookResult = ReturnType<
  typeof useSignupVerifyOtpMutation
>;
export type SignupVerifyOtpMutationResult =
  Apollo.MutationResult<SignupVerifyOtpMutation>;
export type SignupVerifyOtpMutationOptions = Apollo.BaseMutationOptions<
  SignupVerifyOtpMutation,
  SignupVerifyOtpMutationVariables
>;
