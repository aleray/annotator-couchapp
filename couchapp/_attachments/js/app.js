;(function(undefined) {
    'use strict';

    $(".toggle-intro").click(function() {
        $('.intro__text').toggle();
    });
    

    // fade the text out through time
    var startDate = new Date(2017, 2, 26);
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
                console.log("ok");
                ann.uri = window.location.href;
                ann.creationDate = JSON.parse(JSON.stringify(new Date()));
            },
            // annotationCreated: function (ann) {
            //     console.log(ann);
            // }
            annotationsLoaded: function (annotations) {
                document.getElementById("comment-nbr").innerHTML = annotations.length;
            },
        };
    };


    // function _t(txt) { return "bla" + txt }

    // annotator.ui.editor.template = [
    //     '<div class="annotator-outer annotator-editor annotator-hide">',
    //     '  <form class="annotator-widget">blslsdjksdbikdjbsdkjbsd',
    //     '    <ul class="annotator-listing"></ul>',
    //     '    <div class="annotator-controls">',
    //     '     <a href="#cancel" class="annotator-cancel">' + _t('blbsdlsdCancel') + '</a>',
    //     '      <a href="#save"',
    //     '         class="annotator-save annotator-focus">' + _t('Save') + '</a>',
    //     '    </div>',
    //     '  </form>',
    //     '</div>'
    // ].join('\n');


    var app = new annotator.App();
    app.include(annotator.ui.main, {
        element: document.getElementById('article'),
        // editorExtensions: [annotator.ui.tags.editorExtension],
        // viewerExtensions: [
        //     annotator.ui.tags.viewerExtension
        // ]
        viewerExtensions: [myViewerExtension],
        editorExtensions: [myEditorExtension],
    });
    app.include(annotator.storage.http, {
        prefix:  '/annotator/_design/annotator/_rewrite',
        urls: {
        //     // read:    '/_design/wtmws/_view/byCollection',
        //     create:  '{id}',
        //     update:  '{id}',
        //     destroy: '{id}',
        //     // search:  '/search'
        },
        annotationCreated: function (ann) {
            console.log(ann);
        }
    });
    app.include(pageUri);

    app.start()
    .then(function () {
        app.annotations.load({uri: window.location.href});
    });
})();
