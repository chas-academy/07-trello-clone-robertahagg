$(function() {
    function initSort() {
        $(".list-cards").sortable({
            cursor: "move",
            connectWith: ".list-cards",
            helper: "clone",
            placeholder: "sortable-placeholder",
            revert: true
        });
    }

    initSort();

    function addList(event) {
        event.preventDefault();

        var formData = $(event.target)
            .offsetParent()
            .find("form")
            .serializeArray();

        var newColumn = `<div class="column">
        <div class="list">
            <div class="list-header">
                ${formData[0].value}
                <button class="button delete">
                    X
                </button>
            </div>
            <ul class="list-cards">
            </ul>
        </div>
    </div>`;

        $(".board").append(newColumn);

        initSort();
    }

    dialog = $("#list-creation-dialog").dialog({
        autoOpen: false,
        height: 200,
        width: 270,
        modal: true,
        buttons: {
            Save: addList,
            Cancel: function() {
                dialog.dialog("close");
            }
        }
    });

    $("#new-list").click(function() {
        dialog.dialog("open");
    });

    $("body").on("click", ".list-header .delete", function(event) {
        $(event.target)
            .closest(".column")
            .remove();
    });

    $(".new-card").submit(function(event) {
        event.preventDefault();
        var formData = $(event.target).serializeArray();
        $(event.target)
            .find("input")
            .val("");

        var newCard = `<li class="card">
        ${formData[0].value}
        <button class="button delete">X</button>   
    </div>`;

        var listCards = $(event.target)
            .closest(".add-new")
            .siblings(".list-cards");

        listCards.append(newCard);

        $(event.target)
            .closest(".new-card")
            .hide();

        $(event.target)
            .siblings(".add-new-card-button")
            .show();

        initCards();

        listCards
            .children()
            .last()
            .effect("slide");
    });

    $(".new-card").hide();

    $(".add-new-card-button").click(function() {
        $(event.target)
            .siblings(".new-card")
            .show();

        $(event.target).hide();
    });

    var cardContentDialog = $(".card-details-dialog-container").dialog({
        autoOpen: false,
        hide: "fold",
        show: "clip",
        height: 600,
        width: 700,
        modal: true,
        buttons: {
            Save: addList,
            Cancel: function() {
                cardContentDialog.dialog("close");
            }
        }
    });

    var initCards = function() {
        $(".card").colorize();

        $(".card").click(function() {
            cardContentDialog.dialog("open");
        });

        $(".list-cards .card .delete").on("click", function(event) {
            $(event.target)
                .parent()
                .remove();

            event.stopPropagation();
        });
    };

    initCards();

    $("#tabs").tabs();

    $("#datepicker").datepicker({
        showButtonPanel: true
    });
});