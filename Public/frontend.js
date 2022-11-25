



$(document).ready(function(){


    var search = document.getElementById("search-input-label")
    $("#search-btn").click(function(){
        let search_value = search.value
        console.log("changes")
        $.ajax({
            url: '/search/' + search_value,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                var first = response.bestMatches
                console.log(first)
                showList(first)
            },
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        })
    })

    function showList(first){
        console.log('show list function')
        let prompt = document.getElementById("search-prompt")
        prompt.remove()
        //creates a list to select from. select box that disappears if clicked outside.floating select box.
        resultlist = document.getElementById("result-display")
        for (var key in first) {
            var liElement = document.createElement("li");
            liElement.classList.add("result-option")
            liElement.innerHTML = key["1. symbol"] + "\t" + key["2. name"]
            liElement.value = key["1. symbol"]
            resultlist.appendChild(liElement);
        }
    }


    $(".search-option").on("click", function(event){
        var val = search_option.value
        console.log(val)
        location.href = ""
    })


    $("#signup-btn").click(function(event){
        let name = document.getElementById("signup-name").value
        let email = document.getElementById("signup-email").value
        let password = document.getElementById("signup-password").value
        console.log(name)
        console.log(email)
        console.log(password)
        console.log('signup button pressed')
        $.ajax({
            url: '/user/',
            type: 'POST',
            data: {"name" : name, "email" : email, "password": password},                        
            success: function(response){
                console.log(response);
                console.log("added user")
                location.href = 'index.html'
            },
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        })
    })

    $("#login-btn").click(function(event){
        let email = document.getElementById("login-email").value
        let password = document.getElementById("login-password").value
      
        console.log(email)
        console.log(password)
        console.log('login button pressed')
        $.ajax({
            url: '/user/login/',
            type: 'POST',
            data: {"email" : email, "password": password},                        
            success: function(response){
                console.log(response);
                console.log("user login success.")
                location.href = 'index.html'
            },
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        })
    })
})