$( document ).ready(function() {

  // SUBMIT FORM
    $("#customerForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });


    function ajaxPost(){

      // PREPARE FORM DATA
      var formData = {
        product_id : $("#id").val(),
        product_name : $("#productName").val(),
        product_price :  $("#productPrice").val(),
        product_imageLink : $("#imageLink").val(),
      }

      // DO POST
      $.ajax({
      type : "POST",
      url : "http://localhost:8080/product/" + formData.product_id,
      data : formData,
      dataType : 'json',
      success : function(result) {
          $("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" +
                        "Post Successfully! <br>" +
                        "---> Customer's Info: FirstName = " +
                        result.data.productName + " ,LastName = " + result.data.productPrice + "</p>");

          $("#postResultDiv").html("<strong>Successfully</strong>");
        console.log(result);
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      // Reset FormData after Posting
      resetData();

    }

    function resetData(){
      $("#productName").val("");
      $("#lastname").val("");
    }
})
