import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'addProduct' : ActorMethod<
    [
      {
        'attachmentURL' : string,
        'title' : string,
        'description' : string,
        'seller' : string,
        'price' : bigint,
        'location' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'attachmentURL' : string,
          'title' : string,
          'soldAmount' : string,
          'description' : string,
          'seller' : string,
          'chatToken' : string,
          'rating' : string,
          'price' : string,
          'location' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'buyProduct' : ActorMethod<
    [{ 'username' : string, 'productId' : string }],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getChatFeature' : ActorMethod<
    [string, string, string],
    {
        'Ok' : {
          'token' : string,
          'productId' : string,
          'buyerUsername' : string,
          'sellerUsername' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getHomePageData' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'attachmentURL' : string,
        'title' : string,
        'soldAmount' : string,
        'description' : string,
        'seller' : string,
        'chatToken' : string,
        'rating' : string,
        'price' : string,
        'location' : string,
      }
    >
  >,
  'getProductDetails' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'attachmentURL' : string,
          'title' : string,
          'soldAmount' : string,
          'description' : string,
          'seller' : string,
          'chatToken' : string,
          'rating' : string,
          'price' : string,
          'location' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'getProductList' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'attachmentURL' : string,
        'title' : string,
        'soldAmount' : string,
        'description' : string,
        'seller' : string,
        'chatToken' : string,
        'rating' : string,
        'price' : string,
        'location' : string,
      }
    >
  >,
  'getTransactionHistory' : ActorMethod<
    [string],
    Array<
      {
        'status' : string,
        'productId' : string,
        'seller' : string,
        'buyer' : string,
        'amount' : string,
      }
    >
  >,
  'getUserProfile' : ActorMethod<
    [string],
    {
        'Ok' : {
          'username' : string,
          'password' : string,
          'email' : string,
          'walletTokens' : string,
          'rating' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'loginUser' : ActorMethod<
    [string, string],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'registerUser' : ActorMethod<
    [string, string, string],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'submitReview' : ActorMethod<
    [string, bigint, string, string],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'topUpWallet' : ActorMethod<
    [{ 'username' : string, 'amount' : bigint }],
    { 'Ok' : string } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
  'updateProduct' : ActorMethod<
    [
      string,
      {
        'attachmentURL' : string,
        'title' : string,
        'description' : string,
        'seller' : string,
        'price' : bigint,
        'location' : string,
      },
    ],
    {
        'Ok' : {
          'id' : string,
          'attachmentURL' : string,
          'title' : string,
          'soldAmount' : string,
          'description' : string,
          'seller' : string,
          'chatToken' : string,
          'rating' : string,
          'price' : string,
          'location' : string,
        }
      } |
      {
        'Err' : { 'PaymentFailed' : string } |
          { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'PaymentCompleted' : string }
      }
  >,
}
