$(function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget("custom.colorize", {
        // default options
        options: {
            red: 255,
            green: 255,
            blue: 255,

            // Callbacks
            change: null,
            random: null
        },

        // The constructor
        _create: function() {
            this.element
                // add a class for theming
                .addClass("custom-colorize");

            this.button1 = $("<button>", {
                    text: "Red",
                    class: "custom-colorize-changer"
                })
                .appendTo(this.element)
                .button();

            this.button2 = $("<button>", {
                    text: "Yellow",
                    class: "custom-colorize-changer"
                })
                .appendTo(this.element)
                .button();

            this.button3 = $("<button>", {
                    text: "Green",
                    class: "custom-colorize-changer"
                })
                .appendTo(this.element)
                .button();

            // Bind click events on the button1 button to the makeItRed method
            this._on(this.button1, {
                // _on won't call makeItRed when widget is disabled
                click: "makeItRed"
            });

            this._refresh();

            this._on(this.button2, {
                // _on won't call makeItRed when widget is disabled
                click: "makeItYellow"
            });

            this._refresh();

            this._on(this.button3, {
                // _on won't call makeItRed when widget is disabled
                click: "makeItGreen"
            });

            this._refresh();
        },

        // Called when created, and later when changing options
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

            // Trigger a callback/event
            this._trigger("change");
        },

        // A public method to change the color to a makeItRed value
        // can be called directly via .colorize( "makeItRed" )
        makeItRed: function(event) {
            var colors = {
                red: 216,
                green: 70,
                blue: 70
            };

            // Trigger an event, check if it's canceled
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

            // Trigger an event, check if it's canceled
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

            // Trigger an event, check if it's canceled
            if (this._trigger("makeItGreen", event, colors) !== false) {
                this.option(colors);
            }

            event.stopPropagation();
        },

        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function() {
            // remove generated elements
            this.button1.remove();
            this.button2.remove();
            this.button3.remove();

            this.element
                .removeClass("custom-colorize")
                .enableSelection()
                .css("background-color", "transparent");
        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function(key, value) {
            // prevent invalid color values
            if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
                return;
            }
            this._super(key, value);
        }
    });
});