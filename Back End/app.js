const mysql = require("mysql2");
const express = require("express");
const Port = 3001;
const cors = require("cors");
const app = express();
require("dotenv").config();

//middle ware to extract info from the html
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Middle ware to have access to the frontend
app.use(cors());
app.use(express.json());

//User account info
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

//Connect to mysql
mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Route: / => Homepage route
app.get("/", (req, res) => res.send("Up and running..."));

// Rout: /install=>to create the tables
app.get("/install", (req, res) => {
  let message = "Tables Created";
  //Putting Query on a variable
  let CreateProducts = `CREATE TABLE if not exists Products(
  product_id int auto_increment,
  product_url VARCHAR(255) not null,
  product_name VARCHAR(255) not null,
  PRIMARY KEY(product_id)
)`;

  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createUser = `CREATE TABLE if not exists User(
    user_id int auto_increment,
    User_name varchar(255) not null,
    User_password varchar(255) not null,
    PRIMARY KEY (user_id)
  )`;
  let createOrder = `CREATE TABLE if not exists Orders(
    order_id int auto_increment,
    product_id int(11) not null,
    user_id int(11) not null,
    User_password varchar(255) not null,
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
 )`;

  //Executing the query's we wrote above
  mysqlConnection.query(CreateProducts, (err, results, fields) => {
    if (err) console.log(err.message);
    message = "Error creating ProductPrice table";
    return res.end(message);
  });
  mysqlConnection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err.message);
    message = "Error creating ProductPrice table";
    return res.end(message);
  });
  mysqlConnection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err.message);
    message = "Error creating ProductPrice table";
    return res.end(message);
  });
  mysqlConnection.query(createUser, (err, results, fields) => {
    if (err) console.log(err.message);
    message = "Error creating ProductPrice table";
    return res.end(message);
  });
  mysqlConnection.query(createOrder, (err, results, fields) => {
    if (err) console.log(err.message);
    message = "Error creating ProductPrice table";
    return res.end(message);
  });
  res.end(message);
  console.log(message);
});

app.post("/addiphones", (req, res) => {
  //
  const {
    product_url,
    product_name,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    User_name,
    User_password,
  } = req.body;
  //? "?" => query parameter-solves sql injection - security problem
  let insertProducts = `INSERT INTO Products (product_url, product_name) VALUES (?, ?)`;
  let insertProductDescription = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)`;
  let insertProductPrice = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
  let insertUser = `INSERT INTO User (User_name, User_password) VALUES (?, ?)`;
  let insertOrders = `INSERT INTO Orders (product_id, user_id) VALUES (?, ?)`;

  mysqlConnection.query(
    insertProducts,
    [product_url, product_name],
    (err, results, fields) => {
      if (err) console.log(`Error Found: ${err}`);
      else console.table(results);

      const ProId = results.insertId;

      mysqlConnection.query(
        insertProductDescription,
        [
          ProId,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );

      mysqlConnection.query(
        insertProductPrice,
        [ProId, starting_price, price_range],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );

      mysqlConnection.query(
        insertUser,
        [User_name, User_password],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);

          const UserId = results.insertId; //

          mysqlConnection.query(
            insertOrders,
            [ProId, UserId],
            (err, results, fields) => {
              if (err) console.log(`Error Found: ${err}`);
            }
          );
        }
      );
    }
  );
  res.end("Data inserted successfully!");
  console.log("Data inserted successfully!");
});

// Route: /Product-detail-info => To retrieve data from the tables
app.get("/iphones", (req, res) => {
  mysqlConnection.query(
  
  `SELECT
      Products.product_id,
      Products.product_url,
      Products.product_name,
      ProductDescription.product_brief_description,
      ProductDescription.product_description,
      ProductDescription.product_img,
      ProductDescription.product_link,
      ProductPrice.starting_price,
      ProductPrice.price_range
    FROM
      Products
      JOIN ProductDescription ON Products.product_id = ProductDescription.product_id
      JOIN ProductPrice ON Products.product_id = ProductPrice.product_id`,

    (err, results, fields) => {
      if (err) {
        console.log("Error During selection", err);
        res.status(500).send("An error occurred");
      } else {
        res.json({ iphones: results });
      }
    }
  );
});
app.get("/iphones/:product_url", (req, res) => {
  const { product_url } = req.params;

  // If product_url is provided, fetch the single product

  mysqlConnection.query(
    `SELECT 
        Products.product_id, 
        Products.product_url, 
        Products.product_name, 
        ProductDescription.product_brief_description, 
        ProductDescription.product_description, 
        ProductDescription.product_img, 
        ProductDescription.product_link, 
        ProductPrice.starting_price, 
        ProductPrice.price_range 
      FROM 
        Products 
        JOIN ProductDescription ON Products.product_id = ProductDescription.product_id 
        JOIN ProductPrice ON Products.product_id = ProductPrice.product_id
      WHERE 
        Products.product_url = ?`,
    [product_url],
    (err, results) => {
      if (err) {
        console.log("Error During selection", err);
        res.status(500).send("An error occurred");
      } else if (results.length === 0) {
        res.status(404).send("Product not found");
      } else {
        res.json(results[0]);
      }
    }
  );


});

app.listen(Port, (err) => {
  if (err) console.log(err.message);
  else console.log(`Express app listening at http://localhost:${Port}`);
});


