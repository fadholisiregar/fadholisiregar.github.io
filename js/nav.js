// Menginisiasi sidebar nav
document.addEventListener("DOMContentLoaded", () => {

    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Memuat daftar tautan menu
                document.querySelectorAll(".topnav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                // Mendaftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.topnav a').forEach(elm => {
                    elm.addEventListener('click', event => {
                        let page = event.target.getAttribute('href').substr(1);
                        loadPage(page);
                    })
                    $("li").on('click', function () {
                        $('.nav-link').removeClass('active')
                        $(this).addClass('active').siblings().removeClass('active')
                    });

                })

            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

});


// Memuat halaman konten
let page = window.location.hash.substr(1);
if (page == "" || page == "content") page = "home";

loadPage(page);

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const content = document.querySelector('#main-content');

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Page Not Found</p>";
            } else {
                content.innerHTML = '<p>Oops.. Page Cannot be Accessed</p>'
            }
            // $('.item-scroll').on('click', function (e) {
            //     alert('ok')
            //     // ambil isis href
            //     let project = $(this).attr('href');
            //     // tangkap elemen tersebut
            //     let elemenProject = $(project);

            //     // pindahkan scroll
            //     $('body').scrollTop(elemenProject.offset().top);
            //     e.preventDefault()
            // })
        }

    }
    xhttp.open('GET', 'pages/' + page + ".html", true);
    xhttp.send();

}






