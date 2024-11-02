import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

//geting static files like css etc..
app.use(express.static("public"));

//homepage
app.get("/", async (req, res) => {
	//getting random fact
	const result1 = await axios.get("https://cat-fact.herokuapp.com/facts");
	const facts = result1.data;
	const randomFact = facts[Math.floor(Math.random() * facts.length)].text;
	/* console.log(randomFact); */

	//getting random image
	const result2 = await axios.get("https://api.thecatapi.com/v1/images/search");
	/* console.log(result2.data[0]); */
	const image = result2.data[0];

	//sending data in response
	res.render("index.ejs", {
		fact: randomFact,
		image: image,
	});
});

//listening
app.listen(port, () => {
	console.log("listening on http://localhost:3000");
});
