export async function registerUser(username, email, password) {
  try {
    return await window.canister.marketplace.registerUser(username, email, password);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error registering user." };
  }
}

export async function loginUser(username, password) {
  try {
    return await window.canister.marketplace.loginUser(username, password);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error logging in." };
  }
}

export async function getHomePageData() {
  try {
    return await window.canister.marketplace.getHomePageData();
  } catch (err) {
    // Handle errors
    console.error(err);
    return [];
  }
}

export async function getProductDetails(productId) {
  try {
    return await window.canister.marketplace.getProductDetails(productId);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error getting product details." };
  }
}

export async function addProduct(productPayload) {
  try {
    return await window.canister.marketplace.addProduct(productPayload);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error adding product." };
  }
}

export async function getProductList(username) {
  try {
    return await window.canister.marketplace.getProductList(username);
  } catch (err) {
    // Handle errors
    console.error(err);
    return [];
  }
}

export async function getUserProfile(username) {
  try {
    return await window.canister.marketplace.getUserProfile(username);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error getting user profile." };
  }
}

export async function getTransactionHistory(username) {
  try {
    return await window.canister.marketplace.getTransactionHistory(username);
  } catch (err) {
    // Handle errors
    console.error(err);
    return [];
  }
}

export async function buyProduct(buyData) {
  try {
    return await window.canister.marketplace.buyProduct(buyData);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error buying product." };
  }
}

export async function updateProduct(productId, productPayload) {
  try {
    return await window.canister.marketplace.updateProduct(productId, productPayload);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error updating product." };
  }
}

export async function topUpWallet(topupData) {
  try {
    return await window.canister.marketplace.topUpWallet(topupData);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error topping up wallet." };
  }
}

export async function submitReview(productId, rating, review, username) {
  try {
    return await window.canister.marketplace.submitReview(productId, rating, review, username);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error submitting review." };
  }
}

export async function getChatFeature(productId, sellerUsername, buyerUsername) {
  try {
    return await window.canister.marketplace.getChatFeature(productId, sellerUsername, buyerUsername);
  } catch (err) {
    // Handle errors
    console.error(err);
    return { Err: "Error getting chat feature." };
  }
}
