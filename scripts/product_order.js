function validation() {
    // REMOVE OUTPUT
    document.getElementById("output").innerHTML = "";

    var product = document.getElementById("product").value;
    var quantity = document.getElementById("quantity").value;
    var unit_price = document.getElementById("unit_price").value;
    var discount_rate = document.getElementById("discount_rate").value / 100;
    var order_date = document.getElementById("order_date").value;
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var first_name = document.getElementById("first_name").value;
    var payment_type = document.getElementById("payment_type").value;
    var card_number = document.getElementById("card_number").value;
    var security_code = document.getElementById("security_code").value;

    var valid = true; /** The following if-then statements validate input */
    if (product.length === 0)
    {
        document.getElementById("err1").innerHTML = "Please enter a value.";
        valid = false;
    }
    if (isNaN(quantity) || quantity < 1) 
    {
        document.getElementById("err2").innerHTML = "Quantity Must Be Numeric and Greater than 0.";
        valid = false;
    }
    if (isNaN(unit_price) || unit_price <= 0) 
    {
        document.getElementById("err3").innerHTML = "Price Must Be Numeric and Greater than 0.";
        valid = false;
    }
    if (isNaN(discount_rate) || discount_rate <= 0)
    {
        document.getElementById("err4").innerHTML = "Rate Must Be Numeric and Greater than 0.";
        valid = false;
    }
    if (order_date.length === 0 || order_date.length < 8 || order_date.length > 10)
    {
        document.getElementById("err5").innerHTML = "Please enter a valid date.";
        valid = false;
    }
    if (first_name.length === 0 || first_name.length <= 1)
    {
        document.getElementById("err6").innerHTML = "Please enter a valid name.";
        valid = false;
    }
    if (last_name.length === 0 || last_name.length <= 1)
    {
        document.getElementById("err7").innerHTML = "Please enter a valid name.";
        valid = false;
    }
    if (payment_type.length === 0)
    {
        document.getElementById("err8").innerHTML = "Please enter payment type.";
        valid = false;
    }
    if (card_number.length != 16)
    {
        document.getElementById("err9").innerHTML = "Please enter a valid card number.";
        valid = false;
    }
    if (security_code.length != 3)
    {
        document.getElementById("err10").innerHTML = "Please enter a valid security code.";
        valid = false;
    }
    

    if (valid) {
        calcTotal(unit_price, discount_rate, quantity, first_name, last_name);
        // Clear the span tags 
        for (i=1; i<=10; i++) {
            document.getElementById("err" + i).innerHTML = "";
        }
    }

}

function calcTotal(unit_price, discount_rate, quantity, first_name, last_name) {
    var discounted_amount = discount_rate * unit_price; 
    /** Calculate the discounted amount using reg. price and discount rate */
    var order_total = quantity * (unit_price - discounted_amount);
    /** Caclulate the final total using discounted amount*/
    var total = order_total.toFixed(2);
    /** Round value to two (2) decimal places */
    document.getElementById("output").innerHTML = `Thank you for ordering, ${first_name} ${last_name}. 
    Your order total is $${total}.`;
    // The output for the order total calculation will be placed inside the empty div from the html
}

function login() // Function for initilizing login
{
    var users = ["Duncan", "Eric", "Brandon", "Ousainou"];
    var pass = ["duncan", "eric", "brandon", "ousainou"];

    var aUser = document.getElementById("username").value;
    var aPass = document.getElementById("password").value;
    
    if(aUser === "" || aPass === "") {
        var myOut = document.getElementById("output");
        myOut.innerHTML = "Username or password cannot be blank";
        if (aUser === "") {
            U.$("username").focus();
        } else {
            U.$("password").focus();
        }

    } else {
        var authVAlid = false;
        for (i=0; i < users.length; i++) {
            if (users[i] == aUser && pass[i] == aPass){
            window.location = "product_order.html"
            break;
            }
            var myOut = document.getElementById("output");
            myOut.innerHTML = "Incorrect username or password";
        }
    }

}

// Limit text in the comment area
function limitText() {
    var comments = U.$("comments");
    var count = comments.value.length;
    if (count > 100) {
        comments.value = comments.value.slice(0,100);
    }
    U.$("count").innerHTML = comments.value.length;
 }

 // RESET THE FORM
function reset(){
    // TURN OF ERRORS
    for (i=1; i<10; i++) {
        document.getElementById("err" + i).innerHTML = "";
    }
    document.getElementById("output").innerHTML = "";
    // RESET INPUT BOXES
    U.$("product").selectedIndex = 0;
    U.$("order_date").value = "";
}

function init() { // Initialize the function for calculation when order button is clicked 
    var login_button = document.getElementById("login_button");
    if (login_button !== null) {
        login_button.onclick= login;
    }
    
    var order_button = document.getElementById("order_button");
    if (order_button !== null) {
        order_button.onclick= validation;
    }

    // SHOW TIME
    U.addEvent(U.$("comments"), "keyup", limitText);
    U.$("current_datetime").innerHTML = Date();
    U.addEvent(U.$("current_datetime"), "mouseover", function (){
        U.$("current_datetime").innerHTML = Date();
    });

    // RESET FORM
    U.addEvent(U.$('reset'), 'click', function(){
        var result = confirm("Are you sure?");
        if (result){
            reset();
        }
    });
    

}
window.onload = init;
