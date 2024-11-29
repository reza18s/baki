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
  requesterId: Scalars['String']['output'];
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
  searchType: Scalars['String']['input'];
};


export type MutationCreateCompanionRequestArgs = {
  receiverId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
};


export type MutationCreateHostingInvitationArgs = {
  guestId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
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
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  livedInPlaces?: InputMaybe<Array<Scalars['String']['input']>>;
  mainImages?: InputMaybe<Scalars['String']['input']>;
  maritalStatus?: InputMaybe<Scalars['String']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  personalInterests?: InputMaybe<Array<Scalars['String']['input']>>;
  province?: InputMaybe<Scalars['String']['input']>;
  smokeStatus?: InputMaybe<Scalars['String']['input']>;
  spiritStatus?: InputMaybe<Scalars['String']['input']>;
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
  searchType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
};

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
  getMe?: Maybe<User>;
  getNotifications: Array<Notification>;
  getRandomUser?: Maybe<Array<Maybe<RandomUser>>>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetMeArgs = {
  include?: InputMaybe<Includes>;
};


export type QueryGetRandomUserArgs = {
  age?: InputMaybe<Array<Scalars['Int']['input']>>;
  gender?: InputMaybe<Gender>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  lastSeen?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  province?: InputMaybe<Array<Scalars['String']['input']>>;
  travelInterests?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
  include?: InputMaybe<Includes>;
};


export type QueryGetUsersArgs = {
  count: Scalars['Int']['input'];
};

export type RandomUser = {
  AmountOfEarlyRising: Scalars['String']['output'];
  age?: Maybe<Scalars['Int']['output']>;
  avatar: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  birthday: Scalars['DateTime']['output'];
  city: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  languages: Array<Scalars['String']['output']>;
  lastSeen: Scalars['DateTime']['output'];
  livedInPlaces: Array<Scalars['String']['output']>;
  maritalStatus: Scalars['String']['output'];
  mySpecialty: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  personalInterests: Array<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  province: Scalars['String']['output'];
  role: Role;
  smokeStatus: Scalars['String']['output'];
  spiritStatus: Scalars['String']['output'];
  sportsStatus: Scalars['String']['output'];
  travelInterests: Array<Scalars['String']['output']>;
  traveledToPlaces: Array<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export enum Role {
  Admin = 'admin',
  Guest = 'guest',
  User = 'user'
}

export type User = {
  AmountOfEarlyRising?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
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
  images?: Maybe<Array<Scalars['String']['output']>>;
  languages?: Maybe<Array<Scalars['String']['output']>>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  livedInPlaces?: Maybe<Array<Scalars['String']['output']>>;
  mainImages?: Maybe<Scalars['String']['output']>;
  maritalStatus?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  mySpecialty?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  otpExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  personalInterests?: Maybe<Array<Scalars['String']['output']>>;
  phoneNumber: Scalars['String']['output'];
  plans?: Maybe<Array<Maybe<Plan>>>;
  province?: Maybe<Scalars['String']['output']>;
  receivedRequests?: Maybe<Array<Maybe<CompanionRequest>>>;
  reportsMade?: Maybe<Array<Maybe<ViolationReport>>>;
  role: Role;
  score?: Maybe<Scalars['Int']['output']>;
  smokeStatus?: Maybe<Scalars['String']['output']>;
  spiritStatus?: Maybe<Scalars['String']['output']>;
  sportsStatus?: Maybe<Scalars['String']['output']>;
  travelInterests?: Maybe<Array<Scalars['String']['output']>>;
  traveledToPlaces?: Maybe<Array<Scalars['String']['output']>>;
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

export type CreateCompanionRequestMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
}>;


export type CreateCompanionRequestMutation = { createCompanionRequest?: { id: string, receiverId: string, requesterId: string } | null };

export type AddToFavoriteMutationVariables = Exact<{
  favoriteId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
}>;


export type AddToFavoriteMutation = { addToFavorite?: { id: string } | null };

export type CreateHostingInvitationMutationVariables = Exact<{
  guestId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
}>;


export type CreateHostingInvitationMutation = { createHostingInvitation?: { id: string, hostId: string, guestId: string, status: string } | null };

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = { refreshAccessToken?: { accessToken?: string | null } | null };

export type SignupMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type SignupMutation = { Signin?: string | null };

export type VerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { verifyOtp?: { accessToken?: string | null, user?: { name?: string | null, gender?: Gender | null, birthday?: any | null, province?: string | null, images?: Array<string> | null, mySpecialty?: Array<string> | null, personalInterests?: Array<string> | null, travelInterests?: Array<string> | null, username?: string | null, avatar?: string | null, phoneNumber: string, languages?: Array<string> | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, age?: number | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, city?: string | null, AmountOfEarlyRising?: string | null } | null, guest?: { id: string, name?: string | null, gender?: Gender | null, birthday?: any | null, province?: string | null, city?: string | null, images?: Array<string | null> | null, travelInterests?: Array<string | null> | null, personalInterests?: Array<string | null> | null, mySpecialty?: Array<string | null> | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
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
  spiritStatus?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { updateUser?: { id: string } | null };

export type GetRandomUserQueryVariables = Exact<{
  languages?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  age?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  province?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  travelInterests?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  mySpecialty?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetRandomUserQuery = { getRandomUser?: Array<{ id: string, name: string, username: string, phoneNumber: string, gender: Gender, languages: Array<string>, birthday: any, traveledToPlaces: Array<string>, livedInPlaces: Array<string>, province: string, images: Array<string>, travelInterests: Array<string>, personalInterests: Array<string>, mySpecialty: Array<string>, bio: string, maritalStatus: string, smokeStatus: string, spiritStatus: string, sportsStatus: string, AmountOfEarlyRising: string, age?: number | null } | null> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { name?: string | null, username?: string | null, id: string, avatar?: string | null, phoneNumber: string, gender?: Gender | null, languages?: Array<string> | null, birthday?: any | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, province?: string | null, age?: number | null, city?: string | null, images?: Array<string> | null, travelInterests?: Array<string> | null, personalInterests?: Array<string> | null, mySpecialty?: Array<string> | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, AmountOfEarlyRising?: string | null } | null };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { getNotifications: Array<{ id: string, content: string, actionId: string, type: string, searchType: string, createdAt: any, read: boolean }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { getUser?: { id: string, name?: string | null, username?: string | null, avatar?: string | null, phoneNumber: string, gender?: Gender | null, languages?: Array<string> | null, birthday?: any | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, province?: string | null, age?: number | null, city?: string | null, images?: Array<string> | null, travelInterests?: Array<string> | null, personalInterests?: Array<string> | null, mySpecialty?: Array<string> | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, AmountOfEarlyRising?: string | null, createdAt: any } | null };


export const CreateCompanionRequestDocument = gql`
    mutation CreateCompanionRequest($receiverId: String!, $searchType: String!) {
  createCompanionRequest(receiverId: $receiverId, searchType: $searchType) {
    id
    receiverId
    requesterId
  }
}
    `;
export type CreateCompanionRequestMutationFn = Apollo.MutationFunction<CreateCompanionRequestMutation, CreateCompanionRequestMutationVariables>;

/**
 * __useCreateCompanionRequestMutation__
 *
 * To run a mutation, you first call `useCreateCompanionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanionRequestMutation, { data, loading, error }] = useCreateCompanionRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *      searchType: // value for 'searchType'
 *   },
 * });
 */
export function useCreateCompanionRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanionRequestMutation, CreateCompanionRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanionRequestMutation, CreateCompanionRequestMutationVariables>(CreateCompanionRequestDocument, options);
      }
export type CreateCompanionRequestMutationHookResult = ReturnType<typeof useCreateCompanionRequestMutation>;
export type CreateCompanionRequestMutationResult = Apollo.MutationResult<CreateCompanionRequestMutation>;
export type CreateCompanionRequestMutationOptions = Apollo.BaseMutationOptions<CreateCompanionRequestMutation, CreateCompanionRequestMutationVariables>;
export const AddToFavoriteDocument = gql`
    mutation AddToFavorite($favoriteId: String!, $searchType: String!) {
  addToFavorite(favoriteId: $favoriteId, searchType: $searchType) {
    id
  }
}
    `;
export type AddToFavoriteMutationFn = Apollo.MutationFunction<AddToFavoriteMutation, AddToFavoriteMutationVariables>;

/**
 * __useAddToFavoriteMutation__
 *
 * To run a mutation, you first call `useAddToFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavoriteMutation, { data, loading, error }] = useAddToFavoriteMutation({
 *   variables: {
 *      favoriteId: // value for 'favoriteId'
 *      searchType: // value for 'searchType'
 *   },
 * });
 */
export function useAddToFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddToFavoriteMutation, AddToFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToFavoriteMutation, AddToFavoriteMutationVariables>(AddToFavoriteDocument, options);
      }
export type AddToFavoriteMutationHookResult = ReturnType<typeof useAddToFavoriteMutation>;
export type AddToFavoriteMutationResult = Apollo.MutationResult<AddToFavoriteMutation>;
export type AddToFavoriteMutationOptions = Apollo.BaseMutationOptions<AddToFavoriteMutation, AddToFavoriteMutationVariables>;
export const CreateHostingInvitationDocument = gql`
    mutation CreateHostingInvitation($guestId: String!, $searchType: String!) {
  createHostingInvitation(guestId: $guestId, searchType: $searchType) {
    id
    hostId
    guestId
    status
  }
}
    `;
export type CreateHostingInvitationMutationFn = Apollo.MutationFunction<CreateHostingInvitationMutation, CreateHostingInvitationMutationVariables>;

/**
 * __useCreateHostingInvitationMutation__
 *
 * To run a mutation, you first call `useCreateHostingInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHostingInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHostingInvitationMutation, { data, loading, error }] = useCreateHostingInvitationMutation({
 *   variables: {
 *      guestId: // value for 'guestId'
 *      searchType: // value for 'searchType'
 *   },
 * });
 */
export function useCreateHostingInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CreateHostingInvitationMutation, CreateHostingInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHostingInvitationMutation, CreateHostingInvitationMutationVariables>(CreateHostingInvitationDocument, options);
      }
export type CreateHostingInvitationMutationHookResult = ReturnType<typeof useCreateHostingInvitationMutation>;
export type CreateHostingInvitationMutationResult = Apollo.MutationResult<CreateHostingInvitationMutation>;
export type CreateHostingInvitationMutationOptions = Apollo.BaseMutationOptions<CreateHostingInvitationMutation, CreateHostingInvitationMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken {
  refreshAccessToken {
    accessToken
  }
}
    `;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, options);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
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
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($phoneNumber: String!, $otp: String!) {
  verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
    user {
      name
      gender
      birthday
      province
      images
      mySpecialty
      personalInterests
      travelInterests
      username
      avatar
      phoneNumber
      languages
      traveledToPlaces
      livedInPlaces
      age
      bio
      maritalStatus
      smokeStatus
      spiritStatus
      sportsStatus
      lastSeen
      city
      AmountOfEarlyRising
    }
    accessToken
    guest {
      id
      name
      gender
      birthday
      province
      city
      images
      travelInterests
      personalInterests
      mySpecialty
      createdAt
      updatedAt
      deletedAt
    }
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($name: String, $gender: Gender, $birthday: DateTime, $province: String, $city: String, $images: [String!], $travelInterests: [String!], $personalInterests: [String!], $mySpecialty: [String!], $username: String, $bio: String, $maritalStatus: String, $smokeStatus: String, $sportsStatus: String, $amountOfEarlyRising: String, $languages: [String!], $traveledToPlaces: [String!], $livedInPlaces: [String!], $spiritStatus: String) {
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
    spiritStatus: $spiritStatus
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
 *      spiritStatus: // value for 'spiritStatus'
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
export const GetRandomUserDocument = gql`
    query GetRandomUser($languages: [String!], $age: [Int!], $province: [String!], $travelInterests: [String!], $mySpecialty: [String!]) {
  getRandomUser(
    languages: $languages
    age: $age
    province: $province
    travelInterests: $travelInterests
    mySpecialty: $mySpecialty
  ) {
    id
    name
    username
    phoneNumber
    gender
    languages
    birthday
    traveledToPlaces
    livedInPlaces
    province
    images
    travelInterests
    personalInterests
    mySpecialty
    bio
    maritalStatus
    smokeStatus
    spiritStatus
    sportsStatus
    AmountOfEarlyRising
    age
  }
}
    `;

/**
 * __useGetRandomUserQuery__
 *
 * To run a query within a React component, call `useGetRandomUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandomUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandomUserQuery({
 *   variables: {
 *      languages: // value for 'languages'
 *      age: // value for 'age'
 *      province: // value for 'province'
 *      travelInterests: // value for 'travelInterests'
 *      mySpecialty: // value for 'mySpecialty'
 *   },
 * });
 */
export function useGetRandomUserQuery(baseOptions?: Apollo.QueryHookOptions<GetRandomUserQuery, GetRandomUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandomUserQuery, GetRandomUserQueryVariables>(GetRandomUserDocument, options);
      }
export function useGetRandomUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandomUserQuery, GetRandomUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandomUserQuery, GetRandomUserQueryVariables>(GetRandomUserDocument, options);
        }
export function useGetRandomUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRandomUserQuery, GetRandomUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRandomUserQuery, GetRandomUserQueryVariables>(GetRandomUserDocument, options);
        }
export type GetRandomUserQueryHookResult = ReturnType<typeof useGetRandomUserQuery>;
export type GetRandomUserLazyQueryHookResult = ReturnType<typeof useGetRandomUserLazyQuery>;
export type GetRandomUserSuspenseQueryHookResult = ReturnType<typeof useGetRandomUserSuspenseQuery>;
export type GetRandomUserQueryResult = Apollo.QueryResult<GetRandomUserQuery, GetRandomUserQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    name
    username
    id
    avatar
    phoneNumber
    gender
    languages
    birthday
    traveledToPlaces
    livedInPlaces
    province
    age
    city
    images
    travelInterests
    personalInterests
    mySpecialty
    bio
    maritalStatus
    smokeStatus
    spiritStatus
    sportsStatus
    lastSeen
    AmountOfEarlyRising
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  getNotifications {
    id
    content
    actionId
    type
    searchType
    createdAt
    read
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    name
    username
    avatar
    phoneNumber
    gender
    languages
    birthday
    traveledToPlaces
    livedInPlaces
    province
    age
    city
    images
    travelInterests
    personalInterests
    mySpecialty
    bio
    maritalStatus
    smokeStatus
    spiritStatus
    sportsStatus
    lastSeen
    AmountOfEarlyRising
    createdAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;