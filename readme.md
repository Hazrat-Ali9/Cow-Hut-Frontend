### Online Cow Selling Backend for Eid Ul Adha

This project is a simple backend project for a cow hut. It is a simple project that allows a user to add cows to the cow hut, and get the status of the cow hut. Seller can also sell cows from the cow hut app. and buyer can buy cows from the cow hut app. and also can see the status of the cow hut. Admin can also add new admin to the cow hut app. and also can see the status of the cow hut.  This project is built with Node.js, Express.js, MongoDB, and JWT. Added advanced filtering, pagination, and search features. Also added authentication and authorization features.

### Live Link: https://assignment-4-cow-hut-server.vercel.app/

### All The Application Routes are given below:


#### Auth
- https://assignment-4-cow-hut-server.vercel.app/api/v1/auth/login (POST) - For login a user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/auth/refresh-token (POST) - For refresh token

#### User
- https://assignment-4-cow-hut-server.vercel.app/api/v1/auth/signup (POST) - For create a new user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users (GET) - For get all the users
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users/649c10203ff1b2c8b4c22fc5 (GET) - For get a single user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users/649c10203ff1b2c8b4c22fc5 (PATCH) - For update a single user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users/649c10203ff1b2c8b4c22fc5 (DELETE) - For delete a single user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users/my-profile (GET) - For get the profile of a user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/users/my-profile (PATCH) - For update the profile of a user


#### Admin
- https://assignment-4-cow-hut-server.vercel.app/api/v1/admin/create-admin (POST) - For create a new admin
- https://assignment-4-cow-hut-server.vercel.app/api/v1/admin/login (POST) - For login a admin

#### Cows

- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows (POST) - For create a new cow
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows (GET) - For get all the cows aslo can filter by location, maxPrice , minPrice, and search by name search term etc 
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows/64900619c222bbfaadbdfb21 (Single GET) - For get a single cow
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows/64900619c222bbfaadbdfb21 (PATCH) - For update a single cow
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows/64900619c222bbfaadbdfb21 (DELETE) Include an id that is saved in your database
<!-- 
### Pagination and Filtering routes of Cows

- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows?page=1&limit=10
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows?location=Chattogram
- https://assignment-4-cow-hut-server.vercel.app/api/v1/cows?searchTerm=Cha -->

#### Orders

- https://assignment-4-cow-hut-server.vercel.app/api/v1/orders (POST) - For create a new order (buyer can buy a cow)
- https://assignment-4-cow-hut-server.vercel.app/api/v1/orders (GET) - For get all the orders of a user
- https://assignment-4-cow-hut-server.vercel.app/api/v1/orders/64a18bc8d3bd1453e04a6c4e (Single GET) - For get a single order
