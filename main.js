var title;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("request1=",request);
    title = request.url_value;
  });
chrome.runtime.sendMessage({"message": "get_title"});

$(document).ready(function() {
    // GET REQUEST
    $("#getAllCustomerId").click(function(event) {

        event.preventDefault();
        console.log(title);

        ajaxGet();
    });

    // DO GET
    function ajaxGet() {
      var formData = {
        product_name : title

      }
        $.ajax({
            type: "GET",
            data : formData,
            url: "http://localhost:8080/productS/",
            success: function(data) {
                console.log("data", formData);
                $('#getResultDiv ul').empty();
                $.each(data, function(i, product) {
                  console.log(product);
                  var wrapperDiv = `<div class="card" style="width: 18rem;">`;
                  $('#getResultDiv ul').append(wrapperDiv);
                  var imageImg = `<img class="card-img-top" src="${product.product_imageLink}" alt="Image ${product.product_name}">`
                  $('#getResultDiv ul').append(imageImg);
                  var cardBody = '<div class="card-body">'
                  $('#getResultDiv ul').append(cardBody);
                  var h5 = `<h5 class="card-title">${product.product_name}</h5>`
                  $('#getResultDiv ul').append(h5);
                  var body = `<p class="card-text">${product.product_price}</p>`
                  $('#getResultDiv ul').append(body);
                  var endBody =  '</div>'
                  $('#getResultDiv ul').append(endBody);
                  var endWrapper = '</div>'
                  $('#getResultDiv ul').append(endWrapper);
                });
            },
            error: function(e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        });
    }
})
