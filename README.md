### FULL-STACK ASSESSMENT, STAGE 2 FOR TTP
_Deployed on Heroku at:_ [Stock Portfolio](https://kat-le-stock-portfolio.herokuapp.com/)

**Front-end:** Built with JavaScript libraries React and Redux for user interface design and implementation, and state management, respectively.

**Back-end:** Server built with JavaScript runtime Node.js and Express, a Node.js framework, on the backend, querying a PostgreSQL database with Sequelize ORM.


**How to run locally:**
1. Install PostgreSQL and run `createdb stockportfolio` in bash.
2. Run `npm install` in bash.
3. Run `npm start` and the server should be running at `localhost:1008`.



This stock portfolio app is designed and implemented for the following user stories:

#### USER STORIES
1. As a user, I want to create a new account with my name, email, and password so that I can buy and
trade stocks.
    * Default the user’s cash account balance to $5000.00 USD.
    * A user can only register once with any given email.



2. As a user, I want to authenticate via email and password so that I can access my account.

3. As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the
number of shares so that I can invest.
    * A user can only buy whole number quantities of shares.
    * A user can only buy shares if they have enough cash in their account for a given purchase.
    * A user can only buy shares if the ticker symbol is valid.

4. As a user, I want to view a list of all transactions I’ve made to date (trades) so that I can perform an
audit.

5. As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so
that I can review performance.
    * Current values should be based on the latest price and quantity owned for a given stock.
    * Each stock owned should only appear once.

6. As a user, I’d like to see the font color of stock symbols and current prices in my portfolio change
dynamically to indicate performance.
    * Display red when the current price is less than the day’s open price.
    * Display grey when the current price is equal to the day’s open price.
    * Display green when the current price is greater than the day’s open price.
    