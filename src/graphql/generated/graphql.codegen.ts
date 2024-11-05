import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  accessToken?: Maybe<Scalars['String']['output']>;
  guest?: Maybe<Guest>;
  user?: Maybe<User>;
};

export type Blacklist = {
  blockedId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type Chat = {
  Message?: Maybe<Array<Maybe<Message>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  participants?: Maybe<Array<Maybe<User>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanionRequest = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  receiver?: Maybe<User>;
  receiverId: Scalars['String']['output'];
  requester?: Maybe<User>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FavoriteList = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  favoriteUserId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export enum Gender {
  Female = 'female',
  Male = 'male'
}

export type Guest = {
  birthday?: Maybe<Scalars['DateTime']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  mySpecialty?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  personalInterests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  province?: Maybe<Scalars['String']['output']>;
  travelInterests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type HostingInvitation = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  guest?: Maybe<User>;
  guestId: Scalars['String']['output'];
  host?: Maybe<User>;
  hostId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Includes = {
  blacklists?: Scalars['Boolean']['input'];
  chats?: Scalars['Boolean']['input'];
  companionRequests?: Scalars['Boolean']['input'];
  favoriteLists?: Scalars['Boolean']['input'];
  guestInvitations?: Scalars['Boolean']['input'];
  hostingInvitations?: Scalars['Boolean']['input'];
  messages?: Scalars['Boolean']['input'];
  plans?: Scalars['Boolean']['input'];
  receivedRequests?: Scalars['Boolean']['input'];
  reportsMade?: Scalars['Boolean']['input'];
};

export enum Language {
  Abkhaz = 'ABKHAZ',
  Acehnese = 'ACEHNESE',
  Acholi = 'ACHOLI',
  Afar = 'AFAR',
  Afrikaans = 'AFRIKAANS',
  Akan = 'AKAN',
  Albanian = 'ALBANIAN',
  Alur = 'ALUR',
  Amharic = 'AMHARIC',
  Arabic = 'ARABIC',
  Armenian = 'ARMENIAN',
  Assamese = 'ASSAMESE',
  Avar = 'AVAR',
  Awadhi = 'AWADHI',
  Aymara = 'AYMARA',
  Azerbaijani = 'AZERBAIJANI',
  Balinese = 'BALINESE',
  Baluchi = 'BALUCHI',
  Bambara = 'BAMBARA',
  Baoule = 'BAOULE',
  Bashkir = 'BASHKIR',
  Basque = 'BASQUE',
  BatakKaro = 'BATAK_KARO',
  BatakSimalungun = 'BATAK_SIMALUNGUN',
  BatakToba = 'BATAK_TOBA',
  Belarusian = 'BELARUSIAN',
  Bemba = 'BEMBA',
  Bengali = 'BENGALI',
  Betawi = 'BETAWI',
  Bhojpuri = 'BHOJPURI',
  Bikol = 'BIKOL',
  Bislama = 'BISLAMA',
  Bosnian = 'BOSNIAN',
  Breton = 'BRETON',
  Bulgarian = 'BULGARIAN',
  Burmese = 'BURMESE',
  Cantonese = 'CANTONESE',
  Catalan = 'CATALAN',
  Cebuano = 'CEBUANO',
  Chamorro = 'CHAMORRO',
  Chechen = 'CHECHEN',
  Chichewa = 'CHICHEWA',
  ChineseSimplified = 'CHINESE_SIMPLIFIED',
  ChineseTraditional = 'CHINESE_TRADITIONAL',
  Chuukes = 'CHUUKES',
  Chuvash = 'CHUVASH',
  Corsican = 'CORSICAN',
  CrimeanTatar = 'CRIMEAN_TATAR',
  Croatian = 'CROATIAN',
  Czech = 'CZECH',
  Danish = 'DANISH',
  Dari = 'DARI',
  Dinka = 'DINKA',
  Divehi = 'DIVEHI',
  Dombe = 'DOMBE',
  Dutch = 'DUTCH',
  Dyula = 'DYULA',
  Dzongkha = 'DZONGKHA',
  English = 'ENGLISH',
  Esperanto = 'ESPERANTO',
  Estonian = 'ESTONIAN',
  Ewe = 'EWE',
  Faroese = 'FAROESE',
  Fijian = 'FIJIAN',
  Filipino = 'FILIPINO',
  Finnish = 'FINNISH',
  Fon = 'FON',
  French = 'FRENCH',
  Frisian = 'FRISIAN',
  Friulian = 'FRIULIAN',
  Fulani = 'FULANI',
  Ga = 'GA',
  Galician = 'GALICIAN',
  Georgian = 'GEORGIAN',
  German = 'GERMAN',
  Greek = 'GREEK',
  Guarani = 'GUARANI',
  Gujarati = 'GUJARATI',
  HaitianCreole = 'HAITIAN_CREOLE',
  HakhaChin = 'HAKHA_CHIN',
  Hausa = 'HAUSA',
  Hawaiian = 'HAWAIIAN',
  Hebrew = 'HEBREW',
  Hiligaynon = 'HILIGAYNON',
  Hindi = 'HINDI',
  Hmong = 'HMONG',
  Hungarian = 'HUNGARIAN',
  Hunsrik = 'HUNSRIK',
  Iban = 'IBAN',
  Icelandic = 'ICELANDIC',
  Igbo = 'IGBO',
  Ilocano = 'ILOCANO',
  Indonesian = 'INDONESIAN',
  Irish = 'IRISH',
  Italian = 'ITALIAN',
  JamaicanPatois = 'JAMAICAN_PATOIS',
  Japanese = 'JAPANESE',
  Javanese = 'JAVANESE',
  Jingpo = 'JINGPO',
  Kalaallisut = 'KALAALLISUT',
  Kannada = 'KANNADA',
  Kanuri = 'KANURI',
  Kapampangan = 'KAPAMPANGAN',
  Kazakh = 'KAZAKH',
  Khasi = 'KHASI',
  Khmer = 'KHMER',
  Kiga = 'KIGA',
  Kikongo = 'KIKONGO',
  Kinyarwanda = 'KINYARWANDA',
  Kirundi = 'KIRUNDI',
  Kituba = 'KITUBA',
  Kokborok = 'KOKBOROK',
  Komi = 'KOMI',
  Korean = 'KOREAN',
  KurdishKurmanji = 'KURDISH_KURMANJI',
  KurdishSorani = 'KURDISH_SORANI',
  Kyrgyz = 'KYRGYZ',
  Lao = 'LAO',
  Latgalian = 'LATGALIAN',
  Latin = 'LATIN',
  Latvian = 'LATVIAN',
  Ligurian = 'LIGURIAN',
  Limburgish = 'LIMBURGISH',
  Lingala = 'LINGALA',
  Lithuanian = 'LITHUANIAN',
  Lombard = 'LOMBARD',
  Luo = 'LUO',
  Luxembourgish = 'LUXEMBOURGISH',
  Macedonian = 'MACEDONIAN',
  Madurese = 'MADURESE',
  Makassar = 'MAKASSAR',
  Malagasy = 'MALAGASY',
  Malay = 'MALAY',
  Malayalam = 'MALAYALAM',
  MalayJawi = 'MALAY_JAWI',
  Maltese = 'MALTESE',
  Manx = 'MANX',
  Maori = 'MAORI',
  Marathi = 'MARATHI',
  Marshallese = 'MARSHALLESE',
  Marwadi = 'MARWADI',
  MauritianCreole = 'MAURITIAN_CREOLE',
  MeadowMari = 'MEADOW_MARI',
  Minang = 'MINANG',
  Mongolian = 'MONGOLIAN',
  Nahuatl = 'NAHUATL',
  Ndau = 'NDAU',
  NdebeleSouth = 'NDEBELE_SOUTH',
  NepalbhasaNewari = 'NEPALBHASA_NEWARI',
  Nepali = 'NEPALI',
  Nko = 'NKO',
  Norwegian = 'NORWEGIAN',
  Nuer = 'NUER',
  Nyanja = 'NYANJA',
  Occitan = 'OCCITAN',
  Odia = 'ODIA',
  Ossetian = 'OSSETIAN',
  Pangasinan = 'PANGASINAN',
  Papiamento = 'PAPIAMENTO',
  Pashto = 'PASHTO',
  Persian = 'PERSIAN',
  Polish = 'POLISH',
  Portuguese = 'PORTUGUESE',
  PunjabiGurmukhi = 'PUNJABI_GURMUKHI',
  PunjabiShahmukhi = 'PUNJABI_SHAHMUKHI',
  Quechua = 'QUECHUA',
  QEqchi = 'Q_EQCHI',
  Romani = 'ROMANI',
  Romanian = 'ROMANIAN',
  Russian = 'RUSSIAN',
  SamiNorth = 'SAMI_NORTH',
  Samoan = 'SAMOAN',
  Sango = 'SANGO',
  Santali = 'SANTALI',
  ScotsGaelic = 'SCOTS_GAELIC',
  Serbian = 'SERBIAN',
  Sesotho = 'SESOTHO',
  SeychelloisCreole = 'SEYCHELLOIS_CREOLE',
  Shan = 'SHAN',
  Shona = 'SHONA',
  Sicilian = 'SICILIAN',
  Silesian = 'SILESIAN',
  Sindhi = 'SINDHI',
  Sinhala = 'SINHALA',
  Slovak = 'SLOVAK',
  Slovenian = 'SLOVENIAN',
  Somali = 'SOMALI',
  Spanish = 'SPANISH',
  Sundanese = 'SUNDANESE',
  Susu = 'SUSU',
  Swahili = 'SWAHILI',
  Swati = 'SWATI',
  Swedish = 'SWEDISH',
  Tahitian = 'TAHITIAN',
  Tajik = 'TAJIK',
  Tamazight = 'TAMAZIGHT',
  Tamil = 'TAMIL',
  Tatar = 'TATAR',
  Telugu = 'TELUGU',
  Tetum = 'TETUM',
  Thai = 'THAI',
  Tibetan = 'TIBETAN',
  Tigrinya = 'TIGRINYA',
  Tiv = 'TIV',
  TokPisin = 'TOK_PISIN',
  Tongan = 'TONGAN',
  Tswana = 'TSWANA',
  Tulu = 'TULU',
  Tumbuka = 'TUMBUKA',
  Turkish = 'TURKISH',
  Turkmen = 'TURKMEN',
  Tuvan = 'TUVAN',
  Udmurt = 'UDMURT',
  Ukrainian = 'UKRAINIAN',
  Urdu = 'URDU',
  Uyghur = 'UYGHUR',
  Uzbek = 'UZBEK',
  Venda = 'VENDA',
  Venetian = 'VENETIAN',
  Vietnamese = 'VIETNAMESE',
  Waray = 'WARAY',
  Welsh = 'WELSH',
  Wolof = 'WOLOF',
  Xhosa = 'XHOSA',
  Yakut = 'YAKUT',
  Yiddish = 'YIDDISH',
  Yoruba = 'YORUBA',
  YucatecMaya = 'YUCATEC_MAYA',
  Zapotec = 'ZAPOTEC',
  Zulu = 'ZULU'
}

export type Message = {
  chat?: Maybe<Chat>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  sender?: Maybe<User>;
};

export type Mutation = {
  Signin?: Maybe<Scalars['String']['output']>;
  Signup?: Maybe<Scalars['String']['output']>;
  addToBlackList?: Maybe<Blacklist>;
  addToFavorite?: Maybe<FavoriteList>;
  createCompanionRequest?: Maybe<CompanionRequest>;
  createHostingInvitation?: Maybe<HostingInvitation>;
  createPayment?: Maybe<Scalars['String']['output']>;
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
  phoneNumber: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationAddToBlackListArgs = {
  blockedId: Scalars['String']['input'];
};


export type MutationAddToFavoriteArgs = {
  favoriteId: Scalars['String']['input'];
};


export type MutationCreateCompanionRequestArgs = {
  receiverId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreateHostingInvitationArgs = {
  guestId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreatePaymentArgs = {
  type: PlanType;
};


export type MutationCreateReportArgs = {
  reason: Scalars['String']['input'];
  reportedId: Scalars['String']['input'];
};


export type MutationLogInAsGuestArgs = {
  birthday: Scalars['DateTime']['input'];
  city: Scalars['String']['input'];
  gender: Gender;
  images: Array<Scalars['String']['input']>;
  mySpecialty: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  personalInterests: Array<Scalars['String']['input']>;
  province: Scalars['String']['input'];
  travelInterests: Array<Scalars['String']['input']>;
};


export type MutationRemoveCompanionRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationRemoveFromBlacklistArgs = {
  blockedId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveFromFavoriteArgs = {
  favoriteId: Scalars['String']['input'];
};


export type MutationRemoveHostingInvitationArgs = {
  invitationId: Scalars['String']['input'];
};


export type MutationRemoveReportArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  AmountOfEarlyRising?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  livedInPlaces?: InputMaybe<Array<Scalars['String']['input']>>;
  maritalStatus?: InputMaybe<Scalars['String']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  personalInterests?: InputMaybe<Array<Scalars['String']['input']>>;
  province?: InputMaybe<Scalars['String']['input']>;
  smokeStatus?: InputMaybe<Scalars['String']['input']>;
  sportsStatus?: InputMaybe<Scalars['String']['input']>;
  travelInterests?: InputMaybe<Array<Scalars['String']['input']>>;
  traveledToPlaces?: InputMaybe<Array<Scalars['String']['input']>>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyOtpArgs = {
  otp: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationVerifyPaymentArgs = {
  refId: Scalars['String']['input'];
  type: PlanType;
};

export type Notification = {
  actionId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  type: NotificationType;
  user: User;
};

export enum NotificationType {
  Alert = 'ALERT',
  FriendRequest = 'FRIEND_REQUEST',
  Invitation = 'INVITATION',
  Message = 'MESSAGE'
}

export type Plan = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<PlanType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export enum PlanType {
  Free = 'free',
  Premium = 'premium'
}

export type Query = {
  getCompanionRequests: Array<CompanionRequest>;
  getHostingInvitations: Array<HostingInvitation>;
  getRandomUser?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetRandomUserArgs = {
  AmountOfEarlyRising?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  languages?: InputMaybe<Array<Language>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  livedInPlaces?: InputMaybe<Array<Scalars['String']['input']>>;
  maritalStatus?: InputMaybe<Scalars['String']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  personalInterests?: InputMaybe<Array<Scalars['String']['input']>>;
  province?: InputMaybe<Scalars['String']['input']>;
  smokeStatus?: InputMaybe<Scalars['String']['input']>;
  sportsStatus?: InputMaybe<Scalars['String']['input']>;
  travelInterests?: InputMaybe<Array<Scalars['String']['input']>>;
  traveledToPlaces?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetUserArgs = {
  include?: InputMaybe<Includes>;
};


export type QueryGetUsersArgs = {
  count: Scalars['Int']['input'];
};

export enum Role {
  Admin = 'admin',
  Guest = 'guest',
  User = 'user'
}

export type User = {
  AmountOfEarlyRising?: Maybe<Scalars['String']['output']>;
  LivedInPlaces?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  blacklists?: Maybe<Array<Maybe<Blacklist>>>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  city?: Maybe<Scalars['String']['output']>;
  companionRequests?: Maybe<Array<Maybe<CompanionRequest>>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  favoriteList?: Maybe<Array<Maybe<FavoriteList>>>;
  gender?: Maybe<Gender>;
  guestInvitations?: Maybe<Array<Maybe<HostingInvitation>>>;
  hostingInvitations?: Maybe<Array<Maybe<HostingInvitation>>>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  maritalStatus?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  mySpecialty?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  otpExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  personalInterests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  phoneNumber: Scalars['String']['output'];
  plans?: Maybe<Array<Maybe<Plan>>>;
  province?: Maybe<Scalars['String']['output']>;
  receivedRequests?: Maybe<Array<Maybe<CompanionRequest>>>;
  reportsMade?: Maybe<Array<Maybe<ViolationReport>>>;
  role: Role;
  score?: Maybe<Scalars['Int']['output']>;
  smokeStatus?: Maybe<Scalars['String']['output']>;
  sportsStatus?: Maybe<Scalars['String']['output']>;
  travelInterests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  traveledToPlaces?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  verified: Scalars['Boolean']['output'];
};

export type ViolationReport = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  reportedId: Scalars['String']['output'];
  reporter?: Maybe<User>;
  reporterId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignupMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type SignupMutation = { Signin?: string | null };

export type SignupVerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type SignupVerifyOtpMutation = { verifyOtp?: { accessToken?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  travelInterests?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  personalInterests?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  maritalStatus?: InputMaybe<Scalars['String']['input']>;
  smokeStatus?: InputMaybe<Scalars['String']['input']>;
  sportsStatus?: InputMaybe<Scalars['String']['input']>;
  amountOfEarlyRising?: InputMaybe<Scalars['String']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  traveledToPlaces?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  livedInPlaces?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { updateUser?: { id: string } | null };


export const SignupDocument = gql`
    mutation Signup($phoneNumber: String!) {
  Signin(phoneNumber: $phoneNumber)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

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
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SignupVerifyOtpDocument = gql`
    mutation SignupVerifyOtp($phoneNumber: String!, $otp: String!) {
  verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
    accessToken
  }
}
    `;
export type SignupVerifyOtpMutationFn = Apollo.MutationFunction<SignupVerifyOtpMutation, SignupVerifyOtpMutationVariables>;

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
export function useSignupVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<SignupVerifyOtpMutation, SignupVerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupVerifyOtpMutation, SignupVerifyOtpMutationVariables>(SignupVerifyOtpDocument, options);
      }
export type SignupVerifyOtpMutationHookResult = ReturnType<typeof useSignupVerifyOtpMutation>;
export type SignupVerifyOtpMutationResult = Apollo.MutationResult<SignupVerifyOtpMutation>;
export type SignupVerifyOtpMutationOptions = Apollo.BaseMutationOptions<SignupVerifyOtpMutation, SignupVerifyOtpMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($name: String, $gender: Gender, $birthday: String, $province: String, $city: String, $images: [String!], $travelInterests: [String!], $personalInterests: [String!], $mySpecialty: [String!], $username: String, $bio: String, $maritalStatus: String, $smokeStatus: String, $sportsStatus: String, $amountOfEarlyRising: String, $languages: [String!], $traveledToPlaces: [String!], $livedInPlaces: [String!], $avatar: String) {
  updateUser(
    name: $name
    gender: $gender
    birthday: $birthday
    province: $province
    city: $city
    images: $images
    travelInterests: $travelInterests
    personalInterests: $personalInterests
    mySpecialty: $mySpecialty
    username: $username
    bio: $bio
    maritalStatus: $maritalStatus
    smokeStatus: $smokeStatus
    sportsStatus: $sportsStatus
    AmountOfEarlyRising: $amountOfEarlyRising
    languages: $languages
    traveledToPlaces: $traveledToPlaces
    livedInPlaces: $livedInPlaces
    avatar: $avatar
  ) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      gender: // value for 'gender'
 *      birthday: // value for 'birthday'
 *      province: // value for 'province'
 *      city: // value for 'city'
 *      images: // value for 'images'
 *      travelInterests: // value for 'travelInterests'
 *      personalInterests: // value for 'personalInterests'
 *      mySpecialty: // value for 'mySpecialty'
 *      username: // value for 'username'
 *      bio: // value for 'bio'
 *      maritalStatus: // value for 'maritalStatus'
 *      smokeStatus: // value for 'smokeStatus'
 *      sportsStatus: // value for 'sportsStatus'
 *      amountOfEarlyRising: // value for 'amountOfEarlyRising'
 *      languages: // value for 'languages'
 *      traveledToPlaces: // value for 'traveledToPlaces'
 *      livedInPlaces: // value for 'livedInPlaces'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;