;(function(undefined) {
    'use strict';

    $(".toggle-intro").click(function() {
        var txt = $(this).text() != 'Hide the intro' ? 'Hide the intro' : 'Read the intro';
        $(this).text(txt);
        $('.intro__text').toggle();
    });
    

    // fade the text out through time
    // var startDate = new Date(2017, 2, 26);
    var startDate = new Date(2017, 3, 7);
    var dueDate = new Date(2017, 3, 27);
    var currentDate = new Date();
    var delta = dueDate - currentDate;
    var remaining_days = Math.round(delta / (1000 * 60 * 60 *24));
    var gray = Math.round(remaining_days * (255 / 30));
    var pc = (currentDate - startDate) / (dueDate - startDate) * 100;
    var article = document.getElementById("article").setAttribute("style", 'color: rgb(' + pc + '%,' + pc + '%,' + pc + '%)');


    var pageUri = function () {
        return {
            beforeAnnotationCreated: function (ann) {
                ann.uri = window.location.href;
                ann.creationDate = JSON.parse(JSON.stringify(new Date()));
            },
            annotationCreated: function (ann) {
                var elt = document.getElementById("comment-nbr");
                elt.innerHTML = parseInt(elt.innerHTML) + 1;
            },
            annotationsLoaded: function (annotations) {
                document.getElementById("comment-nbr").innerHTML = annotations.length;
            },
        };
    };


    var app = new annotator.App();
    app.include(annotator.ui.main, {
        element: document.getElementById('article'),
        viewerExtensions: [myViewerExtension],
        editorExtensions: [myEditorExtension],
    });
    app.include(annotator.storage.http, {
        prefix:  '/annotator/_design/annotator/_rewrite',
        annotationCreated: function (ann) { console.log(ann); }
    });
    app.include(pageUri);

    app.start()
    .then(function () {
        app.annotations.load({uri: window.location.href});
    });
})();
