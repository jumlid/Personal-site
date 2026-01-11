import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
//import { email } from "discord.js";
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
/*
const auth = getAuth(app)
let email = 'example@gmail.com'
let password = '123456789'

signInWithEmailAndPassword(auth, email, password)
    .then((users) => {
        const use = users.user
    })
    .catch(() => {
        console.log('who t f are you?????')
    })
*/
// FOR ADMIN PANEL

// This will upload blog to the main firebase database using the admin panel
function Add_blog() {
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

// This will upload portfolio to the 
function Add_Portfolio() {
    let tag = document.getElementById("portfolio_tag").value
    let caption = document.getElementById("portfolio_caption").value
    let url = document.getElementById("portfolio_url").value
    let title = document.getElementById("portfolio_title").value
    let is_video = false
    if (tag != 'video') {
        is_video = false


    }
    else {
        is_video = true


    }
    //  console.log(is_video)
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
function Add_project() {
    //  let name = document.getElementById("Project_Name").value
    //  let icon = document.getElementById("Project_bootstrap_icon").value
    //  let about = document.getElementById("project_about").value
    let github = document.getElementById("project_github").value
    // let url = document.getElementById("project_url").value
    push(ref(database, "Portfolio/project_section"), {
        github: github,
    })




}


// all these three function read_blog_from_database(), read_project(), read_portfolio() are just for the home section these function will fetch data from firebase realtime database and show them in the home page


// This will read the database for the blog 
// This This isn't the main blog it's just the homepage intro blog which will load when users render the blog section 
function read_blog_from_database() {
    get(child(ref(database), "Portfolio/blog"))
        .then((snapshot => {
            Object.entries(snapshot.val()).forEach(Element => {

                upload_blog(Element[0], Element[1].title, Element[1].intro, Element[1].url)
            })

        }))

}

// Same as the code above this section of will fetch data from firebase realtime database to display in homepage of my site
function read_Project() {
    let repo_data = []
    let i = 0
    let repo;
    let user;
    get(child(ref(database), "Portfolio/project_section"))
        .then((snapshot) => {
            //upload()

            Object.entries(snapshot.val()).forEach(Element => {
                repo = Element[1].github.split('/')[4]
                user = Element[1].github.split('/')[3]
                i++
                repo_data.push([repo, user])


                //  console.log(Element[1].icon, Element[1].name, Element[1].about, Element[1].github, Element[1].url)
                //    upload(Element[1].github)
            })
            if (i === Object.entries(snapshot.val()).length) {
                upload(repo_data)
                //   console.log('DONE!!!!!!!!!!!!!!!!!!!')

            }
            read_Portfolio()
        })

}

//same as the code above this will fetch data from firebase to show the portfolio in the home page
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



// These  are the main stuff which make my site dynamic site it use the data readed from the three function above with the element 

//upload_blog this is called by the read_blog_from_database it loop thro the blog section of the database and according to the number of content this fucntion is called this function have 4 parameter 
// -which is filled by the read blog function first para is id it's a unique id given by the firebase here i'm using this to identify blogs , head it's the Title or head tag of the blog and for the 
// -int it stands for introduction hmm it's just the first few words of by blog , url it's the image url 

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

//This is my fav one :love blog as you can see above in function upload_blog i have a adding element inside blog_container and it has a onclick function which will redirect users to another potion
//- that's /read/index.html and this function have 1 para called id which we have discussed earlier when users click on this button it will change users url to <actual url>/read/?id=<id> 
function blog(id) {
    // console.log('id id')

    window.location.href = `/read/?id=${id}`
    // window.location.hash = `blog/${id}`
    upload_b(id)

}

// it's the same code above but this will start without any action just the url must contain the creditial required like id and the /read/  by this users can share my blog hehe
if (window.location.href.split('-')[1]) {
    // console.log(true)
    upload_b('-' + window.location.href.split('-')[1])

}


//upload_b(window.location.href.split('#')[1])



//This one is the main backbone for the blog section this will be tregire from the blog section with one id as a para when this function is start it will fetch the whole blog from the
//  firebase using the id given by the parameter 
function upload_b(id) {



    //     console.log(id)
    get(child(ref(database), `Portfolio/blog/${id}`))
        .then((snap) => {
            document.getElementById('content').innerHTML = snap.val().data
            document.getElementById('date').innerText = snap.val().date
            document.getElementById('intro').innerText = snap.val().title
            document.getElementById('read_head').innerText = snap.val().title
            document.getElementsByClassName('bg_img')[0].style.backgroundImage = `url(${snap.val().url})`

        })


}




//window.upload_blog_to_database = upload_blog_to_database
window.blog = blog
window.read_blog_from_database = read_blog_from_database
window.read_Portfolio = read_Portfolio
window.read_Project = read_Project
window.Add_project = Add_project
window.Add_Portfolio = Add_Portfolio
window.Add_blog = Add_blog






