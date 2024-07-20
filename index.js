// const express = require("express");
// const app = express();
// const router = express.Router();
// const bodyParser = require('body-parser');
// const homeRoutes = require("./router/home");
// const adminRoutes = require("./router/admin");
// const path = require("path");
// const pool = require("./config/db");
// const { Pool } = require('pg');
// require("dotenv").config();
// const exphbs = require("express-handlebars");
// const hbs = exphbs.create({
//     defaultLayout:"main",
//     extname:"hbs",
//     helpers: {
//         inc: function(value, options){
//           return parseInt(value) + 1;
//         },
//         eq: function (a, b) {
//             return a === b;
//           }
        
//       } 
// });
// app.engine("hbs" , hbs.engine);
// app.set("view engine" , "hbs");
// app.set("views" , "page");

// app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use('/images', express.static(path.join(__dirname, 'images')));
// router.use([ '/menu', '/header', '/aboutpart', '/counter', '/courses' , '/category' , '/slider' , '/course_category' , '/mualliflar' , '/kurs_reja'  ,  '/submenu' , '/kurs_haqida'], express.static(path.join(__dirname, 'public', 'admin')));
// app.use('/admin', router);
// app.use("/admin" , adminRoutes);
// app.use("/" , homeRoutes);
// const PORT = process.env.PORT || 5000;
// async function start(){
//     try {
        
//         app.listen(PORT , ()=>{
//             console.log(`Server ${PORT} portda ishladi`);
//         });
//     } catch (error) {
//        console.log(error) 
//     }
// }
// start();


const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const homeRoutes = require("./router/home");
const adminRoutes = require("./router/admin");
const path = require("path");
const { Pool } = require('pg');
require("dotenv").config();
const exphbs = require("express-handlebars");

// Set up Handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        eq: function (a, b) {
            return a === b;
        }
    }
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "page");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
router.use([
    '/menu', '/header', '/aboutpart', '/counter', '/courses', 
    '/category', '/slider', '/course_category', '/mualliflar', 
    '/kurs_reja', '/submenu', '/kurs_haqida'
], express.static(path.join(__dirname, 'public', 'admin')));

// Database setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Routes
app.use('/admin', router);
app.use("/admin", adminRoutes);
app.use("/", homeRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        // Test database connection
        await pool.connect();
        console.log('Connected to the database');

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

start();
