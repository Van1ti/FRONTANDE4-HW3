document.addEventListener("DOMContentLoaded", () => {
            const imagesToLoad = document.querySelectorAll("img[data-src]")
            const manualLoadBtn = document.getElementById("manualLoadBtn")

            /**
             * @param {HTMLImageElement} img 
             */
            const loadImage = (img) => {
                const dataSrc = img.getAttribute("data-src")
                if (!dataSrc) return

               
                img.src = dataSrc

               
                img.onload = () => {
                    img.classList.add("loaded")
                }

                
                img.removeAttribute("data-src")
            }


            if ("IntersectionObserver" in window) {
                const observerOptions = {
                    root: null,
                    rootMargin: "0px 0px 50px 0px", 
                    threshold: 0.01 
                };

                const observer = new IntersectionObserver((entries, observerInstance) => {
                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            const img = entry.target

                            loadImage(img)
                            
                            observerInstance.unobserve(img)
                        }
                    })
                }, observerOptions)

                imagesToLoad.forEach(img => {
                    observer.observe(img)
                });

            } else {
               
                imagesToLoad.forEach(img => loadImage(img))
            }

            
            if (manualLoadBtn) {
                manualLoadBtn.addEventListener("click", () => {
                    const remainingImages = document.querySelectorAll("img[data-src]")
                    if (remainingImages.length === 0) {
                        alert("Всі зображення вже завантажені!")
                        return
                    }
                    
                    remainingImages.forEach(img => {
                        loadImage(img)
                    })
                    
                 
                    manualLoadBtn.textContent = "Всі зображення завантажено!"
                    manualLoadBtn.disabled = true
                    manualLoadBtn.style.backgroundColor = "#6c757d"
                })
            }
        })