$(function() {

    AOS.init();

    new fullpage('#fullpage', {

        scrollbar: true,
        autoScrolling:true,
        scrollHorizontally: true,
        normalScrollElements: '#message',
        anchors: ['landingPageAnchor','aboutMeAnchor','projectsAnchor','contactMeAnchor'],
        //navigation: true,         //DE-COMMENT TO ENABLE NAV CIRCLES
        
        //this fixes the AOS on all slides so that it doesn't just work on 1st slide, also triggers...
        //AOS on every scroll.
        onLeave: function(){
            jQuery('.section [data-aos]').removeClass("aos-animate");
        },
        onSlideLeave: function(){
            jQuery('.slide [data-aos]').removeClass("aos-animate");
        },
        afterSlideLoad: function(){
            jQuery('.slide.active [data-aos]').addClass("aos-animate");
        },
        afterLoad: function(){
            jQuery('.section.active [data-aos]').addClass("aos-animate");
        }
    });

    fullpage_api.setAllowScrolling(true);

    //anime.js for landingPage
    const staggerVisualizerEl = document.querySelector('#animation');
    const fragment = document.createDocumentFragment();
    const grid = [25, 12];
    const col = grid[0];
    const row = grid[1];
    const numberOfElements = col * row;

    for (let i = 0; i < numberOfElements; i++) {
        gridTile=document.createElement('div');
        gridTile.setAttribute('id',i);
        gridTile.setAttribute('class','tile');
        fragment.appendChild(gridTile);
    }

    staggerVisualizerEl.appendChild(fragment);

    //defines animation timeline
    var tl = anime.timeline({
        targets: '#animation div',
        loop: true,
    })
    .add({
        scale: [
        {value: 5, easing: 'easeOutSine', duration: 1000},
        {value: 1, easing: 'easeInOutQuad', duration: 1000}
        ],
        delay: anime.stagger(300, {grid: grid, from: 'center', easing:'easeInSine'}),
    })

    //plays animations
    tl.play()

    //on hover make tiles grow, no hover-off animation
    $('.tile').hover(function() {
        anime ({
        targets: this,
        background: '#FF8300',
        scale: 3,
        });
    });

    //on hover make lang/framework icons grow, hover off shrinks back to normal
    $('.lang').hover(function() {
        anime ({
        targets: this,
        scale: 1.5,
        })
        }, function() {
        anime ({
        targets: this,
        scale: 1,
    });
    });

    //event listener for submit button to send contact form as mail
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', sendMail);

    //function to make prev/next/submit buttons appear and disappear appopriately when moving through contactForm
    var contactForm = document.getElementById('contactForm')

    contactForm.addEventListener('slide.bs.carousel', function (e) {
        if(e.relatedTarget.id === 'slide1'){
            submitButton.style.display = "none";
            prevButton.style.display = "none";
        }
        else if(e.relatedTarget.id === 'slide2'){
            prevButton.style.display = "inline";
            submitButton.style.display = "none";
            nextButton.style.display = "inline";
        }
        else if(e.relatedTarget.id === 'slide3'){
            submitButton.style.display = "inline";
            nextButton.style.display = "none";
        }
    })

    //contactForm input validation
    const nameListen = document.querySelector('#name');
    const emailListen = document.querySelector('#email');
    const messageListen = document.querySelector('#message');

    nameListen.addEventListener('blur', checkNameValid);
    emailListen.addEventListener('blur', checkEmailValid);
    messageListen.addEventListener('input', checkMessageValid);

    function checkNameValid(e) {
        if(nameListen.value == ''){
            nextButton.setAttribute('data-bs-slide-to','0');
            nextButton.removeAttribute('data-bs-slide');
            document.getElementById('nameInvalidText').style.visibility='visible';
        }
        else{
            nextButton.setAttribute('data-bs-slide','next');
            nextButton.removeAttribute('data-bs-slide-to');
            document.getElementById('nameInvalidText').style.visibility='hidden';

        }
    }

    //define regex to check for [anything]@[anything].[anything]
    var emailRegex = /\S+@\S+\.\S+/;

    function checkEmailValid(e) {
        if(emailListen.value == '' | emailRegex.test(emailListen.value)==false){
            nextButton.setAttribute('data-bs-slide-to','1');
            nextButton.removeAttribute('data-bs-slide');
            document.getElementById('emailInvalidText').style.visibility='visible';
        }
        else{
            nextButton.setAttribute('data-bs-slide','next');
            nextButton.removeAttribute('data-bs-slide-to');
            document.getElementById('emailInvalidText').style.visibility='hidden';

        }
    }

    function checkMessageValid(e) {
        if(messageListen.value == ''){
            submitButton.setAttribute('disabled',true);
            document.getElementById('messageInvalidText').style.visibility='visible';
        }
        else{
            submitButton.removeAttribute('disabled');
            document.getElementById('messageInvalidText').style.visibility='hidden';

        }
    }

    //PHPmailer call
    function sendMail () {

        var contactName = document.getElementById('name').value;
        var contactEmail = document.getElementById('email').value;
        var contactMessage = document.getElementById('message').value;

        $.ajax({
            url:"sendMail.php",
            type: "POST", 
            data: {
                name: contactName,
                email: contactEmail,
                message: contactMessage,
            },
            success:function(result){
            alert(result);
            }
        });
    }

});