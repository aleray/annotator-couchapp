function myEditorExtension(e) {
    e.addField({
        label: "url",
        load: function() { console.log("loading") },
        submit: function(field, annotation) { console.log("submiting", field.getElementsByTagName("input")[0]) }
    });
};
