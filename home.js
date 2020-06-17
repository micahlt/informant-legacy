let db = firebase.firestore();

window.addEventListener('load', renderStories);

function renderStories() {
  let mainData = db.collection("data").doc("main");
  mainData.get().then(function(doc) {
    if (doc.exists) {
      let featuredImg = document.createElement("img");
      generatePost(1);
    } else {
      window.location.reload();
    }
  }).catch(function(error) {
    console.error("Error getting data:", error);
  });
}

function generatePost(canonNum) {
  let post = document.createElement("a");
  let image = document.createElement("img");
  let imageContainer = document.createElement("div");
  let title = document.createElement("h2");
  let subtitle = document.createElement("p");
  let articleRef = db.collection("posts").where("Canonical", "==", canonNum);
  articleRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc);
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
      document.getElementsByClassName("other-posts")[0].appendChild(post);
    })
  }).catch(function(error) {
    console.error("Error getting post:", error);
  })
}