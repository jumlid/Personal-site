import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAoxwmoiMpcz0W9wqdJPMByFBCtjFyOScc",
    authDomain: "database-2c7db.firebaseapp.com",
    databaseURL: "https://database-2c7db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "database-2c7db",
    storageBucket: "database-2c7db.appspot.com",
    messagingSenderId: "540211776912",
    appId: "1:540211776912:web:9ccc4fa4cd04655f463715",
    measurementId: "G-KK7KR418WV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)

function upload_blog_to_database() {
    let title = document.getElementById('Write_blog_title').value
    let date = document.getElementById('Write_blog_date').value
    let intro = document.getElementById('Write_blog_intro').value
    let data = document.getElementById('write_blog_here').value
    let url = document.getElementById('Write_blog_url').value.trim()
    push(ref(database, "Portfolio/blog"), {
        title: title,
        intro: intro,
        data: data,
        date: date,
        url: url

    }



    )

    //console.log(title, date, intro, data, url)









}
// This block of code is used to upload portfolio to the firebase realtime databse
function upload_portfolio() {
    let tag = document.getElementById("portfolio_tag").value
    let caption = document.getElementById("portfolio_caption").value
    let url = document.getElementById("portfolio_url").value
    let title = document.getElementById("portfolio_title").value
    let is_video = document.getElementById("portfolio_is_video").value
    // console.log(tag, caption, url, title, is_video)
    push(ref(database, "Portfolio/portfolio_section"), {
        tag: tag,
        caption: caption,
        url: url,
        title: title,
        is_video: is_video
    })


}
// This block of code  upload project to the firebase realtime database
function upload_project() {
    let name = document.getElementById("Project_Name").value
    let icon = document.getElementById("Project_bootstrap_icon").value
    let about = document.getElementById("project_about").value
    let github = document.getElementById("project_github").value
    let url = document.getElementById("project_url").value
    push(ref(database, "Portfolio/project_section"), {
        name: name,
        icon: icon,
        about: about,
        github: github,
        url: url
    })




}
// This will read the database for the blog 
function read_blog_from_database() {
    get(child(ref(database), "Portfolio/blog"))
        .then((snapshot => {
            Object.entries(snapshot.val()).forEach(Element => {

                upload_blog(Element[0], Element[1].title, Element[1].intro, Element[1].url)
            })







        }))

}
function read_Project() {
    get(child(ref(database), "Portfolio/project_section"))
        .then((snapshot) => {
            //upload()
            Object.entries(snapshot.val()).forEach(Element => {
                //  console.log(Element[1].icon, Element[1].name, Element[1].about, Element[1].github, Element[1].url)
                upload(Element[1].icon,  Element[1].github)
            })
            read_Portfolio()
        })

}

function read_Portfolio() {
    get(child(ref(database), "Portfolio/portfolio_section"))
        .then((snapshot) => {
            //upload()
            Object.entries(snapshot.val()).forEach(Element => {
                //  console.log(Element[1].tag, Element[1].caption, Element[1].url, Element[1].title, Element[1].is_video)
                uploadp(Element[1].tag, Element[1].caption, Element[1].url, Element[1].title, Element[1].is_video)
            })
            read_blog_from_database()

        })

}




























function upload_blog(id, head, int, url) {
    //  console.log('uplad')
    if (document.getElementById('blog_container')) {
        document.getElementById('blog_container').innerHTML += `
      <div id=b_id${id} class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="100" onclick="blog('${id}')">
            <div class="service-item">
              <div class="bg"
                style=" height: 200px; margin-bottom: 10px; background-image: url(${url.trim()}); background-repeat: no-repeat; background-size: contain; background-position:center;">
              </div>

              <h4>${head}</h4>
              <p> ${int}</p>

            </div>
          </div>`
    } else {
        return
    }


}
function blog(id) {
    // console.log('id id')

    window.location.href = `/read/?id=${id}`
    // window.location.hash = `blog/${id}`
    upload_b(id)

}
if (window.location.href.split('-')[1]) {
   // console.log(true)
    upload_b('-'+window.location.href.split('-')[1])
    
}


//upload_b(window.location.href.split('#')[1])



function upload_b(id) {



 //     console.log(id)
    get(child(ref(database), `Portfolio/blog/${id}`))
        .then((snap) => {
            document.getElementById('content').innerHTML = snap.val().data
            document.getElementById('date').innerText = snap.val().date
            document.getElementById('intro').innerText = snap.val().title
            document.getElementById('read_head').innerText = snap.val().title
            document.getElementsByClassName('bg_img')[0].style.backgroundImage=`url(${snap.val().url})`

        })


}
window.upload_blog_to_database = upload_blog_to_database
window.blog = blog
window.read_blog_from_database = read_blog_from_database

window.read_Portfolio = read_Portfolio
window.read_Project = read_Project
window.upload_project = upload_project
window.upload_portfolio = upload_portfolio






