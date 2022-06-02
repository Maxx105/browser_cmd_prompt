let goButton = $('#go')
let buttonText = $('#button-text')
let goSpan = $('#spinner-span')
let commandInput = $('#cmd')
let response = $('#response')
let input = $('#input')
let spinner = $('<div>')
let resTxt = $('<p>');

response.hide();

const appendResponse = (res) => {
    resTxt.attr('style', 'white-space: pre-wrap');
    resTxt.text(res);
    response.append(resTxt);
}

const renderSpinner = () => {
    response.hide();
    buttonText.text('');
    goSpan.attr('class', 'spinner-border');
}

const removeSpinner = () => {
    response.show();
    goSpan.attr('class', '')
}

const postCommandResults = (cmd) => {
    $.ajax({
        url: "/results",
        method: "POST",
        data: {command: cmd}
    })
    .then(res => {
        buttonText.text('GO');
        response.show();
        appendResponse(res.response)
        removeSpinner();
        console.log(res)
    })
    .catch(err => console.log(err))
}

const getCommandResults = () => {
    $.ajax({
        url: "/results",
        method: "GET",
    })
    .then(res => {
        if (res.response !== "") {
            response.show();
        }
        appendResponse(res.response)
    })
    .catch(err => console.log(err))
}

const onButtonClick = e => {
    renderSpinner();
    postCommandResults(commandInput.val())
    resTxt.text('');
    commandInput.val('');
}

goButton.on('click', onButtonClick)

getCommandResults();
