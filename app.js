//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// **** JavaScript Objects ****
let posts = [];


// ****RENDER A PAGE****
// app.get("Page", function(req, res){
//   res.render ("Page you want to render", {key: value}) ??? variables that you want to transfer from here to the page using EJS
// }); 



app.get("/", function(req, res){
  // Renders the Home page
  res.render("home", {
    homeStartingContent: homeStartingContent, 
    posts: posts
  });

  
});

app.get("/about", function(req, res){
  // Renders the About page
  res.render("about", {aboutContent: aboutContent});
});


app.get("/contact", function(req, res){
  // Renders the Contact page
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  // Renders the compose page
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  // Checks if the post name in the URL matches one of the posts that were created
  const requestedTitle = req.params.postName.toLowerCase();

  posts.forEach(function(post){
    const storedTitle = post.title.split(" ").join("-").toLowerCase();

    if (storedTitle === requestedTitle) {
      // Renders post.ejs with the values of the requested title and its content
      res.render("post", {
        title: post.title,
        content: post.content
      });

    };
  });
});

app.post("/compose", function(req, res){
  // Reads the information posted on the form from "compose.ejs"
  // req.body belongs to bodyParser

  // Creates a JavaScript Object to store the posts created with the form
    // postTitle and postContet are the names of the Input Field in "compose.ejs"
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  posts.push(post);

  res.redirect("/");
  
}); 



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
