document.addEventListener("DOMContentLoaded",function(){

    var timer, speed = 20,
        fontSize = 72,
        lineHeight = 144,
        stepSize = 1;

    init();

    function init() {

        initLocalStore('speed', speed);
        initLocalStore('fontSize', fontSize);
        initLocalStore('lineHeight', lineHeight);
        initLocalStore('stepSize', stepSize);
        initLocalStore('defaultScript', default_script);

        document.querySelector("#taTextEditor").value = localStorage.defaultScript;

        populateTeleprompter();

        setFontSize("#divTeleprompter");
        setLineHeight("#divTeleprompter");

    }

    function initLocalStore(name, param) {

        if (localStorage.getItem(name) === null) {
            localStorage.setItem(name, param);
        }
    }

    function setLocalStore(name, param) {
        localStorage.setItem(name, param);
        param = parseInt(localStorage.getItem(name));
    }

    function getLocalStore(name) {
        return parseInt(localStorage.getItem(name));
    }

    function toggleDisplay(_id) {

        if (hasClass(_id, "display-none")) {
            removeClass(_id, "display-none");
            addClass(_id, "display-block");
        } else {
            removeClass(_id, "display-block");
            addClass(_id, "display-none");
        }
    }

    function hasClass(_id, _class) {
        return document.querySelector(_id).classList.contains(_class);
    }

    function addClass(_id, _class) {
        if (hasClass(_id, _class) === false) {
            document.querySelector(_id).classList.add(_class);
        }
    }

    function removeClass(_id, _class) {
        if (hasClass(_id, _class) === true) {
            document.querySelector(_id).classList.remove(_class);
        }
    }

    function flip(_id, _class) {
        if (hasClass(_id, _class)) {
            removeClass(_id, _class)
        } else {
            addClass(_id, _class);
        }
    }

    function incFont(id) {
        fontSize = parseInt(document.querySelector(id).style.fontSize);
        fontSize = fontSize + 2;
        setLocalStore('fontSize', fontSize);
        setFontSize(id);
    }

    function decFont(id) {
        fontSize = parseInt(document.querySelector(id).style.fontSize);
        fontSize = fontSize - 2;
        setLocalStore('fontSize', fontSize);
        setFontSize(id);
    }

    function setFontSize(id) {
        fontSize = getLocalStore('fontSize');
        document.querySelector(id).style.fontSize = fontSize + "px"
    }

    function incSpace(id) {
        lineHeight = parseInt( document.querySelector(id).style.lineHeight );
        lineHeight = lineHeight + 10;
        setLocalStore('lineHeight', lineHeight);
        setLineHeight(id);
    }

    function decSpace(id) {
        lineHeight = parseInt( document.querySelector(id).style.lineHeight );
        lineHeight = lineHeight - 10;
        setLocalStore('lineHeight', lineHeight);
        setLineHeight(id);
    }

    function setLineHeight(id) {
        lineHeight = getLocalStore('lineHeight');
        document.querySelector(id).style.lineHeight = lineHeight + "px"
    }

    function startScroll() {
        timer = setInterval(function () {
            var pos = document.querySelector("#divTeleprompter").scrollTop;
            document.querySelector("#divTeleprompter").scrollTop = pos + stepSize;
        }, speed);
    }

    function stopScroll() {
        clearInterval(timer);
    }

    function toggleFullScreen() {
        toggleDisplay("#header");
        toggleDisplay("#tabsWrp");
        toggleDisplay("#btnFullScreenOffWrp");
    }

    document.querySelector("#tabTeleprompter").onclick = function () {

        // Tab Buttons
        removeClass("#tabTextEditor", "active");
        addClass("#tabTeleprompter", "active");

        // divTeleprompterWrp
        removeClass("#divTeleprompterWrp", "display-none");
        addClass("#divTeleprompterWrp", "display-block");

        // taTextEditorWrp
        removeClass("#taTextEditorWrp", "display-block");
        addClass("#taTextEditorWrp", "display-none");
    }

    document.querySelector("#tabTextEditor").onclick = function () {
        // Tab Buttons
        removeClass("#tabTeleprompter", "active");
        addClass("#tabTextEditor", "active");

        // divTeleprompterWrp
        removeClass("#divTeleprompterWrp", "display-block");
        addClass("#divTeleprompterWrp", "display-none");

        // taTextEditorWrp
        removeClass("#taTextEditorWrp", "display-none");
        addClass("#taTextEditorWrp", "display-block");
    }

    document.querySelector('#btnFullScreenOn').onclick  = function () {
        toggleFullScreen();
    }

    document.querySelector('#btnFullScreenOff').onclick  = function () {
        toggleFullScreen();
    }

    document.querySelector("#btnStart").onclick  = function () {
        stopScroll();
        speed = getLocalStore('speed');
        startScroll();
    }

    document.querySelector("#btnStop").onclick  = function () {
        stopScroll();
    }

    document.querySelector("#btnIncSpeed").onclick  = function () {
        stopScroll();
        speed = getLocalStore('speed');
        if (speed >= 5) {
            speed -= 5;
            setLocalStore('speed', speed);
        }
        else {
            stepSize++;
            setLocalStore('stepSize', stepSize);
        }
        startScroll();
    }

    document.querySelector("#btnDecSpeed").onclick  = function () {
        stopScroll();
        speed = getLocalStore('speed');
        if (stepSize > 1) {
            stepSize--;
            setLocalStore('stepSize', stepSize);
        }
        else {
            speed += 5;
            setLocalStore('speed', speed);
        }
        startScroll();
    }

    document.querySelector("#btnIncSpace").onclick  = function () {
        incSpace("#divTeleprompter")
    }

    document.querySelector("#btnDecSpace").onclick  = function () {
        decSpace("#divTeleprompter");
    }

    document.querySelector("#btnIncFont").onclick  = function () {
        incFont("#divTeleprompter")
    }

    document.querySelector("#btnDecFont").onclick  = function () {
        decFont("#divTeleprompter");
    }

    document.querySelector("#btnVFlip").onclick  = function () {
        flip("#divTeleprompter", "flip_v");
    }

    document.querySelector("#btnHFlip").onclick  = function () {
        flip("#divTeleprompter", "flip_h");
    }

    document.querySelector('#taTextEditor').onkeyup = function () {

        populateTeleprompter();

    }

    function populateTeleprompter(){

        var keyed =  document.querySelector('#taTextEditor').value.replace(/[\n]/g, '<br />');
        document.querySelector("#divTeleprompter").innerHTML = keyed;
        localStorage.defaultScript = keyed;

    }
    
});

var default_script = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";