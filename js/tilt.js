/**
 * Nexus 3D Tilt Effect
 * Lightweight vanilla 3D card tilt with specular glare reflection
 */

class Vanilla3DTilt {
    constructor(elements, options = {}) {
        this.elements = Array.from(elements);
        this.settings = Object.assign({
            maxTilt: 14,
            perspective: 1000,
            scale: 1.035,
            speed: 400,
            glare: true,
            maxGlare: 0.25
        }, options);

        this.init();
    }

    init() {
        this.elements.forEach(el => this.addCardListeners(el));
    }

    addCardListeners(card) {
        if (card.dataset.tiltInitialized) return;
        card.dataset.tiltInitialized = "true";

        card.style.transformStyle = "preserve-3d";
        card.style.transition = `transform ${this.settings.speed}ms cubic-bezier(.03,.98,.52,.99)`;

        // Setup glare container
        let glare = null;
        if (this.settings.glare) {
            glare = document.createElement("div");
            glare.className = "tilt-glare-effect";
            glare.style.position = "absolute";
            glare.style.top = "0";
            glare.style.left = "0";
            glare.style.width = "100%";
            glare.style.height = "100%";
            glare.style.overflow = "hidden";
            glare.style.pointerEvents = "none";
            glare.style.borderRadius = "inherit";
            glare.style.zIndex = "1";

            const glareInner = document.createElement("div");
            glareInner.className = "tilt-glare-inner";
            glareInner.style.position = "absolute";
            glareInner.style.top = "50%";
            glareInner.style.left = "50%";
            glareInner.style.pointerEvents = "none";
            glareInner.style.backgroundImage = `radial-gradient(circle, rgba(255,255,255,${this.settings.maxGlare}) 0%, rgba(255,255,255,0) 70%)`;
            glareInner.style.transform = "translate(-50%, -50%)";
            glareInner.style.opacity = "0";
            glareInner.style.transition = `opacity ${this.settings.speed}ms ease`;
            glareInner.style.width = "200%";
            glareInner.style.height = "200%";

            glare.appendChild(glareInner);
            card.appendChild(glare);
            card._glareInner = glareInner;
        }

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
            if (card._glareInner) card._glareInner.style.opacity = "1";
        });

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercentage = x / rect.width;
            const yPercentage = y / rect.height;

            const tiltX = (this.settings.maxTilt / 2 - yPercentage * this.settings.maxTilt).toFixed(2);
            const tiltY = (xPercentage * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2);

            card.style.transform = `perspective(${this.settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;

            if (card._glareInner) {
                card._glareInner.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(x - rect.width/2, -(y - rect.height/2)) * (180/Math.PI)}deg)`;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transition = `transform ${this.settings.speed}ms cubic-bezier(.03,.98,.52,.99)`;
            card.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            if (card._glareInner) {
                card._glareInner.style.opacity = "0";
            }
        });
    }

    static apply(selector, options) {
        const elements = document.querySelectorAll(selector);
        return new Vanilla3DTilt(elements, options);
    }
}

window.Vanilla3DTilt = Vanilla3DTilt;
