
module.exports = {
eachPartialPage: function (id) {
        console.log("id from helpers");
        console.log(id);
        if(id === "1")  {return "postmalone";}
        if(id === "2")  {return "captionb";} 
        if(id === "3")  {return "snap";}
    }
}
