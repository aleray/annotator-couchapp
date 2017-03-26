function myEditorExtension(e) {
    e.addField({
        id: "name",
        label: "I am...",
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
    e.element.find(".annotator-save").text("Commit my comment!");
};


function myViewerExtension(v) {
    v.render = function (annotation) {
        var txt = [
            "<p>" + prettyDate(annotation.creationDate) + ", " + annotation.name + " wrote:</p>",
            "<div>" + annotation.text + "</div>",
        ];

        return txt.join("\n")
    }
    // function _t (txt) { return txt }


    // // HTML templates for this.widget and this.item properties.
    // v.template = [
    //     '<p>super</p>',
    //     '<div class="annotator-outer annotator-viewer annotator-hide">',
    //     '  <ul class="annotator-widget annotator-listing"></ul>',
    //     '</div>'
    // ].join('\n');

    // v.itemTemplate = [
    //     '<li class="annotator-annotation annotator-item">',
    //     '  <span class="annotator-controls">',
    //     '    <a href="#"',
    //     '       title="' + _t('View as webpage') + '"',
    //     '       class="annotator-link">' + _t('View as webpage') + '</a>',
    //     '    <button type="button"',
    //     '            title="' + _t('Edit') + '"',
    //     '            class="annotator-edit">' + _t('Edit') + '</button>',
    //     '    <button type="button"',
    //     '            title="' + _t('Delete') + '"',
    //     '            class="annotator-delete">' + _t('Delete') + '</button>',
    //     '  </span>',
    //     '</li>'
    // ].join('\n');
    // v.itemTemplate = "<li>blabla</li>";


    // v.addField({
    //     load: function (field, annotation) {
    //         field = $(field);
    //         if (annotation.url) {
    //             field.append($("a").attr("href", annotation.url).text(annotation.url));
    //         } else {
    //             field.remove();
    //         }
    //     }
    // });
    // v.addField({
    //     load: function (field, annotation) {
    //         field = $(field);
    //         if (annotation.title) {
    //             field.html(annotation.title)
    //         } else {
    //             field.remove();
    //         }
    //     }
    // });
    // v.addField({
    //     load: function (field, annotation) {
    //         field = $(field);
    //         if (annotation.name) {
    //             field.html(annotation.name)
    //         } else {
    //             field.remove();
    //         }
    //     }
    // });
};

