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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** DateTime scalar type */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** Floats that will have a value greater than 0. */
  PositiveFloat: { input: any; output: any; }
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
  searchType: Scalars['String']['output'];
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
  birthdate?: Maybe<Scalars['DateTime']['output']>;
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

export type Liked = {
  LikedUserId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type Message = {
  chat?: Maybe<Chat>;
  chatId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  reply?: Maybe<Message>;
  replyId?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<User>;
  senderId: Scalars['String']['output'];
};

export type Mutation = {
  Like?: Maybe<Liked>;
  Signin?: Maybe<Scalars['String']['output']>;
  activePlan?: Maybe<User>;
  addToBlackList?: Maybe<Scalars['JSON']['output']>;
  addToFavorite?: Maybe<Scalars['JSON']['output']>;
  createReport?: Maybe<ViolationReport>;
  createRequest?: Maybe<Request>;
  delChat?: Maybe<Scalars['String']['output']>;
  delMessages?: Maybe<Scalars['String']['output']>;
  editMessage?: Maybe<Message>;
  logInAsGuest?: Maybe<AuthPayload>;
  refreshAccessToken?: Maybe<AuthPayload>;
  removeFromBlacklist?: Maybe<Blacklist>;
  removeFromFavorite?: Maybe<FavoriteList>;
  removeReport?: Maybe<ViolationReport>;
  removeRequest?: Maybe<Request>;
  requestPay: Scalars['JSON']['output'];
  sendMessage?: Maybe<Message>;
  updateUser?: Maybe<User>;
  verifyOtp?: Maybe<AuthPayload>;
};


export type MutationLikeArgs = {
  likedUserId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
};


export type MutationSigninArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationActivePlanArgs = {
  authority?: InputMaybe<Scalars['String']['input']>;
  bazarPurchaseToken?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['Int']['input'];
  transactionsId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddToBlackListArgs = {
  blockedId: Array<Scalars['String']['input']>;
};


export type MutationAddToFavoriteArgs = {
  favoriteIds: Array<Scalars['String']['input']>;
};


export type MutationCreateReportArgs = {
  reason: Scalars['String']['input'];
  reportedId: Scalars['String']['input'];
};


export type MutationCreateRequestArgs = {
  receiverId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
  type: RequestType;
};


export type MutationDelChatArgs = {
  chatsId: Array<Scalars['String']['input']>;
};


export type MutationDelMessagesArgs = {
  messagesId: Array<Scalars['String']['input']>;
};


export type MutationEditMessageArgs = {
  content: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
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


export type MutationRemoveFromBlacklistArgs = {
  blockedId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveFromFavoriteArgs = {
  favoriteId: Scalars['String']['input'];
};


export type MutationRemoveReportArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationRequestPayArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['Int']['input'];
};


export type MutationSendMessageArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  receiverId?: InputMaybe<Scalars['String']['input']>;
  replyId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  AmountOfEarlyRising?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
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
  createdAt: Scalars['DateTime']['output'];
  expireAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type PricePlan = {
  bazarId: Scalars['String']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  months: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  getBlockList: User;
  getChat: Chat;
  getChats: Array<Chat>;
  getFavorite: User;
  getMe?: Maybe<User>;
  getNotifications: Array<Notification>;
  getPricePlan: Array<PricePlan>;
  getRandomUser?: Maybe<Array<Maybe<RandomUser>>>;
  getRequests: Array<Request>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
  ok: Scalars['Boolean']['output'];
};


export type QueryGetChatArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryGetMeArgs = {
  include?: InputMaybe<Includes>;
};


export type QueryGetRandomUserArgs = {
  age?: InputMaybe<Array<Scalars['Int']['input']>>;
  gender?: InputMaybe<Gender>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  lastId?: InputMaybe<Array<Scalars['String']['input']>>;
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
  birthdate: Scalars['String']['output'];
  city: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  isOnline: Scalars['Boolean']['output'];
  languages: Array<Scalars['String']['output']>;
  lastSeen: Scalars['DateTime']['output'];
  livedInPlaces: Array<Scalars['String']['output']>;
  mainImages?: Maybe<Scalars['String']['output']>;
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
  zodiacSign?: Maybe<Scalars['String']['output']>;
};

export type Request = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  receiver?: Maybe<User>;
  receiverId: Scalars['String']['output'];
  requester?: Maybe<User>;
  requesterId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum RequestType {
  CompanionRequest = 'companionRequest',
  HostingInvitation = 'hostingInvitation',
  Message = 'message'
}

export enum Role {
  Admin = 'admin',
  Guest = 'guest',
  User = 'user'
}

export type Subscription = {
  messageSent?: Maybe<Message>;
  userStatus?: Maybe<User>;
};

export type Transaction = {
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  details: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  successful: Scalars['Boolean']['output'];
};

export type User = {
  AmountOfEarlyRising?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  blacklists?: Maybe<Array<Maybe<Blacklist>>>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  favorites?: Maybe<Array<Maybe<FavoriteList>>>;
  gender?: Maybe<Gender>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  languages?: Maybe<Array<Scalars['String']['output']>>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  liked?: Maybe<Array<Maybe<Liked>>>;
  likedBack?: Maybe<Array<Maybe<Liked>>>;
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
  plan?: Maybe<Plan>;
  province?: Maybe<Scalars['String']['output']>;
  receivedRequests?: Maybe<Array<Maybe<Request>>>;
  reportsMade?: Maybe<Array<Maybe<ViolationReport>>>;
  requests?: Maybe<Array<Maybe<Request>>>;
  role: Role;
  score?: Maybe<Scalars['Int']['output']>;
  smokeStatus?: Maybe<Scalars['String']['output']>;
  spiritStatus?: Maybe<Scalars['String']['output']>;
  sportsStatus?: Maybe<Scalars['String']['output']>;
  transactions?: Maybe<Transaction>;
  travelInterests?: Maybe<Array<Scalars['String']['output']>>;
  traveledToPlaces?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  verified: Scalars['Boolean']['output'];
  zodiacSign?: Maybe<Scalars['String']['output']>;
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

export type AddToBlackListMutationVariables = Exact<{
  blockedId: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddToBlackListMutation = { addToBlackList?: any | null };

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String']['input'];
  replyId?: InputMaybe<Scalars['String']['input']>;
  receiverId?: InputMaybe<Scalars['String']['input']>;
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendMessageMutation = { sendMessage?: { id: string, content: string } | null };

export type DelMessagesMutationVariables = Exact<{
  messagesId: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DelMessagesMutation = { delMessages?: string | null };

export type EditMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditMessageMutation = { editMessage?: { id: string, content: string } | null };

export type DelChatMutationVariables = Exact<{
  chatsId: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DelChatMutation = { delChat?: string | null };

export type AddToFavoriteMutationVariables = Exact<{
  favoriteIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddToFavoriteMutation = { addToFavorite?: any | null };

export type LikeMutationVariables = Exact<{
  likedUserId: Scalars['String']['input'];
  searchType: Scalars['String']['input'];
}>;


export type LikeMutation = { Like?: { LikedUserId: string, userId: string, id: string } | null };

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = { refreshAccessToken?: { accessToken?: string | null } | null };

export type CreateRequestMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  type: RequestType;
  searchType: Scalars['String']['input'];
}>;


export type CreateRequestMutation = { createRequest?: { id: string, receiverId: string, requesterId: string } | null };

export type SignupMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type SignupMutation = { Signin?: string | null };

export type VerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { verifyOtp?: { accessToken?: string | null, user?: { name?: string | null, gender?: Gender | null, birthdate?: string | null, province?: string | null, images?: Array<string> | null, mySpecialty?: Array<string> | null, personalInterests?: Array<string> | null, travelInterests?: Array<string> | null, username?: string | null, avatar?: string | null, phoneNumber: string, languages?: Array<string> | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, age?: number | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, city?: string | null, AmountOfEarlyRising?: string | null } | null, guest?: { id: string, name?: string | null, gender?: Gender | null, birthdate?: any | null, province?: string | null, city?: string | null, images?: Array<string | null> | null, travelInterests?: Array<string | null> | null, personalInterests?: Array<string | null> | null, mySpecialty?: Array<string | null> | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
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
  AmountOfEarlyRising?: InputMaybe<Scalars['String']['input']>;
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


export type GetRandomUserQuery = { getRandomUser?: Array<{ id: string, name: string, username: string, phoneNumber: string, gender: Gender, isOnline: boolean, languages: Array<string>, birthdate: string, traveledToPlaces: Array<string>, livedInPlaces: Array<string>, province: string, mainImages?: string | null, images: Array<string>, city: string, zodiacSign?: string | null, travelInterests: Array<string>, personalInterests: Array<string>, mySpecialty: Array<string>, bio: string, maritalStatus: string, smokeStatus: string, spiritStatus: string, sportsStatus: string, AmountOfEarlyRising: string, age?: number | null } | null> | null };

export type GetBlockListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockListQuery = { getBlockList: { chats?: Array<{ id: string, createdAt?: any | null, participants?: Array<{ id: string, name?: string | null, username?: string | null, images?: Array<string> | null, isOnline?: boolean | null } | null> | null, Message?: Array<{ id: string, content: string, createdAt: any, sender?: { username?: string | null, name?: string | null, id: string } | null } | null> | null } | null> | null, blacklists?: Array<{ id: string, userId: string, blockedId: string, createdAt?: any | null } | null> | null } };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { getChats: Array<{ id: string, searchType: string, participants?: Array<{ id: string, name?: string | null, username?: string | null, phoneNumber: string, mainImages?: string | null, lastSeen?: any | null, isOnline?: boolean | null } | null> | null, Message?: Array<{ replyId?: string | null, senderId: string, read: boolean, content: string, id: string, createdAt: any, sender?: { id: string, name?: string | null, username?: string | null } | null, reply?: { id: string, content: string, sender?: { id: string, name?: string | null, username?: string | null } | null } | null } | null> | null }> };

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type GetChatQuery = { getChat: { id: string, searchType: string, participants?: Array<{ id: string, name?: string | null, username?: string | null, phoneNumber: string, mainImages?: string | null, lastSeen?: any | null, isOnline?: boolean | null } | null> | null, Message?: Array<{ senderId: string, read: boolean, content: string, id: string, createdAt: any, sender?: { id: string, name?: string | null, username?: string | null } | null, reply?: { id: string, content: string, sender?: { id: string, name?: string | null } | null } | null } | null> | null } };

export type GetFavoriteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavoriteQuery = { getFavorite: { chats?: Array<{ id: string, createdAt?: any | null, Message?: Array<{ id: string, content: string, createdAt: any, sender?: { id: string, name?: string | null, username?: string | null } | null } | null> | null, participants?: Array<{ id: string, name?: string | null, username?: string | null, images?: Array<string> | null, isOnline?: boolean | null } | null> | null } | null> | null, favorites?: Array<{ id: string, userId: string, favoriteUserId: string, createdAt?: any | null, updatedAt?: any | null } | null> | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { name?: string | null, username?: string | null, id: string, avatar?: string | null, isOnline?: boolean | null, phoneNumber: string, gender?: Gender | null, languages?: Array<string> | null, birthdate?: string | null, zodiacSign?: string | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, province?: string | null, age?: number | null, city?: string | null, images?: Array<string> | null, travelInterests?: Array<string> | null, personalInterests?: Array<string> | null, mySpecialty?: Array<string> | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, AmountOfEarlyRising?: string | null } | null };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { getNotifications: Array<{ id: string, content: string, actionId: string, type: string, searchType: string, createdAt: any, read: boolean }> };

export type GetPricePlanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPricePlanQuery = { getPricePlan: Array<{ id: number, title: string, price: number, discount: number, months: number, bazarId: string }> };

export type GetRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestsQuery = { getRequests: Array<{ id: string, receiverId: string, requesterId: string, type: string, createdAt?: any | null, updatedAt?: any | null, status: string, requester?: { id: string, name?: string | null, mainImages?: string | null } | null, receiver?: { id: string, name?: string | null, mainImages?: string | null } | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { getUser?: { id: string, name?: string | null, username?: string | null, avatar?: string | null, phoneNumber: string, gender?: Gender | null, languages?: Array<string> | null, birthdate?: string | null, zodiacSign?: string | null, traveledToPlaces?: Array<string> | null, livedInPlaces?: Array<string> | null, province?: string | null, age?: number | null, city?: string | null, images?: Array<string> | null, travelInterests?: Array<string> | null, personalInterests?: Array<string> | null, mySpecialty?: Array<string> | null, bio?: string | null, maritalStatus?: string | null, smokeStatus?: string | null, spiritStatus?: string | null, sportsStatus?: string | null, lastSeen?: any | null, AmountOfEarlyRising?: string | null, createdAt: any } | null };

export type MessageSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSentSubscription = { messageSent?: { id: string, content: string, senderId: string } | null };

export type UserStatusSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserStatusSubscription = { userStatus?: { id: string, name?: string | null, isOnline?: boolean | null } | null };


export const AddToBlackListDocument = gql`
    mutation AddToBlackList($blockedId: [String!]!) {
  addToBlackList(blockedId: $blockedId)
}
    `;
export type AddToBlackListMutationFn = Apollo.MutationFunction<AddToBlackListMutation, AddToBlackListMutationVariables>;

/**
 * __useAddToBlackListMutation__
 *
 * To run a mutation, you first call `useAddToBlackListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToBlackListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToBlackListMutation, { data, loading, error }] = useAddToBlackListMutation({
 *   variables: {
 *      blockedId: // value for 'blockedId'
 *   },
 * });
 */
export function useAddToBlackListMutation(baseOptions?: Apollo.MutationHookOptions<AddToBlackListMutation, AddToBlackListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToBlackListMutation, AddToBlackListMutationVariables>(AddToBlackListDocument, options);
      }
export type AddToBlackListMutationHookResult = ReturnType<typeof useAddToBlackListMutation>;
export type AddToBlackListMutationResult = Apollo.MutationResult<AddToBlackListMutation>;
export type AddToBlackListMutationOptions = Apollo.BaseMutationOptions<AddToBlackListMutation, AddToBlackListMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!, $replyId: String, $receiverId: String, $chatId: String) {
  sendMessage(
    content: $content
    replyId: $replyId
    receiverId: $receiverId
    chatId: $chatId
  ) {
    id
    content
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      replyId: // value for 'replyId'
 *      receiverId: // value for 'receiverId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const DelMessagesDocument = gql`
    mutation DelMessages($messagesId: [String!]!) {
  delMessages(messagesId: $messagesId)
}
    `;
export type DelMessagesMutationFn = Apollo.MutationFunction<DelMessagesMutation, DelMessagesMutationVariables>;

/**
 * __useDelMessagesMutation__
 *
 * To run a mutation, you first call `useDelMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delMessagesMutation, { data, loading, error }] = useDelMessagesMutation({
 *   variables: {
 *      messagesId: // value for 'messagesId'
 *   },
 * });
 */
export function useDelMessagesMutation(baseOptions?: Apollo.MutationHookOptions<DelMessagesMutation, DelMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelMessagesMutation, DelMessagesMutationVariables>(DelMessagesDocument, options);
      }
export type DelMessagesMutationHookResult = ReturnType<typeof useDelMessagesMutation>;
export type DelMessagesMutationResult = Apollo.MutationResult<DelMessagesMutation>;
export type DelMessagesMutationOptions = Apollo.BaseMutationOptions<DelMessagesMutation, DelMessagesMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($messageId: String!, $content: String!) {
  editMessage(messageId: $messageId, content: $content) {
    id
    content
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const DelChatDocument = gql`
    mutation DelChat($chatsId: [String!]!) {
  delChat(chatsId: $chatsId)
}
    `;
export type DelChatMutationFn = Apollo.MutationFunction<DelChatMutation, DelChatMutationVariables>;

/**
 * __useDelChatMutation__
 *
 * To run a mutation, you first call `useDelChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delChatMutation, { data, loading, error }] = useDelChatMutation({
 *   variables: {
 *      chatsId: // value for 'chatsId'
 *   },
 * });
 */
export function useDelChatMutation(baseOptions?: Apollo.MutationHookOptions<DelChatMutation, DelChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelChatMutation, DelChatMutationVariables>(DelChatDocument, options);
      }
export type DelChatMutationHookResult = ReturnType<typeof useDelChatMutation>;
export type DelChatMutationResult = Apollo.MutationResult<DelChatMutation>;
export type DelChatMutationOptions = Apollo.BaseMutationOptions<DelChatMutation, DelChatMutationVariables>;
export const AddToFavoriteDocument = gql`
    mutation AddToFavorite($favoriteIds: [String!]!) {
  addToFavorite(favoriteIds: $favoriteIds)
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
 *      favoriteIds: // value for 'favoriteIds'
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
export const LikeDocument = gql`
    mutation Like($likedUserId: String!, $searchType: String!) {
  Like(likedUserId: $likedUserId, searchType: $searchType) {
    LikedUserId
    userId
    id
  }
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      likedUserId: // value for 'likedUserId'
 *      searchType: // value for 'searchType'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
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
export const CreateRequestDocument = gql`
    mutation CreateRequest($receiverId: String!, $type: RequestType!, $searchType: String!) {
  createRequest(receiverId: $receiverId, type: $type, searchType: $searchType) {
    id
    receiverId
    requesterId
  }
}
    `;
export type CreateRequestMutationFn = Apollo.MutationFunction<CreateRequestMutation, CreateRequestMutationVariables>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *      type: // value for 'type'
 *      searchType: // value for 'searchType'
 *   },
 * });
 */
export function useCreateRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, options);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
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
      birthdate
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
      birthdate
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
    mutation UpdateUser($name: String, $gender: Gender, $birthdate: String, $province: String, $city: String, $images: [String!], $travelInterests: [String!], $personalInterests: [String!], $mySpecialty: [String!], $username: String, $bio: String, $maritalStatus: String, $smokeStatus: String, $sportsStatus: String, $AmountOfEarlyRising: String, $languages: [String!], $traveledToPlaces: [String!], $livedInPlaces: [String!], $spiritStatus: String) {
  updateUser(
    name: $name
    gender: $gender
    birthdate: $birthdate
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
    AmountOfEarlyRising: $AmountOfEarlyRising
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
 *      birthdate: // value for 'birthdate'
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
 *      AmountOfEarlyRising: // value for 'AmountOfEarlyRising'
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
    isOnline
    languages
    birthdate
    traveledToPlaces
    livedInPlaces
    province
    mainImages
    images
    city
    zodiacSign
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
export const GetBlockListDocument = gql`
    query GetBlockList {
  getBlockList {
    chats {
      id
      participants {
        id
        name
        username
        images
        isOnline
      }
      createdAt
      Message {
        id
        content
        sender {
          username
          name
          id
        }
        createdAt
      }
    }
    blacklists {
      id
      userId
      blockedId
      createdAt
    }
  }
}
    `;

/**
 * __useGetBlockListQuery__
 *
 * To run a query within a React component, call `useGetBlockListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlockListQuery(baseOptions?: Apollo.QueryHookOptions<GetBlockListQuery, GetBlockListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlockListQuery, GetBlockListQueryVariables>(GetBlockListDocument, options);
      }
export function useGetBlockListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlockListQuery, GetBlockListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlockListQuery, GetBlockListQueryVariables>(GetBlockListDocument, options);
        }
export function useGetBlockListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlockListQuery, GetBlockListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlockListQuery, GetBlockListQueryVariables>(GetBlockListDocument, options);
        }
export type GetBlockListQueryHookResult = ReturnType<typeof useGetBlockListQuery>;
export type GetBlockListLazyQueryHookResult = ReturnType<typeof useGetBlockListLazyQuery>;
export type GetBlockListSuspenseQueryHookResult = ReturnType<typeof useGetBlockListSuspenseQuery>;
export type GetBlockListQueryResult = Apollo.QueryResult<GetBlockListQuery, GetBlockListQueryVariables>;
export const GetChatsDocument = gql`
    query GetChats {
  getChats {
    id
    searchType
    participants {
      id
      name
      username
      phoneNumber
      mainImages
      lastSeen
      isOnline
    }
    Message {
      sender {
        id
        name
        username
      }
      replyId
      reply {
        id
        content
        sender {
          id
          name
          username
        }
      }
      senderId
      read
      content
      id
      createdAt
    }
  }
}
    `;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export function useGetChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsSuspenseQueryHookResult = ReturnType<typeof useGetChatsSuspenseQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetChatDocument = gql`
    query GetChat($chatId: String!) {
  getChat(chatId: $chatId) {
    id
    searchType
    participants {
      id
      name
      username
      phoneNumber
      mainImages
      lastSeen
      isOnline
    }
    Message {
      sender {
        id
        name
        username
      }
      senderId
      read
      content
      id
      createdAt
      reply {
        id
        content
        sender {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatQuery(baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables> & ({ variables: GetChatQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
      }
export function useGetChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export function useGetChatSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatSuspenseQueryHookResult = ReturnType<typeof useGetChatSuspenseQuery>;
export type GetChatQueryResult = Apollo.QueryResult<GetChatQuery, GetChatQueryVariables>;
export const GetFavoriteDocument = gql`
    query GetFavorite {
  getFavorite {
    chats {
      id
      createdAt
      Message {
        id
        content
        createdAt
        sender {
          id
          name
          username
        }
      }
      participants {
        id
        name
        username
        images
        isOnline
      }
    }
    favorites {
      id
      userId
      favoriteUserId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetFavoriteQuery__
 *
 * To run a query within a React component, call `useGetFavoriteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoriteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoriteQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavoriteQuery(baseOptions?: Apollo.QueryHookOptions<GetFavoriteQuery, GetFavoriteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavoriteQuery, GetFavoriteQueryVariables>(GetFavoriteDocument, options);
      }
export function useGetFavoriteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavoriteQuery, GetFavoriteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavoriteQuery, GetFavoriteQueryVariables>(GetFavoriteDocument, options);
        }
export function useGetFavoriteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFavoriteQuery, GetFavoriteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFavoriteQuery, GetFavoriteQueryVariables>(GetFavoriteDocument, options);
        }
export type GetFavoriteQueryHookResult = ReturnType<typeof useGetFavoriteQuery>;
export type GetFavoriteLazyQueryHookResult = ReturnType<typeof useGetFavoriteLazyQuery>;
export type GetFavoriteSuspenseQueryHookResult = ReturnType<typeof useGetFavoriteSuspenseQuery>;
export type GetFavoriteQueryResult = Apollo.QueryResult<GetFavoriteQuery, GetFavoriteQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    name
    username
    id
    avatar
    isOnline
    phoneNumber
    gender
    languages
    birthdate
    zodiacSign
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
export const GetPricePlanDocument = gql`
    query GetPricePlan {
  getPricePlan {
    id
    title
    price
    discount
    months
    bazarId
  }
}
    `;

/**
 * __useGetPricePlanQuery__
 *
 * To run a query within a React component, call `useGetPricePlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricePlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricePlanQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPricePlanQuery(baseOptions?: Apollo.QueryHookOptions<GetPricePlanQuery, GetPricePlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPricePlanQuery, GetPricePlanQueryVariables>(GetPricePlanDocument, options);
      }
export function useGetPricePlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPricePlanQuery, GetPricePlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPricePlanQuery, GetPricePlanQueryVariables>(GetPricePlanDocument, options);
        }
export function useGetPricePlanSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPricePlanQuery, GetPricePlanQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPricePlanQuery, GetPricePlanQueryVariables>(GetPricePlanDocument, options);
        }
export type GetPricePlanQueryHookResult = ReturnType<typeof useGetPricePlanQuery>;
export type GetPricePlanLazyQueryHookResult = ReturnType<typeof useGetPricePlanLazyQuery>;
export type GetPricePlanSuspenseQueryHookResult = ReturnType<typeof useGetPricePlanSuspenseQuery>;
export type GetPricePlanQueryResult = Apollo.QueryResult<GetPricePlanQuery, GetPricePlanQueryVariables>;
export const GetRequestsDocument = gql`
    query GetRequests {
  getRequests {
    id
    receiverId
    requesterId
    type
    createdAt
    updatedAt
    status
    requester {
      id
      name
      mainImages
    }
    receiver {
      id
      name
      mainImages
    }
  }
}
    `;

/**
 * __useGetRequestsQuery__
 *
 * To run a query within a React component, call `useGetRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
      }
export function useGetRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
        }
export function useGetRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
        }
export type GetRequestsQueryHookResult = ReturnType<typeof useGetRequestsQuery>;
export type GetRequestsLazyQueryHookResult = ReturnType<typeof useGetRequestsLazyQuery>;
export type GetRequestsSuspenseQueryHookResult = ReturnType<typeof useGetRequestsSuspenseQuery>;
export type GetRequestsQueryResult = Apollo.QueryResult<GetRequestsQuery, GetRequestsQueryVariables>;
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
    birthdate
    zodiacSign
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
export const MessageSentDocument = gql`
    subscription MessageSent {
  messageSent {
    id
    content
    senderId
  }
}
    `;

/**
 * __useMessageSentSubscription__
 *
 * To run a query within a React component, call `useMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageSentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSentSubscription, MessageSentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSentSubscription, MessageSentSubscriptionVariables>(MessageSentDocument, options);
      }
export type MessageSentSubscriptionHookResult = ReturnType<typeof useMessageSentSubscription>;
export type MessageSentSubscriptionResult = Apollo.SubscriptionResult<MessageSentSubscription>;
export const UserStatusDocument = gql`
    subscription UserStatus {
  userStatus {
    id
    name
    isOnline
  }
}
    `;

/**
 * __useUserStatusSubscription__
 *
 * To run a query within a React component, call `useUserStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatusSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserStatusSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserStatusSubscription, UserStatusSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserStatusSubscription, UserStatusSubscriptionVariables>(UserStatusDocument, options);
      }
export type UserStatusSubscriptionHookResult = ReturnType<typeof useUserStatusSubscription>;
export type UserStatusSubscriptionResult = Apollo.SubscriptionResult<UserStatusSubscription>;