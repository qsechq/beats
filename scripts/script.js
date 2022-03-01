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
