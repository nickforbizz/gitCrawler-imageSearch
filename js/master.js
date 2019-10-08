var github_username = '';
var github_default_url ='https://api.github.com/users/';
var github_url ='https://api.github.com/users/nickforbizz';

// githubUser(github_url);


window.addEventListener('load', function() {
   	github_username = prompt("Github username: ");
	var github_url_user = github_default_url + github_username;
	githubUser(github_url_user);

});
	var mars_container = [];
	var searches = new Array;

	var i =0;
	var url ='https://pixabay.com/api/?key=13860325-a1eb964cc5a228641d374bfd6';
	var github_url ='https://api.github.com/users/nickforbizz';


	var m_box = document.getElementById("mars");
	var searchesList = document.getElementById("searches");

	m_box.style.BackFaceVisibilty = 'hidden';


	var searchGIT = document.getElementById("searchGIT");
	searchGIT.addEventListener('click', ()=>{
		let n = (document.getElementById("newUserGit").value).trim();
		if (n.length > 0) {
			let url = github_default_url + n;
			githubUser(url);
			searchGIT.value = '';
		}else{
			alert("please enter a name");
		}
	});

	getImages(url);



	function createNode(element) {
		return document.createElement(element);
	}

	function appendEl(parent, el) {
		return parent.appendChild(el);
	}


	// search Images
	var search = document.getElementById("search");

	search.onkeyup = () => {
		val = search.value;
		var url=`https://pixabay.com/api/?key=13860325-a1eb964cc5a228641d374bfd6&q=${val}`
		m_box.innerHTML = '<div class="loader"></div><p>Fetching</p>';
		getImages(url);


	};


	// images aipi functionality
	function getImages(url) {
		fetch(url)
		.then( (response) => {
			return response.json();
		})
		.then((data) => {
			data = data.hits;
			// console.log(data)
			m_box.innerHTML = '';

			data.forEach((mars) => {
				mars_container=[];
				mars_container.push(mars);
				createCards(mars_container);
			});
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function githubUser(url) {

		fetch(url)
		.then((res)=>{
				
			window.scrollTo(0,0);
			if(res.status != 200){
				let url = github_url; 
				githubUser(url);
			}else{
				return res.json();

			}
		})
		.then((data)=>{
			
			githubUI(data);
		})
		.catch((err) =>{
			// alert();
			// console.log(err);
		})
	}

	// creating some elements
	function createCards(data) {
		// console.log(data)
		let	img1 = createNode('img'),
			img2 = createNode('img'),
			div = createNode('div'),
			span = createNode('span'),
			span2 = createNode('span'),
			 h4 = createNode('h4'),
			 button = createNode('button'),
			 p = createNode('p'),
			 a = createNode('a');

		data.forEach((m)=>{			 

				 // console.log(m)
				 img1.src = m.largeImageURL;
				 img2.src = m.userImageURL;
				 img1.setAttribute('height',200);
				 img1.setAttribute('class',"imgcap");
				 img1.setAttribute('width',350);

				 img2.setAttribute('height',80);
				 img2.setAttribute('width',80);
				 
				 div.setAttribute('style', "height:350px;  float:left; box-shadow: 2px 2px 6px grey; padding: 10px; margin:5px 15px; position:relative; overflow:hidden");
				 h4.innerHTML = "Tags : "+(m.tags).substr(1,25);
				 span2.innerHTML = "BY: "+(m.user).substr(1,25);
				 span2.setAttribute('class', "p-4")
				 img2.src = m.userImageURL;
				 a.setAttribute('target',  'blank');
				 a.setAttribute('href',  m.pageURL);
				 a.setAttribute('class',  "btn btn-primary float-right mt-5");
				 a.innerHTML = 'view';

				 img2.setAttribute('style', "border-radius: 321px;")

				 // m.pageURL
				 appendEl(div, img1);
				 appendEl(div, h4);
				 appendEl(p, span);
				 appendEl(p, span2);
				 appendEl(span, img2);
				 appendEl(div, p);
				 appendEl(p, a);
				 appendEl(m_box, div);
		});
	}


	// update html user card

	function githubUI(data) {


			getUserGithubFollowers(data.followers_url);


			let profile = document.getElementById("profile");
			profile.innerHTML = ``;
			profile.style.BackFaceVisibilty = 'hidden';
			profile.style.width = '-webkit-fill-available';
			let	img1 = createNode('img'),
			img2 = createNode('img'),
			profile_box = createNode('div'),
			div1 = createNode('div'),
			div2 = createNode('div'),
			div3 = createNode('div'),
			div4 = createNode('div'),
			span = createNode('span'),
			span2 = createNode('span'),
			 h4 = createNode('h4'),
			 h5 = createNode('h5'),
			 hr1 = createNode('hr'),
			 button = createNode('button'),
			 p = createNode('p'),
			 a = createNode('a');

			 div1.setAttribute('class', "card text-center");
			 div4.setAttribute('id', "followers");
			 div4.setAttribute('style', "overflow-x:scroll;");
			 profile_box.setAttribute('style', "width:100%; text-align:center;border:1px solid grey; padding:5px;");

			 img1.src = data.avatar_url;
			 img1.setAttribute('class', "card-img-top");
			 img1.setAttribute('style', "width:200px;height:200px; border-radius:3000px");
			 div2.setAttribute('class', "card-body");

			 h4.setAttribute('class', "card-title");
			 h5.setAttribute('class', "text-center mt-4");
			 h4.innerHTML = data.name;
			 h5.innerHTML = 'Followers';
			 p.setAttribute('class', "card-text");
			 p.innerHTML = data.bio;
			 a.setAttribute('href', data.html_url);
			 a.setAttribute('target', "blank");
			 a.setAttribute('class', "btn btn-info");
			 a.innerHTML = 'View on Github'

			 appendEl(profile, profile_box);
			 appendEl(profile_box, img1);
			 appendEl(profile, div1);
			 appendEl(div1, div2);

			 appendEl(div2, h4);
			 appendEl(div2, p);
			 appendEl(div2, a);
			 appendEl(div2, div3);
			 appendEl(div3, h5);
			 appendEl(div3, hr1);
			 appendEl(div3, div4);

	}

	// user followers
	function getUserGithubFollowers(url) {
		fetch(url)
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			data.forEach((user)=>{
				githubFollower(user);
			});
		})
	}


	// folower
	function githubFollower(user) {
		let followers = document.getElementById("followers");
		let img1 = createNode('img'),
			a1 = createNode('a'),
			div1 = createNode('div');

			div1.setAttribute('style', "height: 80px;width: 45px; float:left;margin: 10px");

			img1.src = user.avatar_url;
			img1.setAttribute('height', 40);
			img1.setAttribute('width', 40);
			img1.setAttribute('style', "border-radius:300px;");

			a1.setAttribute('onclick', "githubUser('"+user.url+"')");
			a1.setAttribute('class', "text-blue");
			a1.setAttribute('style', "margin-top:2px; padding: 4px;cursor:pointer; background:lightblue; border-radius: 15px;");
			a1.innerHTML = 'view';

			appendEl(followers, div1);
			appendEl(div1, img1);
			appendEl(div1, a1);
	}


