let db = firebase.firestore();

window.addEventListener('load', renderStories);

function renderStories() {
  let mainData = db.collection("data").doc("main");
  mainData.get().then(function(doc) {
    if (doc.exists) {
      db.collection("posts").where("Canonical", "==", doc.data().canon).get().then(function(querySnapshot) {
        console.log(querySnapshot);
        querySnapshot.forEach(function(docc) {
          document.getElementById("featured-link").href = "read.html?s=" + docc.id;
          document.getElementById("featured-img").src = docc.data().Image;
          document.getElementById("featured-title").innerText = docc.data().Title;
          document.getElementById("featured-subtitle").innerText = docc.data().Subtitle;
        })
        for (let i = 1; i < 17; i++) {
          generatePost(doc.data().canon - i)
        }
      })
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