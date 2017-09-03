(function() {
  $(function() {



    let deleteTable = $('#deleteTable');
    let thisPirateId;
    let thisPirateName;
    let editTable = $('#editTable');

    function loadPirates() {
      $.get("http://localhost:1337/pirate/", function(data) {
        let pirate = data;
        $.each(pirate, function(index, pirate) {

          $("#pirateTable").append(`
            <tr>
            <td>${pirate.firstName}</td>
            <td>${pirate.lastName}</td>
            <td>${pirate.nickName}</td>
            <td>${pirate.saltWives}</td>
            <td>${pirate.saltyDog}</td>
            </tr>
            `)

        }); //closes each loop
      }) //closes get request
    }; //closes loadPirates

    function deletePirates() {
      $.get("http://localhost:1337/pirate/", function(data) {
        let pirate = data;
        console.log(pirate.firstName)
        $.each(pirate, function(index, pirate) {

          $("#deleteTable").append(`
            <tr>
            <td>${pirate.firstName}</td>
            <td>${pirate.lastName}</td>
            <td>${pirate.nickName}</td>
            <td>${pirate.saltWives}</td>
            <td>${pirate.saltyDog}</td>
            <td><button class="deleteButton btn btn-danger" data-pirateid=${pirate.id} data-piratename=${pirate.nickName}>Delete</button></td>
            </tr>
            `)

        }); //closes each loop
      }) //closes get request
    }; //closes deletePirates

    function editPirates() {
      $.get("http://localhost:1337/pirate/", function(data) {
        let pirate = data;
        console.log(pirate.firstName)
        $.each(pirate, function(index, pirate) {

          $("#editTable").append(`
            <tr>
            <td>${pirate.firstName}</td>
            <td>${pirate.lastName}</td>
            <td>${pirate.nickName}</td>
            <td>${pirate.saltWives}</td>
            <td>${pirate.saltyDog}</td>
            <td><button class="editTable editButton btn btn-primary" data-pirateid=${pirate.id} data-piratename=${pirate.nickName}>edit</button></td>
            </tr>
            `)

        }); //closes each loop
      }) //closes get request
    }; //closes deletePirates

    loadPirates();
    deletePirates();
    editPirates();

    deleteTable.on("click", "button", function(e) {

      thisPirateId = $(this).data("pirateid");
      thisPirateName = $(this).data("piratename")

      $.ajax({
        url: "http://localhost:1337/pirate/" + thisPirateId,
        type: 'DELETE',
        success: function(result) {

          // Do something with the result
          $("#deleteTable").empty();
          deletePirates();
          $(".confirmation").html(thisPirateName + " was made to walk the plank!")

        }

      }); //closes ajax delete

    }); //closes button click



    $("#pirateForm").on("submit", function(event) {
      event.preventDefault()
      console.log($("#pirateForm").serialize());
      $.post("http://localhost:1337/pirate/", $("#pirateForm").serialize(), function(data) {

        alert("we got pirates")
      }); //closes post
    }); //closes submit function



    editTable.on("click", ".editButton", function(e) {
      thisPirateId = $(this).data("pirateid");
      $.get("http://localhost:1337/pirate/" + thisPirateId, function(data) {
        let pirate = data;

        $.each(pirate, function(name, val) {
          var $el = $('[name="' + name + '"]'),
            type = $el.attr('type');

          switch (type) {
            case 'checkbox':
              $el.attr('checked', 'checked');
              break;
            default:
              $el.val(val);
          } //closes switch
        }); //closes .each
      }); //closes get
    });

    $("#updatePirate").on("click", "#editButton", function(e) {
      let pirateURL = "http://localhost:1337/pirate/" + thisPirateId


      $.ajax({
        url: pirateURL,
        type: 'put',
        data: $("#updatePirate").serialize(),
        success: function(response) {


        } //closes success
      }); //closes ajax
    }); //closes updatePirate


  }) //closes document ready

})(); //self invoking
