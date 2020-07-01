let db = firebase.firestore();

var getParams = function(url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

window.addEventListener('load', renderStory);

function renderStory() {
  if (getParams(window.location.href).s == undefined) {
    document.getElementById("fourOhFour").style.display = "block";
  } else {
    let storyData = db.collection("posts").doc(getParams(window.location.href).s);
    storyData.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data());
        document.getElementById("post-title").innerText = doc.data().Title;
        document.getElementById("post-subtitle").innerText = doc.data().Subtitle;
        document.getElementById("post-img").src = doc.data().Image;
        document.getElementById("post-para").innerHTML = doc.data().Article;
        document.getElementById("post-author").innerHTML = 'Written by <a href="https://scratch.mit.edu/users/' +
          doc.data().Author + '" target="_blank">' + doc.data().Author + '</a>';
        document.getElementById("post-date").innerText = doc.data().Date;
        generatePosts(doc.data().Tags);
      } else {
        document.getElementById("fourOhFour").style.display = "block";
      }
    }).catch(function(error) {
      console.error("Error getting data:", error);
    });
  }
}

function generatePosts(tagsToGet) {
  let articleRef = db.collection("posts").where("Tags", "array-contains-any", tagsToGet);
  console.log(tagsToGet);
  articleRef.orderBy("Canonical").limit(4);
  articleRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      let post = document.createElement("a");
      let image = document.createElement("img");
      let imageContainer = document.createElement("div");
      let title = document.createElement("h2");
      let subtitle = document.createElement("p");
      post.href = "read.html?s=" + doc.id;
      post.classList.add("post")
      image.src = doc.data().Image;
      title.innerText = doc.data().Title;
      subtitle.innerText = doc.data().Subtitle;
      imageContainer.classList.add("post-img-container");
      imageContainer.appendChild(image);
      post.appendChild(imageContainer);
      post.appendChild(title);
      post.appendChild(subtitle);
      document.getElementById("suggested").appendChild(post);
    })
  }).catch(function(error) {
    console.error("Error getting post:", error);
  })
}