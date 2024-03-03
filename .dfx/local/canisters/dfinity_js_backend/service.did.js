export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addProduct' : IDL.Func(
        [
          IDL.Record({
            'attachmentURL' : IDL.Text,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'seller' : IDL.Text,
            'price' : IDL.Nat64,
            'location' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'attachmentURL' : IDL.Text,
              'title' : IDL.Text,
              'soldAmount' : IDL.Text,
              'description' : IDL.Text,
              'seller' : IDL.Text,
              'chatToken' : IDL.Text,
              'rating' : IDL.Text,
              'price' : IDL.Text,
              'location' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'buyProduct' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text, 'productId' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'getChatFeature' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'token' : IDL.Text,
              'productId' : IDL.Text,
              'buyerUsername' : IDL.Text,
              'sellerUsername' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getHomePageData' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'attachmentURL' : IDL.Text,
              'title' : IDL.Text,
              'soldAmount' : IDL.Text,
              'description' : IDL.Text,
              'seller' : IDL.Text,
              'chatToken' : IDL.Text,
              'rating' : IDL.Text,
              'price' : IDL.Text,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getProductDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'attachmentURL' : IDL.Text,
              'title' : IDL.Text,
              'soldAmount' : IDL.Text,
              'description' : IDL.Text,
              'seller' : IDL.Text,
              'chatToken' : IDL.Text,
              'rating' : IDL.Text,
              'price' : IDL.Text,
              'location' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getProductList' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'attachmentURL' : IDL.Text,
              'title' : IDL.Text,
              'soldAmount' : IDL.Text,
              'description' : IDL.Text,
              'seller' : IDL.Text,
              'chatToken' : IDL.Text,
              'rating' : IDL.Text,
              'price' : IDL.Text,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getTransactionHistory' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'status' : IDL.Text,
              'productId' : IDL.Text,
              'seller' : IDL.Text,
              'buyer' : IDL.Text,
              'amount' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getUserProfile' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'username' : IDL.Text,
              'password' : IDL.Text,
              'email' : IDL.Text,
              'walletTokens' : IDL.Text,
              'rating' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'loginUser' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'registerUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'submitReview' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'topUpWallet' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text, 'amount' : IDL.Nat64 })],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'updateProduct' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'attachmentURL' : IDL.Text,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'seller' : IDL.Text,
            'price' : IDL.Nat64,
            'location' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'attachmentURL' : IDL.Text,
              'title' : IDL.Text,
              'soldAmount' : IDL.Text,
              'description' : IDL.Text,
              'seller' : IDL.Text,
              'chatToken' : IDL.Text,
              'rating' : IDL.Text,
              'price' : IDL.Text,
              'location' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'PaymentFailed' : IDL.Text,
              'InvalidPayload' : IDL.Text,
              'NotFound' : IDL.Text,
              'PaymentCompleted' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
