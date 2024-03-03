import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  registerUser,
  loginUser,
  addProduct,
  topUpWallet,
  updateProduct,
  getUserProfile,
  buyProduct,
  getHomePageData,
  getChatFeature,
  getProductDetails,
  getProductList,
  getTransactionHistory,
  submitReview,
} from "./utils/marketplace";

const App = () => {
  const [apiResponses, setApiResponses] = useState({});
  const [formData, setFormData] = useState({});

  const handleInputChange = (testCase, field, value) => {
    setFormData((prevData) => ({ ...prevData, [testCase]: { ...prevData[testCase], [field]: value } }));
  };

  const testAPI = async (testCase) => {
    try {
      let response;

      switch (testCase) {
        case "Register User":
          response = await registerUser(formData[testCase].username, formData[testCase].email, formData[testCase].password);
          break;
        case "Login User":
          response = await loginUser(formData[testCase].username, formData[testCase].password);
          break;
        case "Add Product":
          response = await addProduct(formData[testCase]);
          break;
        case "Top Up Wallet":
          response = await topUpWallet({ username: formData[testCase].username, amount: formData[testCase].amount });
          break;
        case "Update Product":
          response = await updateProduct(formData[testCase].productId, formData[testCase]);
          break;
        case "Profile User":
          response = await getUserProfile(formData[testCase].username);
          break;
        case "Buy Product":
          response = await buyProduct({ username: formData[testCase].buyer, productId: formData[testCase].productId });
          break;
        case "Home Page":
          response = await getHomePageData();
          break;
        case "Chat":
          response = await getChatFeature(formData[testCase].productId, formData[testCase].seller, formData[testCase].buyer);
          break;
        case "Product Data":
          response = await getProductDetails(formData[testCase].productId);
          break;
        case "List Product":
          response = await getProductList(formData[testCase].username);
          break;
        case "Transaction History":
          response = await getTransactionHistory(formData[testCase].username);
          break;
        case "Review":
          response = await submitReview(formData[testCase].productId, formData[testCase].rating, formData[testCase].review, formData[testCase].username);
          break;
        default:
          console.error("Invalid test case");
          return;
      }

      setApiResponses((prevState) => ({ ...prevState, [testCase]: response }));
    } catch (error) {
      console.error("Error testing API:", error);
    }
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px", backgroundColor: "black", color: "red" }}>
      {["Register User", "Login User", "Add Product", "Top Up Wallet", "Update Product", "Profile User", "Buy Product", "Home Page", "Chat", "Product Data", "List Product", "Transaction History", "Review"].map((testCase) => (
        <Row key={testCase}>
          <Col>
            <h3>{`Test Case ${testCase}`}</h3>
            <Form>
              {/* Create form inputs dynamically based on the test case */}
              {testCase === "Register User" ? (
                <>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Email`}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => handleInputChange(testCase, "email", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Password`}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => handleInputChange(testCase, "password", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Login User" ? (
                <>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Password`}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => handleInputChange(testCase, "password", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Add Product" ? (
                <>
                  <Form.Group controlId={`${testCase}AttachmentURL`}>
                    <Form.Label>Attachment URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter attachment URL"
                      onChange={(e) => handleInputChange(testCase, "attachmentURL", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Title`}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product title"
                      onChange={(e) => handleInputChange(testCase, "title", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Description`}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter product description"
                      onChange={(e) => handleInputChange(testCase, "description", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Seller`}>
                    <Form.Label>Seller</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter seller name"
                      onChange={(e) => handleInputChange(testCase, "seller", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Price`}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter product price"
                      onChange={(e) => handleInputChange(testCase, "price", parseFloat(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Location`}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product location"
                      onChange={(e) => handleInputChange(testCase, "location", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Top Up Wallet" ? (
                <>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Amount`}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount to top up"
                      onChange={(e) => handleInputChange(testCase, "amount", parseFloat(e.target.value))}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Update Product" ? (
                <>
                  <Form.Group controlId={`${testCase}ProductId`}>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product ID"
                      onChange={(e) => handleInputChange(testCase, "productId", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}AttachmentURL`}>
                    <Form.Label>Attachment URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter updated attachment URL"
                      onChange={(e) => handleInputChange(testCase, "attachmentURL", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Title`}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter updated product title"
                      onChange={(e) => handleInputChange(testCase, "title", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Description`}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter updated product description"
                      onChange={(e) => handleInputChange(testCase, "description", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Seller`}>
                    <Form.Label>Seller</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter updated seller name"
                      onChange={(e) => handleInputChange(testCase, "seller", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Price`}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter updated product price"
                      onChange={(e) => handleInputChange(testCase, "price", parseFloat(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Location`}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter updated product location"
                      onChange={(e) => handleInputChange(testCase, "location", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Profile User" ? (
                <>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Buy Product" ? (
                <>
                  <Form.Group controlId={`${testCase}Buyer`}>
                    <Form.Label>Buyer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter buyer username"
                      onChange={(e) => handleInputChange(testCase, "buyer", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}ProductId`}>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product ID"
                      onChange={(e) => handleInputChange(testCase, "productId", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Home Page" ? (
                <>
                  {/* No specific input required for the Home Page test case */}
                  <p>This test case does not require any input. Click the button to fetch home page data.</p>
                </>
              ) : testCase === "Chat" ? (
                <>
                  <Form.Group controlId={`${testCase}ProductId`}>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product ID"
                      onChange={(e) => handleInputChange(testCase, "productId", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Seller`}>
                    <Form.Label>Seller Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter seller username"
                      onChange={(e) => handleInputChange(testCase, "seller", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Buyer`}>
                    <Form.Label>Buyer Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter buyer username"
                      onChange={(e) => handleInputChange(testCase, "buyer", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Product Data" ? (
                <>
                  <Form.Group controlId={`${testCase}ProductId`}>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product ID"
                      onChange={(e) => handleInputChange(testCase, "productId", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "List Product" ? (
                <>
                  <Form.Group controlId={`${testCase}Seller`}>
                    <Form.Label>Seller Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter seller username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Transaction History" ? (
                <>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>User Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter user username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : testCase === "Review" ? (
                <>
                  <Form.Group controlId={`${testCase}ProductId`}>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product ID"
                      onChange={(e) => handleInputChange(testCase, "productId", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Rating`}>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter product rating (1-5)"
                      onChange={(e) => handleInputChange(testCase, "rating", parseInt(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}ReviewText`}>
                    <Form.Label>Review Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter review text"
                      onChange={(e) => handleInputChange(testCase, "review", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`${testCase}Username`}>
                    <Form.Label>User Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter user username"
                      onChange={(e) => handleInputChange(testCase, "username", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : (
                // Other test cases
                <Form.Group controlId={`${testCase}Data`}>
                  {/* Create form inputs for other test cases */}
                  {/* ... */}
                </Form.Group>
              )}
            </Form>
            <Button variant="orange" style={{ backgroundColor: "orange", border: "1px solid orange" }} onClick={() => testAPI(testCase)}>
              Test Case {testCase}
            </Button>
            <br />
            {/* Display responses */}
            <pre>{JSON.stringify(apiResponses[testCase], null, 2)}</pre>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default App;
