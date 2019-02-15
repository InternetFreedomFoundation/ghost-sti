$(function() {
    $("#petitionForm").submit(function(event) {
        event.preventDefault();
        var payload = {
            name: $("#nameField").val(),
            email: $("#emailField").val(),
            isIndividual: $("#typeField").val() === "individual" ? true : false,
            organization: $("#organizationField").val()
        };
        $("#submitButton")[0].disabled = true;
        $("#submitButton")[0].innerHTML = "Submitting...";
        $.ajax({
            data: JSON.stringify(payload),
            type: "POST",
            processData: false,
            contentType: "application/json",
            url: "https://api.internetfreedom.in/dev/petition/submission"
        }).then(function(response) {
            if(response.status === "ok") {
                $("#submitButton")[0].disabled = false;
                $("#submitButton")[0].innerHTML = "Sign the petition";
                $("#successMessage").show();
            }
        }).catch(function(error) {
            $("#submitButton")[0].disabled = true;
            $("#submitButton")[0].innerHTML = "Sign the petition";
            $("#errorMessage").show();
        })
    });
});
