console.log(document);

document.getElementById("name").addEventListener("mouseenter", ()=>{
  document.getElementById("name").innerHTML = "YUHANG ZHENG";
})

document.getElementById("name").addEventListener("mouseleave", ()=>{
  document.getElementById("name").innerHTML = "NAME?";
})
