function scroll() {
    //laptop
    function onEntry(entry) {
        entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('laptop-show');
        }
        });
    }
    let options = { threshold: [0] };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.laptop-animation');
    for (let elm of elements) {
        observer.observe(elm);
    }
}

export default scroll;