import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Duration,
  Result,
  bool,
  Canister,
} from "azle";
import { Ledger, binaryAddressFromAddress, hexAddressFromPrincipal } from "azle/canisters/ledger";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

const User = Record({
  username: text,
  email: text,
  password: text,
  walletTokens: nat64,
  rating: nat64,
});

const UserResponse = Record({
  username: text,
  email: text,
  password: text,
  walletTokens: text,
  rating: text,
});

const Product = Record({
  id: text,
  title: text,
  description: text,
  location: text,
  price: nat64,
  seller: text,
  attachmentURL: text,
  soldAmount: nat64,
  rating: nat64,
  chatToken: text,
});

const ProductResponse = Record({
  id: text,
  title: text,
  description: text,
  location: text,
  price: text,
  seller: text,
  attachmentURL: text,
  soldAmount: text,
  rating: text,
  chatToken: text,
});

const ProductPayload = Record({
  title: text,
  attachmentURL: text,
  location: text,
  description: text,
  price: nat64,
  seller: text
});

const BuyPayload = Record({
  productId: text,
  username: text,
});

const TopupPayload = Record({
  amount: nat64,
  username: text,
});

const Transaction = Record({
  productId: text,
  buyer: text,
  seller: text,
  amount: nat64,
  status: text,
});

const TransactionResponse = Record({
  productId: text,
  buyer: text,
  seller: text,
  amount: text,
  status: text,
});

const Review = Record({
  productId: text,
  rating: nat64,
  review: text,
});

const Response = Record({
  id: text,
  title: text,
  description: text,
  location: text,
  price: text,
  seller: text,
  attachmentURL: text,
  soldAmount: text,
  rating: text,
  chatToken: text,
});


const ChatToken = Record({
  productId: text,
  sellerUsername: text,
  buyerUsername: text,
  token: text,
});

const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

const EmptyObject = {
  "None": null
};

type Response = Record<string, unknown>;

const users = StableBTreeMap(0, text, User);
const products = StableBTreeMap(1, text, Product);
const transactions = StableBTreeMap(2, text, Transaction);
const reviews = StableBTreeMap(3, text, Review);
const chatTokens = StableBTreeMap(4, text, ChatToken);

const ORDER_RESERVATION_PERIOD = 120n;

const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

export default Canister({
  registerUser: update([text, text, text], Result(text, Message), (username, email, password) => {
    console.log(username, email, password)
    console.log(users.get(username))
    console.log(users.values())
    if (users.get(username) == EmptyObject || users.values().some((user) => user.email === email)) {
      return Err({ NotFound: "Username or email is already in use." });
    }
    const newUser = { username, email, password, walletTokens: 0n, rating: 0n };
    console.log("mau insert user")
    users.insert(username, newUser);
    return Ok("User registration successful.");
  }),

  loginUser: query([text, text], Result(text, Message), (username, password) => {
    const userOpt = users.get(username);
    if (userOpt != EmptyObject && userOpt.Some.password === password) {
      return Ok("Authentication token");
    } else {
      return Err({ NotFound: "Invalid username or password." });
    }
  }),

  getHomePageData: query([], Vec(ProductResponse), () => {
    return products.values().map((product) => {
      return {
        ...product,
        price: product.price.toString(),
        soldAmount: product.soldAmount.toString(),
        rating: product.rating.toString(),
      };
    });
  }),
  

  getProductDetails: query([text], Result(ProductResponse, Message), (productId) => {
    console.log(productId)
    const productOpt = products.get(productId);
    if (productOpt.Some) {
      const newProduct = productOpt.Some
      const responseObj = {
        ...newProduct,
        price: newProduct.price.toString(),
        soldAmount: newProduct.soldAmount.toString(),
        rating: newProduct.rating.toString(),
      };
      console.log(responseObj)
      return Ok(responseObj);
    } else {
      return Err({ NotFound: "Product not found." });
    }
  }),

  addProduct: update([ProductPayload], Result(Response, Message), (payload) => {
    const productId = uuidv4();
    const newProduct = {
      ...payload,
      id: productId,
      soldAmount: 0n, // Set nilai awal ke nat64
      rating: 0n, // Set nilai awal ke nat64
      chatToken: generateChatToken()
    };

    products.insert(productId, newProduct);

    // Mengonversi BigInt ke string sebelum menyusun objek respons
    const responseObj = {
      ...newProduct,
      price: newProduct.price.toString(),
      soldAmount: newProduct.soldAmount.toString(),
      rating: newProduct.rating.toString(),
    };

    console.log(responseObj)

    return Ok(responseObj);
  }),

  getProductList: query([text], Vec(ProductResponse), (username) => {
    console.log(username)
    const loggedInUser = users.get(username).Some;
    return products.values().filter((product) => product.seller == loggedInUser.username).map((product) => {
      return {
        ...product,
        price: product.price.toString(),
        soldAmount: product.soldAmount.toString(),
        rating: product.rating.toString(),
      };
    });
  }),

  getUserProfile: query([text], Result(UserResponse, Message), (username) => {
    console.log(username)
    const loggedInUser = users.get(username).Some;
    const responseObj = {
      ...loggedInUser,
      walletTokens: loggedInUser.walletTokens.toString(),
      rating: loggedInUser.rating.toString(),
    };

    console.log(responseObj)
    return Ok(responseObj);
  }),

  getTransactionHistory: query([text], Vec(TransactionResponse), (username) => {
    console.log(username);
    const loggedInUser = users.get(username).Some;
    return transactions.values().filter((transaction) => transaction.buyer == loggedInUser.username || transaction.seller == loggedInUser.username).map((transaction) => {
      return {
        ...transaction,
        amount: transaction.amount.toString(),
      };
    });
  }),

  buyProduct: update([BuyPayload], Result(text, Message), (payload) => {
    console.log(payload)
    const productOpt = products.get(payload.productId);
    const loggedInUserOpt = users.get(payload.username);
    if (productOpt.Some && loggedInUserOpt != EmptyObject) {
      const product = productOpt.Some;
      console.log(product)
      const loggedInUser = loggedInUserOpt.Some;

      if (loggedInUser.walletTokens >= product.price) {
        product.soldAmount += 1n;
        products.insert(payload.productId, product);
        loggedInUser.walletTokens -= product.price;
        users.insert(payload.username, loggedInUser);
        const transactionId = uuidv4();
        const transaction = { productId: payload.productId, buyer: loggedInUser.username, seller: product.seller, amount: product.price, status: "completed" };
        transactions.insert(transactionId, transaction);
        return Ok("Product purchase successful.");
      } else {
        return Err({ PaymentFailed: "Insufficient funds to buy the product." });
      }
    } else {
      return Err({ NotFound: "Product not found." });
    }
  }),


  updateProduct: update([text, ProductPayload], Result(ProductResponse, Message), (productId, payload) => {
    console.log(payload)
    console.log(productId)
    const productOpt = products.get(productId);
    console.log(productOpt)
    if (productOpt.Some) {
      const product = productOpt.Some;
      if (product.seller == payload.seller) {
        const updatedProduct = { ...product, ...payload };
        products.insert(productId, updatedProduct);
        const responseObj = {
          ...updatedProduct,
          price: updatedProduct.price.toString(),
          soldAmount: updatedProduct.soldAmount.toString(),
          rating: updatedProduct.rating.toString(),
        };
        console.log(responseObj)
        return Ok(responseObj);
      } else {
        return Err({ NotFound: "You do not have permission to update this product." });
      }
    } else {
      return Err({ NotFound: "Product not found." });
    }
  }),

  topUpWallet: update([TopupPayload], Result(text, Message), (payload) => {
    console.log(payload)
    const loggedInUser = users.get(payload.username).Some;
    loggedInUser.walletTokens += payload.amount;
    users.insert(payload.username, loggedInUser);
    return Ok("Wallet top-up successful.");
  }),

  submitReview: update([text, nat64, text, text], Result(text, Message), (productId, rating, review, username) => {
    console.log(productId)
    console.log(review)
    console.log(rating)
    console.log(username)
    const productOpt = products.get(productId);
    if (productOpt.Some) {
      const product = productOpt.Some;
      const loggedInUser = users.get(username).Some;
      const reviewId = uuidv4();
      const newReview = { productId, rating, review };
      reviews.insert(reviewId, newReview);
      product.rating = rating;
      products.insert(productId, product);
      return Ok("Review submitted successfully.");
    } else {
      return Err({ NotFound: "Product not found." });
    }
  }),

  getChatFeature: query([text, text, text], Result(ChatToken, Message), (productId, sellerUsername, buyerUsername) => {
    console.log(productId)
    console.log(sellerUsername)
    console.log(buyerUsername)
    const productOpt = products.get(productId);
    if (productOpt.Some) {
      const product = productOpt.Some;
      if (product.seller == sellerUsername) {
        const chatToken = generateChatToken();
        const newChatToken = { productId, sellerUsername, buyerUsername, token: chatToken };
        chatTokens.insert(productId, newChatToken);
        return Ok(newChatToken);
      } else {
        return Err({ NotFound: "Invalid request to activate chat feature." });
      }
    } else {
      return Err({ NotFound: "Product not found." });
    }
  }),
});

function generateChatToken(): text {
  const correlationId = `${ic.caller().toText()}_${ic.time()}`;
  return hash(correlationId).toString();
}

function hash(input: any): nat64 {
  return BigInt(Math.abs(hashCode().value(input)));
}
