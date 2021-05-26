function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class Lightbox {
    constructor({
        lazyload = true,
        counter: _counter = true,
        arrows = true,
        slideSpeed = 400,
        ...options
    }) {
        _defineProperty(
            this,
            "goTo",

            (num, event) => {
                const { items, counter, lightboxNode } = this.nodes;
                if (this.counter) {
                    counter.innerHTML = `${num + 1}/${this.links.length}`;
                }
                const spinner = `<div class="spinner"></div>`;
                const img = items[num].querySelector("img");
                if (this.lazyload) {
                    const src = img.getAttribute("data-src");
                    items[num].insertAdjacentHTML("beforeend", spinner);
                    // Set image attribute
                    img.setAttribute("src", src);

                    // Add class to slide item when image is completely loaded. Must be in this order.
                    const imgLoad = new Image();
                    imgLoad.onload = () => {
                        items[num].classList.add("is-active");
                        items[num].classList.add("is-loaded");
                    };
                    imgLoad.src = src;
                } else {
                    items[num].classList.add("is-active");
                    items[num].classList.add("is-loaded");
                }

                // Change the offset for each slide based on its index and the current index.
                for (let i = 0; i < this.offsets.length; i++) {
                    const offset = this.offsets[i] - num * 100;

                    items[i].style.transform = `translateX(${offset}vw)`;

                    // Add transition type based on which event was triggered
                    if (event) {
                        if (event.target.className === "gallery__itemThumb") {
                            items[i].style.transition = `opacity 0.4s ease`;
                        } else {
                            items[
                                i
                            ].style.transition = `transform ${this.slideSpeed}ms ease-out`;
                        }
                    }
                }
            }
        );
        _defineProperty(
            this,
            "createNodes",

            (links) => {
                // Find all the lightbox nodes and add them to an object
                Object.assign(this.nodes, {
                    lightboxNode: document.querySelector(".m-lightbox"),
                    items: Array.from(
                        document.querySelectorAll(".m-lightbox__slide")
                    ),
                    next: document.querySelector(".m-lightbox__nextPrev--next"),
                    prev: document.querySelector(".m-lightbox__nextPrev--prev"),
                    close: document.querySelector(".m-lightbox__close"),
                });

                Object.assign(this.nodes, {
                    counter: document.querySelector(".m-lightbox__counter"),
                });
            }
        );
        _defineProperty(
            this,
            "eventListeners",

            (links) => {
                const { lightboxNode, items, next, prev, close } = this.nodes;
                links.forEach((item, index) => {
                    item.addEventListener("click", (e) => {
                        e.preventDefault();
                        lightboxNode.classList.add("is-active");
                        document.body.style.overflow = "hidden";
                        this.imageIndex = index;
                        this.goTo(index, e);
                        this.setNav(index);
                    });
                });

                next.addEventListener("click", (e) => {
                    this.goToNext(e);
                });

                prev.addEventListener("click", (e) => {
                    this.goToPrev(e);
                });

                close.addEventListener("click", () => {
                    this.closeBox();
                });

                document.onkeydown = (e) => {
                    switch (e.keyCode) {
                        case 37:
                            this.goToPrev(e);
                            break;
                        case 39:
                            this.goToNext(e);
                            break;
                        case 27:
                            this.closeBox();
                            break;
                    }
                };

                items.forEach((item) => {
                    // https://gist.github.com/Tam/d44c87b3daeb07b15984ddc6127d4e34
                    new Swipe(item.querySelector("img"), (e, direction) => {
                        e.preventDefault();
                        switch (direction) {
                            case "up":
                                // Handle Swipe Up
                                break;
                            case "down":
                                // Handle Swipe Down
                                break;
                            case "left":
                                this.goToNext(e);
                                break;
                            case "right":
                                this.goToPrev(e);
                                break;
                        }
                    });
                });
            }
        );
        _defineProperty(
            this,
            "setNav",

            (index) => {
                if (this.arrows) {
                    const { next, prev } = this.nodes;
                    if (index < this.links.length - 1) {
                        next.classList.add("is-active");
                    }
                    if (index >= this.links.length - 1) {
                        next.classList.remove("is-active");
                    }
                    if (index > 0) {
                        prev.classList.add("is-active");
                    }
                    if (index <= 0) {
                        prev.classList.remove("is-active");
                    }
                }
            }
        );
        _defineProperty(
            this,
            "goToNext",

            (e) => {
                const { items } = this.nodes;
                if (this.imageIndex < items.length - 1) {
                    this.goTo(this.imageIndex + 1, e);
                    setTimeout(() => {
                        items[this.imageIndex - 1].classList.remove(
                            "is-active"
                        );
                    }, this.slideSpeed);
                    this.imageIndex += 1;
                    this.setNav(this.imageIndex);
                }
            }
        );
        _defineProperty(
            this,
            "goToPrev",

            (e) => {
                const { items } = this.nodes;
                if (this.imageIndex > 0) {
                    this.goTo(this.imageIndex - 1, e);
                    setTimeout(() => {
                        items[this.imageIndex + 1].classList.remove(
                            "is-active"
                        );
                    }, this.slideSpeed);
                    this.imageIndex -= 1;
                    this.setNav(this.imageIndex);
                }
            }
        );
        _defineProperty(
            this,
            "closeBox",

            () => {
                const { lightboxNode, items } = this.nodes;
                lightboxNode.classList.remove("is-active");
                document.body.style.overflow = "auto";
                setTimeout(() => {
                    items.forEach((item) => item.classList.remove("is-active"));
                }, this.slideSpeed);
            }
        );
        _defineProperty(
            this,
            "renderImages",

            (images) => {
                const imagesLinks = images.map((item, index) => {
                    const offset = index * 100;
                    this.offsets.push(offset);
                    const imageSrc = item.getAttribute("href");
                    return `
                  <li class='m-lightbox__slide' style='transform: translateX(${offset}vw)'>
                      ${
                          this.lazyload
                              ? `
                          <img data-src='${imageSrc}'/>
                      `
                              : `
                          <img src='${imageSrc}'/>
                      `
                      }
                  </li>
              `;
                });
                return imagesLinks;
            }
        );
        _defineProperty(
            this,
            "createLightbox",

            () => {
                const lightbox = `
                <div class='m-lightbox'>
                  <div class='m-lightbox__controls'>
                      <button class='m-lightbox__close'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                      <button class='m-lightbox__nextPrev m-lightbox__nextPrev--prev'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>
                      <button class='m-lightbox__nextPrev m-lightbox__nextPrev--next'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                  </div>
                  <ul class='m-lightBox__slider'>
                      ${this.renderImages(this.links).join("")}
                  </ul>
                  <div class='m-lightbox__counter'>
                  </div>
              </div>
          `;
                document.body.insertAdjacentHTML("beforeend", lightbox);
            }
        );
        if (!options.selector) {
            console.error(
                'Please add a valid css selector with the option "selector:"'
            );
        } else if (typeof options.selector !== "string") {
            console.error(
                options.selector,
                `is not a string but a(n) ${typeof options.selector}`
            );
        } else {
            this.selector = options.selector;
            this.lazyload = lazyload;
            this.counter = _counter;
            this.arrows = arrows;
            this.slideSpeed = slideSpeed;
            this.links = Array.from(
                document.querySelectorAll(options.selector)
            );
            this.offsets = [];
            this.nodes = {};
            this.imageIndex = null;
            if (this.links.length > 0) {
                this.createLightbox();
                this.createNodes();
                this.eventListeners(this.links);
            } else {
                console.error(
                    `The selector '${this.selector}' did not yield results. Please make sure the selector is applied on an 'a' element.`
                );
            }
        }
    }
}

const gallery = document.querySelectorAll(".wp-block-gallery");

if (gallery.length) {
    const lb = new Lightbox({
        selector: ".blocks-gallery-item a",
        lazyload: true, // boolean
        arrows: true, // boolean
        counter: true, // boolean
        slideSpeed: 500, //number(ms)
    });
}
