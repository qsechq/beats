let hamburger  = document.querySelector('.hamburger ');
let overlay = document.querySelector('.overlay');
let links = document.querySelectorAll('.nav__link--hamburger');

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
}

hamburger.addEventListener('click' , toggleMenu);


const findBlockByAlias = (alias) => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};

  $(".interective__avatar-link").click((e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switcher-item");
    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("interective__avatar--active").siblings().removeClass("interective__avatar--active");
  });

  const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const regHeight = textBlock.height();
    container.addClass('active');
    contentBlock.height(regHeight);
   
}

const closeEveryItem = container => {
  
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');
    itemContainer.removeClass('active');
   
    items.height(0);
}

  $('.team__link').click(e =>{
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');
  
    if (elemContainer.hasClass("active")) {
      closeEveryItem(container);
    } else {
      closeEveryItem(container);
      openItem($this);
    } 
  });
  


  const slider = $('.product').bxSlider({
    pager: false,
    controls: false
  });

  $('.slider__link--back').click((e) => {
    e.preventDefault();
    slider.goToPrevSlide();
  });

  $('.slider__link--next').click((e) => {
    e.preventDefault();
    slider.goToNextSlide();
  });

const validateFields=(form, fieldsArray)=>{
  fieldsArray.forEach((field)=>{
    field.removeClass("input__error");
     if (field.val().trim()===""){
       field.addClass("input__error"); 
       
     }
   });
   const errorFields=form.find(".input__error");
   return errorFields.length===0;
}
 $('.form').submit((e)=>{
   e.preventDefault();

   const form=$(e.currentTarget);
   
   const name=form.find("[name='name']");
   const phone=form.find("[name='phone']");
   const comment=form.find("[name='comment']");
   const to = form.find("[name='to']");
   const modal=$("#modal");
   const content =modal.find(".modal__content");
   modal.removeClass("error__modal");
   const isValid=validateFields(form, [name, phone, comment,to]);
  if(isValid){
    const request=$.ajax({
      url:"https://webdev-api.loftschool.com/sendmail ",
      method:"post",
      data:{
        name:name.val(),
        phone:phone.val(),
        comment:comment.val(),
        to:to.val(),

      },
     
      
    });
    request.done((data)=>{
      content.text(data.message);
    
    });
    request.fail((data)=>{
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error__modal");
      
    });
    request.always((data)=>{
      $.fancybox.open({
        src:"#modal",
        type:"inline"
     });
    });
   };
 });
  

 $('.app--btn').click(e=>{
   e.preventDefault();
   $.fancybox.close();
   $(".form").trigger("reset");
 });
 

 let accerdonItem = document.querySelectorAll('.accerdon__item');
 accerdonItem.forEach(item => {
     item.addEventListener('click', function ($event) {
         
         if ($event.target.tagName !== 'P') {
             let accerdonActive = document.querySelectorAll('.accerdon__text--active');
             let p = item.querySelector('.accerdon__text');
              p.classList.toggle('accerdon__text--active');
              accerdonActive.forEach(i => {
                 i.classList.remove('accerdon__text--active');
             }); 
         }  ;
     });
 });



 
const sections=$("section");
const display=$('.main__content');
const sideMenu=$(".fixed__menu");
const menuItems=sideMenu.find(".fixed__menu-item");



let inScroll=false;
sections.first().addClass("section--active");




const countSectionPosition=(sectionEq)=>{
  const position=sectionEq * -100;
  if(isNaN(position)){
    console.error("неверное значание");
    return 0;
  }
  return position;
};

const changeMenuThemeForSection=sectionEq=>{
  const currentSection =sections.eq(sectionEq);
    const menuTheme=currentSection.attr("data-sidemenu-theme");
    const activeClass="fixed__menu--white"
    

    if(menuTheme=="white"){
      sideMenu.addClass(activeClass);
    }else{
      sideMenu.removeClass(activeClass);
    }
};


const resetActiveClassForItem= (items, itemEq, activeClass)=>{
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}


const performTransition=sectionEq=>{
  if(inScroll) return; 

  const transitionOver=1000;
  const mouseInertiaover=300;
    inScroll=true;
    const position=countSectionPosition(sectionEq);
    changeMenuThemeForSection(sectionEq)
    
 
    display.css({
      transform: `translateY(${position}%)`
    });
  
    resetActiveClassForItem(sections, sectionEq, "section--active");
    
 
 
    setTimeout(()=>{
      
      inScroll=false;

      resetActiveClassForItem(menuItems, sectionEq, "fixed__menu-item--active")
     
    },transitionOver+mouseInertiaover);
};

const viewportScroller =() =>{
  const activeSection=sections.filter('.section--active');
  const nextSection=activeSection.next();
  const prevSection=activeSection.prev();
  return{
    next(){
      if( nextSection.length){
        performTransition(nextSection.index())
      }
    },
    prev(){
      if(prevSection.length){
        performTransition(prevSection.index())
      }
    }
  };
  
 
}



$(window).on('wheel', (e)=>{
  const deltaY = e.originalEvent.deltaY;
  const scroller=viewportScroller();
  if(deltaY>0){
    scroller.next();
    
  }

  if(deltaY<0){
    scroller.prev();
   
  }
});



$(window).on("keydown", e=>{
  
  const tagName=e.target.tagName.toLowerCase();
  const userTypingInInputs=tagName=="input" || tagName=="textarea";
  const scroller=viewportScroller();
  if(userTypingInInputs) return;
    switch(e.keyCode){
      case 38:
        scroller.prev();
        break;
  
      case 40:
        scroller.next();
        break;
  
  
    }
  
  
});

$(".wrapper").on("touchmove",e=>e.preventDefault());

$("[data-section-to]").click(e=>{
  e.preventDefault();
  const $this=$(e.currentTarget);
  const target=$this.attr("data-section-to");
  const reqSection=$(`[data-section-id=${target}]`);
  performTransition(reqSection.index());
});


const mobileDetect= new MobileDetect(wnidow.navigator.userAgent);
 const isMobile=mobileDetect.mobile();
if(isMobile){
  $("body").swipe( {
    
    swipe:function(event,direction) {
        const scroller=viewportScroller();
        let scrollDirection="";
        if(direction==="up")scrollDirection="next";
        if(direction==="down")scrollDirection="prev";
      scroller[scrollDirection]();
    },
  });
}






let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      player.pauseVideo();
    } else {
      playerContainer.addClass("paused");
      player.playVideo();
    }
  });
 }

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "392",
    width: "662",
    videoId: "LXb3EKWsInQ",
    events: {
      // onReady: onPlayerReady,
      // onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
 }

 eventsInit();