function getAllEvents(){
    fetch("http://veselinvelkov.com/mywpsite/wp-json/tribe/events/v1/events?_embed")
    .then(res=>res.json())
    .then(showEvents);
}

function getSingleEventById(myId){
    console.log(myId);
      fetch("http://veselinvelkov.com/mywpsite/wp-json/wp/v2/posts/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSingleEvent);
   
}
function showSingleEvent(json){
    console.log(json);
    document.querySelector("single h1").textContent=json.title.rendered;
    document.querySelector("single .price span").textContent=json.acf.price;
    
}
function showEvents(data){
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;
    
    data.forEach(function(theEvent){
        console.log(theEvent)
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");
        
        title.textContent = theEvent.title.rendered;
        excerpt.innerHTML = theEvent.excerpt.rendered;
        price.textContent = theEvent.acf.price;
        console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes)
        img.setAttribute("src", theEvent._embedded["wp:featuremedia"][0].media_details.sizes.medium.source_url)
        
        link.setAttribute("href", "webapp.html?id="+theEvent.id);
        
        
        list.appendChild(clone);
    });
}



let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
//consle.log(id)

if(id){
    getSingleEventById("beer");
    
} else {
    getAllEvents();
}




 