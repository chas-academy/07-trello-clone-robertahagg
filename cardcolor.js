$(function() {
    $.widget("custom.cardcolor", {
        options: {
            red: 255,
            green: 255,
            blue: 255,

            change: null,
            random: null
        },

        _create: function() {
            this.element.addClass("custom-cardcolor");

            this.cardColorButton = $("<button>")
                .appendTo(this.element)
                .button({
                    text: false,
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });

            var popupDialog = (this.customizeColorDialog = $("<div>", {})
                .appendTo("body")
                .dialog({
                    autoOpen: false,
                    height: 200,
                    width: 270,
                    modal: true,
                    buttons: {
                        Ok: function() {
                            popupDialog.dialog("close");
                        }
                    }
                }));

            this.button1 = $("<button>", {
                    text: "Urgent"
                })
                .appendTo(this.customizeColorDialog)
                .button();

            this.button2 = $("<button>", {
                    text: "Normal"
                })
                .appendTo(this.customizeColorDialog)
                .button();

            this.button3 = $("<button>", {
                    text: "Cool"
                })
                .appendTo(this.customizeColorDialog)
                .button();

            this._on(this.cardColorButton, {
                click: "openDialog"
            });

            this._on(this.button1, {
                click: "makeItRed"
            });

            this._refresh();

            this._on(this.button2, {
                click: "makeItYellow"
            });

            this._refresh();

            this._on(this.button3, {
                click: "makeItGreen"
            });

            this._refresh();
        },

        _refresh: function() {
            this.element.css(
                "background-color",
                "rgb(" +
                this.options.red +
                "," +
                this.options.green +
                "," +
                this.options.blue +
                ")"
            );

            this._trigger("change");
        },

        makeItRed: function(event) {
            var colors = {
                red: 216,
                green: 70,
                blue: 70
            };

            if (this._trigger("makeItRed", event, colors) !== false) {
                this.option(colors);
            }

            event.stopPropagation();
        },

        makeItYellow: function(event) {
            var colors = {
                red: 255,
                green: 247,
                blue: 97
            };

            if (this._trigger("makeItYellow", event, colors) !== false) {
                this.option(colors);
            }

            event.stopPropagation();
        },

        makeItGreen: function(event) {
            var colors = {
                red: 81,
                green: 173,
                blue: 72
            };

            if (this._trigger("makeItGreen", event, colors) !== false) {
                this.option(colors);
            }

            event.stopPropagation();
        },

        openDialog: function(event) {
            this.customizeColorDialog.dialog("open");

            event.stopPropagation();
        },

        _destroy: function() {
            this.button1.remove();
            this.button2.remove();
            this.button3.remove();

            this.element
                .removeClass("custom-cardcolor")
                .enableSelection()
                .css("background-color", "transparent");
        },

        _setOptions: function() {
            this._superApply(arguments);
            this._refresh();
        },

        _setOption: function(key, value) {
            if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
                return;
            }
            this._super(key, value);
        }
    });
});