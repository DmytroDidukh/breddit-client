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

export type AuthenticationError = {
    __typename?: 'AuthenticationError';
    message: Scalars['String']['output'];
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String']['output'];
    message: Scalars['String']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createPost: Post;
    deletePost: Scalars['Boolean']['output'];
    deleteUser: Scalars['Boolean']['output'];
    signIn: SignInResult;
    signUp: SignUpResult;
    updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
    title: Scalars['String']['input'];
};

export type MutationDeletePostArgs = {
    id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
    id: Scalars['Int']['input'];
};

export type MutationSignInArgs = {
    user: SignInInput;
};

export type MutationSignUpArgs = {
    user: SignUpInput;
};

export type MutationUpdatePostArgs = {
    id: Scalars['Int']['input'];
    title: Scalars['String']['input'];
};

export type Post = {
    __typename?: 'Post';
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['Int']['output'];
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<User>;
    post?: Maybe<Post>;
    posts: Array<Post>;
    users: Array<User>;
};

export type QueryPostArgs = {
    id: Scalars['Float']['input'];
};

export type SignInInput = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type SignInResult = {
    __typename?: 'SignInResult';
    errors?: Maybe<Array<AuthenticationError>>;
    user?: Maybe<User>;
};

export type SignUpInput = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type SignUpResult = {
    __typename?: 'SignUpResult';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['Int']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
    username: Scalars['String']['output'];
};
