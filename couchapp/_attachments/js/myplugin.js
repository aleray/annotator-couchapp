function myEditorExtension(e) {
    e.addField({
        id: "name",
        label: "I am",
        load: function(field, annotation) { field.getElementsByTagName("input")[0].value = annotation.name || "" },
        submit: function(field, annotation) { annotation.name = field.getElementsByTagName("input")[0].value || "anonymous"}
    });

    e.addField({
        id: "url",
        label: "http://",
        load: function(field, annotation) { field.getElementsByTagName("input")[0].value = annotation.url || "" },
        submit: function(field, annotation) { 
            var url = field.getElementsByTagName("input")[0].value || "";
            if (url && url.startsWith("http://" == false)) {
                url = "http://" + url;
            }
            annotation.url = url;
        }
    });

    e.addField({
        label: "title",
        load: function(field, annotation) { field.getElementsByTagName("input")[0].value = annotation.title || "" },
        submit: function(field, annotation) { annotation.title = field.getElementsByTagName("input")[0].value || ""}
    });

    var ul = e.element.find("ul:first");
    var li = ul.children("li");

    li.detach();
    ul.append(li[1]);
    ul.append(li[2]);
    ul.append(li[3]);
    ul.append(li[0]);

    e.element.find(".annotator-cancel").text("I changed my mind");
    e.element.find(".annotator-save").text("Save");
};


function myViewerExtension(v) {
    v.render = function (annotation) {
        var convert = annotator.util.escapeHtml;

        var md = window.markdownit({
            html: true,
        });
        var comment = md.render(annotation.text);

        var txt = [
            "<p>" + prettyDate(annotation.creationDate) + ", " + annotation.name + " wrote:</p>",
            "<div class=\"comment\">" + comment + "</div>",
        ];

        return txt.join("\n")
    }
};

