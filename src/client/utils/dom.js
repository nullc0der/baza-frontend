export function scrollToElement($target, $container = false, duration = 600) {
    $container = $container || $('html,body')
    let shift  = $target.offset().top
    $container.stop().animate({
        scrollTop: shift
    }, duration)
}