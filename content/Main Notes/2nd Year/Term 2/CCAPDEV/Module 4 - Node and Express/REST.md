---
id: rest
type: note
course: CCAPDEV
topic: REST
status: completed
---

# REST

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[REST]] #[[Conceptual]] #[[M4]]

---

## Overview

> Extracted notes for REST covering both theoretical and practical elements.

## Key Definitions
 What is an API An API provides aw means for different applications to communicate and transfer information to one another
 REST REST, which stands for Representational State Transfer, is an architectural style that focuses on producing efficient, reliable, and scalable distributed systems. https://developer.mozilla.org/en-US/docs/Glossary/REST
 Guiding Principles of REST Client-Server decoupling Separating the user interface concerns from the data storage concerns improves the portability of the user interface across multiple platforms and improve scalability by simplifying the server components. https://www.ibm.com/cloud/learn/rest-apis
 Guiding Principles of REST Statelessness Each request from the clients must contain all the information necessary to understand the request. Session state is therefore kept entirely on the client. https://www.ibm.com/cloud/learn/rest-apis
 Guiding Principles of REST Cacheable REST requires that the data within a response be implicitly or explicitly labeled as cacheable or non-cacheable. If a response is cacheable, then a client cache is given the right to reuse the response data for later, equivalent requests.  https://www.ibm.com/cloud/learn/rest-apishttps://restfulapi.net/caching/

## Theoretical Framework

> Guiding Principles of REST
> Uniform Interface
> In order to obtain a uniform interface, multiple architectural constraints are needed to guide the behavior of components.
> https://www.ibm.com/cloud/learn/rest-apis

> Guiding Principles of REST
> Layered System
> The layered system style allows an architecture to be composed of hierarchical layers by constraining component behavior. As a rule of thumb, we do not assume that the client and server applications connect directly to each other.
> https://www.ibm.com/cloud/learn/rest-apis

> What is HTTP?
> HTTP is the underlying protocol used by the World Wide Web
> Hypertext Transfer Protocol
> Follows the classic client-server model
> Stateless protocol – the server does not keep any state or data when the response is sent to the client.

> HTTP Request Methods
> A set of verbs which indicate an action to be performed for a given resource
> Addresses the ‘Uniform Interface’ constraint of REST
> Methods:
> GET
> POST
> PUT
> PATCH
> DELETE
> https://www.restapitutorial.com/lessons/httpmethods.html

> Side: Safe
> A property of http methods wherein the request would not alter the state of the server.
> This means that the request is read-only.
> https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP

## Multiple Choice Questions

1. According to the guiding principles of REST, what does "Statelessness" mean?
- **A)** The server maintains an active, continuous socket connection with the client.
- **B)** Each request from the client must contain all information necessary to understand it, and session state is kept entirely on the client.
- **C)** The server is not allowed to use a database to store any persistent information.
- **D)** Clients cannot cache responses locally.

2. Which of the following HTTP methods is typically used to request data and is considered "Safe" (i.e., it does not alter the state of the server)?
- **A)** POST
- **B)** PUT
- **C)** DELETE
- **D)** GET

3. What is the primary benefit of Client-Server decoupling in REST architecture?
- **A)** It allows the server to directly manipulate the client's DOM.
- **B)** It forces both components to share the exact same programming language.
- **C)** It improves the portability of the user interface across platforms and simplifies server components.
- **D)** It merges the data storage layer directly into the client's browser.

### Answer Key & Explanations
1. **B)** Statelessness means that each request must contain all the information necessary for the server to understand it, keeping the session state entirely on the client.
2. **D)** GET is an HTTP method used to retrieve resources and is considered a "safe" method because it is read-only.
3. **C)** Client-Server decoupling separates UI concerns from data storage concerns, improving UI portability and server scalability.

## References & Navigation

- **Previous Topic:** [[Express]]
- **Next Topic:** [[Handlebars]]
- **Related Notes:** [[Client Server Architecture]]
