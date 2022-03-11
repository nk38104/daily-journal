const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// -------- DATABASE --------
mongoose.connect("mongodb://localhost:27017/journalDB", { useNewUrlParser: true });

const postSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
	}
});

const Post = mongoose.model("Post", postSchema);

// ----------------------------

const homeHeaderContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutHeaderContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactHeaderContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


function seedPostData() {
	Post.insertMany([
		{
			title: "Day 1",
			content: "It is day 1."
		},
		{
			title: "Day 2",
			content: "It is day 2."
		},
		{
			title: "Day 3",
			content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
		}
	], function(err) {
		logMessage = (err) ? err : "Sucessfully saved default items to database.";
        console.log(logMessage);
	});
}


app.get("/", function(req, res) {
	Post.find({}, function(err, foundPosts) {
		if(!err) {
			if(foundPosts.length > 0) {
				res.render("home", { 
					headerContent: homeHeaderContent,
					posts: foundPosts
				});
			} else {
				seedPostData();
				res.redirect("/");
			}
		} else {
			console.log(err);
		}
	});
});


app.get("/about", function(req, res) {
	res.render("about", { headerContent: aboutHeaderContent, res: res });
});


app.get("/contact", function(req, res) {
  	res.render("contact",{ headerContent: contactHeaderContent });
});


app.get("/compose", function(req, res) {
	res.render("compose");
});

app.post("/compose", function(req, res) {
	const { postTitle, postContent } = req.body;

	const newPost = new Post({
		title: postTitle,
		content: postContent
	});

	newPost.save();

	res.redirect("/");
});

app.post("/post", function(req, res) {
	const { postId } = req.body;

	res.render("post", { post: posts[postId]});
});


app.listen(3000, function() {
  	console.log("Server started on port 3000...");
});
