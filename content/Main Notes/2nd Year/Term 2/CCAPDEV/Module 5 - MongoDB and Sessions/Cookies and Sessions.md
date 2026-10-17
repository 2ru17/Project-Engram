---
id: cookies_and_sessions
type: note
course: CCAPDEV
topic: Cookies and Sessions
status: completed
---

# Cookies and Sessions

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Cookies and Sessions]] #[[Code Snippets]] #[[M5]]

---

## Overview

> Extracted notes for Cookies and Sessions covering both theoretical and practical elements.

## Key Definitions
 COOKIES & SESSIONS
 HTTP Review Remember that HTTP is a stateless protocol. This means that when you load explore a website navigating from page to page the server or even the browser has no way of tracking that its the same browser that is visiting the website.  This is problematic because websites won’t be able to remember the users preferences. Browsers won't also be able to distinguish the type of user (ex. Admin, customer) that is using the website
 How do we Solve this? COOKIES & SESSIONS
 Cookie Properties Cookies are not secret from the user, cookies sent by the server are available to the client to look at.  Users can delete cookies, users have control over cookies and browsers make it possible to delete cookies.  Cookies can be tampered with, users can edit the values of the cookies  Prefer session over cookies, sessions still rely on cookies but is more secure.
 Cookie Properties Cookies are stored in string format  Cookies live on the client side  Limited amount of data can be stored at least ~4mb Cookies have a lifespan that can be set for a long time

## Code Implementation

```text
How cookies work? 
Post /login
201 ok; Cookie: USERID=1234
Get /posts; Cookie USERID=1234
Posts.hbs, {post data}
```

```text
How to write cookies? 
app.get(“/”, function(req,res){
res.cookie(“foo”, “bar”, {
	maxAge: 60*60*1000,
	httpOnly: true
})
})
“Foo” is the name of the cookie 
“Bar” is the value of the cookie 
maxAge, expiry time relative to current time in milliseconds 
httpOnly, Flags the cookie to be only accessible by the web server, make the cookie inaccessible if used through document.cookie 
https://expressjs.com/en/5x/api.html#res.cookie
```

```text
How to read cookies? 
npm install cookie-parser
const cookieparser 
= require(“cookie-parser”)
app.use(cookieparser())
app.get(“/”, function(req,res){
let cookiefoo = req.cookies.foo
if(cookiefoo){
console.log(“foo: “ + cookiefoo)
}
})
Install Cookie Parser
Import Cookie Parser
```

```text
How sessions work? 
Post /login
201 ok; Cookie: SESSIONID=1234
Get /posts; Cookie SESSIONID=1234
Posts.hbs, {post data}
1234 : {
    Userid: 123,
    Usertype: “customer”
}
```

```text
How to read/write sessions? 
https://github.com/expressjs/session  
app.get(“/”, function(req,res){
req.session.foo = “bar”
})
npm install express-session
app.use(session({
secret: “very super secret”,
resave: false,
saveUninitialized: true,
cookie: {
	maxAge:1000*60*60*24*30
	httpOnly: true
}
}))
const session = require(“express-session”)
Install Express Session
Import Express Session
Secret, used to sign the session ID cookie. This prevents users from being a sus
Resave, forces the session to be saved back to the session store even if  session was never modified 
SaveUninitialized, Forces a session that is uninitialized to be saved to the store
Cookie, Cookie properties are set here
```

## Syntax Breakdown
 Ensure correct syntax for Cookies and Sessions Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Which of the following is a key characteristic of HTTP cookies?
- **A)** They can hold up to 10GB of data.
- **B)** They live permanently on the server side and are invisible to the client.
- **C)** They can be tampered with by the user unless properly secured.
- **D)** They cannot be deleted once set by the server.

2. In Express, when creating a cookie, what does the `httpOnly: true` flag do?
- **A)** It encrypts the cookie using AES-256 before sending it over the network.
- **B)** It restricts the cookie to only be accessible by the web server, making it inaccessible to client-side scripts like `document.cookie`.
- **C)** It forces the client to only request pages over HTTP instead of HTTPS.
- **D)** It extends the `maxAge` of the cookie indefinitely.

3. Why are Sessions generally preferred over plain Cookies for storing sensitive user data?
- **A)** Sessions do not use cookies at all, making them immune to network sniffing.
- **B)** Sessions run faster because they bypass the HTTP protocol.
- **C)** Sessions still rely on a cookie (like a Session ID), but the actual sensitive data is securely stored on the server side.
- **D)** Sessions are natively encrypted by the client's browser before being sent.

### Answer Key & Explanations
1. **C)** Cookies live on the client side, are available to the client to look at, and can be tampered with by the user.
2. **B)** `httpOnly` flags the cookie to be only accessible by the web server, making the cookie inaccessible via client-side JavaScript (`document.cookie`).
3. **C)** Sessions are preferred because they store only an identifier (Session ID) in the cookie, keeping the actual data on the server side, which is much more secure.

## References & Navigation

- **Previous Topic:** [[Mongoose]]
- **Next Topic:** [[Security & Authentication]]
- **Related Notes:** [[Client Server Architecture]]
