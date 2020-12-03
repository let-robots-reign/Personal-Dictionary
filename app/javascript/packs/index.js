$(document).ready(function () {
    $('#global-checkbox').on('click', function () {
        if ($(this).is(':checked')) {
            $('.word-checkbox').prop('checked', true).change()
            $('#chosen-words-number').css('visibility', 'visible')
        } else {
            $('.word-checkbox').prop('checked', false).change()
            $('#chosen-words-number').css('visibility', 'hidden')
        }
    })

    $('.word-checkbox').change(function () {
        if ($(this).is(':checked')) {
            console.log('Checkbox is checked..')
        } else {
            console.log('Checkbox is not checked..')
        }
    })
})