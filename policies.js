let db = firebase.firestore();

window.addEventListener('load', renderPolicies);

function renderPolicies() {
  let policyData = db.collection("data").doc("policy-list");
  policyData.get().then(function(doc) {
    console.log(doc.data());
    document.getElementById("policies").innerHTML = doc.data().content;
  }).catch(function(error) {
    console.error("Error getting data:", error);
  });
}