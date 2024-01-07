export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTimeISO: { input: any; output: any };
};

export type ChangePasswordInput = {
    password: Scalars['String']['input'];
    token: Scalars['String']['input'];
};

export type ChangePasswordResult = {
    __typename?: 'ChangePasswordResult';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type CreatePostInput = {
    content: Scalars['String']['input'];
    title: Scalars['String']['input'];
};

export type CreatePostResult = {
    __typename?: 'CreatePostResult';
    errors?: Maybe<Array<FieldError>>;
    post?: Maybe<Post>;
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String']['output'];
    message: Scalars['String']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    changePassword: ChangePasswordResult;
    createPost: CreatePostResult;
    deletePost: Scalars['Boolean']['output'];
    deleteUser: Scalars['Boolean']['output'];
    forgotPassword: Scalars['Boolean']['output'];
    signIn: User;
    signOut: Scalars['Boolean']['output'];
    signUp: SignUpResult;
    updatePost: UpdatePostResult;
};

export type MutationChangePasswordArgs = {
    options: ChangePasswordInput;
};

export type MutationCreatePostArgs = {
    post: CreatePostInput;
};

export type MutationDeletePostArgs = {
    id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
    id: Scalars['Int']['input'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String']['input'];
};

export type MutationSignInArgs = {
    user: SignInInput;
};

export type MutationSignUpArgs = {
    user: SignUpInput;
};

export type MutationUpdatePostArgs = {
    id: Scalars['Int']['input'];
    post: UpdatePostInput;
};

export type Post = {
    __typename?: 'Post';
    author: User;
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['Int']['output'];
    points: Scalars['Float']['output'];
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<User>;
    post?: Maybe<Post>;
    posts: Array<Post>;
    postsByAuthor: Array<Post>;
    users: Array<User>;
};

export type QueryPostArgs = {
    id: Scalars['Float']['input'];
};

export type QueryPostsArgs = {
    cursor?: InputMaybe<Scalars['DateTimeISO']['input']>;
    limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPostsByAuthorArgs = {
    cursor?: InputMaybe<Scalars['DateTimeISO']['input']>;
    id: Scalars['Int']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};

export type SignInInput = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type SignUpInput = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type SignUpResult = {
    __typename?: 'SignUpResult';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type UpdatePostInput = {
    content?: InputMaybe<Scalars['String']['input']>;
    title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostResult = {
    __typename?: 'UpdatePostResult';
    errors?: Maybe<Array<FieldError>>;
    post?: Maybe<Post>;
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['DateTimeISO']['output'];
    email: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
    username: Scalars['String']['output'];
};
