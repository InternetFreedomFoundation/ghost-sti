$(function () {
    $("#petitionForm").submit(function (event) {
        event.preventDefault();
        var payload = {
            name: $("#nameField").val(),
            email: $("#emailField").val(),
            isIndividual: $("#typeField").val() === "individual" ? true : false,
            organization: $("#organizationField").val(),
        };
        $("#submitButton")[0].disabled = true;
        $("#submitButton")[0].innerHTML = "Submitting...";
        $.ajax({
            data: JSON.stringify(payload),
            type: "POST",
            processData: false,
            contentType: "application/json",
            url: "https://api.internetfreedom.in/dev/petition/submission",
        })
            .then(function (response) {
                if (response.status === "ok") {
                    $("#submitButton")[0].disabled = false;
                    $("#submitButton")[0].innerHTML = "Sign the petition";
                    $("#successMessage").show();
                }
            })
            .catch(function (error) {
                $("#submitButton")[0].disabled = true;
                $("#submitButton")[0].innerHTML = "Sign the petition";
                $("#errorMessage").show();
            });
    });
});
/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormData({ url, formData }) {

    const fetchOptions = {
        method: "POST",
        body: formData,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const mailUrl = await response.text();
    return mailUrl;
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        encodedEmail= await postFormData({ url, formData });
        window.open(encodedEmail);
        form.reset();
    } catch (error) {
        alert("Something went wrong, Please try again later");
    }
}

const bsnlForm = document.getElementById("bsnl-form");
bsnlForm.addEventListener("submit", handleFormSubmit);
