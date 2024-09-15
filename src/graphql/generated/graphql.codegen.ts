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
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
};

export type Category = {
  icon?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['JSON']['output']>;
  isPremium: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  subText?: Maybe<Scalars['String']['output']>;
};

export type Chef = {
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Comment = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  reply: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Course = {
  chef?: Maybe<Chef>;
  cover?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  discount: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Scalars['JSON']['output']>;
  level: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rate: Scalars['Float']['output'];
  recipes: Array<Recipe>;
  view: Scalars['Int']['output'];
};

export type HomeData = {
  banners: Scalars['JSON']['output'];
  categories: Array<Category>;
};

export type Ingredient = {
  id: Scalars['ID']['output'];
  image: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
};

export type IngredientGroup = {
  id: Scalars['ID']['output'];
  image: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  activePlan?: Maybe<User>;
  addComment: Comment;
  addCourseComment: Comment;
  addPopupView: Scalars['Boolean']['output'];
  addStoryView: Scalars['Boolean']['output'];
  editProfile: User;
  etaReport: Scalars['Boolean']['output'];
  guestLogin?: Maybe<Scalars['Boolean']['output']>;
  loginViaSms?: Maybe<Scalars['JSON']['output']>;
  registerViaSms?: Maybe<Scalars['ID']['output']>;
  removeComment: Scalars['Boolean']['output'];
  removeCourseComment: Scalars['Boolean']['output'];
  requestPay: Scalars['JSON']['output'];
  toggleFavRecipe: ToggleFavData;
  viewCount?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationActivePlanArgs = {
  authority?: InputMaybe<Scalars['String']['input']>;
  bazarPurchaseToken?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
  zarOrderId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddCommentArgs = {
  recipeId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddCourseCommentArgs = {
  courseId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddPopupViewArgs = {
  popupId: Scalars['Int']['input'];
};


export type MutationAddStoryViewArgs = {
  storyId: Scalars['Int']['input'];
};


export type MutationEditProfileArgs = {
  birthdate?: InputMaybe<Scalars['Date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<SexType>;
};


export type MutationEtaReportArgs = {
  message: Scalars['String']['input'];
};


export type MutationLoginViaSmsArgs = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  smsId: Scalars['String']['input'];
};


export type MutationRegisterViaSmsArgs = {
  phonenumber: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationRemoveCourseCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationRequestPayArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['Int']['input'];
};


export type MutationToggleFavRecipeArgs = {
  recipeId: Scalars['String']['input'];
};


export type MutationViewCountArgs = {
  place: Scalars['String']['input'];
};

export type Pagination = {
  page?: Maybe<Scalars['Int']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum PlanType {
  Blue = 'blue',
  Gold = 'gold',
  Orange = 'orange'
}

export type PricePlan = {
  actionText?: Maybe<Scalars['String']['output']>;
  bazarId: Scalars['String']['output'];
  discount?: Maybe<Scalars['Int']['output']>;
  discountText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  months: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  subTitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: PlanType;
};

export type Query = {
  getCategories: Array<Category>;
  getCategoryRecipes: Array<Recipe>;
  getComment?: Maybe<CommentsWithPagination>;
  getCourse: Course;
  getCourseComments?: Maybe<CommentsWithPagination>;
  getCourses: Array<Course>;
  getDiscountBazarToken: Discount;
  getFavRecipes: Array<Recipe>;
  getHomeData: HomeData;
  getMe?: Maybe<User>;
  getPopups: Array<PopUp>;
  getPricePlan: Array<PricePlan>;
  getRecipe: Recipe;
  getSearchBanner: Scalars['JSON']['output'];
  getStories: Array<Story>;
  getTodayRecipe: Array<Maybe<Recipe>>;
  getTransactions: Array<Transaction>;
  searchCategories: Array<Category>;
  searchIngredientGroups: Array<IngredientGroup>;
  searchIngredients: Array<Ingredient>;
  searchRecipes: Array<Recipe>;
  viewCount: Array<ViewCount>;
};


export type QueryGetCategoryRecipesArgs = {
  categoryId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCommentArgs = {
  page?: Scalars['Int']['input'];
  recipeId: Scalars['Int']['input'];
};


export type QueryGetCourseArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCourseCommentsArgs = {
  courseId: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGetDiscountBazarTokenArgs = {
  code: Scalars['String']['input'];
  planId: Scalars['Int']['input'];
};


export type QueryGetRecipeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchCategoriesArgs = {
  nameMatch: Scalars['String']['input'];
};


export type QuerySearchIngredientGroupsArgs = {
  nameMatch: Scalars['String']['input'];
};


export type QuerySearchIngredientsArgs = {
  nameMatch: Scalars['String']['input'];
};


export type QuerySearchRecipesArgs = {
  ingredientGroups?: InputMaybe<Array<Scalars['String']['input']>>;
  ingredients?: InputMaybe<Array<Scalars['String']['input']>>;
  nameMatch?: InputMaybe<Scalars['String']['input']>;
};

export type Recipe = {
  categories: Array<Category>;
  chef?: Maybe<Chef>;
  comments: Array<Comment>;
  cover_image?: Maybe<Scalars['JSON']['output']>;
  cover_video?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  ingredients: Array<RecipeIngredient>;
  isPremium?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pin?: Maybe<Scalars['Boolean']['output']>;
  portion_count?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  steps: Array<Step>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type RecipeIngredient = {
  image: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum SexType {
  Female = 'female',
  Male = 'male'
}

export type Step = {
  image?: Maybe<Scalars['JSON']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: StepType;
};

export enum StepType {
  Step = 'step',
  Tip = 'tip',
  Trick = 'trick'
}

export type ToggleFavData = {
  currentValue: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
};

export type Transaction = {
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  details: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  successful: Scalars['Boolean']['output'];
};

export type User = {
  birthdate?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPlanActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<SexType>;
  subscription?: Maybe<UserSubscription>;
};

export type UserSubscription = {
  endDate: Scalars['Date']['output'];
  name: Scalars['String']['output'];
  planId: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
};

export type ViewCount = {
  count: Scalars['Int']['output'];
  place: Scalars['String']['output'];
};

export type CommentsWithPagination = {
  comments: Array<Comment>;
  pagination: Pagination;
};

export type Discount = {
  discountPercent: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type PopUp = {
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  media?: Maybe<Scalars['JSON']['output']>;
  resetDays: Scalars['Int']['output'];
  showTo: Scalars['String']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type Story = {
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  media?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['JSON']['output']>;
  views: Scalars['Int']['output'];
};

export type AddPopupViewMutationVariables = Exact<{
  popupId: Scalars['Int']['input'];
}>;


export type AddPopupViewMutation = { addPopupView: boolean };

export type ActivePlanMutationVariables = Exact<{
  planId: Scalars['Int']['input'];
  authority?: InputMaybe<Scalars['String']['input']>;
  zarOrderId?: InputMaybe<Scalars['Int']['input']>;
  bazarPurchaseToken?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ActivePlanMutation = { activePlan?: { phoneNumber?: string | null } | null };

export type AddCommentMutationVariables = Exact<{
  recipeId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
}>;


export type AddCommentMutation = { addComment: { id: string, text: string, reply: string, userId: string, name?: string | null, createdAt: any, updatedAt: any } };

export type ReportMutationVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type ReportMutation = { etaReport: boolean };

export type RemoveCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type RemoveCommentMutation = { removeComment: boolean };

export type AddStoryViewMutationVariables = Exact<{
  storyId: Scalars['Int']['input'];
}>;


export type AddStoryViewMutation = { addStoryView: boolean };

export type ToggleFavRecipeMutationVariables = Exact<{
  recipeId: Scalars['String']['input'];
}>;


export type ToggleFavRecipeMutation = { toggleFavRecipe: { currentValue: boolean, likes: number } };

export type EditProfileMutationVariables = Exact<{
  editProfileId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['Date']['input']>;
  sex?: InputMaybe<SexType>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditProfileMutation = { editProfile: { id: string } };

export type LoginViaSmsMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  code: Scalars['String']['input'];
  smsId: Scalars['String']['input'];
}>;


export type LoginViaSmsMutation = { loginViaSms?: any | null };

export type RegisterViaSmsMutationVariables = Exact<{
  phonenumber: Scalars['String']['input'];
}>;


export type RegisterViaSmsMutation = { registerViaSms?: string | null };

export type ViewCountMutationVariables = Exact<{
  place: Scalars['String']['input'];
}>;


export type ViewCountMutation = { viewCount?: boolean | null };

export type AddCourseCommentMutationVariables = Exact<{
  courseId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
}>;


export type AddCourseCommentMutation = { addCourseComment: { id: string } };

export type RemoveCourseCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type RemoveCourseCommentMutation = { removeCourseComment: boolean };

export type RequestPayMutationVariables = Exact<{
  planId: Scalars['Int']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestPayMutation = { requestPay: any };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { getCategories: Array<{ id: string, isPremium: boolean, name: string, image?: any | null }> };

export type GetCategoriesWithIconQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesWithIconQuery = { getCategories: Array<{ id: string, isPremium: boolean, name: string, icon?: any | null }> };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { getCourses: Array<{ id: string, name: string, cover?: any | null, view: number, rate: number }> };

export type GetCourseQueryVariables = Exact<{
  getCourseId: Scalars['String']['input'];
}>;


export type GetCourseQuery = { getCourse: { id: string, name: string, view: number, rate: number, description: string, cover?: any | null, duration: number, level: string, price: number, discount: number, images?: any | null, chef?: { id: string, name?: string | null } | null, recipes: Array<{ id: string, slug?: string | null, cover_image?: any | null, name?: string | null, likes?: number | null, price?: number | null, cover_video?: any | null, time?: number | null, isPremium?: boolean | null, categories: Array<{ id: string, name: string, isPremium: boolean }> }> } };

export type GetCourseCommentsQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCourseCommentsQuery = { getCourseComments?: { pagination: { page?: number | null, pageSize?: number | null, pageCount?: number | null, total?: number | null }, comments: Array<{ id: string, text: string, reply: string, userId: string, name?: string | null, updatedAt: any, createdAt: any }> } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { id: string, phoneNumber?: string | null, name?: string | null, birthdate?: any | null, sex?: SexType | null, email?: string | null, isPlanActive?: boolean | null, subscription?: { planId: string, name: string, startDate: any, endDate: any } | null } | null };

export type GetMeAfterLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeAfterLoginQuery = { getMe?: { id: string, phoneNumber?: string | null, name?: string | null, birthdate?: any | null, sex?: SexType | null, isPlanActive?: boolean | null, email?: string | null, subscription?: { planId: string, name: string, startDate: any, endDate: any } | null } | null };

export type GetHomeDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeDataQuery = { getHomeData: { banners: any, categories: Array<{ id: string, isPremium: boolean, name: string, subText?: string | null }> } };

export type GetTodayRecipeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodayRecipeQuery = { getTodayRecipe: Array<{ id: string, slug?: string | null, cover_image?: any | null, name?: string | null, likes?: number | null, price?: number | null, cover_video?: any | null, time?: number | null, isPremium?: boolean | null, categories: Array<{ id: string, name: string, isPremium: boolean }> } | null> };

export type GetPopupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopupsQuery = { getPopups: Array<{ id: string, title: string, text: string, media?: any | null, resetDays: number, showTo: string, link: string }> };

export type GetPricePlanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPricePlanQuery = { getPricePlan: Array<{ title: string, type: PlanType, price: number, discount?: number | null, subTitle?: string | null, discountText?: string | null, actionText?: string | null, months: number, bazarId: string, id: string }> };

export type GetTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTransactionsQuery = { getTransactions: Array<{ id: string, amount: number, successful: boolean, details: any, createdAt: any }> };

export type GetDiscountBazarTokenQueryVariables = Exact<{
  code: Scalars['String']['input'];
  planId: Scalars['Int']['input'];
}>;


export type GetDiscountBazarTokenQuery = { getDiscountBazarToken: { token: string, discountPercent: number } };

export type GetCategoryRecipesQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCategoryRecipesQuery = { getCategoryRecipes: Array<{ id: string, slug?: string | null, cover_image?: any | null, name?: string | null, likes?: number | null, price?: number | null, cover_video?: any | null, time?: number | null, isPremium?: boolean | null, categories: Array<{ id: string, name: string, isPremium: boolean }> }> };

export type GetFavRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavRecipesQuery = { getFavRecipes: Array<{ id: string, slug?: string | null, cover_image?: any | null, name?: string | null, likes?: number | null, price?: number | null, cover_video?: any | null, time?: number | null, isPremium?: boolean | null, categories: Array<{ id: string, name: string, isPremium: boolean }> }> };

export type GetRecipeQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
  getRecipeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetRecipeQuery = { getRecipe: { id: string, name?: string | null, difficulty?: number | null, time?: number | null, description?: string | null, likes?: number | null, price?: number | null, isPremium?: boolean | null, cover_image?: any | null, cover_video?: any | null, portion_count?: number | null, slug?: string | null, chef?: { id: string, name?: string | null } | null, categories: Array<{ id: string, name: string, isPremium: boolean }>, ingredients: Array<{ name: string, image: any, unit: string, value: string }>, steps: Array<{ title?: string | null, text?: string | null, type: StepType, image?: any | null }>, comments: Array<{ id: string, reply: string, text: string, userId: string, name?: string | null, createdAt: any, updatedAt: any }> } };

export type GetCommentQueryVariables = Exact<{
  recipeId: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCommentQuery = { getComment?: { comments: Array<{ id: string, text: string, reply: string, userId: string, name?: string | null, createdAt: any, updatedAt: any }>, pagination: { page?: number | null, pageCount?: number | null, total?: number | null } } | null };

export type SearchIngredientsQueryVariables = Exact<{
  nameMatch: Scalars['String']['input'];
}>;


export type SearchIngredientsQuery = { searchIngredients: Array<{ id: string, name: string, image: any }> };

export type SearchIngredientGroupsQueryVariables = Exact<{
  nameMatch: Scalars['String']['input'];
}>;


export type SearchIngredientGroupsQuery = { searchIngredientGroups: Array<{ id: string, name: string, image: any }> };

export type SearchRecipesQueryVariables = Exact<{
  nameMatch?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  ingredientGroups?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type SearchRecipesQuery = { searchRecipes: Array<{ id: string, slug?: string | null, cover_image?: any | null, name?: string | null, likes?: number | null, price?: number | null, cover_video?: any | null, time?: number | null, isPremium?: boolean | null, categories: Array<{ id: string, name: string, isPremium: boolean }> }> };

export type SearchBannerQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchBannerQuery = { getSearchBanner: any };

export type GetStoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoriesQuery = { getStories: Array<{ id: string, name: string, thumbnail?: any | null, media?: any | null, views: number, link: string }> };


export const AddPopupViewDocument = gql`
    mutation AddPopupView($popupId: Int!) {
  addPopupView(popupId: $popupId)
}
    `;
export type AddPopupViewMutationFn = Apollo.MutationFunction<AddPopupViewMutation, AddPopupViewMutationVariables>;

/**
 * __useAddPopupViewMutation__
 *
 * To run a mutation, you first call `useAddPopupViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPopupViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPopupViewMutation, { data, loading, error }] = useAddPopupViewMutation({
 *   variables: {
 *      popupId: // value for 'popupId'
 *   },
 * });
 */
export function useAddPopupViewMutation(baseOptions?: Apollo.MutationHookOptions<AddPopupViewMutation, AddPopupViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPopupViewMutation, AddPopupViewMutationVariables>(AddPopupViewDocument, options);
      }
export type AddPopupViewMutationHookResult = ReturnType<typeof useAddPopupViewMutation>;
export type AddPopupViewMutationResult = Apollo.MutationResult<AddPopupViewMutation>;
export type AddPopupViewMutationOptions = Apollo.BaseMutationOptions<AddPopupViewMutation, AddPopupViewMutationVariables>;
export const ActivePlanDocument = gql`
    mutation ActivePlan($planId: Int!, $authority: String, $zarOrderId: Int, $bazarPurchaseToken: String, $userId: String) {
  activePlan(
    planId: $planId
    authority: $authority
    zarOrderId: $zarOrderId
    bazarPurchaseToken: $bazarPurchaseToken
    userId: $userId
  ) {
    phoneNumber
  }
}
    `;
export type ActivePlanMutationFn = Apollo.MutationFunction<ActivePlanMutation, ActivePlanMutationVariables>;

/**
 * __useActivePlanMutation__
 *
 * To run a mutation, you first call `useActivePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activePlanMutation, { data, loading, error }] = useActivePlanMutation({
 *   variables: {
 *      planId: // value for 'planId'
 *      authority: // value for 'authority'
 *      zarOrderId: // value for 'zarOrderId'
 *      bazarPurchaseToken: // value for 'bazarPurchaseToken'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useActivePlanMutation(baseOptions?: Apollo.MutationHookOptions<ActivePlanMutation, ActivePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivePlanMutation, ActivePlanMutationVariables>(ActivePlanDocument, options);
      }
export type ActivePlanMutationHookResult = ReturnType<typeof useActivePlanMutation>;
export type ActivePlanMutationResult = Apollo.MutationResult<ActivePlanMutation>;
export type ActivePlanMutationOptions = Apollo.BaseMutationOptions<ActivePlanMutation, ActivePlanMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($recipeId: Int!, $text: String!) {
  addComment(recipeId: $recipeId, text: $text) {
    id
    text
    reply
    userId
    name
    createdAt
    updatedAt
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const ReportDocument = gql`
    mutation Report($message: String!) {
  etaReport(message: $message)
}
    `;
export type ReportMutationFn = Apollo.MutationFunction<ReportMutation, ReportMutationVariables>;

/**
 * __useReportMutation__
 *
 * To run a mutation, you first call `useReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportMutation, { data, loading, error }] = useReportMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useReportMutation(baseOptions?: Apollo.MutationHookOptions<ReportMutation, ReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportMutation, ReportMutationVariables>(ReportDocument, options);
      }
export type ReportMutationHookResult = ReturnType<typeof useReportMutation>;
export type ReportMutationResult = Apollo.MutationResult<ReportMutation>;
export type ReportMutationOptions = Apollo.BaseMutationOptions<ReportMutation, ReportMutationVariables>;
export const RemoveCommentDocument = gql`
    mutation RemoveComment($commentId: String!) {
  removeComment(commentId: $commentId)
}
    `;
export type RemoveCommentMutationFn = Apollo.MutationFunction<RemoveCommentMutation, RemoveCommentMutationVariables>;

/**
 * __useRemoveCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentMutation, { data, loading, error }] = useRemoveCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useRemoveCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCommentMutation, RemoveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(RemoveCommentDocument, options);
      }
export type RemoveCommentMutationHookResult = ReturnType<typeof useRemoveCommentMutation>;
export type RemoveCommentMutationResult = Apollo.MutationResult<RemoveCommentMutation>;
export type RemoveCommentMutationOptions = Apollo.BaseMutationOptions<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const AddStoryViewDocument = gql`
    mutation AddStoryView($storyId: Int!) {
  addStoryView(storyId: $storyId)
}
    `;
export type AddStoryViewMutationFn = Apollo.MutationFunction<AddStoryViewMutation, AddStoryViewMutationVariables>;

/**
 * __useAddStoryViewMutation__
 *
 * To run a mutation, you first call `useAddStoryViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStoryViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStoryViewMutation, { data, loading, error }] = useAddStoryViewMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useAddStoryViewMutation(baseOptions?: Apollo.MutationHookOptions<AddStoryViewMutation, AddStoryViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStoryViewMutation, AddStoryViewMutationVariables>(AddStoryViewDocument, options);
      }
export type AddStoryViewMutationHookResult = ReturnType<typeof useAddStoryViewMutation>;
export type AddStoryViewMutationResult = Apollo.MutationResult<AddStoryViewMutation>;
export type AddStoryViewMutationOptions = Apollo.BaseMutationOptions<AddStoryViewMutation, AddStoryViewMutationVariables>;
export const ToggleFavRecipeDocument = gql`
    mutation ToggleFavRecipe($recipeId: String!) {
  toggleFavRecipe(recipeId: $recipeId) {
    currentValue
    likes
  }
}
    `;
export type ToggleFavRecipeMutationFn = Apollo.MutationFunction<ToggleFavRecipeMutation, ToggleFavRecipeMutationVariables>;

/**
 * __useToggleFavRecipeMutation__
 *
 * To run a mutation, you first call `useToggleFavRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavRecipeMutation, { data, loading, error }] = useToggleFavRecipeMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useToggleFavRecipeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavRecipeMutation, ToggleFavRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavRecipeMutation, ToggleFavRecipeMutationVariables>(ToggleFavRecipeDocument, options);
      }
export type ToggleFavRecipeMutationHookResult = ReturnType<typeof useToggleFavRecipeMutation>;
export type ToggleFavRecipeMutationResult = Apollo.MutationResult<ToggleFavRecipeMutation>;
export type ToggleFavRecipeMutationOptions = Apollo.BaseMutationOptions<ToggleFavRecipeMutation, ToggleFavRecipeMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($editProfileId: String!, $name: String, $lastname: String, $birthdate: Date, $sex: SexType, $email: String) {
  editProfile(
    id: $editProfileId
    name: $name
    lastname: $lastname
    birthdate: $birthdate
    sex: $sex
    email: $email
  ) {
    id
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      editProfileId: // value for 'editProfileId'
 *      name: // value for 'name'
 *      lastname: // value for 'lastname'
 *      birthdate: // value for 'birthdate'
 *      sex: // value for 'sex'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const LoginViaSmsDocument = gql`
    mutation LoginViaSms($phoneNumber: String!, $code: String!, $smsId: String!) {
  loginViaSms(phoneNumber: $phoneNumber, code: $code, smsId: $smsId)
}
    `;
export type LoginViaSmsMutationFn = Apollo.MutationFunction<LoginViaSmsMutation, LoginViaSmsMutationVariables>;

/**
 * __useLoginViaSmsMutation__
 *
 * To run a mutation, you first call `useLoginViaSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaSmsMutation, { data, loading, error }] = useLoginViaSmsMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      code: // value for 'code'
 *      smsId: // value for 'smsId'
 *   },
 * });
 */
export function useLoginViaSmsMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaSmsMutation, LoginViaSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaSmsMutation, LoginViaSmsMutationVariables>(LoginViaSmsDocument, options);
      }
export type LoginViaSmsMutationHookResult = ReturnType<typeof useLoginViaSmsMutation>;
export type LoginViaSmsMutationResult = Apollo.MutationResult<LoginViaSmsMutation>;
export type LoginViaSmsMutationOptions = Apollo.BaseMutationOptions<LoginViaSmsMutation, LoginViaSmsMutationVariables>;
export const RegisterViaSmsDocument = gql`
    mutation RegisterViaSms($phonenumber: String!) {
  registerViaSms(phonenumber: $phonenumber)
}
    `;
export type RegisterViaSmsMutationFn = Apollo.MutationFunction<RegisterViaSmsMutation, RegisterViaSmsMutationVariables>;

/**
 * __useRegisterViaSmsMutation__
 *
 * To run a mutation, you first call `useRegisterViaSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterViaSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerViaSmsMutation, { data, loading, error }] = useRegisterViaSmsMutation({
 *   variables: {
 *      phonenumber: // value for 'phonenumber'
 *   },
 * });
 */
export function useRegisterViaSmsMutation(baseOptions?: Apollo.MutationHookOptions<RegisterViaSmsMutation, RegisterViaSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterViaSmsMutation, RegisterViaSmsMutationVariables>(RegisterViaSmsDocument, options);
      }
export type RegisterViaSmsMutationHookResult = ReturnType<typeof useRegisterViaSmsMutation>;
export type RegisterViaSmsMutationResult = Apollo.MutationResult<RegisterViaSmsMutation>;
export type RegisterViaSmsMutationOptions = Apollo.BaseMutationOptions<RegisterViaSmsMutation, RegisterViaSmsMutationVariables>;
export const ViewCountDocument = gql`
    mutation ViewCount($place: String!) {
  viewCount(place: $place)
}
    `;
export type ViewCountMutationFn = Apollo.MutationFunction<ViewCountMutation, ViewCountMutationVariables>;

/**
 * __useViewCountMutation__
 *
 * To run a mutation, you first call `useViewCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewCountMutation, { data, loading, error }] = useViewCountMutation({
 *   variables: {
 *      place: // value for 'place'
 *   },
 * });
 */
export function useViewCountMutation(baseOptions?: Apollo.MutationHookOptions<ViewCountMutation, ViewCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewCountMutation, ViewCountMutationVariables>(ViewCountDocument, options);
      }
export type ViewCountMutationHookResult = ReturnType<typeof useViewCountMutation>;
export type ViewCountMutationResult = Apollo.MutationResult<ViewCountMutation>;
export type ViewCountMutationOptions = Apollo.BaseMutationOptions<ViewCountMutation, ViewCountMutationVariables>;
export const AddCourseCommentDocument = gql`
    mutation AddCourseComment($courseId: Int!, $text: String!) {
  addCourseComment(courseId: $courseId, text: $text) {
    id
  }
}
    `;
export type AddCourseCommentMutationFn = Apollo.MutationFunction<AddCourseCommentMutation, AddCourseCommentMutationVariables>;

/**
 * __useAddCourseCommentMutation__
 *
 * To run a mutation, you first call `useAddCourseCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCourseCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCourseCommentMutation, { data, loading, error }] = useAddCourseCommentMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddCourseCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCourseCommentMutation, AddCourseCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCourseCommentMutation, AddCourseCommentMutationVariables>(AddCourseCommentDocument, options);
      }
export type AddCourseCommentMutationHookResult = ReturnType<typeof useAddCourseCommentMutation>;
export type AddCourseCommentMutationResult = Apollo.MutationResult<AddCourseCommentMutation>;
export type AddCourseCommentMutationOptions = Apollo.BaseMutationOptions<AddCourseCommentMutation, AddCourseCommentMutationVariables>;
export const RemoveCourseCommentDocument = gql`
    mutation RemoveCourseComment($commentId: String!) {
  removeCourseComment(commentId: $commentId)
}
    `;
export type RemoveCourseCommentMutationFn = Apollo.MutationFunction<RemoveCourseCommentMutation, RemoveCourseCommentMutationVariables>;

/**
 * __useRemoveCourseCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCourseCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseCommentMutation, { data, loading, error }] = useRemoveCourseCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useRemoveCourseCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseCommentMutation, RemoveCourseCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseCommentMutation, RemoveCourseCommentMutationVariables>(RemoveCourseCommentDocument, options);
      }
export type RemoveCourseCommentMutationHookResult = ReturnType<typeof useRemoveCourseCommentMutation>;
export type RemoveCourseCommentMutationResult = Apollo.MutationResult<RemoveCourseCommentMutation>;
export type RemoveCourseCommentMutationOptions = Apollo.BaseMutationOptions<RemoveCourseCommentMutation, RemoveCourseCommentMutationVariables>;
export const RequestPayDocument = gql`
    mutation RequestPay($planId: Int!, $code: String) {
  requestPay(planId: $planId, code: $code)
}
    `;
export type RequestPayMutationFn = Apollo.MutationFunction<RequestPayMutation, RequestPayMutationVariables>;

/**
 * __useRequestPayMutation__
 *
 * To run a mutation, you first call `useRequestPayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPayMutation, { data, loading, error }] = useRequestPayMutation({
 *   variables: {
 *      planId: // value for 'planId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRequestPayMutation(baseOptions?: Apollo.MutationHookOptions<RequestPayMutation, RequestPayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPayMutation, RequestPayMutationVariables>(RequestPayDocument, options);
      }
export type RequestPayMutationHookResult = ReturnType<typeof useRequestPayMutation>;
export type RequestPayMutationResult = Apollo.MutationResult<RequestPayMutation>;
export type RequestPayMutationOptions = Apollo.BaseMutationOptions<RequestPayMutation, RequestPayMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    isPremium
    name
    image
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoriesWithIconDocument = gql`
    query GetCategoriesWithIcon {
  getCategories {
    id
    isPremium
    name
    icon
  }
}
    `;

/**
 * __useGetCategoriesWithIconQuery__
 *
 * To run a query within a React component, call `useGetCategoriesWithIconQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesWithIconQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesWithIconQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesWithIconQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>(GetCategoriesWithIconDocument, options);
      }
export function useGetCategoriesWithIconLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>(GetCategoriesWithIconDocument, options);
        }
export function useGetCategoriesWithIconSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>(GetCategoriesWithIconDocument, options);
        }
export type GetCategoriesWithIconQueryHookResult = ReturnType<typeof useGetCategoriesWithIconQuery>;
export type GetCategoriesWithIconLazyQueryHookResult = ReturnType<typeof useGetCategoriesWithIconLazyQuery>;
export type GetCategoriesWithIconSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesWithIconSuspenseQuery>;
export type GetCategoriesWithIconQueryResult = Apollo.QueryResult<GetCategoriesWithIconQuery, GetCategoriesWithIconQueryVariables>;
export const GetCoursesDocument = gql`
    query GetCourses {
  getCourses {
    id
    name
    cover
    view
    rate
  }
}
    `;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export function useGetCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesSuspenseQueryHookResult = ReturnType<typeof useGetCoursesSuspenseQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetCourseDocument = gql`
    query GetCourse($getCourseId: String!) {
  getCourse(id: $getCourseId) {
    id
    name
    view
    rate
    description
    cover
    duration
    level
    chef {
      id
      name
    }
    price
    discount
    images
    recipes {
      id
      slug
      cover_image
      name
      likes
      price
      cover_video
      time
      isPremium
      categories {
        id
        name
        isPremium
      }
    }
  }
}
    `;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      getCourseId: // value for 'getCourseId'
 *   },
 * });
 */
export function useGetCourseQuery(baseOptions: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export function useGetCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseSuspenseQueryHookResult = ReturnType<typeof useGetCourseSuspenseQuery>;
export type GetCourseQueryResult = Apollo.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export const GetCourseCommentsDocument = gql`
    query GetCourseComments($courseId: Int!, $page: Int!) {
  getCourseComments(courseId: $courseId, page: $page) {
    pagination {
      page
      pageSize
      pageCount
      total
    }
    comments {
      id
      text
      reply
      userId
      name
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useGetCourseCommentsQuery__
 *
 * To run a query within a React component, call `useGetCourseCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseCommentsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetCourseCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>(GetCourseCommentsDocument, options);
      }
export function useGetCourseCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>(GetCourseCommentsDocument, options);
        }
export function useGetCourseCommentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>(GetCourseCommentsDocument, options);
        }
export type GetCourseCommentsQueryHookResult = ReturnType<typeof useGetCourseCommentsQuery>;
export type GetCourseCommentsLazyQueryHookResult = ReturnType<typeof useGetCourseCommentsLazyQuery>;
export type GetCourseCommentsSuspenseQueryHookResult = ReturnType<typeof useGetCourseCommentsSuspenseQuery>;
export type GetCourseCommentsQueryResult = Apollo.QueryResult<GetCourseCommentsQuery, GetCourseCommentsQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    id
    phoneNumber
    name
    birthdate
    sex
    email
    isPlanActive
    subscription {
      planId
      name
      startDate
      endDate
    }
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
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMeAfterLoginDocument = gql`
    query GetMeAfterLogin {
  getMe {
    id
    phoneNumber
    name
    birthdate
    sex
    isPlanActive
    email
    subscription {
      planId
      name
      startDate
      endDate
    }
  }
}
    `;

/**
 * __useGetMeAfterLoginQuery__
 *
 * To run a query within a React component, call `useGetMeAfterLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeAfterLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeAfterLoginQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeAfterLoginQuery(baseOptions?: Apollo.QueryHookOptions<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>(GetMeAfterLoginDocument, options);
      }
export function useGetMeAfterLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>(GetMeAfterLoginDocument, options);
        }
export function useGetMeAfterLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>(GetMeAfterLoginDocument, options);
        }
export type GetMeAfterLoginQueryHookResult = ReturnType<typeof useGetMeAfterLoginQuery>;
export type GetMeAfterLoginLazyQueryHookResult = ReturnType<typeof useGetMeAfterLoginLazyQuery>;
export type GetMeAfterLoginSuspenseQueryHookResult = ReturnType<typeof useGetMeAfterLoginSuspenseQuery>;
export type GetMeAfterLoginQueryResult = Apollo.QueryResult<GetMeAfterLoginQuery, GetMeAfterLoginQueryVariables>;
export const GetHomeDataDocument = gql`
    query GetHomeData {
  getHomeData {
    banners
    categories {
      id
      isPremium
      name
      subText
    }
  }
}
    `;

/**
 * __useGetHomeDataQuery__
 *
 * To run a query within a React component, call `useGetHomeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeDataQuery(baseOptions?: Apollo.QueryHookOptions<GetHomeDataQuery, GetHomeDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(GetHomeDataDocument, options);
      }
export function useGetHomeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomeDataQuery, GetHomeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(GetHomeDataDocument, options);
        }
export function useGetHomeDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetHomeDataQuery, GetHomeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(GetHomeDataDocument, options);
        }
export type GetHomeDataQueryHookResult = ReturnType<typeof useGetHomeDataQuery>;
export type GetHomeDataLazyQueryHookResult = ReturnType<typeof useGetHomeDataLazyQuery>;
export type GetHomeDataSuspenseQueryHookResult = ReturnType<typeof useGetHomeDataSuspenseQuery>;
export type GetHomeDataQueryResult = Apollo.QueryResult<GetHomeDataQuery, GetHomeDataQueryVariables>;
export const GetTodayRecipeDocument = gql`
    query GetTodayRecipe {
  getTodayRecipe {
    id
    slug
    cover_image
    name
    likes
    price
    cover_video
    time
    isPremium
    categories {
      id
      name
      isPremium
    }
  }
}
    `;

/**
 * __useGetTodayRecipeQuery__
 *
 * To run a query within a React component, call `useGetTodayRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodayRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodayRecipeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodayRecipeQuery(baseOptions?: Apollo.QueryHookOptions<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>(GetTodayRecipeDocument, options);
      }
export function useGetTodayRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>(GetTodayRecipeDocument, options);
        }
export function useGetTodayRecipeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>(GetTodayRecipeDocument, options);
        }
export type GetTodayRecipeQueryHookResult = ReturnType<typeof useGetTodayRecipeQuery>;
export type GetTodayRecipeLazyQueryHookResult = ReturnType<typeof useGetTodayRecipeLazyQuery>;
export type GetTodayRecipeSuspenseQueryHookResult = ReturnType<typeof useGetTodayRecipeSuspenseQuery>;
export type GetTodayRecipeQueryResult = Apollo.QueryResult<GetTodayRecipeQuery, GetTodayRecipeQueryVariables>;
export const GetPopupsDocument = gql`
    query GetPopups {
  getPopups {
    id
    title
    text
    media
    resetDays
    showTo
    link
  }
}
    `;

/**
 * __useGetPopupsQuery__
 *
 * To run a query within a React component, call `useGetPopupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPopupsQuery(baseOptions?: Apollo.QueryHookOptions<GetPopupsQuery, GetPopupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPopupsQuery, GetPopupsQueryVariables>(GetPopupsDocument, options);
      }
export function useGetPopupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopupsQuery, GetPopupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPopupsQuery, GetPopupsQueryVariables>(GetPopupsDocument, options);
        }
export function useGetPopupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPopupsQuery, GetPopupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPopupsQuery, GetPopupsQueryVariables>(GetPopupsDocument, options);
        }
export type GetPopupsQueryHookResult = ReturnType<typeof useGetPopupsQuery>;
export type GetPopupsLazyQueryHookResult = ReturnType<typeof useGetPopupsLazyQuery>;
export type GetPopupsSuspenseQueryHookResult = ReturnType<typeof useGetPopupsSuspenseQuery>;
export type GetPopupsQueryResult = Apollo.QueryResult<GetPopupsQuery, GetPopupsQueryVariables>;
export const GetPricePlanDocument = gql`
    query GetPricePlan {
  getPricePlan {
    title
    type
    price
    discount
    subTitle
    discountText
    actionText
    months
    bazarId
    id
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
export function useGetPricePlanSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPricePlanQuery, GetPricePlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPricePlanQuery, GetPricePlanQueryVariables>(GetPricePlanDocument, options);
        }
export type GetPricePlanQueryHookResult = ReturnType<typeof useGetPricePlanQuery>;
export type GetPricePlanLazyQueryHookResult = ReturnType<typeof useGetPricePlanLazyQuery>;
export type GetPricePlanSuspenseQueryHookResult = ReturnType<typeof useGetPricePlanSuspenseQuery>;
export type GetPricePlanQueryResult = Apollo.QueryResult<GetPricePlanQuery, GetPricePlanQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($limit: Int) {
  getTransactions(limit: $limit) {
    id
    amount
    successful
    details
    createdAt
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export function useGetTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetTransactionsSuspenseQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetDiscountBazarTokenDocument = gql`
    query GetDiscountBazarToken($code: String!, $planId: Int!) {
  getDiscountBazarToken(code: $code, planId: $planId) {
    token
    discountPercent
  }
}
    `;

/**
 * __useGetDiscountBazarTokenQuery__
 *
 * To run a query within a React component, call `useGetDiscountBazarTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDiscountBazarTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDiscountBazarTokenQuery({
 *   variables: {
 *      code: // value for 'code'
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useGetDiscountBazarTokenQuery(baseOptions: Apollo.QueryHookOptions<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>(GetDiscountBazarTokenDocument, options);
      }
export function useGetDiscountBazarTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>(GetDiscountBazarTokenDocument, options);
        }
export function useGetDiscountBazarTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>(GetDiscountBazarTokenDocument, options);
        }
export type GetDiscountBazarTokenQueryHookResult = ReturnType<typeof useGetDiscountBazarTokenQuery>;
export type GetDiscountBazarTokenLazyQueryHookResult = ReturnType<typeof useGetDiscountBazarTokenLazyQuery>;
export type GetDiscountBazarTokenSuspenseQueryHookResult = ReturnType<typeof useGetDiscountBazarTokenSuspenseQuery>;
export type GetDiscountBazarTokenQueryResult = Apollo.QueryResult<GetDiscountBazarTokenQuery, GetDiscountBazarTokenQueryVariables>;
export const GetCategoryRecipesDocument = gql`
    query GetCategoryRecipes($categoryId: Int!, $limit: Int) {
  getCategoryRecipes(categoryId: $categoryId, limit: $limit) {
    id
    slug
    cover_image
    name
    likes
    price
    cover_video
    time
    isPremium
    categories {
      id
      name
      isPremium
    }
  }
}
    `;

/**
 * __useGetCategoryRecipesQuery__
 *
 * To run a query within a React component, call `useGetCategoryRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryRecipesQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCategoryRecipesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>(GetCategoryRecipesDocument, options);
      }
export function useGetCategoryRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>(GetCategoryRecipesDocument, options);
        }
export function useGetCategoryRecipesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>(GetCategoryRecipesDocument, options);
        }
export type GetCategoryRecipesQueryHookResult = ReturnType<typeof useGetCategoryRecipesQuery>;
export type GetCategoryRecipesLazyQueryHookResult = ReturnType<typeof useGetCategoryRecipesLazyQuery>;
export type GetCategoryRecipesSuspenseQueryHookResult = ReturnType<typeof useGetCategoryRecipesSuspenseQuery>;
export type GetCategoryRecipesQueryResult = Apollo.QueryResult<GetCategoryRecipesQuery, GetCategoryRecipesQueryVariables>;
export const GetFavRecipesDocument = gql`
    query GetFavRecipes {
  getFavRecipes {
    id
    slug
    cover_image
    name
    likes
    price
    cover_video
    time
    isPremium
    categories {
      id
      name
      isPremium
    }
  }
}
    `;

/**
 * __useGetFavRecipesQuery__
 *
 * To run a query within a React component, call `useGetFavRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetFavRecipesQuery, GetFavRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavRecipesQuery, GetFavRecipesQueryVariables>(GetFavRecipesDocument, options);
      }
export function useGetFavRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavRecipesQuery, GetFavRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavRecipesQuery, GetFavRecipesQueryVariables>(GetFavRecipesDocument, options);
        }
export function useGetFavRecipesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFavRecipesQuery, GetFavRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFavRecipesQuery, GetFavRecipesQueryVariables>(GetFavRecipesDocument, options);
        }
export type GetFavRecipesQueryHookResult = ReturnType<typeof useGetFavRecipesQuery>;
export type GetFavRecipesLazyQueryHookResult = ReturnType<typeof useGetFavRecipesLazyQuery>;
export type GetFavRecipesSuspenseQueryHookResult = ReturnType<typeof useGetFavRecipesSuspenseQuery>;
export type GetFavRecipesQueryResult = Apollo.QueryResult<GetFavRecipesQuery, GetFavRecipesQueryVariables>;
export const GetRecipeDocument = gql`
    query GetRecipe($slug: String, $getRecipeId: Int) {
  getRecipe(slug: $slug, id: $getRecipeId) {
    id
    name
    difficulty
    time
    description
    likes
    price
    isPremium
    cover_image
    cover_video
    chef {
      id
      name
    }
    categories {
      id
      name
      isPremium
    }
    portion_count
    ingredients {
      name
      image
      unit
      value
    }
    steps {
      title
      text
      type
      image
    }
    comments {
      id
      reply
      text
      userId
      name
      createdAt
      updatedAt
    }
    slug
  }
}
    `;

/**
 * __useGetRecipeQuery__
 *
 * To run a query within a React component, call `useGetRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      getRecipeId: // value for 'getRecipeId'
 *   },
 * });
 */
export function useGetRecipeQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
      }
export function useGetRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
        }
export function useGetRecipeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
        }
export type GetRecipeQueryHookResult = ReturnType<typeof useGetRecipeQuery>;
export type GetRecipeLazyQueryHookResult = ReturnType<typeof useGetRecipeLazyQuery>;
export type GetRecipeSuspenseQueryHookResult = ReturnType<typeof useGetRecipeSuspenseQuery>;
export type GetRecipeQueryResult = Apollo.QueryResult<GetRecipeQuery, GetRecipeQueryVariables>;
export const GetCommentDocument = gql`
    query GetComment($recipeId: Int!, $page: Int!) {
  getComment(recipeId: $recipeId, page: $page) {
    comments {
      id
      text
      reply
      userId
      name
      createdAt
      updatedAt
    }
    pagination {
      page
      pageCount
      total
    }
  }
}
    `;

/**
 * __useGetCommentQuery__
 *
 * To run a query within a React component, call `useGetCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentQuery({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetCommentQuery(baseOptions: Apollo.QueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
      }
export function useGetCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
        }
export function useGetCommentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, options);
        }
export type GetCommentQueryHookResult = ReturnType<typeof useGetCommentQuery>;
export type GetCommentLazyQueryHookResult = ReturnType<typeof useGetCommentLazyQuery>;
export type GetCommentSuspenseQueryHookResult = ReturnType<typeof useGetCommentSuspenseQuery>;
export type GetCommentQueryResult = Apollo.QueryResult<GetCommentQuery, GetCommentQueryVariables>;
export const SearchIngredientsDocument = gql`
    query SearchIngredients($nameMatch: String!) {
  searchIngredients(nameMatch: $nameMatch) {
    id
    name
    image
  }
}
    `;

/**
 * __useSearchIngredientsQuery__
 *
 * To run a query within a React component, call `useSearchIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIngredientsQuery({
 *   variables: {
 *      nameMatch: // value for 'nameMatch'
 *   },
 * });
 */
export function useSearchIngredientsQuery(baseOptions: Apollo.QueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
      }
export function useSearchIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
        }
export function useSearchIngredientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
        }
export type SearchIngredientsQueryHookResult = ReturnType<typeof useSearchIngredientsQuery>;
export type SearchIngredientsLazyQueryHookResult = ReturnType<typeof useSearchIngredientsLazyQuery>;
export type SearchIngredientsSuspenseQueryHookResult = ReturnType<typeof useSearchIngredientsSuspenseQuery>;
export type SearchIngredientsQueryResult = Apollo.QueryResult<SearchIngredientsQuery, SearchIngredientsQueryVariables>;
export const SearchIngredientGroupsDocument = gql`
    query SearchIngredientGroups($nameMatch: String!) {
  searchIngredientGroups(nameMatch: $nameMatch) {
    id
    name
    image
  }
}
    `;

/**
 * __useSearchIngredientGroupsQuery__
 *
 * To run a query within a React component, call `useSearchIngredientGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIngredientGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIngredientGroupsQuery({
 *   variables: {
 *      nameMatch: // value for 'nameMatch'
 *   },
 * });
 */
export function useSearchIngredientGroupsQuery(baseOptions: Apollo.QueryHookOptions<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>(SearchIngredientGroupsDocument, options);
      }
export function useSearchIngredientGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>(SearchIngredientGroupsDocument, options);
        }
export function useSearchIngredientGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>(SearchIngredientGroupsDocument, options);
        }
export type SearchIngredientGroupsQueryHookResult = ReturnType<typeof useSearchIngredientGroupsQuery>;
export type SearchIngredientGroupsLazyQueryHookResult = ReturnType<typeof useSearchIngredientGroupsLazyQuery>;
export type SearchIngredientGroupsSuspenseQueryHookResult = ReturnType<typeof useSearchIngredientGroupsSuspenseQuery>;
export type SearchIngredientGroupsQueryResult = Apollo.QueryResult<SearchIngredientGroupsQuery, SearchIngredientGroupsQueryVariables>;
export const SearchRecipesDocument = gql`
    query SearchRecipes($nameMatch: String, $ingredients: [String!], $ingredientGroups: [String!]) {
  searchRecipes(
    nameMatch: $nameMatch
    ingredients: $ingredients
    ingredientGroups: $ingredientGroups
  ) {
    id
    slug
    cover_image
    name
    likes
    price
    cover_video
    time
    isPremium
    categories {
      id
      name
      isPremium
    }
  }
}
    `;

/**
 * __useSearchRecipesQuery__
 *
 * To run a query within a React component, call `useSearchRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRecipesQuery({
 *   variables: {
 *      nameMatch: // value for 'nameMatch'
 *      ingredients: // value for 'ingredients'
 *      ingredientGroups: // value for 'ingredientGroups'
 *   },
 * });
 */
export function useSearchRecipesQuery(baseOptions?: Apollo.QueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
      }
export function useSearchRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
        }
export function useSearchRecipesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
        }
export type SearchRecipesQueryHookResult = ReturnType<typeof useSearchRecipesQuery>;
export type SearchRecipesLazyQueryHookResult = ReturnType<typeof useSearchRecipesLazyQuery>;
export type SearchRecipesSuspenseQueryHookResult = ReturnType<typeof useSearchRecipesSuspenseQuery>;
export type SearchRecipesQueryResult = Apollo.QueryResult<SearchRecipesQuery, SearchRecipesQueryVariables>;
export const SearchBannerDocument = gql`
    query SearchBanner {
  getSearchBanner
}
    `;

/**
 * __useSearchBannerQuery__
 *
 * To run a query within a React component, call `useSearchBannerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchBannerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchBannerQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchBannerQuery(baseOptions?: Apollo.QueryHookOptions<SearchBannerQuery, SearchBannerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchBannerQuery, SearchBannerQueryVariables>(SearchBannerDocument, options);
      }
export function useSearchBannerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchBannerQuery, SearchBannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchBannerQuery, SearchBannerQueryVariables>(SearchBannerDocument, options);
        }
export function useSearchBannerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchBannerQuery, SearchBannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchBannerQuery, SearchBannerQueryVariables>(SearchBannerDocument, options);
        }
export type SearchBannerQueryHookResult = ReturnType<typeof useSearchBannerQuery>;
export type SearchBannerLazyQueryHookResult = ReturnType<typeof useSearchBannerLazyQuery>;
export type SearchBannerSuspenseQueryHookResult = ReturnType<typeof useSearchBannerSuspenseQuery>;
export type SearchBannerQueryResult = Apollo.QueryResult<SearchBannerQuery, SearchBannerQueryVariables>;
export const GetStoriesDocument = gql`
    query GetStories {
  getStories {
    id
    name
    thumbnail
    media
    views
    link
  }
}
    `;

/**
 * __useGetStoriesQuery__
 *
 * To run a query within a React component, call `useGetStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetStoriesQuery, GetStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoriesQuery, GetStoriesQueryVariables>(GetStoriesDocument, options);
      }
export function useGetStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoriesQuery, GetStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoriesQuery, GetStoriesQueryVariables>(GetStoriesDocument, options);
        }
export function useGetStoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStoriesQuery, GetStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStoriesQuery, GetStoriesQueryVariables>(GetStoriesDocument, options);
        }
export type GetStoriesQueryHookResult = ReturnType<typeof useGetStoriesQuery>;
export type GetStoriesLazyQueryHookResult = ReturnType<typeof useGetStoriesLazyQuery>;
export type GetStoriesSuspenseQueryHookResult = ReturnType<typeof useGetStoriesSuspenseQuery>;
export type GetStoriesQueryResult = Apollo.QueryResult<GetStoriesQuery, GetStoriesQueryVariables>;